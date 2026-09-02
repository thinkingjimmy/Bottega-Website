/**
 * [INPUT]: Uses AgentsFeatureRecord plus the three static Agent product illustrations
 * [OUTPUT]: Exports the dedicated Agents capability article
 * [POS]: Evidence-led Agents page content; replaces the generic screenshot-and-prose treatment
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import type { AgentsFeatureRecord } from "./catalog";
import {
  AgentPickerDemo,
  CollaborationDemo,
  ConversationMatrixDemo,
} from "./agents-feature-visuals";

export function AgentsFeatureArticle({ feature }: { feature: AgentsFeatureRecord }) {
  return (
    <main className="feature-article agents-feature-article">
      <p className="mono eyebrow">Features / {feature.label}</p>
      <h1>{feature.title}</h1>
      <p className="feature-deck">{feature.deck}</p>

      <div className="agents-feature-stories">
        <section className="agents-feature-story">
          <div className="agents-feature-copy">
            <p className="mono agents-feature-index">01 · Multi-Agent</p>
            <h2>Official CLIs. One place to work.</h2>
            <p>
              Bottega runs Codex, Claude Code, Kimi Code, and OpenCode through their official
              local CLIs. It does not replace their harness with a generic Agent layer.
            </p>
            <p>
              Authentication, subscription access, and quotas stay with the provider. Model and
              reasoning-effort controls come from each CLI&apos;s live catalog, so an option appears
              only when that backend can actually accept it.
            </p>
            <p>
              A conversation stays bound to the Agent that started it. Open another conversation
              when you want a different Agent; both can live in the same Project.
            </p>
          </div>
          <AgentPickerDemo />
        </section>

        <section className="agents-feature-story">
          <div className="agents-feature-copy">
            <p className="mono agents-feature-index">02 · Conversation parity</p>
            <h2>One conversation experience, adapted—not flattened.</h2>
            <p>
              Streaming replies, tool activity, Plan review, questions, permissions, model
              controls, and queued messages share one visual system. Bottega translates each
              backend&apos;s protocol into that system without pretending their capabilities are
              identical.
            </p>
            <p>
              The matrix shows the current product contract. “Shared” means the Bottega surface is
              the same; Native and Adapted show where the implementation differs. Missing runtime
              capabilities do not render as dead controls.
            </p>
          </div>
          <ConversationMatrixDemo />
        </section>

        <section className="agents-feature-story">
          <div className="agents-feature-copy">
            <p className="mono agents-feature-index">03 · Cross-Agent collaboration</p>
            <h2>Let one Agent hand work to another.</h2>
            <p>
              A Claude conversation can prepare a Plan, send the bounded context to a Codex
              conversation, and ask Codex to implement it. Codex can return the result to the
              original conversation for review.
            </p>
            <p>
              The handoff uses Bottega&apos;s persistent Chat communication tools: the target Chat
              keeps its own Agent and workspace, the message starts or queues there, and the
              result remains visible and reusable instead of disappearing inside a hidden run.
            </p>
          </div>
          <CollaborationDemo />
        </section>
      </div>
    </main>
  );
}
