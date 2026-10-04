/**
 * [INPUT]: Reads the verified build-time release.json snapshot written by sync-release.mjs
 * [OUTPUT]: Exports repository URLs, platform identities, RELEASE, and nullable installer URLs
 * [POS]: Shared release contract for downloads and structured data without runtime network requests
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */
import snapshot from "./release.json" with { type: "json" };

export const REPO = "https://github.com/thinkingjimmy/Bottega";
export const PLATFORMS = ["mac", "windows", "linux"] as const;
export type PlatformId = (typeof PLATFORMS)[number];

export const RELEASE: {
  version: string;
  tag: string;
  prerelease: boolean;
  assets: Record<PlatformId, string | null>;
} = snapshot;

export const RELEASES_URL = `${REPO}/releases`;
export const RELEASE_URL = `${RELEASES_URL}/tag/${RELEASE.tag}`;

export function downloadUrl(platform: PlatformId): string | null {
  const asset = RELEASE.assets[platform];
  return asset ? `${RELEASES_URL}/download/${RELEASE.tag}/${encodeURIComponent(asset)}` : null;
}
