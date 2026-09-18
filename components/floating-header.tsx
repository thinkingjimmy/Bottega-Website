"use client";

/**
 * [INPUT]: Uses React state/effects, SiteHeader, and the localized catalog slices the header needs
 * [OUTPUT]: Exports FloatingHeader — the home page's fixed navigation bar that slides in once the hero's own header has scrolled away
 * [POS]: Sibling of Hero on the home page; the framed subpage header is sticky by CSS alone and does not need it
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useState } from "react";
import type { FeatureRecord } from "./features/catalog";
import { SiteHeader } from "./site-header";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

/* ── 接班，不是叠加 ────────────────────────────────────────────────
 * 首屏那条带子是桌面收缩时让出来的，桌面滚走它也跟着走。这条只在那条带子
 * 的下缘越过视口顶端之后才滑下来，带子回来它就退回去——同一时刻页面上只
 * 有一条导航。带子没显影时高度为 0，那时它不算「走了」，所以首屏顶上不会
 * 凭空多一条。
 * ────────────────────────────────────────────────────────── */
export function FloatingHeader({
  locale,
  copy,
  download,
  features,
}: {
  locale: Locale;
  copy: SiteCatalog["nav"];
  download: SiteCatalog["download"];
  features: FeatureRecord[];
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const band = document.querySelector<HTMLElement>(".site-header--stage");
    if (!band) return;
    let ticket = 0;
    const apply = () => {
      ticket = 0;
      const rect = band.getBoundingClientRect();
      setShown(rect.height > 0 && rect.bottom <= 0);
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
    <div className="site-header-float" data-shown={shown ? "true" : "false"} aria-hidden={!shown} inert={!shown}>
      <SiteHeader variant="floating" locale={locale} copy={copy} download={download} features={features} />
    </div>
  );
}
