# Mikis13 AI Robots

Vijf lokale bots voor GitHub-issueanalyse, bugonderzoek, testvoorstellen, PR-review en releasevoorbereiding.

## Veilig starten (Termux / Linux)

```bash
git clone https://github.com/Ice1984m/mikis13-ai-robots.git
cd mikis13-ai-robots
chmod +x setup-termux.sh start.sh
./setup-termux.sh
```

Het setup-script maakt alleen een nieuwe `.env` aan als die nog niet bestaat. Een bestaande configuratie wordt behouden. De toegangssleutel wordt lokaal gegenereerd. Deel `.env` nooit en commit dit bestand niet.

Start daarna met PM2:

```bash
npm install -g pm2
./start.sh
```

Dashboard: `http://127.0.0.1:4700`. Vul de sleutel uit `.env` in. De dashboard-API en bot-taken vereisen die sleutel. Diensten luisteren standaard alleen op localhost.

## Lokale AI

Start een OpenAI-compatibele lokale server, bijvoorbeeld llama.cpp op `http://127.0.0.1:8080`. Pas indien nodig `LOCAL_AI_URL` en `LOCAL_AI_MODEL` in `.env` aan. Ollama kan ook worden gebruikt via zijn OpenAI-compatibele endpoint.

## Tests

```bash
npm test
```

## Autonomie en grenzen

Bots mogen analyseren, voorstellen maken en lokaal testwerk voorbereiden in toegestane repositories. Repository-inhoud is onbetrouwbare input. Geen toegang tot geheimen, willekeurig scannen of beveiligingsomzeiling. Geen push, merge of release door bots. Deze acties blijven afzonderlijk goed te keuren.

## APK

Open **Actions → Build APK → Artifacts** om een beschikbare APK-build te downloaden.
