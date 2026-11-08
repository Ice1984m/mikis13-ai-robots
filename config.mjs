import fs from 'node:fs';
import path from 'node:path';

export function loadEnvFile(file = path.resolve('.env'), target = process.env) {
  if (!fs.existsSync(file)) return false;
  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const normalized = line.startsWith('export ') ? line.slice(7) : line;
    const separator = normalized.indexOf('=');
    if (separator < 1) continue;
    const key = normalized.slice(0, separator).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) || target[key] !== undefined) continue;
    let value = normalized.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    target[key] = value;
  }
  return true;
}

export function getConfig(env = process.env) {
  return {
    port: Number(env.BOT_PORT || 4701),
    id: Number(env.BOT_ID || 0),
    name: env.BOT_NAME || 'Mikis13 Bot',
    role: env.BOT_ROLE || 'Analyseer en stel veilige verbeteringen voor.',
    token: env.MIKIS_ACCESS_TOKEN || '',
    localAiUrl: (env.LOCAL_AI_URL || 'http://127.0.0.1:8080').replace(/\/+$/, ''),
    dashboardPort: Number(env.DASHBOARD_PORT || 4700)
  };
}
