#!/data/data/com.termux/files/usr/bin/bash
set -eu
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo "Node.js ontbreekt. Installeer eerst Node.js in Termux."; exit 1; }
if [ ! -f .env ]; then
  umask 077
  TOKEN="$(node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))")"
  cat > .env <<EOF
MIKIS_ACCESS_TOKEN=$TOKEN
LOCAL_AI_URL=http://127.0.0.1:8080
LOCAL_AI_MODEL=local-model
DASHBOARD_PORT=4700
EOF
  chmod 600 .env
  echo "Nieuwe lokale toegangssleutel aangemaakt in .env."
else
  echo "Bestaande .env behouden; niets overschreven."
fi
npm install
npm test
echo "Setup klaar. Installeer PM2 indien nodig met: npm install -g pm2"
