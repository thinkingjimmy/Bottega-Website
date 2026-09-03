/**
 * [INPUT]: Uses theme/language pre-paint scripts, LanguageRuntime, the self-hosted Caveat face, and one statically known locale
 * [OUTPUT]: Exports SiteDocument, the shared HTML root for Auto and localized route trees
 * [POS]: Multi-root-layout document boundary that guarantees a build-time-correct html lang and owns the one webfont the site loads
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { Caveat } from "next/font/google";
import { AUTO_LOCALE_BOOT, type Locale } from "@/lib/i18n/locale";
import { LanguageRuntime } from "./language-runtime";
import { THEME_BOOT, ThemeRuntime } from "./theme";

/* ── 全站唯一一支 webfont ────────────────────────────────────────
 * 只给 Agents 页那张手账上的四句批注用（tokens.css 的 --font-hand）。
 * next/font 在构建期把字面下载下来自托管，于是运行时没有第三方请求，
 * 也没有换字造成的跳版——站点其余部分仍然一个 webfont 都不加载。
 * 只要 latin：中文那半边交给本机手写体，理由见 --font-hand 的注释。
 * ────────────────────────────────────────────────────────── */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-caveat",
});

export function SiteDocument({
  children,
  locale,
  autoRedirect = false,
}: {
  children: React.ReactNode;
  locale: Locale;
  autoRedirect?: boolean;
}) {
  return (
    <html
      lang={locale}
      className={caveat.variable}
      data-theme="light"
      data-theme-mode="auto"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        {autoRedirect ? <script dangerouslySetInnerHTML={{ __html: AUTO_LOCALE_BOOT }} /> : null}
      </head>
      <body>
        <ThemeRuntime />
        <LanguageRuntime locale={locale} />
        {children}
      </body>
    </html>
  );
}
