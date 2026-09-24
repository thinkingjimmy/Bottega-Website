/**
 * [INPUT]: Uses localized SiteCatalog copy, the repository issues URL, Reveal, and the Stroke/D primitives
 * [OUTPUT]: Exports the localized FaqSection — a heading column beside the questions, each a native disclosure with the first one open
 * [POS]: Last home section, where "Release your own version" used to close the page; the open-source argument now lives in the Trust section
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "@/lib/i18n";
import { REPO } from "@/lib/release";
import { D, Stroke } from "../icons";
import { Reveal } from "../reveal";

export function FaqSection({ catalog }: { catalog: SiteCatalog }) {
  const copy = catalog.home.faq;
  return (
    <section className="home-section" id="faq">
      <Reveal>
        <div className="faq">
          <div className="faq-intro">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="home-title">{copy.title}</h2>
            <p className="faq-lede">
              {copy.lede}{" "}
              <a href={`${REPO}/issues`} rel="noreferrer" target="_blank">
                {copy.issues}
              </a>
            </p>
          </div>
          {/* 原生 details：不要脚本就能开合、键盘与读屏天然可用；第一问默认展开，这一节一眼就有答案。 */}
          <div className="faq-list">
            {copy.items.map((item, at) => (
              <details className="faq-item" key={item.question} open={at === 0}>
                <summary>
                  <span>{item.question}</span>
                  <Stroke d={D.plus} size={18} width={1.8} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
