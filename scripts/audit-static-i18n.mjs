/**
 * [INPUT]: Uses the completed out/ static export and the known locale/logical route matrix
 * [OUTPUT]: Fails on missing pages, wrong lang/canonical/hreflang, weak metadata, invalid English prefixes, sitemap drift, or key leaks
 * [POS]: Post-build static i18n audit for six unprefixed English and twenty-four prefixed pages
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const locales = ["en", "zh-CN", "ja", "fr", "es"];
const logicalPaths = ["/", "/changelog/", "/features/agents/", "/features/apps/", "/features/customizable/", "/features/base/"];
const origin = "https://bottega.app";

function localizedPath(locale, logicalPath) {
  return locale === "en" ? logicalPath : `/${locale}${logicalPath}`;
}

function htmlFile(locale, logicalPath) {
  const path = localizedPath(locale, logicalPath).replace(/^\//, "");
  return join(root, "out", path, "index.html");
}

function audit(file, locale, logicalPath) {
  const html = readFileSync(file, "utf8");
  const canonical = `${origin}${localizedPath(locale, logicalPath)}`;
  assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`), `${file}: html lang`);
  assert.match(html, /<title>[^<]+<\/title>/, `${file}: title`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${file}: description`);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${file}: canonical ${canonical}`);
  const alternateTags = html.match(/<link[^>]+rel=["']alternate["'][^>]*>/g) ?? [];
  for (const alternate of ["x-default", ...locales]) {
    const targetLocale = alternate === "x-default" ? "en" : alternate;
    const href = `${origin}${localizedPath(targetLocale, logicalPath)}`;
    const tag = alternateTags.find((candidate) =>
      candidate.includes(`hreflang="${alternate}"`) || candidate.includes(`hrefLang="${alternate}"`)
    );
    assert.ok(tag?.includes(`href="${href}"`), `${file}: hreflang ${alternate} -> ${href}`);
  }
  assert.doesNotMatch(html, /(?:catalog|translation)\.[a-z][\w.]+/i, `${file}: translation key leak`);
  assert.doesNotMatch(html, /href="\/en(?:\/|\")/, `${file}: English must stay unprefixed`);
  const body = html.slice(html.indexOf("<body"));
  const hrefs = [...body.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  const internal = hrefs.filter((href) => href === "/" || href.startsWith("/changelog/") || href.startsWith("/features/"));
  assert.ok(internal.length > 0, `${file}: missing the unprefixed English link`);
  if (locale !== "en") {
    assert.deepEqual(
      [...new Set(internal)],
      [logicalPath],
      `${file}: only the English language option may be unprefixed`
    );
  }
}

for (const logicalPath of logicalPaths) {
  for (const locale of locales) audit(htmlFile(locale, logicalPath), locale, logicalPath);
}

const sitemap = readFileSync(join(root, "out", "sitemap.xml"), "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedLocations = logicalPaths.flatMap((logicalPath) =>
  locales.map((locale) => `${origin}${localizedPath(locale, logicalPath)}`)
);
assert.equal(sitemapLocations.length, expectedLocations.length, "sitemap: canonical URL count");
assert.deepEqual(new Set(sitemapLocations), new Set(expectedLocations), "sitemap: canonical URL set");
assert.doesNotMatch(sitemap, /<loc>https:\/\/bottega\.app\/en(?:\/|<)/, "sitemap: English must stay unprefixed");

console.log(`audit-static-i18n: ${expectedLocations.length} pages passed`);
