# Fireline

A complete, local wildfire-awareness and evacuation-preparedness demonstration built with Expo SDK 57, React Native, TypeScript, and Expo Router. One codebase runs in Expo Go on iOS and in a browser.

**Educational demonstration only. Not for emergency use.** All incidents, alerts, roads, zones, shelters, availability, distances, and routes are fictional. No emergency APIs, GPS, real notifications, authentication, or backend are used.

## Run it on your phone

**Live site:** https://darthdextroy.github.io/FireLine/

Fireline is published as an installable web app, so it runs on any phone without the App Store.

### iPhone (Safari)

1. Open **https://darthdextroy.github.io/FireLine/** in **Safari**.
2. Tap the **Share** button (square with an up arrow) in the bottom toolbar.
3. Scroll down and tap **Add to Home Screen**, then tap **Add**.
4. Open **Fireline** from your home screen. It launches full-screen like a native app, with no Safari address bar.

### Android (Chrome)

1. Open **https://darthdextroy.github.io/FireLine/** in **Chrome**.
2. Tap the **⋮** menu, then **Add to Home screen** (or **Install app**).
3. Open **Fireline** from your home screen.

Your checklist, saved location, and settings stay on your phone (browser storage).

## Run it locally

Requires Node 22.13 or newer.

```bash
npm install
npm run web
```

To try your local copy on a phone, connect the phone to the same Wi-Fi as your computer and open `http://<your-computer's-IP>:8081` in the phone's browser. You can also scan the QR code from `npm start` with the **Expo Go** app.

Other scripts: `npm test`, `npm run typecheck`, `npm run lint`.

## Deploying the website

Every push to `main` builds the web app and publishes it to GitHub Pages (`.github/workflows/deploy-web.yml`).

One-time setup: in the GitHub repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

To build the site yourself: `EXPO_BASE_URL=/FireLine npm run export:web` writes it to `dist/`.
