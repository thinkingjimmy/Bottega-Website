/**
 * [INPUT]: Uses Next metadata/static params, the feature catalog/sidebar, specialized Agents article, document article, and shared chrome
 * [OUTPUT]: Statically renders /features/agents, /apps, /customizable, and /base plus per-page metadata
 * [POS]: Feature route shell; Agents owns a capability-led layout while the other three retain the shared document layout
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AgentsFeatureArticle } from "@/components/features/agents-feature-article";
import { FEATURES, featureBySlug } from "@/components/features/catalog";
import { DocumentFeatureArticle } from "@/components/features/document-feature-article";
import { FeatureSidebar } from "@/components/features/feature-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  FEATURES.map((feature) => ({ slug: feature.slug }));

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const feature = featureBySlug((await params).slug);
  if (!feature) return {};

  return {
    title: feature.label,
    description: feature.deck,
    openGraph: {
      title: `${feature.label} · Bottega`,
      description: feature.deck,
      ...(feature.layout === "document"
        ? { images: [{ url: feature.image, width: 1229, height: 768, alt: feature.imageAlt }] }
        : {}),
    },
  };
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const feature = featureBySlug((await params).slug);
  if (!feature) notFound();

  return (
    <div className="content">
      <SiteHeader variant="framed" />

      <div className="wrap feature-layout">
        <FeatureSidebar active={feature.slug} />

        {feature.layout === "agents" ? (
          <AgentsFeatureArticle feature={feature} />
        ) : (
          <DocumentFeatureArticle feature={feature} />
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
