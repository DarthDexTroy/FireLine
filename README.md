# Fireline

A complete, local wildfire-awareness and evacuation-preparedness demonstration built with Expo SDK 57, React Native, TypeScript, and Expo Router. One codebase runs in Expo Go on iOS and in a browser.

**Educational demonstration only. Not for emergency use.** All incidents, alerts, roads, zones, shelters, availability, distances, and routes are fictional. No emergency APIs, GPS, real notifications, authentication, or backend are used.

## Install and run

Use Node **22.13+ (Node 24 LTS recommended)**. Older Node versions can fail with this Expo SDK. Dependencies are pinned by `package-lock.json`.

```sh
npm install
npx expo start
```

### Web

```sh
npx expo start --web
```

Open the local URL printed in the terminal (normally http://localhost:8081). Desktop browsers show a centered interface up to 430px wide. Mobile browsers fill the available width.

### iOS Simulator with Expo Go

Install Xcode, finish its first-run setup, and install an iOS Simulator runtime from Xcode settings. Select a recent iPhone in Simulator / Device Hub and run:

```sh
npx expo start --ios
```

Expo installs/opens its compatible Expo Go simulator client. Dismiss Expo Go's first-run developer tutorial to see Fireline. No custom native build or Apple developer account is required.

This project uses **SDK 57** to target the Expo Go version supported at implementation time. Use a matching Expo Go client; if Expo Go reports an SDK mismatch, see https://expo.dev/go. Do not upgrade individual native modules independently; use `npx expo install --fix` when upgrading the SDK as a unit.

### Physical iPhone

Install an Expo Go version supporting SDK 57, connect the computer and phone to the same Wi-Fi, run `npx expo start`, and scan the terminal QR code using the iPhone camera. Physical-device testing has not been performed. The dev server must remain running.

### Offline demonstrations

Install dependencies and Expo Go ahead of the presentation. All application content and map artwork are local; no internet service is needed at runtime. Start Metro without online checks:

```sh
npx expo start --offline
```

For a phone, a local network connection to Metro is still required. This is not a standalone installed binary or an offline service-worker PWA. A production web bundle can be generated with `npm run export:web` and served by any local static server configured to fall back to `index.html` for deep links.

## Three presentation flows

1. **Review updates:** Home → Live Updates → Refresh Updates → View Details → Back to Updates → Home. Refresh waits about one second and changes the local refresh timestamp. iOS also supports pull-to-refresh. Incident timestamps remain fixed scenario values.
2. **Explore the map:** Home → Wildfire Nearby → View Map. Drag to pan, use zoom or direction controls, select the fire marker, and open View Alert. The Map tab provides a shortcut. Shelter, home, and road-closure markers also open details.
3. **Prepare a household:** Prepare → Start Preparing → select multiple documents → Essentials → Pets → Next Steps → Find Nearby Shelters → combine Pet Friendly / Available / Closest → Oak Valley High School → View Directions → Save Selected Shelter → Save Evacuation Plan → Return Home. Reload and confirm progress remains.

The Home screen's Prepare card and Continue Preparing button open the checklist directly. The four bottom tabs follow the supplied prototype: Home, Map, Prepare, and Shelters. Settings and Notifications are available in the Home header.

## Features and behavior

- 14 independent checklist items in three categories; animated progress derived from completion.
- Four demonstration shelters, including an unavailable shelter to demonstrate availability filtering. Limited-capacity shelters remain available. Filters combine; Closest sorts numerically.
- Interactive local SVG map on both platforms. Dragging, zoom, accessible pan controls, zones, selectable markers, and mock route overlays work without external map tiles or API keys.
- AsyncStorage persists checklist, location, selected shelter, notification read/clear state, preferences, and the saved plan.
- Save Plan creates a snapshot of checklist, destination, origin, mock route, and last-edited time. The save confirmation appears only after storage succeeds. Later checklist edits are indicated as changes to the plan.
- Local notification preferences filter the notification center; the full Updates feed remains available. Critical items require both Critical Alerts and their topic preference. Clearing notifications persists until Reset Demo Data.
- Changing location personalizes labels and notifications. The underlying map and distances deliberately remain the same fictional scenario, as explained on the location screen.
- Settings → Reset Demo Data requires an in-app confirmation and restores all defaults.
- Invalid IDs, missing destinations, empty results, and storage errors have recovery UI.
- No “fully prepared” claim for an incomplete checklist.

## Visual reference

The user-supplied 25-page `Alert Details.pdf` informed the burnt-orange actions, pale warning panels, white cards, four-tab navigation, and checklist/shelter/alert hierarchy. The app retains the Oak Valley sample data requested in the implementation brief. Official-source and verified-emergency claims from the reference were replaced with explicit simulation labels. Maps are functional local illustrations rather than satellite imagery. The source PDF is not required to run the app.

## Project structure

```text
src/app/              Expo Router screens and shared layout
src/components/       Reusable controls and interactive map
src/context/          Hydration, serialized persistence, and shared state
src/data/demo.ts      Typed local incidents, shelters, checklist, preferences
src/lib/state.ts      Reducer, validated hydration, filters, notification logic
src/styles/          Theme and shared StyleSheet definitions
tests/state.test.ts   State, persistence, filtering, corruption, and reset tests
tests/browser/        End-to-end presentation and recovery tests
```

## Verification

```sh
npm run typecheck
npm run lint
npm test
npx playwright install chromium webkit
npm run test:e2e
npx expo export --platform web --platform ios
```

Verified during implementation:

- TypeScript check and ESLint.
- 8 state tests.
- 10 browser checks (5 scenarios each in Chromium and WebKit): updates/refresh, map, preparation/shelter/plan persistence, notifications/settings/reset, invalid-link recovery.
- Web and iOS production bundle exports.
- Expo Go launch on an iPhone 17 Pro simulator (iOS 26.4.1), native navigation, two independent checkbox selections and progress, map zoom controls and wildfire marker details.

Native testing is a smoke test, not an exhaustive device matrix. Physical iPhone, Microsoft Edge, and a full VoiceOver audit have not been tested separately. Chromium and WebKit tests cover the shared browser code paths; WebKit is not a claim of testing the installed Safari application.
