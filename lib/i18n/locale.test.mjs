/**
 * [INPUT]: Uses node:test/assert and the framework-independent locale module
 * [OUTPUT]: Verifies preference resolution, language-tag safety, and path preservation
 * [POS]: Unit gate for every locale decision used by routes and browser navigation
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import assert from "node:assert/strict";
import test from "node:test";
import {
  isLocale,
  localeFromPath,
  localizedPath,
  readLanguagePreference,
  resolveLocale,
  stripLocale,
} from "./locale.ts";

test("validates locales and normalizes stored preferences", () => {
  assert.equal(isLocale("zh-CN"), true);
  assert.equal(isLocale("zh-TW"), false);
  assert.equal(readLanguagePreference("fr"), "fr");
  assert.equal(readLanguagePreference("broken"), "auto");
  assert.equal(readLanguagePreference(null), "auto");
});

test("explicit preference wins and Auto follows browser priority", () => {
  assert.equal(resolveLocale("es", ["ja", "en"]), "es");
  assert.equal(resolveLocale("auto", ["de-DE", "fr-FR", "ja-JP"]), "fr");
  assert.equal(resolveLocale("auto", ["ja-JP", "fr-FR"]), "ja");
});

test("maps Hans Chinese without misclassifying Hant Chinese", () => {
  assert.equal(resolveLocale("auto", ["zh-Hans-SG"]), "zh-CN");
  assert.equal(resolveLocale("auto", ["zh-CN"]), "zh-CN");
  assert.equal(resolveLocale("auto", ["zh-Hant-TW", "ja-JP"]), "ja");
  assert.equal(resolveLocale("auto", ["zh-TW"]), "en");
});

test("invalid and unsupported tags fall back to English", () => {
  assert.equal(resolveLocale("auto", ["not_a_locale", "ar"]), "en");
  assert.equal(resolveLocale("auto", []), "en");
});

test("adds and replaces path prefixes while preserving query and hash", () => {
  assert.equal(stripLocale("/fr/features/apps/?mode=full#install"), "/features/apps/?mode=full#install");
  assert.equal(localizedPath("ja", "/fr/features/apps/?mode=full#install"), "/ja/features/apps/?mode=full#install");
  assert.equal(localizedPath("en", "/"), "/en/");
  assert.equal(localeFromPath("/zh-CN/changelog/"), "zh-CN");
  assert.equal(localeFromPath("/%E0%A4%A/"), null);
});
