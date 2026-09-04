/**
 * [INPUT]: Uses node:test/assert and the framework-independent locale module
 * [OUTPUT]: Verifies default/prefixed locale sets and path preservation
 * [POS]: Unit gate for every locale decision used by routes, metadata, and navigation
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LOCALE,
  PREFIXED_LOCALES,
  isLocale,
  localizedPath,
  stripLocale,
} from "./locale.ts";

test("defines English as the only unprefixed locale", () => {
  assert.equal(DEFAULT_LOCALE, "en");
  assert.deepEqual(PREFIXED_LOCALES, ["zh-CN", "ja", "fr", "es"]);
  assert.equal(isLocale("zh-CN"), true);
  assert.equal(isLocale("zh-TW"), false);
});

test("adds and replaces non-English prefixes while preserving query and hash", () => {
  assert.equal(stripLocale("/fr/features/apps/?mode=full#install"), "/features/apps/?mode=full#install");
  assert.equal(localizedPath("ja", "/fr/features/apps/?mode=full#install"), "/ja/features/apps/?mode=full#install");
  assert.equal(localizedPath("zh-CN", "/en/changelog/"), "/zh-CN/changelog/");
});

test("maps English to the logical path without a locale prefix", () => {
  assert.equal(localizedPath("en", "/"), "/");
  assert.equal(localizedPath("en", "/fr/features/apps/?mode=full#install"), "/features/apps/?mode=full#install");
  assert.equal(stripLocale("/%E0%A4%A/"), "/%E0%A4%A/");
});
