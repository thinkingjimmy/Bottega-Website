/**
 * [INPUT]: Uses localized DemoData, the canonical ProductWindow, shared Agent logos, and product icons
 * [OUTPUT]: Exports localized Agent picker, capability matrix, and cross-Agent handoff illustrations
 * [POS]: Product-faithful visual evidence for the Agents feature page; every figure is inert
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { ReactNode } from "react";

import type { AgentId, DemoData } from "@/lib/agents";
import { ProductWindow } from "@/components/window/product-window";
import { AgentLogo, D, Stroke } from "../icons";

const AGENTS: { id: AgentId; label: string }[] = [
  { id: "codex", label: "Codex" },
  { id: "claude", label: "Claude" },
  { id: "kimi", label: "Kimi" },
  { id: "opencode", label: "OpenCode" },
];

function Figure({
  label,
  caption,
  heroWindow,
  children,
}: {
  label: string;
  caption?: string;
  heroWindow?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className="afd-figure">
      <div
        className={`afd-visual${heroWindow ? " afd-visual--hero-window" : ""}`}
        role="img"
        aria-label={label}
        inert
      >
        {children}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function AgentPickerDemo({ demo }: { demo: DemoData }) {
  return (
    <Figure
      label={demo.copy.agentsVisual.pickerLabel}
      heroWindow
    >
      <ProductWindow pinnedComposerMenu="agent" surface="chat" demo={demo} />
    </Figure>
  );
}

function MatrixStatus({ value, tone }: { value: string; tone: "queued" | "adapted" | "ready" }) {
  return <span className={`afd-status is-${tone}`}>{value}</span>;
}

export function ConversationMatrixDemo({ demo }: { demo: DemoData }) {
  const copy = demo.copy.agentsVisual;
  return (
    <figure className="afd-figure">
      <div
        className="afd-matrix-grid"
        role="img"
        aria-label={copy.matrixLabel}
        inert
      >
        <div className="afd-matrix-row afd-matrix-header">
          <span className="afd-matrix-label">{copy.capability}</span>
          {AGENTS.map((agent) => (
            <span className="afd-agent-column" key={agent.id}>
              <AgentLogo backend={agent.id} size={18} />
              {agent.label}
            </span>
          ))}
        </div>
        {copy.rows.map((row, rowIndex) => (
          <div className="afd-matrix-row" key={row.label}>
            <strong className="afd-matrix-label">{row.label}</strong>
            {row.values.map((value, index) => (
              <span className="afd-matrix-cell" key={`${row.label}-${AGENTS[index].id}`}>
                <MatrixStatus
                  value={value}
                  tone={rowIndex === 6 && index > 1 ? "queued" : rowIndex === 2 && index === 3 ? "adapted" : "ready"}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

function FlowCard({
  agent,
  phase,
  title,
  children,
}: {
  agent: AgentId;
  phase: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="afd-flow-card">
      <header>
        <span><AgentLogo backend={agent} size={17} /></span>
        <div>
          <small>{phase}</small>
          <strong>{title}</strong>
        </div>
      </header>
      <div className="afd-flow-body">{children}</div>
    </article>
  );
}

function FlowBridge({ tool }: { tool: string }) {
  return (
    <div className="afd-flow-bridge">
      <span><Stroke d={D.arrowRight} size={15} /></span>
      <code>{tool}</code>
    </div>
  );
}

export function CollaborationDemo({ demo }: { demo: DemoData }) {
  const copy = demo.copy.agentsVisual;
  return (
    <figure className="afd-figure">
      <div
        className="afd-collaboration"
        role="img"
        aria-label={copy.collaborationLabel}
        inert
      >
        <div className="afd-collaboration-head">
          <div>
            <span className="mono">{copy.persistentChats}</span>
            <h3>{copy.flowTitle}</h3>
          </div>
          <span className="afd-chain-budget">{copy.visibleHandoff}</span>
        </div>
        <div className="afd-flow">
          <FlowCard agent="claude" phase={copy.phases[0]} title="Claude">
            <p>{copy.planSummary}</p>
            <ul>
              {copy.planItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </FlowCard>
          <FlowBridge tool="send_to_section" />
          <FlowCard agent="codex" phase={copy.phases[1]} title="Codex">
            <p className="afd-file"><Stroke d={D.squarePen} size={14} /> {copy.filesChanged}</p>
            <p className="afd-file"><Stroke d={D.check} size={14} /> {copy.typecheckPassed}</p>
            <span className="afd-complete">{copy.implementationComplete}</span>
          </FlowCard>
          <FlowBridge tool="expect_reply" />
          <FlowCard agent="claude" phase={copy.phases[2]} title="Claude">
            <p className="afd-review-result"><Stroke d={D.check} size={16} width={2.2} /> {copy.noIssues}</p>
            <p>{copy.reviewMatch}</p>
            <span className="afd-complete">{copy.reviewReturned}</span>
          </FlowCard>
        </div>
      </div>
    </figure>
  );
}
