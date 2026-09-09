/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, AgentLogo marks, Reveal, and FeatureLink
 * [OUTPUT]: Exports the localized CollaborationSection and its code-drawn handoff figure
 * [POS]: Home feature showing work moving between Chats; the only home figure drawn as a graph
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { backendLabel } from "@/lib/agents";
import { FeatureLink } from "./features/feature-link";
import { AgentLogo } from "./icons";
import { Reveal } from "./reveal";
import type { AgentId, DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

type Copy = SiteCatalog["home"]["collaboration"];

/* ── One canvas, one coordinate system ────────────────────────────
 * Every stroke lives in the same 580×360 space, the way the Agents page draws its
 * handoff sketch: when each line owns its own little svg, "the start did not meet
 * the end" is only a matter of time. Node rectangles are in collaboration.css and
 * these numbers are read off them, so the two must move together.
 *
 * The two subagent strokes join before the last node instead of reaching it
 * separately. That join is not decoration: a subagent has no Section tools, so it
 * cannot hand anything on by itself. What continues downward is the parent's turn,
 * once both results are back.
 * ────────────────────────────────────────────────────────────── */
const INK = [
  "M290 70V99",
  "M285.5 99L290 106L294.5 99",
  "M290 164V176Q290 182 284 182H147Q141 182 141 188V194",
  "M136.5 194L141 201L145.5 194",
  "M290 164V176Q290 182 296 182H433Q439 182 439 188V194",
  "M434.5 194L439 201L443.5 194",
  "M141 253V265Q141 271 147 271H284Q290 271 290 277V283",
  "M439 253V265Q439 271 433 271H296Q290 271 290 277V283",
  "M285.5 283L290 290L294.5 283",
];

/* A Chat is the title and its Agent is the quiet second line: the mark beside it has
   already said which Agent this is, so spelling the name in full weight would be the
   same sentence twice. The badge carries the role this Chat plays in the work. */
function Node({
  agent,
  title,
  subtitle,
  badge,
  place,
  subagent,
}: {
  agent: AgentId;
  title: string;
  subtitle: string;
  badge: string;
  place: string;
  subagent?: boolean;
}) {
  return (
    <div className={`handoff-node handoff-node--${place}${subagent ? " handoff-node--sub" : ""}`}>
      <AgentLogo backend={agent} size={subagent ? 17 : 20} />
      <span className="handoff-label">
        <span className="handoff-title">{title}</span>
        <span className="handoff-agent">{subtitle}</span>
      </span>
      <span className="mono handoff-badge">{badge}</span>
    </div>
  );
}

/* Below 640 the frame is narrower than the graph, and a graph cannot be scaled the
   way a screenshot can — 13px type would land at 8px. So the chain stacks and these
   drops take over from the ink. They render only in that layout. */
function Drop() {
  return (
    <span className="handoff-drop" aria-hidden="true">
      <svg width="12" height="28" viewBox="0 0 12 28" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2V20" />
        <path d="M1.5 19L6 26L10.5 19" />
      </svg>
    </span>
  );
}

function HandoffFigure({ demo, copy }: { demo: DemoData; copy: Copy }) {
  const visual = demo.copy.agentsVisual;
  const subagentOf = (agent: AgentId) => copy.subagent.replace("{name}", backendLabel(agent));

  return (
    <div className="handoff" role="img" aria-label={copy.figureLabel} inert>
      <svg
        className="handoff-ink"
        viewBox="0 0 580 360"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {INK.map((d) => (
          <path d={d} key={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      {/* The first two Chats are the case the Agents page already tells, read from the
          same catalog entry: one story, told twice at two lengths, not two stories. */}
      <Node
        agent="claude"
        title={visual.chatPlan}
        subtitle={backendLabel("claude")}
        badge={copy.roles.plan}
        place="plan"
      />
      <Drop />
      <Node
        agent="codex"
        title={visual.chatImpl}
        subtitle={backendLabel("codex")}
        badge={copy.roles.development}
        place="dev"
      />
      <Drop />

      {/* Grouped so the stacked layout joins the pair once instead of threading a drop
          between two things that never hand work to each other. */}
      <div className="handoff-pair">
        <Node
          agent="codex"
          title={copy.sweep}
          subtitle={subagentOf("codex")}
          badge={copy.roles.development}
          place="sweep"
          subagent
        />
        <Node
          agent="claude"
          title={copy.breakpoints}
          subtitle={subagentOf("claude")}
          badge={copy.roles.development}
          place="check"
          subagent
        />
      </div>

      <Drop />
      <Node
        agent="kimi"
        title={copy.regression}
        subtitle={backendLabel("kimi")}
        badge={copy.roles.test}
        place="test"
      />
    </div>
  );
}

export function CollaborationSection({
  demo,
  copy,
  readMore,
  locale,
}: {
  demo: DemoData;
  copy: Copy;
  readMore: string;
  locale: Locale;
}) {
  return (
    <section className="section" id="collaboration">
      <Reveal>
        <div className="wrap split">
          <div className="copy">
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
            <p>{copy.note}</p>
            <FeatureLink slug="agents" locale={locale} label={readMore} />
          </div>

          <HandoffFigure demo={demo} copy={copy} />
        </div>
      </Reveal>
    </section>
  );
}
