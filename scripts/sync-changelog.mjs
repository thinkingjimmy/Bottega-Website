/**
 * [INPUT]: 依赖 node:fs/node:path；可选读取 ../Bottega/docs/changelog/README.md
 * [OUTPUT]: 覆盖写入 content/changelog.md
 * [POS]: Bottega-Website 的构建前置。站点必须能独立 clone、独立构建，
 *        所以 changelog 在仓库里是一份快照；这个脚本负责在开发环境
 *        （本仓库作为 Bottega-Dev 的 submodule 时）把快照拉齐
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
/* 同为 Bottega-Dev/public 下的兄弟目录时才存在；Vercel 上必然缺席。 */
const source = join(root, "..", "Bottega", "docs", "changelog", "README.md");
const target = join(root, "content", "changelog.md");
const optional = process.argv.includes("--if-present");

if (!existsSync(source)) {
  const message = `changelog source not found: ${source}`;
  /* 构建时缺席是正常的（独立 clone），故只在显式调用时才算失败。 */
  if (optional) {
    console.log(`sync-changelog: ${message} — keeping the committed snapshot`);
    process.exit(0);
  }
  console.error(`sync-changelog: ${message}`);
  process.exit(1);
}

copyFileSync(source, target);
console.log(`sync-changelog: ${source} -> ${target}`);
