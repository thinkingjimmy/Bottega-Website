/**
 * [INPUT]: Has no runtime dependencies
 * [OUTPUT]: Exports REPO, PLATFORMS/PlatformId, the RELEASE snapshot, and the URL builders every download uses
 * [POS]: The site's single source of truth for the public repository and the currently downloadable build
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

export const REPO = "https://github.com/thinkingjimmy/Bottega";

/* 顺序即菜单顺序：本机平台被那颗主按钮领走，其余两个留在面板里。 */
export const PLATFORMS = ["mac", "windows", "linux"] as const;
export type PlatformId = (typeof PLATFORMS)[number];

/* ── 一份快照，不是一次猜测 ────────────────────────────────────
 * 资产名带版本号（Bottega-0.1.3-arm64.dmg），于是 GitHub 那条
 * /releases/latest/download/<name> 短链在这里用不上——它要求文件名恒定。
 * 站点只好自己记住：版本号，与三个确实挂在那个 Release 上的文件名。
 *
 * 这份快照由 scripts/sync-release.mjs 从 Releases API 抄回来，逐个校验资产
 * 存在后才落盘；构建期一次网络请求都不发。于是「链接会不会 404」这件事
 * 只在同步那一刻被回答一次，而不是每个访客各自撞一次运气。
 * ────────────────────────────────────────────────────────── */
export const RELEASE = {
  version: "0.1.3",
  assets: {
    mac: "Bottega-0.1.3-arm64.dmg",
    windows: "Bottega-0.1.3-windows-x64.exe",
    linux: "Bottega-0.1.3-linux-x86_64.AppImage",
  },
} satisfies { version: string; assets: Record<PlatformId, string> };

/** 归档：更早的版本、校验和、完整发布说明都在这里，不在那颗按钮上。 */
export const RELEASES_URL = `${REPO}/releases`;

export function downloadUrl(platform: PlatformId) {
  return `${RELEASES_URL}/download/v${RELEASE.version}/${RELEASE.assets[platform]}`;
}
