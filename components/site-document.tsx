/**
 * [INPUT]: Uses theme/language pre-paint scripts, LanguageRuntime, and one statically known locale
 * [OUTPUT]: Exports SiteDocument, the shared HTML root for Auto and localized route trees
 * [POS]: Multi-root-layout document boundary that guarantees a build-time-correct html lang attribute
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { AUTO_LOCALE_BOOT, type Locale } from "@/lib/i18n/locale";
import { LanguageRuntime } from "./language-runtime";
import { THEME_BOOT, ThemeRuntime } from "./theme";

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
    <html lang={locale} data-theme="light" data-theme-mode="auto" suppressHydrationWarning>
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
