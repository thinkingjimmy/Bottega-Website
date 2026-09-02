/**
 * [INPUT]: Uses node:fs/node:path and optional English/Chinese public Bottega Changelog sources
 * [OUTPUT]: Refreshes content/changelog.en.md and changelog.zh-CN.md while preserving three maintained translations
 * [POS]: Build preflight that keeps the website independently buildable from committed snapshots
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
/* 同为 Bottega-Dev/public 下的兄弟目录时才存在；Vercel 上必然缺席。 */
const optional = process.argv.includes("--if-present");
const pairs = [
  ["README.md", "changelog.en.md"],
  ["README.zh-CN.md", "changelog.zh-CN.md"],
];
const sourceRoot = join(root, "..", "Bottega", "docs", "changelog");

if (!pairs.every(([name]) => existsSync(join(sourceRoot, name)))) {
  const message = `changelog sources not found in: ${sourceRoot}`;
  /* 构建时缺席是正常的（独立 clone），故只在显式调用时才算失败。 */
  if (optional) {
    console.log(`sync-changelog: ${message} — keeping the committed snapshot`);
    process.exit(0);
  }
  console.error(`sync-changelog: ${message}`);
  process.exit(1);
}

for (const [sourceName, targetName] of pairs) {
  const source = join(sourceRoot, sourceName);
  const target = join(root, "content", targetName);
  copyFileSync(source, target);
  console.log(`sync-changelog: ${source} -> ${target}`);
}
