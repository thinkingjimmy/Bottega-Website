/**
 * [INPUT]: Uses next/image, localized breadcrumb copy, and one DocumentFeatureRecord
 * [OUTPUT]: Exports the localized screenshot-backed article used by Apps, Customizable, and Base
 * [POS]: Generic feature article; Agents has a dedicated capability-led article beside it
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import Image from "next/image";

import type { DocumentFeatureRecord } from "./catalog";

export function DocumentFeatureArticle({ feature, breadcrumb }: { feature: DocumentFeatureRecord; breadcrumb: string }) {
  return (
    <main className="feature-article">
      <p className="mono eyebrow">{breadcrumb} / {feature.label}</p>
      <h1>{feature.title}</h1>
      <p className="feature-deck">{feature.deck}</p>

      <figure className="feature-figure">
        <Image
          alt={feature.imageAlt}
          height={768}
          priority
          sizes="(max-width: 900px) calc(100vw - 32px), 860px"
          src={feature.image}
          width={1229}
        />
        <figcaption>{feature.imageCaption}</figcaption>
      </figure>

      <div className="feature-prose">
        {feature.sections.map((section) => (
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
          </section>
        ))}
      </div>
    </main>
  );
}
