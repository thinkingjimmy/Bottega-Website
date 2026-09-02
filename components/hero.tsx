"use client";

/**
 * [INPUT]: Uses React state/effects plus ProductWindow, SiteHeader, ThemeToggle, and icons
 * [OUTPUT]: Exports the interactive Hero component
 * [POS]: The pinned product desktop and the only visible theme control on Bottega-Website
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";
import { D, Glyph, Stroke } from "./icons";
import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme";
import { ProductWindow } from "./window/product-window";

/** 收缩终点。上缘让得比下缘多，让出来的那条正好装下 header。 */
const MAX_T = 92;
/* header 内容的净高（那一排统一 32px 的控件）再加一点呼吸。带子矮于这个数
   时它一个字都不该露：淡入一条被上下切掉的横条，比什么都不显示更糟。 */
const HEADER_ROOM = 44;
const MAX_B = 44;
const MAX_R = 14;
const MAX_SH = 26;

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [surface, setSurface] = useState<"chat" | "app">("chat");

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!pin || !stage) return;

    /* 窄屏不演收缩：桌面这个隐喻在 390px 上不成立，硬演只会得到
       一张看不清的缩略图。CSS 已把跑道收成一屏，这里同步撤掉监听。 */
    const narrow = window.matchMedia("(max-width: 900px)");
    if (narrow.matches) return;

    let ticket = 0;

    const apply = () => {
      ticket = 0;
      const runway = pin.offsetHeight - stage.offsetHeight;
      /* 跑道短于 40px 视为「这一屏根本不滚」——直接停在满幅，
         不做任何补偿动作。默认值写在 CSS 里，脚本不跑也不塌。 */
      if (runway < 40) return;

      const travelled = window.scrollY - pin.offsetTop;
      const p = Math.min(1, Math.max(0, travelled / runway));
      const e = p * p * (3 - 2 * p); /* smoothstep：两端都收得住，起步不突跳 */

      /* 横向让出的量读 CSS 的 --bleed：正文与 header 靠的也是这一个数，
         在这里再算一遍就等于给同一条边界备了第二份定义，迟早分叉。 */
      const maxX = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--bleed")
      ) || 0;

      const s = stage.style;
      s.setProperty("--stage-x", `${(maxX * e).toFixed(2)}px`);
      s.setProperty("--stage-t", `${(MAX_T * e).toFixed(2)}px`);
      s.setProperty("--stage-b", `${(MAX_B * e).toFixed(2)}px`);
      s.setProperty("--stage-r", `${(MAX_R * e).toFixed(2)}px`);
      s.setProperty("--stage-sh", `${(MAX_SH * e).toFixed(2)}px`);
      /* header 的显影不跟进度走，跟「带子装不装得下它」走：装不下时它
         一个字都不露，装下了才在 22px 的行程里落定。原来那条 e×1.6 的
         斜坡让它在带子还只有二三十像素时就开始显影，于是有一段路上，
         一条被切掉上下沿的横条正压在系统菜单栏上——两样东西都读不成。 */
      const band = MAX_T * e;
      const reveal = Math.min(1, Math.max(0, (band - HEADER_ROOM) / 22));
      s.setProperty("--stage-p", reveal.toFixed(3));
      /* 透明不等于不在：不显影的时候它仍然盖在桌面上截走点击。 */
      s.setProperty("--stage-pe", reveal > 0 ? "auto" : "none");
    };

    const onScroll = () => {
      if (!ticket) ticket = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (ticket) cancelAnimationFrame(ticket);
    };
  }, []);

  return (
    <div className="hero-pin" ref={pinRef}>
      <div className="stage" ref={stageRef}>
        <SiteHeader variant="stage" />

        <section className="scene" id="top">
          {/* 真 macOS 的菜单栏不放产品 CTA。放了就是拿系统的壳卖自己的货，
              illusion 一破，整台机器都不像真的了。 */}
          <div className="scene-bar">
            <Glyph d={D.apple} size={15} />
            <span style={{ fontWeight: 600 }}>Bottega</span>
            <span className="menu">File</span>
            <span className="menu">Edit</span>
            <span className="menu">View</span>
            <span className="menu">Chat</span>
            <span className="menu">Window</span>
            <span className="menu">Help</span>
            <div className="scene-status">
              <ThemeToggle />
              <span className="mono menu">Tue Sep 1&nbsp;&nbsp;9:36</span>
            </div>
          </div>

          <div className="scene-body">
            <ProductWindow surface={surface} onSurface={setSurface} />

            {/* 两颗并列而不是一个开关：chat 与 App 是产品的两种表面，
                开关会把其中一种说成「另一种的反面」，并列才说得对。
                标签直说这一面是什么，不设问也不加注解——注解要说的话，
                上面那台机器正在演，写下来只是把演过的再讲一遍。 */}
            <div className="chip-bar rise rise-2">
              <button
                type="button"
                className={`chip${surface === "chat" ? " on" : ""}`}
                onClick={() => setSurface("chat")}
                aria-pressed={surface === "chat"}
              >
                <Stroke d={D.message} size={15} />
                <span>Chat, just like your CLI</span>
              </button>
              <button
                type="button"
                className={`chip${surface === "app" ? " on" : ""}`}
                onClick={() => setSurface("app")}
                aria-pressed={surface === "app"}
              >
                <Stroke d={D.grid} size={15} />
                <span>Apps your agent builds</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
