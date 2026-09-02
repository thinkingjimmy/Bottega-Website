/**
 * [INPUT]: Uses locale validation, localized Changelog metadata, and ChangelogPageView
 * [OUTPUT]: Statically renders five canonical locale-prefixed Changelog pages
 * [POS]: Canonical localized Changelog route
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { notFound } from "next/navigation";
import { ChangelogPageView } from "@/components/pages/changelog-page";
import { getCatalog, parseLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = parseLocale((await params).locale);
  if (!locale) return {};
  const catalog = getCatalog(locale);
  return buildMetadata({
    locale,
    logicalPath: "/changelog/",
    title: catalog.changelog.metaTitle,
    description: catalog.changelog.metaDescription,
    catalog,
  });
}

export default async function LocalizedChangelogPage({ params }: Props) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  return <ChangelogPageView locale={locale} />;
}
