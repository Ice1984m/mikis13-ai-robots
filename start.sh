#!/usr/bin/env bash
set -eu
cd "$HOME/mikis13-ai-robots"
[ -f .env ] || { echo "Geen .env. Voer eerst ./setup-termux.sh uit."; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo "PM2 ontbreekt. Installeer met: npm install -g pm2"; exit 1; }
npm test
termux-wake-lock 2>/dev/null || true
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save
termux-open-url http://127.0.0.1:4700 2>/dev/null || true
