/**
 * [INPUT]: Uses FeatureLink and the localized Locale/FeatureSlug contracts
 * [OUTPUT]: Exports Story (numbered copy beside a figure card, with an optional exit link), FigureCard (standard or tall), Cases (optionally tagged) (the case list that drives a figure), and CaseList (the same list when nothing drives)
 * [POS]: Layout vocabulary shared by every home section; sections decide the words, figures decide the picture
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { ReactNode } from "react";
import { FeatureLink } from "../features/feature-link";
import type { FeatureSlug } from "../features/catalog";
import type { Locale } from "@/lib/i18n/locale";

/* ── 一张画框 ─────────────────────────────────────────────────────
 * 首页每一张图都坐在它里面：底是首屏那张壁纸（stories.css）。取景位置
 * 一张图一个，六张图才不像同一张贴纸。图是装饰，正文才是论证——所以
 * 整张图退出无障碍树。
 * 画框跟着旁边那栏字长高（带案例清单的那两节比别的高一截）。会长高的
 * 机器（Base 的 reel、Apps 的舞台）用 fill 铺满画框，多出来的高度是机器
 * 多露出的一截；两张静态图定在 580×360，钉在画框正中。 */
export function FigureCard({ position, fill = false, tall = false, children }: { position?: string; fill?: boolean; tall?: boolean; children: ReactNode }) {
  return (
    <div className={tall ? "figure-card figure-card--tall" : "figure-card"} style={position ? { "--wall-pos": position } as React.CSSProperties : undefined} aria-hidden="true">
      <div className={fill ? "figure-fill" : "figure-stage"}>{children}</div>
    </div>
  );
}

export function Story({
  number,
  eyebrow,
  title,
  body,
  slug,
  locale,
  readMore,
  figureFirst = false,
  children,
  figure,
}: {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  /* 没有专页的故事不给出口：宁可少一个链接，也不编一条路由。 */
  slug?: FeatureSlug;
  locale: Locale;
  readMore: string;
  figureFirst?: boolean;
  /* 正文与出口之间的那份案例清单，有就放这里。 */
  children?: ReactNode;
  figure: ReactNode;
}) {
  const copy = (
    <div className="story-copy">
      <p className="eyebrow eyebrow--num">
        {number} / {eyebrow}
      </p>
      <h3>{title}</h3>
      <p>{body}</p>
      {children}
      {slug ? <FeatureLink slug={slug} locale={locale} label={readMore} /> : null}
    </div>
  );
  return (
    <div className={`story${figureFirst ? " story--figure-first" : ""}`}>
      {figureFirst ? figure : copy}
      {figureFirst ? copy : figure}
    </div>
  );
}

/* 图标由调用方画：Base 的视图是描边，App 是彩色方章。 */
type CaseItem = { icon: ReactNode; name: string; description: string };

/* ── 目录即开关 ────────────────────────────────────────────────────
 * 四只 App、四个视图都是一组同辈，摆成方阵读起来是「就这四个」。选中项
 * 驱动旁边那张图；有人点过，轮播就停。 */
export function Cases({
  items,
  active,
  auto,
  onPick,
}: {
  items: readonly CaseItem[];
  active: number;
  auto: boolean;
  onPick: (at: number) => void;
}) {
  return (
    <ul className="cases" data-active={active} data-auto={auto ? "on" : "off"}>
      {items.map((item, at) => (
        <li key={item.name}>
          <button type="button" aria-pressed={at === active} onClick={() => onPick(at)}>
            <span className="cases-head">
              <span className="cases-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </span>
            <span className="cases-description">{item.description}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
