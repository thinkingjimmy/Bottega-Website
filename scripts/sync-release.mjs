/**
 * [INPUT]: Uses node:fs and the public GitHub Releases API for the Bottega repository
 * [OUTPUT]: Rewrites the version and three asset filenames in lib/release.ts once every asset answers a request
 * [POS]: Release-time preflight that repoints every download on the site at the newest published build
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = join(root, "lib", "release.ts");
const api = "https://api.github.com/repos/thinkingjimmy/Bottega/releases/latest";

/* 按扩展名认领，而不是按拼出来的文件名匹配。后者要求这里复述一遍
   electron-builder 的 artifactName——同一条命名规则于是有了第二个出生地，
   改一处必漏另一处。扩展名是 release.yml 自己校验的那份契约。 */
const claims = [
  ["mac", (name) => name.endsWith(".dmg")],
  ["windows", (name) => name.endsWith(".exe")],
  ["linux", (name) => name.endsWith(".AppImage")],
];

function fail(message) {
  console.error(`sync-release: ${message}`);
  process.exit(1);
}

const headers = { accept: "application/vnd.github+json", "user-agent": "bottega-website-sync-release" };
const response = await fetch(api, { headers });
if (!response.ok) fail(`${api} answered ${response.status}`);

const release = await response.json();
const tag = release.tag_name ?? "";
if (!/^v\d+\.\d+\.\d+$/.test(tag)) fail(`latest release is not a stable version tag: ${tag || "(none)"}`);
const version = tag.slice(1);

const assets = {};
for (const [platform, claims_] of claims) {
  const matched = (release.assets ?? []).filter((asset) => claims_(asset.name));
  /* 恰好一个。零个是漏发，两个是命名规则变了——两种都得当场红，
     而不是让站点挑一个看起来像的挂上去。 */
  if (matched.length !== 1) fail(`${tag} carries ${matched.length} ${platform} installers, expected exactly 1`);
  assets[platform] = matched[0];
}

/* API 说它在，不等于它下得动。三条 HEAD 是这个脚本存在的全部理由：
   之后写进快照的那三条链接，是刚刚有人替访客先按过一次的。 */
await Promise.all(
  Object.entries(assets).map(async ([platform, asset]) => {
    const probe = await fetch(asset.browser_download_url, { method: "HEAD", headers });
    if (!probe.ok) fail(`${platform} asset ${asset.name} answered ${probe.status}`);
  })
);

const before = readFileSync(manifest, "utf8");
const edits = [
  [/(\bversion:\s*")[^"]*(")/, version],
  ...claims.map(([platform]) => [new RegExp(`(\\b${platform}:\\s*")[^"]*(")`), assets[platform].name]),
];

let after = before;
for (const [pattern, value] of edits) {
  if (!pattern.test(after)) fail(`lib/release.ts no longer matches ${pattern}`);
  after = after.replace(pattern, `$1${value}$2`);
}
/* 版本号在注释里也出现过一次（那句解释短链为何用不上的例子）。它是说明，
   不是事实来源，但一份自相矛盾的文件读起来就不像真的了。 */
after = after.replace(/Bottega-\d+\.\d+\.\d+-arm64\.dmg/g, assets.mac.name);

if (after === before) {
  console.log(`sync-release: already at ${tag}`);
  process.exit(0);
}

writeFileSync(manifest, after);
console.log(`sync-release: ${tag}`);
for (const [platform] of claims) console.log(`  ${platform}  ${assets[platform].name}`);
