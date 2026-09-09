/**
 * [INPUT]: Uses the release manifest, localized download copy, Disclosure, and the three platform marks
 * [OUTPUT]: Exports DownloadButton, the split download control shared by the header and the Fork band
 * [POS]: The site's only download implementation; every other surface links to the release archive instead
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { Disclosure } from "./disclosure";
import { D, Glyph, Stroke, glyph } from "./icons";
import type { SiteCatalog } from "@/lib/i18n";
import { PLATFORMS, downloadUrl, type PlatformId } from "@/lib/release";

const MARK: Record<PlatformId, string> = { mac: D.apple, windows: D.windows, linux: D.linux };

/**
 * 拆分按钮：左边那半直接把安装包取回来，右边那颗小箭头才是菜单。
 * 主操作因此仍然是一次点击——把三个平台一律塞进下拉，等于让 95% 的人
 * 替另外 5% 多按一次。
 *
 * details 只包住箭头与面板，主链接是它的兄弟：<details> 会把 summary 之外的
 * 子节点全部收起来，那颗按钮一旦落进去就跟着菜单一起消失了。悬停区域于是
 * 由外面这层 [data-hover-group] 声明。
 */
export function DownloadButton({
  copy,
  variant,
}: {
  copy: SiteCatalog["download"];
  variant: "nav" | "band";
}) {
  const mark = variant === "nav" ? 15 : 17;
  return (
    <div className={`download download--${variant}`} data-hover-group="">
      {PLATFORMS.map((platform) => (
        <a className="download-action" data-for={platform} href={downloadUrl(platform)} key={platform}>
          <span className="download-long">{copy.action[platform]}</span>
          <span className="download-short">{copy.short}</span>
          <Glyph d={MARK[platform]} size={mark} />
        </a>
      ))}
      <Disclosure className="download-menu" hover>
        <summary className="download-caret" aria-label={copy.menuLabel}>
          <Stroke d={glyph("chevronDown")} size={14} width={1.8} />
        </summary>
        <div className="download-panel">
          <ul>
            {PLATFORMS.map((platform) => (
              <li key={platform}>
                <a href={downloadUrl(platform)}>
                  <Glyph d={MARK[platform]} size={17} />
                  <span>{copy.platforms[platform]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Disclosure>
    </div>
  );
}
