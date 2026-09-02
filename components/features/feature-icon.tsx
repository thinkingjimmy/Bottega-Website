/**
 * [INPUT]: Uses FeatureRecord icon names and the shared Stroke/glyph primitives
 * [OUTPUT]: Exports the FeatureIcon component
 * [POS]: The framed icon tile of the feature documentation sidebar; the header dropdown draws bare Stroke glyphs instead
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { Stroke, glyph } from "../icons";
import type { FeatureRecord } from "./catalog";

export function FeatureIcon({
  feature,
  size = 17,
}: {
  feature: Pick<FeatureRecord, "icon">;
  size?: number;
}) {
  return (
    <span className="feature-icon" aria-hidden="true">
      <Stroke d={glyph(feature.icon)} size={size} width={1.8} />
    </span>
  );
}
