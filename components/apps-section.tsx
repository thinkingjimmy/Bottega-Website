/**
 * [INPUT]: 依赖 @/lib/agents 的 APPS，依赖 ./reels/apps-reel 的 AppsReel
 * [OUTPUT]: 对外提供 AppsSection 组件
 * [POS]: Bottega-Website 讲 App 系统那一节。左图右文，与上一节的文左图右
 *        交替。上一节说的是「谁来干」，这一节说的是「干出来的东西住在哪」
 *        ——图里轮播的四张表面就是四个答案，限定语照抄目录，因为
 *        「能自定义成什么」这句话，只有具体到形状才有人信
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { APPS } from "@/lib/agents";
import { AppsReel } from "./reels/apps-reel";

export function AppsSection() {
  return (
    <section className="section" id="apps">
      <div className="wrap split split-figure-first">
        <AppsReel />

        <div>
          <h2 style={{ fontSize: 52, lineHeight: 1.04, maxWidth: "14ch", marginBottom: 22 }}>
            Fully customizable.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 18, maxWidth: "56ch" }}>
            An App is an installable Agent workflow with its own data boundary and its own surface — a
            canvas for the HTML an Agent wrote, a board for the work it planned, a ledger for what you told
            it.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 30, maxWidth: "56ch" }}>
            What each one may read, write and present is declared in its manifest — nothing more. Four ship
            with Bottega; the starter scaffolds and the zero-dependency GUI SDK are in the box, so the next
            one is yours.
          </p>

          {/* 尾巴上那句限定语照抄目录：`Base App` 与 `workspace-artifact App`
              是产品里两种真实的形状，不是营销上编出来的分类。 */}
          <ul className="app-list">
            {APPS.map((app) => (
              <li key={app.id}>
                <span className="app-list-icon" aria-hidden="true">
                  {app.icon}
                </span>
                <span className="app-list-name">{app.name}</span>
                <span className="mono app-list-shape">{app.shape}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
