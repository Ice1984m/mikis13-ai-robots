#!/data/data/com.termux/files/usr/bin/bash
cd "$HOME/mikis13-ai-robots"; termux-wake-lock 2>/dev/null||true; pm2 start ecosystem.config.cjs --update-env; pm2 save; termux-open-url http://127.0.0.1:4700 2>/dev/null||true
