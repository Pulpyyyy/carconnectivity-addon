#!/bin/sh
set -e

# Function to handle signals
term_handler() {
    echo "SIGTERM signal received, shutting down..."
    if [ -n "$child_pid" ] && kill -0 "$child_pid" 2>/dev/null; then
        kill -TERM "$child_pid"
        wait "$child_pid"
    fi
    exit 143 # 128 + 15 -- SIGTERM
}

# trap SIGTERM - sent when 'docker stop'
trap 'term_handler' TERM

echo ""
echo ""
echo ""
echo ">>>>>>>>> STARTING"
cd /tmp
tempio -conf /data/options.json -template carconnectivity.json.gtpl -out carconnectivity.json

if grep -q "debug" /data/options.json; then
    for file in versions.txt carconnectivity.json; do
        echo ">>>>>>>>> $(basename "$file")"
        cat "$file"
        echo "<<<<<<<<<<" 
    done
fi

/opt/venv/bin/carconnectivity carconnectivity.json &
child_pid=$!
echo ">>>>>>>>> STARTED"
wait "$child_pid"
