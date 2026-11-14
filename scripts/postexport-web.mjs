// Runs after `expo export --platform web`.
// 1. Rewrites the relative manifest/icon links in index.html to absolute ones
//    (with the base URL) so they still resolve on deep links like /wildfire/map.
// 2. Copies index.html to 404.html so static hosts (GitHub Pages) serve the
//    single-page app for every route.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = process.argv[2] || "dist";
const base = (process.env.EXPO_BASE_URL || "").replace(/\/$/, "");
const file = join(dist, "index.html");

let html = readFileSync(file, "utf8");
html = html.replace(
  /href="(manifest\.json|favicon\.png|apple-touch-icon\.png)"/g,
  (_, name) => `href="${base}/${name}"`,
);
writeFileSync(file, html);
writeFileSync(join(dist, "404.html"), html);

const manifestPath = join(dist, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.start_url = `${base}/`;
manifest.scope = `${base}/`;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`PWA post-export done (base URL: "${base || "/"}")`);
