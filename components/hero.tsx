"use client";

/**
 * [INPUT]: Uses React state, localized SiteCatalog/DemoData, ProductWindow, AppStudioWindow, SiteHeader, and the menu-bar language/theme controls
 * [OUTPUT]: Exports the localized interactive Hero component
 * [POS]: Pinned product desktop; it owns the surface switch, the App that is open on it, and the only visible theme control
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useRef, useState } from "react";
import { D, Glyph, Stroke } from "./icons";
import { SceneLanguage } from "./scene-language";
import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme";
import { AppStudioWindow } from "./window/product-apps";
import { ProductWindow } from "./window/product-window";
import type { App, DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import type { FeatureRecord } from "./features/catalog";

/** 收缩终点。上缘让得比下缘多，让出来的那条正好装下 header。 */
const MAX_T = 92;
/* header 内容的净高（那一排统一 32px 的控件）再加一点呼吸。带子矮于这个数
   时它一个字都不该露：淡入一条被上下切掉的横条，比什么都不显示更糟。 */
const HEADER_ROOM = 44;
const MAX_B = 44;
const MAX_R = 14;
const MAX_SH = 26;

/* ── Apps 那一面自己演一遍 ────────────────────────────────────────
 * 切到这一面先看见的是 Apps 页本身，一拍之后领头那张卡被按下去，一扇
 * App 的独立窗口开在桌面上。三步的顺序就是这句话的语序：有哪些 App →
 * 打开其中一只 → 它是一件独立的东西。开头就把窗摆好，等于把结论先说了。
 *
 * 1.15s：按下那一格（CSS，0.42s 起 0.62s 长）演完还留 110ms。两件事挨着
 * 发生才读得出因果，叠在一起读到的是两件无关的事同时动。
 * 关掉动效的人不必等这一拍——他们要的是「到位」，不是「别开」。
 * ────────────────────────────────────────────────────────── */
const LEAD_OPEN = 1150;

export function Hero({
  demo,
  copy,
  nav,
  language,
  features,
  locale,
}: {
  demo: DemoData;
  copy: SiteCatalog["home"]["hero"];
  nav: SiteCatalog["nav"];
  language: SiteCatalog["language"];
  features: FeatureRecord[];
  locale: Locale;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [surface, setSurface] = useState<"chat" | "app">("chat");
  /* 开着的是哪一只 App，不是一个 boolean：换一只就换一扇窗。 */
  const [openApp, setOpenApp] = useState<App | null>(null);
  /* 那一拍还欠着。它不是「窗还没开」的同义词：关掉窗口之后这一页重新
     露出来，而那一下按压不该跟着再演一遍——机器只自己动一次手，
     再动就成了它在替访客反复表演。run 让「再切一次 Apps」重演一遍：
     芯片是回到这一面的唯一入口，它若不重演，第二次点它什么都不会发生。 */
  const [pending, setPending] = useState(false);
  const [run, setRun] = useState(0);

  const show = (next: "chat" | "app") => {
    setSurface(next);
    setOpenApp(null);
    setPending(next === "app");
    if (next === "app") setRun((at) => at + 1);
  };

  const openNow = (app: App) => {
    setOpenApp(app);
    setPending(false);
  };

  useEffect(() => {
    if (!pending) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    /* 这里不走 openNow：它每渲染一次都是个新函数，进了依赖表就等于每渲染
       一次重开一次计时器——那一拍于是永远落不下来。 */
    const timer = setTimeout(() => {
      setOpenApp(demo.galleryApps[0]);
      setPending(false);
    }, reduce ? 0 : LEAD_OPEN);
    return () => clearTimeout(timer);
  }, [demo.galleryApps, pending, run]);

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
        <SiteHeader variant="stage" locale={locale} copy={nav} features={features} />

        <section className="scene" id="top">
          {/* 真 macOS 的菜单栏不放产品 CTA。放了就是拿系统的壳卖自己的货，
              illusion 一破，整台机器都不像真的了。 */}
          <div className="scene-bar">
            <Glyph d={D.apple} size={15} />
            <span style={{ fontWeight: 600 }}>Bottega</span>
            {copy.menu.map((item) => <span className="menu" key={item}>{item}</span>)}
            {/* 输入法在真 macOS 的菜单栏上就站在主题这类系统项左边，
                同族、同尺寸、同一颗 Auto 绿点——它不需要自我介绍。 */}
            <div className="scene-status">
              <SceneLanguage locale={locale} copy={language} />
              <ThemeToggle />
              <span className="mono menu">{copy.date}</span>
            </div>
          </div>

          <div className="scene-body">
            <ProductWindow
              surface={surface}
              onSurface={show}
              onOpenApp={openNow}
              appOpen={openApp !== null}
              appLead={pending}
              demo={demo}
            />

            {/* 第二扇窗盖在第一扇上，右缘越出它的边界——两扇窗必须彼此
                错开，读到的才是「桌面上又开了一个东西」，而不是「那台
                机器里换了一块面板」。key 一变就重演一次开窗。 */}
            {surface === "app" && openApp ? (
              <AppStudioWindow
                demo={demo}
                app={openApp}
                onClose={() => setOpenApp(null)}
                key={`${run}:${openApp.id}`}
              />
            ) : null}

            {/* 两颗并列而不是一个开关：chat 与 App 是产品的两种表面，
                开关会把其中一种说成「另一种的反面」，并列才说得对。
                标签直说这一面是什么，不设问也不加注解——注解要说的话，
                上面那台机器正在演，写下来只是把演过的再讲一遍。 */}
            <div className="chip-bar rise rise-2">
              <button
                type="button"
                className={`chip${surface === "chat" ? " on" : ""}`}
                onClick={() => show("chat")}
                aria-pressed={surface === "chat"}
              >
                <Stroke d={D.message} size={15} />
                <span>{copy.chatChip}</span>
              </button>
              <button
                type="button"
                className={`chip${surface === "app" ? " on" : ""}`}
                onClick={() => show("app")}
                aria-pressed={surface === "app"}
              >
                <Stroke d={D.grid} size={15} />
                <span>{copy.appChip}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
