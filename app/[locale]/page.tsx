/**
 * [INPUT]: Uses locale validation, localized metadata, and HomePageView
 * [OUTPUT]: Statically renders five canonical locale-prefixed home pages
 * [POS]: Canonical localized home route
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { notFound } from "next/navigation";
import { HomePageView } from "@/components/pages/home-page";
import { getCatalog, parseLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = parseLocale((await params).locale);
  if (!locale) return {};
  return buildMetadata({ locale, logicalPath: "/", catalog: getCatalog(locale) });
}

export default async function LocalizedHomePage({ params }: Props) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  return <HomePageView locale={locale} />;
}
