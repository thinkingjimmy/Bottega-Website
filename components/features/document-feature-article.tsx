/**
 * [INPUT]: Uses next/image and one DocumentFeatureRecord from the shared feature catalog
 * [OUTPUT]: Exports the screenshot-backed article used by Apps, Customizable, and Base
 * [POS]: Generic feature article; Agents has a dedicated capability-led article beside it
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import Image from "next/image";

import type { DocumentFeatureRecord } from "./catalog";

export function DocumentFeatureArticle({ feature }: { feature: DocumentFeatureRecord }) {
  return (
    <main className="feature-article">
      <p className="mono eyebrow">Features / {feature.label}</p>
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
            {section.points && (
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
