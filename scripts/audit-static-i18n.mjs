/**
 * [INPUT]: Uses the completed out/ static export and the known locale/logical route matrix
 * [OUTPUT]: Fails on missing pages, wrong lang/canonical/hreflang, weak metadata, unprefixed internal links, or key leaks
 * [POS]: Post-build static i18n audit for thirty canonical pages and six Auto fallback pages
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

function htmlFile(prefix, logicalPath) {
  const path = `${prefix}${logicalPath}`.replace(/^\//, "");
  return join(root, "out", path, "index.html");
}

function audit(file, locale, logicalPath, auto) {
  const html = readFileSync(file, "utf8");
  const canonical = `${origin}/${auto ? "en" : locale}${logicalPath}`.replace(/([^:]\/)\/+/, "$1");
  assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`), `${file}: html lang`);
  assert.match(html, /<title>[^<]+<\/title>/, `${file}: title`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${file}: description`);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${file}: canonical ${canonical}`);
  for (const alternate of ["x-default", ...locales]) {
    assert.ok(
      html.includes(`hreflang="${alternate}"`) || html.includes(`hrefLang="${alternate}"`),
      `${file}: missing hreflang ${alternate}`
    );
  }
  assert.doesNotMatch(html, /(?:catalog|translation)\.[a-z][\w.]+/i, `${file}: translation key leak`);
  const body = html.slice(html.indexOf("<body"));
  const hrefs = [...body.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
  const internal = hrefs.filter((href) => href === "/" || href.startsWith("/changelog/") || href.startsWith("/features/"));
  assert.deepEqual(internal, [logicalPath], `${file}: only the Auto language option may be unprefixed`);
}

for (const logicalPath of logicalPaths) {
  audit(htmlFile("", logicalPath), "en", logicalPath, true);
  for (const locale of locales) audit(htmlFile(`/${locale}`, logicalPath), locale, logicalPath, false);
}

console.log(`audit-static-i18n: ${logicalPaths.length * (locales.length + 1)} pages passed`);
