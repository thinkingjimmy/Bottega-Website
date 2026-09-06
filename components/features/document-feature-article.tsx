/**
 * [INPUT]: Uses next/image, localized breadcrumb copy, one DocumentFeatureRecord, and optional per-section figures
 * [OUTPUT]: Exports the localized screenshot-backed article used by Apps, Customizable, and Base
 * [POS]: Generic feature article; Agents has a dedicated capability-led article beside it
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { ReactNode } from "react";
import Image from "next/image";

import type { DocumentFeatureRecord } from "./catalog";

/* ── 图位是个洞，不是个分支 ──────────────────────────────────────
 * `figures` 按 sections 的下标对位：给了就画，没给就什么都不画。
 * 写成 `slug === "base" ? …` 会把「哪一页有图」这件事搬进这只通用组件，
 * 于是每多一页有图，这里就多一条 if——而它本来只需要回答「这一节的图
 * 挂在哪儿」。越界的下标取到 undefined，React 渲染成空，无需再判一次。
 * ────────────────────────────────────────────────────────── */
export function DocumentFeatureArticle({
  feature,
  breadcrumb,
  figures = [],
}: {
  feature: DocumentFeatureRecord;
  breadcrumb: string;
  figures?: ReactNode[];
}) {
  return (
    <main className="feature-article">
      <p className="mono eyebrow">{breadcrumb} / {feature.label}</p>
      <h1>{feature.title}</h1>
      <p className="feature-deck">{feature.deck}</p>

      {/* 有截图才画。Base 不再靠一张截图开场——它下面三节各自带一张
          用代码画的图，开头再压一张空表的照片只是拖慢第一屏。 */}
      {feature.screenshot ? (
        <figure className="feature-figure">
          <Image
            alt={feature.screenshot.alt}
            height={768}
            priority
            sizes="(max-width: 900px) calc(100vw - 32px), 860px"
            src={feature.screenshot.src}
            width={1229}
          />
          <figcaption>{feature.screenshot.caption}</figcaption>
        </figure>
      ) : null}

      <div className="feature-prose">
        {feature.sections.map((section, index) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.points.length > 0 && (
              <ul>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {figures[index]}
          </section>
        ))}
      </div>
    </main>
  );
}
