/**
 * [INPUT]: Uses nullable release assets, the current release URL, localized download copy, Disclosure, and platform marks
 * [OUTPUT]: Exports DownloadButton with available installers and a release-page fallback for unpublished platforms
 * [POS]: The site's only download implementation; every other surface links to the release archive instead
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { Disclosure } from "./disclosure";
import { D, Glyph, Stroke, glyph } from "./icons";
import type { SiteCatalog } from "@/lib/i18n";
import { PLATFORMS, RELEASE, RELEASE_URL, downloadUrl, type PlatformId } from "@/lib/release";

const MARK: Record<PlatformId, string> = { mac: D.apple, windows: D.windows, linux: D.linux };

/**
 * Keep one primary action per detected platform so CSS never hides every action.
 * An unpublished platform opens the release notes instead of downloading another
 * platform's installer. The primary stays outside details so closing the menu
 * cannot hide it, including before hydration or when JavaScript is disabled.
 */
export function DownloadButton({
  copy,
  variant,
}: {
  copy: SiteCatalog["download"];
  variant: "nav";
}) {
  return (
    <div className={`download download--${variant}`} data-hover-group="">
      {PLATFORMS.map((platform) => {
        const url = downloadUrl(platform);
        return (
          <a className="download-action" data-for={platform} href={url ?? RELEASE_URL} key={platform}>
            <span className="download-long">{url ? copy.action[platform] : copy.viewRelease}</span>
            <span className="download-short">{url ? copy.short : copy.viewReleaseShort}</span>
            {url ? <Glyph d={MARK[platform]} size={15} /> : <Stroke d={glyph("arrowRight")} size={15} />}
          </a>
        );
      })}
      <Disclosure className="download-menu" hover>
        <summary className="download-caret" aria-label={copy.menuLabel}>
          <Stroke d={glyph("chevronDown")} size={14} width={1.8} />
        </summary>
        <div className="download-panel">
          <p className="download-version">
            {RELEASE.tag}{RELEASE.prerelease && <> · {copy.prerelease}</>}
          </p>
          <ul>
            {PLATFORMS.map((platform) => {
              const url = downloadUrl(platform);
              return url ? (
                <li key={platform}>
                  <a href={url}>
                    <Glyph d={MARK[platform]} size={17} />
                    <span>{copy.platforms[platform]}</span>
                  </a>
                </li>
              ) : null;
            })}
            <li>
              <a href={RELEASE_URL}>
                <Stroke d={glyph("info")} size={17} />
                <span>{copy.releaseNotes}</span>
              </a>
            </li>
          </ul>
        </div>
      </Disclosure>
    </div>
  );
}
