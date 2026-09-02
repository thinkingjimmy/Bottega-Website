/**
 * [INPUT]: Uses node:test/assert, five catalogs, and five static Changelog snapshots
 * [OUTPUT]: Verifies runtime catalog shape, non-empty copy, placeholders, and Changelog parity
 * [POS]: Content-integrity gate complementing compile-time CatalogShape enforcement
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { en } from "./catalogs/en.ts";
import { es } from "./catalogs/es.ts";
import { fr } from "./catalogs/fr.ts";
import { ja } from "./catalogs/ja.ts";
import { zhCN } from "./catalogs/zh-cn.ts";

const catalogs = { en, "zh-CN": zhCN, ja, fr, es };

function inspect(value, path = "root", output = []) {
  if (typeof value === "string") {
    assert.notEqual(value.trim(), "", `${path} must not be empty`);
    output.push({ path, type: "string", placeholders: [...value.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]).sort() });
    return output;
  }
  assert.ok(value && typeof value === "object", `${path} must be an object, array, or string`);
  output.push({ path, type: Array.isArray(value) ? "array" : "object", keys: Object.keys(value) });
  for (const [key, child] of Object.entries(value)) inspect(child, `${path}.${key}`, output);
  return output;
}

test("all catalogs are non-empty and structurally identical", () => {
  const baseline = inspect(en);
  for (const [locale, catalog] of Object.entries(catalogs)) {
    assert.deepEqual(inspect(catalog), baseline, `${locale} catalog diverges from English`);
  }
});

function changelogShape(locale) {
  const raw = readFileSync(new URL(`../../content/changelog.${locale}.md`, import.meta.url), "utf8");
  return [...raw.matchAll(/^##\s+(.+)$/gm)].map((match, index, heads) => {
    const start = match.index + match[0].length;
    const end = heads[index + 1]?.index ?? raw.length;
    const dateTokens = match[1].match(/\d{4}-\d{2}-\d{2}/g) ?? [];
    const itemCount = (raw.slice(start, end).match(/^[-*]\s+/gm) ?? []).length;
    return { dateTokens, itemCount };
  });
}

test("all Changelog snapshots preserve dates, order, and item counts", () => {
  const baseline = changelogShape("en");
  for (const locale of Object.keys(catalogs)) {
    assert.deepEqual(changelogShape(locale), baseline, `${locale} Changelog diverges from English`);
  }
});
