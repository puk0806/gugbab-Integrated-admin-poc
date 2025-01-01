#!/bin/sh
SCRIPT="$1"
BASE_PATH='.githooks/'
if command -v python3 >/dev/null 2>&1; then
    python3 "$BASE_PATH$SCRIPT.py" "$@"
elif command -v python >/dev/null 2>&1; then
    python "$BASE_PATH$SCRIPT.py" "$@"
else
    echo "Python is not installed."
    exit 1
fi
