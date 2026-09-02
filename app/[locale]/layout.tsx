/**
 * [INPUT]: Uses global CSS, static Locale params, locale validation, and SiteDocument
 * [OUTPUT]: Exports five root layouts with build-time-correct html lang values
 * [POS]: Canonical locale-prefixed route tree
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import "../globals.css";
import { notFound } from "next/navigation";
import { SiteDocument } from "@/components/site-document";
import { LOCALES, parseLocale } from "@/lib/i18n";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export default async function LocaleLayout({ children, params }: Props) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
