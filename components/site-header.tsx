/**
 * [INPUT]: Uses next/link for the home and changelog routes
 * [OUTPUT]: Exports the SiteHeader component
 * [POS]: The single navigation header shared by the shrinking home stage and framed subpages
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import Link from "next/link";

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
        Bottega
      </Link>
      <nav>
        <Link className="nav-link" href="/changelog/">
          Changelog
        </Link>
        <a className="nav-link" href={REPO}>
          GitHub
        </a>
        <span className="nav-rule" aria-hidden="true" />
        {/* 标签不拆。拆成 "Download" + " for macOS" 是为了给窄屏省地方，
            可 390 上整句连按钮一起也只占 169px，省下来的地方没人要——
            换来的却是一个特殊情况，和一个 flex 容器吃掉行首空格的坑。 */}
        <a className="btn-primary nav-cta" href={`${REPO}/releases`}>
          Download for macOS
        </a>
      </nav>
    </header>
  );
}
