/**
 * [INPUT]: Uses the canonical Home Hero ProductWindow plus shared Agent logos, wordmark, icon paths, and backend identities
 * [OUTPUT]: Exports static Agent picker, conversation matrix, and cross-Agent handoff illustrations
 * [POS]: Product-faithful visual evidence for the Agents feature page; the picker is the Hero window itself and every figure is inert
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import type { ReactNode } from "react";

import type { AgentId } from "@/lib/agents";
import { ProductWindow } from "@/components/window/product-window";
import { AgentLogo, D, Stroke, Wordmark } from "../icons";

const AGENTS: { id: AgentId; label: string }[] = [
  { id: "codex", label: "Codex" },
  { id: "claude", label: "Claude" },
  { id: "kimi", label: "Kimi" },
  { id: "opencode", label: "OpenCode" },
];

const MATRIX = [
  { label: "Streaming replies", values: ["Shared", "Shared", "Shared", "Shared"] },
  { label: "Tool activity", values: ["Shared", "Shared", "Shared", "Shared"] },
  { label: "Plan + review", values: ["Native", "Native", "Native", "Adapted"] },
  { label: "Questions", values: ["Shared UI", "Shared UI", "Shared UI", "Shared UI"] },
  { label: "Model picker", values: ["Full", "List", "List", "List"] },
  { label: "Permissions", values: ["3 levels", "2 levels", "2 levels", "2 levels"] },
  { label: "Mid-turn message", values: ["Live", "Live", "Next turn", "Next turn"] },
];

function WindowShell({
  active,
  title,
  children,
}: {
  active: "plan" | "implement";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="afd-window">
      <aside className="afd-sidebar">
        <div className="afd-traffic" aria-hidden="true">
          <i />
          <i />
          <i />
          <Stroke d={D.panelRight} size={13} width={1.6} />
        </div>
        <div className="afd-brand">
          <Wordmark height={20} />
          <Stroke d={D.search} size={14} width={1.8} />
        </div>
        <div className="afd-sidebar-row">
          <Stroke d={D.squarePen} size={14} width={1.8} />
          <span>New chat</span>
        </div>
        <p className="afd-sidebar-label">Projects</p>
        <div className="afd-sidebar-row">
          <Stroke d={D.folder} size={14} width={1.8} />
          <span>Bottega Site</span>
        </div>
        <div className={`afd-sidebar-row afd-sidebar-chat${active === "plan" ? " is-active" : ""}`}>
          <AgentLogo backend="claude" size={14} />
          <span>Plan the feature</span>
        </div>
        <div className={`afd-sidebar-row afd-sidebar-chat${active === "implement" ? " is-active" : ""}`}>
          <AgentLogo backend="codex" size={14} />
          <span>Implement the plan</span>
        </div>
        <div className="afd-sidebar-row afd-sidebar-chat">
          <AgentLogo backend="kimi" size={14} />
          <span>Research edge cases</span>
        </div>
        <div className="afd-sidebar-row afd-sidebar-chat">
          <AgentLogo backend="opencode" size={14} />
          <span>Compare approaches</span>
        </div>
      </aside>

      <div className="afd-main">
        <div className="afd-head">
          <span className="afd-head-mark">
            <AgentLogo backend={active === "plan" ? "claude" : "codex"} size={15} />
          </span>
          <strong>{title}</strong>
          <span className="afd-head-spacer" />
          <Stroke d={D.panelRight} size={15} width={1.6} />
        </div>
        {children}
      </div>
    </div>
  );
}

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

export function AgentPickerDemo() {
  return (
    <Figure
      label="The Bottega Home Hero product window with the Agent picker open in the composer"
      heroWindow
    >
      <ProductWindow pinnedComposerMenu="agent" surface="chat" />
    </Figure>
  );
}

function MatrixStatus({ value }: { value: string }) {
  const tone = value === "Next turn" ? "queued" : value === "Adapted" ? "adapted" : "ready";
  return <span className={`afd-status is-${tone}`}>{value}</span>;
}

export function ConversationMatrixDemo() {
  return (
    <figure className="afd-figure">
      <div
        className="afd-matrix-grid"
        role="img"
        aria-label="Capability matrix for Codex, Claude, Kimi, and OpenCode"
        inert
      >
        <div className="afd-matrix-row afd-matrix-header">
          <span className="afd-matrix-label">Capability</span>
          {AGENTS.map((agent) => (
            <span className="afd-agent-column" key={agent.id}>
              <AgentLogo backend={agent.id} size={18} />
              {agent.label}
            </span>
          ))}
        </div>
        {MATRIX.map((row) => (
          <div className="afd-matrix-row" key={row.label}>
            <strong className="afd-matrix-label">{row.label}</strong>
            {row.values.map((value, index) => (
              <span className="afd-matrix-cell" key={`${row.label}-${AGENTS[index].id}`}>
                <MatrixStatus value={value} />
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

export function CollaborationDemo() {
  return (
    <figure className="afd-figure">
      <div
        className="afd-collaboration"
        role="img"
        aria-label="Claude plans, Codex implements, and Claude reviews through persistent Chat handoffs"
        inert
      >
        <div className="afd-collaboration-head">
          <div>
            <span className="mono">PERSISTENT CHATS</span>
            <h3>Plan → implement → review</h3>
          </div>
          <span className="afd-chain-budget">Visible handoff</span>
        </div>
        <div className="afd-flow">
          <FlowCard agent="claude" phase="01 · PLAN" title="Claude">
            <p>Navigation implementation plan</p>
            <ul>
              <li>Use the shared header boundary</li>
              <li>Preserve mobile behavior</li>
              <li>Verify static routes</li>
            </ul>
          </FlowCard>
          <FlowBridge tool="send_to_section" />
          <FlowCard agent="codex" phase="02 · IMPLEMENT" title="Codex">
            <p className="afd-file"><Stroke d={D.squarePen} size={14} /> 3 files changed</p>
            <p className="afd-file"><Stroke d={D.check} size={14} /> Typecheck passed</p>
            <span className="afd-complete">Implementation complete</span>
          </FlowCard>
          <FlowBridge tool="expect_reply" />
          <FlowCard agent="claude" phase="03 · REVIEW" title="Claude">
            <p className="afd-review-result"><Stroke d={D.check} size={16} width={2.2} /> No blocking issues</p>
            <p>Plan intent and implementation match.</p>
            <span className="afd-complete">Review returned</span>
          </FlowCard>
        </div>
      </div>
    </figure>
  );
}
