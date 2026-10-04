/**
 * [INPUT]: Uses the public GitHub release list and anonymous installer HEAD requests
 * [OUTPUT]: Atomically writes lib/release.json after validating the selected release's installers
 * [POS]: Explicit release synchronization, including published prereleases and partial platform coverage
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */
import { readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = join(root, "lib", "release.json");
const repository = "https://github.com/thinkingjimmy/Bottega";
const api = "https://api.github.com/repos/thinkingjimmy/Bottega/releases?per_page=100";
const headers = { accept: "application/vnd.github+json", "user-agent": "bottega-website-sync-release" };
const claims = [
  ["mac", ".dmg"],
  ["windows", ".exe"],
  ["linux", ".AppImage"],
];

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function compareVersions(left, right) {
  const a = left.tag_name.slice(1).split(".").map(Number);
  const b = right.tag_name.slice(1).split(".").map(Number);
  return b[0] - a[0] || b[1] - a[1] || b[2] - a[2];
}

async function synchronize() {
  const apiHeaders = process.env.GITHUB_TOKEN
    ? { ...headers, authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : headers;
  const response = await fetch(api, { headers: apiHeaders, signal: AbortSignal.timeout(30_000) });
  requireValue(response.ok, `release list answered ${response.status}`);
  const releases = await response.json();
  requireValue(Array.isArray(releases), "release list is not an array");
  const release = releases
    .filter((item) => item && !item.draft && item.published_at && /^v\d+\.\d+\.\d+$/.test(item.tag_name))
    .sort(compareVersions)[0];
  requireValue(release, "no published vX.Y.Z release found");
  requireValue(Array.isArray(release.assets), `${release.tag_name} has no asset list`);
  requireValue(typeof release.prerelease === "boolean", "release channel is missing");

  const snapshot = {
    version: release.tag_name.slice(1),
    tag: release.tag_name,
    prerelease: release.prerelease,
    assets: {},
  };
  const downloads = [];
  for (const [platform, extension] of claims) {
    const matches = release.assets.filter((asset) => typeof asset.name === "string" && asset.name.endsWith(extension));
    requireValue(matches.length <= 1, `${snapshot.tag} carries ${matches.length} ${platform} installers`);
    const asset = matches[0];
    snapshot.assets[platform] = asset?.name ?? null;
    if (!asset) continue;
    const expectedUrl = `${repository}/releases/download/${snapshot.tag}/${encodeURIComponent(asset.name)}`;
    requireValue(asset.browser_download_url === expectedUrl, `${platform} installer has an unexpected download URL`);
    requireValue(asset.state === "uploaded" && Number.isSafeInteger(asset.size) && asset.size > 0,
      `${platform} installer is not fully uploaded`);
    downloads.push({ platform, asset });
  }
  requireValue(downloads.length > 0, `${snapshot.tag} has no supported installers`);

  // Missing platforms are valid; every advertised installer must remain downloadable.
  await Promise.all(downloads.map(async ({ platform, asset }) => {
    const probe = await fetch(asset.browser_download_url, {
      method: "HEAD", headers, signal: AbortSignal.timeout(30_000),
    });
    requireValue(probe.ok, `${platform} installer answered ${probe.status}`);
    requireValue(Number(probe.headers.get("content-length")) === asset.size,
      `${platform} installer size disagrees with release metadata`);
  }));

  const after = `${JSON.stringify(snapshot, null, 2)}\n`;
  if (readFileSync(manifest, "utf8") === after) {
    console.log(`sync-release: already at ${snapshot.tag}`);
    return;
  }
  const temporary = `${manifest}.${process.pid}.tmp`;
  try {
    writeFileSync(temporary, after, { flag: "wx" });
    renameSync(temporary, manifest);
  } finally {
    rmSync(temporary, { force: true });
  }
  console.log(`sync-release: ${snapshot.tag}${snapshot.prerelease ? " (prerelease)" : ""}`);
  for (const [platform, name] of Object.entries(snapshot.assets)) console.log(`  ${platform}: ${name ?? "not published"}`);
}

try {
  await synchronize();
} catch (error) {
  console.error(`sync-release: ${error.message}`);
  process.exitCode = 1;
}
