# Planning KPI Box

An offline-first learning app for production-planning KPIs. It uses a six-box Leitner system: correct answers advance a card through review intervals of **3, 7, 14, 30, 90, and 180 days**; an incorrect answer returns it to Box 1 for the following day.

## Features

- Explanation-first practice: read a short description and enter the KPI name or acronym.
- Expandable, detailed explanation after every answer.
- Daily-card limit, six-box progress dashboard, and due-date scheduling.
- Broad ASCM-aligned supply-chain and production-planning KPI dictionary with concise, paraphrased learning definitions.
- Include or exclude each dictionary KPI from learning without changing its box, due date, or history.
- Start with 10 selected KPIs; filter the dictionary by selection status, category, or Leitner box and bulk-select the filtered result.
- Create, edit, and delete custom KPI cards.
- JSON backup and restore for settings, progress, history, and custom cards.
- Local-only storage, installable PWA, responsive layout, and offline support.

## Run locally

The app is static and needs no build step. From this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Do not use `file://`, because browser modules and the service worker require HTTP.

Run the tests with Node.js 20 or newer:

```bash
npm test
```

## Publish with GitHub Pages

1. Create an empty GitHub repository, for example `planning-kpi-box`.
2. Commit and push this directory to its `main` branch.
3. Open **Settings > Pages** in GitHub.
4. Select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. Open the GitHub Pages URL. On Android, use Chrome's **Install app** or **Add to Home screen** command.

All application paths are relative, so the app works from a GitHub Pages repository subpath.

## Data and privacy

The app ships with concise, educational definitions adapted from ASCM terminology. They are not a replacement for the licensed dictionary. Review your organization's exact KPI formulas and governance rules before operational use.

Progress is saved in browser `localStorage` under `planning-kpi-box-v1` and never leaves the device. Use **Settings > Export backup** before clearing browser data or moving devices.

## Project structure

```text
index.html             app shell
css/app.css            responsive visual design
js/app.js              views and interactions
js/engine.js           six-box scheduling and answer checking
js/storage.js          local persistence and backup
data/kpis.json         built-in KPI cards
tests/                 unit tests
manifest.webmanifest   install metadata
sw.js                  offline cache
```

## License

MIT. See [LICENSE](LICENSE).
