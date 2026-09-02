/**
 * [INPUT]: Uses next/link plus the shared arrow icon primitive
 * [OUTPUT]: Exports FeatureLink for home-section detail CTAs
 * [POS]: The single Read More action used at the end of all four home feature sections
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import Link from "next/link";

import { Stroke, glyph } from "../icons";
import type { FeatureSlug } from "./catalog";

export function FeatureLink({ slug }: { slug: FeatureSlug }) {
  return (
    <Link className="feature-more" href={`/features/${slug}/`}>
      <span>Read More</span>
      <Stroke d={glyph("arrowRight")} size={15} width={1.8} />
    </Link>
  );
}
