"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState，依赖 ./window/product-window、./theme、./icons
 * [OUTPUT]: 对外提供 Hero 组件
 * [POS]: Bottega-Website 的首屏。页面不以一张讲产品的海报开场，
 *        而是直接给出产品本身；滚动时这台机器钉住并收成一张卡片，
 *        正文从它上面滑过去
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AppIcon, D, Glyph, Stroke } from "./icons";
import { ProductWindow } from "./window/product-window";
import { ThemeToggle } from "./theme";

/** 收缩终点。上缘让得比下缘多，让出来的那条正好装下 header。 */
const MAX_T = 92;
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
      /* header 的显影比几何快一截：带子刚让出来它就该读得出来，
         而不是等收缩走完才姗姗现身。 */
      s.setProperty("--stage-p", Math.min(1, e * 1.6).toFixed(3));
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
        <header className="stage-header">
          <Link href="/" aria-label="Bottega" style={{ display: "flex", alignItems: "center" }}>
            <AppIcon size={30} />
          </Link>
          <span style={{ fontSize: 15, color: "var(--ink-3)" }}>the workshop that builds itself</span>
          <nav>
            <Link href="/changelog/" style={{ color: "var(--ink-2)" }}>
              Changelog
            </Link>
            <a href="https://github.com/thinkingjimmy/Bottega" style={{ color: "var(--ink-2)" }}>
              GitHub
            </a>
            <ThemeToggle />
            <a
              className="btn-primary"
              href="https://github.com/thinkingjimmy/Bottega/releases"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 36,
                padding: "0 17px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Download for macOS
            </a>
          </nav>
        </header>

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
            <span className="mono menu" style={{ marginLeft: "auto" }}>
              Tue Sep 1&nbsp;&nbsp;9:36
            </span>
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
