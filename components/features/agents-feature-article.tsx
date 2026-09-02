/**
 * [INPUT]: Uses localized AgentsFeatureRecord/SiteCatalog, DemoData, and three Agent illustrations
 * [OUTPUT]: Exports the localized dedicated Agents capability article
 * [POS]: Evidence-led Agents page content replacing generic screenshot-and-prose treatment
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { AgentsFeatureRecord } from "./catalog";
import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import {
  AgentPickerDemo,
  CollaborationDemo,
  ConversationMatrixDemo,
} from "./agents-feature-visuals";

export function AgentsFeatureArticle({
  feature,
  catalog,
  demo,
}: {
  feature: AgentsFeatureRecord;
  catalog: SiteCatalog;
  demo: DemoData;
}) {
  const stories = catalog.features.agentsArticle.stories;
  return (
    <main className="feature-article agents-feature-article">
      <p className="mono eyebrow">{catalog.features.breadcrumb} / {feature.label}</p>
      <h1>{feature.title}</h1>
      <p className="feature-deck">{feature.deck}</p>

      <div className="agents-feature-stories">
        {stories.map((story, index) => {
          const visual = index === 0
            ? <AgentPickerDemo demo={demo} />
            : index === 1
              ? <ConversationMatrixDemo demo={demo} />
              : <CollaborationDemo demo={demo} />;
          return (
            <section className="agents-feature-story" key={story.index}>
              <div className="agents-feature-copy">
                <p className="mono agents-feature-index">{story.index}</p>
                <h2>{story.title}</h2>
                {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {visual}
            </section>
          );
        })}
      </div>
    </main>
  );
}
