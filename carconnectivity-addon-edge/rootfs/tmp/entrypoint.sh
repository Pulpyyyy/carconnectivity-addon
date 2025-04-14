#!/bin/sh
set -euo pipefail

# Variables
TOKEN_FILE="/config/carconnectivity.token"
CACHE_FILE="/config/carconnectivity.cache"
HEALTHY_FILE="/tmp/carconnectivity_healthy"
NGINX_FILE="/etc/nginx/nginx.conf"
OPTIONS_JSON="/data/options.json"
EXPERT_MODE=$(jq -r '.expert' ${OPTIONS_JSON} 2>/dev/null || echo "false")
EXPERT_NAME="carconnectivity.expert.json"
UI_NAME="carconnectivity.UI.json"
EXPERT_FILE="/config/${EXPERT_NAME}"
UI_FILE="/config/${UI_NAME}"
EXPERT_EXISTS="false"
EXPERT_SYNTAX="false"
CC_PID=""
NGINX_PID=""

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
    local name="$(basename ${file})"
    if jq empty "$file" 2>/dev/null; then
        color_echo "${GREEN}" "✅ File ${name} is syntactically correct."
        return 0
    else
        color_echo "${RED}" "❌ File ${name} is invalid."
        return 1
    fi
}

color_echo "${CYAN}" "${BANNER}"

# trap SIGTERM - sent when 'docker stop'
trap 'term_handler' TERM INT
cd /tmp

if [ "${EXPERT_MODE}" = "true" ]; then
    color_echo "${YELLOW}" "⚠️ Expert mode is enabled. ⚠️"

    if [ -f "${EXPERT_FILE}" ]; then
        EXPERT_EXISTS="true"
        color_echo "${GREEN}" "✅ File ${EXPERT_NAME} exists."
    else
        color_echo "${RED}" "❌ File ${EXPERT_NAME} not found."
    fi

    if validate_json "${EXPERT_FILE}"; then
        EXPERT_SYNTAX="true"
    fi
fi

CONFIG_FILE=${UI_FILE}
if [ "${EXPERT_MODE}" = "true" ] && [ "${EXPERT_EXISTS}" = "true" ] && [ "${EXPERT_SYNTAX}" = "true" ]; then
    CONFIG_FILE=${EXPERT_FILE}
    color_echo "${GREEN}" "🔠 Expert configuration applied."
else
    if [ "${EXPERT_MODE}" = "true" ]; then
        if [ "${EXPERT_EXISTS}" != "true" ]; then
            color_echo "${YELLOW}" "⛔ Using ${UI_NAME} because ${EXPERT_NAME} is missing."
        elif [ "${EXPERT_SYNTAX}" != "true" ]; then
            color_echo "${YELLOW}" "⛔ Using ${UI_NAME} because ${EXPERT_NAME} is invalid."
            print_file ${EXPERT_FILE}
        fi
    fi

    color_echo "${BLUE}" "🛠️ Generating configuration..."
    tempio -conf "${OPTIONS_JSON}" -template carconnectivity.json.gtpl -out "${UI_NAME}"

    if validate_json "${UI_NAME}"; then
        jq . "${UI_NAME}" > "${CONFIG_FILE}"
    else
        exit 1
    fi
fi

DEBUG_LEVEL=$(jq -r '.carConnectivity.log_level'  ${CONFIG_FILE} 2>/dev/null || echo "")
ADMINUI=$(jq -r '.carConnectivity.plugins[] | select(.type == "webui") | .config.username' ${CONFIG_FILE} 2>/dev/null || echo "")

echo -e "TYPE=$(hostname)"
print_file versions.txt

if [ "${DEBUG_LEVEL}" = "debug" ]; then
    print_file ${CONFIG_FILE}
fi
if [ -n "${ADMINUI:-}" ]; then
    exec nginx -c ${NGINX_FILE} &
    NGINX_PID=$!
    color_echo "${GREEN}" "👏 NGNIX server started (PID: ${NGINX_PID})"
else
    color_echo "${YELLOW}" "⚠️ NGINX server is disabled (empty admin account) ⚠️"
fi

/opt/venv/bin/carconnectivity ${CONFIG_FILE} --tokenfile ${TOKEN_FILE} --cache ${CACHE_FILE} --healthcheckfile ${HEALTHY_FILE} &
CC_PID=$!

color_echo "${GREEN}" "👏 CARCONECTIVITY STstarted (PID: ${CC_PID})"
wait "${CC_PID}"
exit_code=$?
color_echo "${BLUE}" "ℹ️ Process exited with code $exit_code"
exit "$exit_code"
