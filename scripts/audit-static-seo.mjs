/**
 * [INPUT]: Uses the completed static export, canonical site identity, and locale paths
 * [OUTPUT]: Fails on crawler, metadata, social image, structured data, sitemap alternate, or internal link regressions
 * [POS]: Post-build SEO gate over the actual HTML and assets delivered to crawlers
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { LOCALES, localizedPath, stripLocale } from "../lib/i18n/locale.ts";
import { SITE_URL, SOCIAL_IMAGE, absoluteUrl } from "../lib/seo/site.ts";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const output = process.argv[2] ? resolve(process.argv[2]) : root;
const read = (path) => readFileSync(join(output, path), "utf8");
const decode = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27);/g, (entity) => ({
  "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&#x27;": "'", "&lt;": "<", "&gt;": ">",
})[entity]);

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)]
    .map(([, key, , value]) => [key.toLowerCase(), decode(value)]));
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) => attributes(tag));
}

function fileFor(url) {
  const { pathname, origin } = new URL(url, SITE_URL);
  assert.equal(origin, SITE_URL, `unexpected site origin: ${url}`);
  return join(output, decodeURIComponent(pathname), extname(pathname) ? "" : "index.html");
}

const sitemap = read("sitemap.xml");
const entries = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map(([, entry]) => entry);
const locations = entries.map((entry) => decode(entry.match(/<loc>(.*?)<\/loc>/s)[1]));
assert.ok(locations.length > 0, "sitemap: no pages");
assert.equal(new Set(locations).size, locations.length, "sitemap: duplicate pages");
const knownPages = new Set(locations);
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const [index, url] of locations.entries()) {
  const html = readFileSync(fileFor(url), "utf8");
  const head = html.match(/<head>(.*?)<\/head>/s)?.[1];
  assert.ok(head, `${url}: missing static head`);
  const locale = tags(html, "html")[0]?.lang;
  assert.ok(LOCALES.includes(locale), `${url}: unsupported language`);
  const logicalPath = stripLocale(new URL(url).pathname);
  const titles = [...head.matchAll(/<title>(.*?)<\/title>/gs)];
  assert.equal(titles.length, 1, `${url}: expected one title`);
  const title = decode(titles[0][1]);
  const metaTags = tags(head, "meta");
  const meta = (key) => {
    const matches = metaTags.filter((tag) => (tag.name ?? tag.property) === key);
    assert.equal(matches.length, 1, `${url}: expected one ${key}`);
    assert.ok(matches[0].content?.trim(), `${url}: empty ${key}`);
    return matches[0].content;
  };
  const description = meta("description");
  assert.ok(title.includes("Bottega"), `${url}: missing brand in title`);
  for (const [value, seen, field] of [[title, seenTitles, "title"], [description, seenDescriptions, "description"]]) {
    const key = `${locale}:${value}`;
    assert.ok(!seen.has(key), `${url}: duplicate ${field} from ${seen.get(key)}`);
    seen.set(key, url);
  }
  const canonicals = tags(head, "link").filter((tag) => tag.rel === "canonical");
  assert.equal(canonicals.length, 1, `${url}: expected one canonical`);
  assert.equal(canonicals[0].href, url, `${url}: canonical disagrees with sitemap`);
  assert.equal(meta("og:url"), url, `${url}: Open Graph URL`);
  assert.equal(meta("og:title"), title, `${url}: Open Graph title`);
  assert.equal(meta("twitter:title"), title, `${url}: Twitter title`);
  assert.equal(meta("og:description"), description, `${url}: Open Graph description`);
  assert.equal(meta("twitter:description"), description, `${url}: Twitter description`);
  assert.equal(meta("twitter:card"), "summary_large_image", `${url}: Twitter card`);
  assert.match(meta("robots"), /\bindex\b.*\bfollow\b/, `${url}: index/follow`);
  assert.doesNotMatch(meta("robots"), /noindex|nofollow|none/, `${url}: indexing blocked`);
  assert.doesNotMatch(meta("googlebot"), /noindex|nofollow|noimageindex|none/, `${url}: Google indexing blocked`);
  assert.match(meta("googlebot"), /max-image-preview:large/, `${url}: large image previews`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${url}: expected one primary heading`);

  const image = meta("og:image");
  assert.ok(image.startsWith(`${SITE_URL}/`), `${url}: social image must use an absolute production URL`);
  assert.equal(meta("twitter:image"), image, `${url}: social image parity`);
  assert.ok(Number(meta("og:image:width")) > 0, `${url}: image width`);
  assert.ok(Number(meta("og:image:height")) > 0, `${url}: image height`);
  assert.equal(meta("twitter:image:alt"), meta("og:image:alt"), `${url}: image alt parity`);
  assert.ok(statSync(fileFor(image)).size > 0, `${url}: empty social image`);

  const alternates = tags(head, "link").filter((tag) => tag.rel === "alternate" && tag.hreflang);
  const sitemapAlternates = tags(entries[index], "xhtml:link");
  for (const candidates of [alternates, sitemapAlternates]) {
    assert.equal(candidates.length, LOCALES.length + 1, `${url}: alternate count`);
    for (const target of ["x-default", ...LOCALES]) {
      const alternate = candidates.filter((tag) => tag.hreflang === target);
      assert.equal(alternate.length, 1, `${url}: alternate ${target}`);
      const expected = absoluteUrl(localizedPath(target === "x-default" ? "en" : target, logicalPath));
      assert.equal(alternate[0].href, expected, `${url}: alternate ${target} URL`);
      assert.ok(knownPages.has(expected), `${url}: alternate absent from sitemap`);
    }
  }

  const scripts = [...html.matchAll(/<script\b([^>]*)>(.*?)<\/script>/gs)]
    .filter(([, attributesText]) => attributes(attributesText).type === "application/ld+json");
  assert.equal(scripts.length, 1, `${url}: expected one JSON-LD graph`);
  const data = JSON.parse(scripts[0][2]);
  assert.equal(data["@context"], "https://schema.org", `${url}: JSON-LD context`);
  const entity = (type) => {
    const matches = data["@graph"].filter((item) => item["@type"] === type);
    assert.equal(matches.length, 1, `${url}: expected one ${type}`);
    return matches[0];
  };
  const webpage = entity("WebPage");
  assert.equal(webpage.url, url, `${url}: structured page URL`);
  assert.equal(webpage.name, title, `${url}: structured title`);
  assert.equal(webpage.description, description, `${url}: structured description`);
  assert.equal(webpage.inLanguage, locale, `${url}: structured language`);
  assert.equal(webpage.isPartOf["@id"], entity("WebSite")["@id"], `${url}: website identity`);
  if (logicalPath === "/") {
    const software = entity("SoftwareApplication");
    assert.equal(software.url, url, `${url}: application URL`);
    assert.equal(software.description, description, `${url}: application description`);
    assert.equal(software["@id"], webpage.mainEntity["@id"], `${url}: main application`);
    assert.deepEqual(software.operatingSystem, ["macOS", "Windows", "Linux"], `${url}: platforms`);
    assert.equal(software.offers.price, 0, `${url}: application price`);
  } else {
    const breadcrumb = entity("BreadcrumbList");
    assert.equal(webpage.breadcrumb["@id"], breadcrumb["@id"], `${url}: breadcrumb identity`);
    assert.deepEqual(breadcrumb.itemListElement.map((item) => [item.position, item.item]), [
      [1, absoluteUrl(localizedPath(locale, "/"))], [2, url],
    ], `${url}: breadcrumbs must lead to real localized pages`);
  }

  for (const { href } of tags(html, "a")) {
    if (!href) continue;
    const target = new URL(href, url);
    if (target.origin !== SITE_URL) continue;
    assert.ok(statSync(fileFor(target.href)).isFile(), `${url}: broken internal link ${href}`);
  }
}

const robots = read("robots.txt");
assert.match(robots, /^User-Agent: \*$/m, "robots: default crawler policy");
assert.match(robots, /^Allow: \/$/m, "robots: public pages allowed");
assert.doesNotMatch(robots, /^Disallow:\s*\S/m, "robots: public content must remain crawlable");
assert.ok(robots.includes(`Sitemap: ${absoluteUrl("/sitemap.xml")}`), "robots: canonical sitemap");

const preview = readFileSync(fileFor(SOCIAL_IMAGE.url));
assert.equal(preview.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "social image: PNG signature");
assert.equal(preview.readUInt32BE(16), SOCIAL_IMAGE.width, "social image: width");
assert.equal(preview.readUInt32BE(20), SOCIAL_IMAGE.height, "social image: height");
const notFound = read("404.html");
assert.ok(tags(notFound, "meta").some((tag) => tag.name === "robots" && tag.content.includes("noindex")), "404: must not be indexed");

console.log(`audit-static-seo: ${locations.length} pages, crawler policy, social assets, structured data, and internal links passed`);
