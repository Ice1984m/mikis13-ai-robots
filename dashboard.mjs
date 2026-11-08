import express from 'express';
import { loadEnvFile, getConfig } from './config.mjs';
import { tokenMatches } from './security.mjs';

loadEnvFile();
const config = getConfig();
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));
app.use(express.static('public'));

const bots = [
  ['Issue Scout', 4701], ['Bug Solver', 4702], ['Test Engineer', 4703],
  ['PR Reviewer', 4704], ['Release Robot', 4705]
];

function requireDashboardToken(req, res, next) {
  if (!config.token) return res.status(503).json({ error: 'Dashboard niet geconfigureerd. Voer ./setup-termux.sh uit.' });
  if (!tokenMatches(req.get('x-mikis-token'), config.token)) return res.status(401).json({ error: 'Ongeldige toegangssleutel.' });
  next();
}

app.get('/api/status', requireDashboardToken, async (_req, res) => {
  const status = await Promise.all(bots.map(async ([name, port], index) => {
    try {
      return await (await fetch(`http://127.0.0.1:${port}/health`, { signal: AbortSignal.timeout(2500) })).json();
    } catch {
      return { id: index + 1, name, port, status: 'offline' };
    }
  }));
  res.json({ bots: status });
});

app.post('/api/task/:id', requireDashboardToken, async (req, res) => {
  const bot = bots[Number(req.params.id) - 1];
  if (!bot) return res.status(404).json({ error: 'Bot niet gevonden.' });
  const message = String(req.body?.message || '').trim();
  if (!message) return res.status(400).json({ error: 'Vul eerst een taak in.' });
  try {
    const response = await fetch(`http://127.0.0.1:${bot[1]}/task`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-mikis-token': config.token },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(185000)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(503).json({ error: 'Bot niet bereikbaar: ' + error.message });
  }
});

app.listen(config.dashboardPort, '127.0.0.1', () => console.log('Mikis13 dashboard op 127.0.0.1:' + config.dashboardPort));
