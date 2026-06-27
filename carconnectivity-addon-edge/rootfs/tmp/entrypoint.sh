#!/bin/sh
set -euo pipefail

# Variables
TOKEN_FILE="/config/.cache/carconnectivity.token"
CACHE_FILE="/config/.cache/carconnectivity.cache"
HEALTHY_FILE="/tmp/carconnectivity_healthy"
NGINX_FILE="/etc/nginx/nginx.conf"
NGINX_CACHE="/config/.cache/nginx"
EXPERT_NAME="carconnectivity.expert.json"
EXPERT_FILE="/config/${EXPERT_NAME}"
PAGE_FILE="/config/carconnectivity.json"
RUNTIME_FILE="/config/.cache/carconnectivity.runtime.json"
CONFIGUI_PORT="8098"
EXPERT_EXISTS="false"
EXPERT_SYNTAX="false"
CC_PID=""
NGINX_PID=""
CONFIGUI_PID=""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

color_echo() {
    local color="$1"
    shift
    echo -e "${color}$@${NC}"
}

BANNER="${CYAN}·············································································································
${CYAN}:  ____            ____                            _   _       _ _              _       _     _             :
${CYAN}: / ___|__ _ _ __ / ___|___  _ __  _ __   ___  ___| |_(_)_   _(_) |_ _   _     / \\   __| | __| | ___  _ __  :
${CYAN}:| |   / _\` | '__| |   / _ \\| '_ \\| '_ \\ / _ \\/ __| __| \\ \\ / / | __| | | |   / _ \\ / _\` |/ _\` |/ _ \\| '_ \\ :
${CYAN}:| |__| (_| | |  | |__| (_) | | | | | | |  __/ (__| |_| |\\ V /| | |_| |_| |  / ___ \\ (_| | (_| | (_) | | | |:
${CYAN}: \\____\\__,_|_|   \\____\\___/|_| |_|_| |_|\\___|\\___|\\__|_| \\_/ |_|\\__|\\__, | /_/   \\_\\__,_|\\__,_|\\___/|_| |_|:
${CYAN}:                                                                    |___/                                  :
${CYAN}·············································································································
\n${CYAN}⏳ STARTING ⏳ ($(date))${NC}"

# Function to handle signals
term_handler() {
    color_echo "${YELLOW}" "SIGTERM signal received, shutting down..."

    terminate_process() {
        local pid="$1"
        if [ -n "${pid}" ] && kill -0 "${pid}" 2>/dev/null; then
            kill -TERM "${pid}"
            wait "${pid}"
        fi
    }

    terminate_process "${NGINX_PID}"
    terminate_process "${CONFIGUI_PID}"
    terminate_process "${CC_PID}"
    exit 143 # 128 + 15 -- SIGTERM
}

# Function to print file with header and footer
print_file() {
    local file="$1"
    local name="$(basename ${file})"
    if [ -f "$file" ]; then
        color_echo "${BLUE}" "📃 ($name) 📃"
        cat "$file"
        color_echo "${BLUE}" "-----------"
    else
        color_echo "${RED}" "❌ File not found: $file"
    fi
}

# JSON Verifier
validate_json() {
    local file="$1"
    local name="$(basename "$file")"
    local result
    local rc
    result=$(jq empty "$file" 2>&1)
    rc=$?
    if [ $rc -eq 0 ]; then
        color_echo "${GREEN}" "✅ File ${name} is syntactically correct."
        return 0
    else
        color_echo "${RED}" "❌ File ${name} is invalid."
        echo "Error details: $result"
        return 1
    fi
}

# Print config with sensitive fields redacted. The set of secret keys is derived
# from the field schema in const.py (single source of truth) so a new secret
# field cannot silently leak here.
print_redacted() {
    local file="$1"
    local pat
    pat=$(/opt/venv/bin/python -c "import sys; sys.path.insert(0, '/opt/configui'); from const import redaction_pattern; print(redaction_pattern())") || pat="password|spin|token|secret|key_primary|key_secondary|username"
    jq --arg pat "$pat" '
      walk(
        if type == "object" then
          with_entries(
            if (.key | test($pat; "i"))
            then .value = "***REDACTED***"
            else .
            end
          )
        else .
        end
      )
    ' "$file"
}


# GET HA LOCALE
get_ha_locale() {
    # Get the Supervisor token (used for authentication with Home Assistant API)
    local token="${SUPERVISOR_TOKEN}"
    local url="http://supervisor/core/api/config"

    # Fetch the response from the API
    local response
    response=$(curl -s -H "Authorization: Bearer ${token}" -H "Content-Type: application/json" "${url}")

    # Check if the response is empty
    if [ -z "$response" ]; then
        color_echo "${RED}" "❌ Unable to contact Home Assistant API or empty response."
        return 2
    fi

    # Extract 'language' and 'country' from the response
    local language
    language=$(echo "$response" | jq -r '.language')

    local country
    country=$(echo "$response" | jq -r '.country')

    # If 'language' is missing or invalid, print an error
    if [ "$language" == "null" ] || [ -z "$language" ]; then
        color_echo "${RED}" "❌ Language not found in API response."
        return 3
    fi

    # Normalize language code:
    # If it contains a dash (fr-FR), replace it with an underscore (fr_FR)
    if [[ "$language" == *"-"* ]]; then
        echo "${language//-/_}"
        return 0
    fi

    # If no dash and country is available, combine language and country
    if [ "$country" != "null" ] && [ -n "$country" ]; then
        echo "${language}_${country}"
        return 0
    fi

    # If only language without country
    echo "${language}"
    return 0
}

color_echo "${CYAN}" "${BANNER}"

# trap SIGTERM - sent when 'docker stop'
trap 'term_handler' TERM INT

mkdir -p ${NGINX_CACHE} && chown -R nginx:nginx ${NGINX_CACHE}

# Get the locale; HA_COUNTRY / HA_LANG are derived from it just below.
LOCALE=$(get_ha_locale) || LOCALE="en_US"
HA_COUNTRY=$(echo "${LOCALE#*_}" | tr '[:upper:]' '[:lower:]')
HA_LANG=$(echo "${LOCALE%%_*}" | tr '[:upper:]' '[:lower:]')
# volkswagen_na only supports us/ca
NA_COUNTRY="us"
if [ "${HA_COUNTRY}" = "ca" ]; then
    NA_COUNTRY="ca"
fi
color_echo "${CYAN}" "🌍 Detected locale: ${LOCALE} / country: ${HA_COUNTRY} / language: ${HA_LANG}"

# Expert mode is implicit: when a hand-written ${EXPERT_NAME} is present it takes
# precedence over the page config. No toggle — it is detected by its presence.
if [ -f "${EXPERT_FILE}" ]; then
    EXPERT_EXISTS="true"
    color_echo "${YELLOW}" "⚠️ Expert config detected (${EXPERT_NAME}). ⚠️"

    if validate_json "${EXPERT_FILE}"; then
        EXPERT_SYNTAX="true"
    fi
fi

# Config precedence: expert.json > custom page (carconnectivity.json) > defaults
SRC_CONFIG=""
if [ "${EXPERT_EXISTS}" = "true" ] && [ "${EXPERT_SYNTAX}" = "true" ]; then
    SRC_CONFIG=${EXPERT_FILE}
    color_echo "${GREEN}" "🔠 Expert configuration applied."
elif [ -f "${PAGE_FILE}" ] && validate_json "${PAGE_FILE}" >/dev/null 2>&1; then
    SRC_CONFIG=${PAGE_FILE}
    color_echo "${GREEN}" "🖥️ Custom page configuration applied (${PAGE_FILE})."
else
    if [ "${EXPERT_EXISTS}" = "true" ] && [ "${EXPERT_SYNTAX}" != "true" ]; then
        color_echo "${YELLOW}" "⛔ ${EXPERT_NAME} is present but invalid — ignoring it."
    fi
    # No expert.json and no page config yet: start with a minimal default
    # (MQTT + mqtt_homeassistant, no vehicle) so the container boots and the
    # configuration page is reachable to create the real config.
    color_echo "${BLUE}" "🛠️ No configuration yet — starting with defaults. Configure in the Web UI (Ingress → Configuration page)."
    DEFAULT_FILE="/config/.cache/carconnectivity.default.json"
    mkdir -p "$(dirname "${DEFAULT_FILE}")"
    /opt/venv/bin/python -c "import sys, json; sys.path.insert(0, '/opt/configui'); from generator import build_config; json.dump(build_config({'settings': {'mqtt': {'broker': 'core-mosquitto', 'port': 1883}}}), open('${DEFAULT_FILE}', 'w'), indent=2)"
    SRC_CONFIG=${DEFAULT_FILE}
fi

# Force-migrate blocked brands (SEAT/Cupra/VW-EU → EU Data Act) and inject the HA
# locale, writing a RUNTIME copy so the source files are never modified. Applies
# to every source, including expert.json.
mkdir -p "$(dirname "${RUNTIME_FILE}")"
MIGRATED=$(HA_COUNTRY="${HA_COUNTRY}" HA_LANG="${HA_LANG}" NA_COUNTRY="${NA_COUNTRY}" \
    /opt/venv/bin/python /opt/configui/migrate.py "${SRC_CONFIG}" "${RUNTIME_FILE}" 2>/dev/null) || MIGRATED=""
if [ ! -f "${RUNTIME_FILE}" ]; then
    cp "${SRC_CONFIG}" "${RUNTIME_FILE}"
fi
if [ -n "${MIGRATED}" ]; then
    color_echo "${YELLOW}" "🔁 Migrated to EU Data Act: ${MIGRATED}"
fi
CONFIG_FILE=${RUNTIME_FILE}

DEBUG_LEVEL=$(jq -r '.carConnectivity.log_level'  ${CONFIG_FILE} 2>/dev/null || echo "")
ADMINUI=$(jq -r '.carConnectivity.plugins[] | select(.type == "webui") | .config.username' ${CONFIG_FILE} 2>/dev/null || echo "")

echo -e "TYPE=$(hostname)"
print_file versions.txt

if [ "${DEBUG_LEVEL}" = "debug" ]; then
    color_echo "${BLUE}" "📃 Config (credentials redacted) 📃"
    print_redacted "${CONFIG_FILE}"
    color_echo "${BLUE}" "-----------"
fi
# Custom configuration page (served under Ingress at /configui/) — always on,
# independent of the webui, so the config is reachable even with webui disabled.
CONFIGUI_PORT="${CONFIGUI_PORT}" /opt/venv/bin/python /opt/configui/app.py &
CONFIGUI_PID=$!
color_echo "${GREEN}" "👏 Config page started (PID: ${CONFIGUI_PID}) on 127.0.0.1:${CONFIGUI_PORT}"

# nginx always runs: it serves the config page, and the webui dashboard when enabled.
nginx -c ${NGINX_FILE} &
NGINX_PID=$!
color_echo "${GREEN}" "👏 NGINX server started (PID: ${NGINX_PID})"

# CarConnectivity prints usernames (often e-mail addresses) in clear in its
# own logs. Route its output through a redactor before it reaches the addon
# log. A FIFO is used instead of a pipe so ${CC_PID} stays the real
# CarConnectivity PID — term_handler and the exit-code wait below rely on it.
CC_LOG_FIFO="/tmp/carconnectivity.log.fifo"
rm -f "${CC_LOG_FIFO}"
mkfifo "${CC_LOG_FIFO}"
awk '{ gsub(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+/, "***@***"); print; fflush() }' < "${CC_LOG_FIFO}" &
REDACT_PID=$!

/opt/venv/bin/carconnectivity ${CONFIG_FILE} --tokenfile ${TOKEN_FILE} --cache ${CACHE_FILE} --healthcheckfile ${HEALTHY_FILE} > "${CC_LOG_FIFO}" 2>&1 &
CC_PID=$!

color_echo "${GREEN}" "👏 CARCONNECTIVITY started (PID: ${CC_PID})"
wait "${CC_PID}"
exit_code=$?
wait "${REDACT_PID}" 2>/dev/null || true
rm -f "${CC_LOG_FIFO}"
color_echo "${BLUE}" "ℹ️ Process exited with code $exit_code"
exit "$exit_code"