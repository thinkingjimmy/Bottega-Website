/**
 * [INPUT]: Uses global CSS, four static prefixed-locale params, locale validation, and SiteDocument
 * [OUTPUT]: Exports four localized root layouts with build-time-correct html lang values
 * [POS]: Non-English locale-prefixed route tree
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import "../globals.css";
import { notFound } from "next/navigation";
import { SiteDocument } from "@/components/site-document";
import { PREFIXED_LOCALES, parseLocale } from "@/lib/i18n";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PREFIXED_LOCALES.map((locale) => ({ locale }));

export default async function LocaleLayout({ children, params }: Props) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
