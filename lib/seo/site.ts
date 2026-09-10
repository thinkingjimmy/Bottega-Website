/**
 * [INPUT]: Has no runtime dependencies
 * [OUTPUT]: Exports the production origin, default social image, and absolute URL builder
 * [POS]: Shared site identity for metadata, structured data, crawler routes, and export audits
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

export const SITE_URL = "https://www.getbottega.app";

export const SOCIAL_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}
