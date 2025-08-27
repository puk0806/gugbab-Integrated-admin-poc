 # #!/bin/bash
set -euo pipefail

echo '┏━━━━━━━━━━━━━━━━━┓'
echo '┃ Generate Schema ┃'
echo '┗━━━━━━━━━━━━━━━━━┛'

node scripts/generate-schema.js
