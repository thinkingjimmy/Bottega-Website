/**
 * [INPUT]: Uses next/link, the feature catalog, the FeatureMenu client shell, and the shared AppIcon/Stroke/glyph primitives
 * [OUTPUT]: Exports the SiteHeader component with persistent feature discovery
 * [POS]: The single navigation header shared by the shrinking home stage and framed subpages
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import Link from "next/link";

import { FEATURES } from "./features/catalog";
import { FeatureMenu } from "./features/feature-menu";
import { AppIcon, Stroke, glyph } from "./icons";

const REPO = "https://github.com/thinkingjimmy/Bottega";

/**
 * stage  —— 住在首屏上缘让出来的那条带子里：高度、透明度、内缩都跟收缩进度走
 * framed —— 子页没有那台钉住的桌面，于是定高、下缘一条发丝线
 *
 * 两处导航内容完全一致。「当前页那条要不要藏起来」是个特殊情况，而它换来的
 * 只是少一条链接——不值得让这个组件多一个分支。
 */
export function SiteHeader({ variant }: { variant: "stage" | "framed" }) {
  return (
    <header className={`site-header site-header--${variant}`}>
      <Link className="site-header-brand" href="/">
        {/* 28 是 AppIcon 自己的默认值，也正是产品里图标槽的那一档。
            alt 留空：紧挨着的那行字已经把名字说了。 */}
        <AppIcon size={28} alt="" />
        Bottega
      </Link>
      <nav>
        {/* 这一层是客户端的，只为了「点空白处收起」与 Esc；里面的四条仍是
            服务端渲染的，catalog 不进客户端包。 */}
        <FeatureMenu>
          <summary className="nav-trigger">
            <span>Features</span>
            <Stroke d={glyph("chevronDown")} size={14} width={1.8} />
          </summary>
          {/* 面板里落的是裸描边，不是 FeatureIcon：那只带框的图标片是 feature
              详情页侧栏的身份，这条带子上的菜单跟产品自己那只菜单同一套语汇，
              而那里的行不画框。共用一个组件只会让两边各让一步。 */}
          <div className="nav-menu-panel">
            <ul>
              {FEATURES.map((feature) => (
                <li key={feature.slug}>
                  <Link href={`/features/${feature.slug}/`}>
                    <Stroke d={glyph(feature.icon)} size={18} width={1.8} />
                    <span>
                      <strong>{feature.label}</strong>
                      <small>{feature.menuCopy}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FeatureMenu>
        <Link className="nav-link" href="/changelog/">
          Changelog
        </Link>
        <a className="nav-link" href={REPO} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <span className="nav-rule" aria-hidden="true" />
        <a
          aria-label="Download for macOS"
          className="btn-primary nav-cta"
          href={`${REPO}/releases`}
        >
          <span className="nav-cta-long">Download for macOS</span>
          <span className="nav-cta-short">Download</span>
        </a>
      </nav>
    </header>
  );
}
