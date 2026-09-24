/**
 * [INPUT]: Uses the theme and platform pre-paint scripts, self-hosted Caveat face, Vercel Speed Insights, Google Analytics (gtag.js via next/script), and one statically known locale
 * [OUTPUT]: Exports SiteDocument, the shared HTML root for English and prefixed locale route trees
 * [POS]: Multi-root-layout document boundary that guarantees a build-time-correct html lang and owns the one webfont and the two measurement scripts the site loads
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Caveat } from "next/font/google";
import Script from "next/script";
import type { Locale } from "@/lib/i18n/locale";
import { PLATFORM_BOOT, THEME_BOOT } from "./boot";
import { ThemeRuntime } from "./theme";

/* ── 全站唯一一支 webfont ────────────────────────────────────────
 * 只给 Agents 页那张手账上的四句批注用（tokens.css 的 --font-hand）。
 * next/font 在构建期把字面下载下来自托管，于是运行时没有第三方请求，
 * 也没有换字造成的跳版——站点其余部分仍然一个 webfont 都不加载。
 * 只要 latin：中文那半边交给本机手写体，理由见 --font-hand 的注释。
 * ────────────────────────────────────────────────────────── */
const GA_MEASUREMENT_ID = "G-D852HRD2JY";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-caveat",
});

export function SiteDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html
      lang={locale}
      className={caveat.variable}
      data-theme="light"
      data-theme-mode="auto"
      data-platform="mac"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT + PLATFORM_BOOT }} />
      </head>
      <body>
        <ThemeRuntime />
        {children}
        {/* Field Core Web Vitals for all thirty pages. Mounted once here rather than in each
         * root layout; it renders nothing and appends one deferred same-origin script after
         * hydration, so first paint stays untouched. Served by Vercel at /_vercel/, it only
         * logs a console note on any other static host. */}
        <SpeedInsights />
        {/* Google Analytics 4. afterInteractive loads gtag.js after hydration, keeping it off the
         * critical path like Speed Insights above. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
