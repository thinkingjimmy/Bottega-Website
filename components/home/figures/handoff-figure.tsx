/**
 * [INPUT]: Uses localized DemoData (the agentsVisual product strings and the handoff notes), RELAY_ID/relayText from the Agents feature sketch, and the AgentLogo/Stroke/D primitives
 * [OUTPUT]: Exports HandoffFigure — three Chat windows stacked in time order (Plan → Codex builds → result back for review), joined by two labelled flow arrows
 * [POS]: Static figure for the Handoff story; the home-page summary of the Agents feature page's cross-Agent sketch, with the same product strings
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { AgentId, DemoData } from "@/lib/agents";
import { RELAY_ID, relayText } from "../../features/agents-feature-visuals";
import { AgentLogo, D, Stroke } from "../../icons";

function Head({ agent, title }: { agent: AgentId; title: string }) {
  return (
    <div className="ho-head">
      <AgentLogo backend={agent} size={14} />
      <span>{title}</span>
    </div>
  );
}

/* 入站消息：产品里一次交接就是另一条 Chat 往转录里写的一条 user 消息，抬头是 relayInputText 原文。 */
function Inbound({ text }: { text: string }) {
  return (
    <div className="ho-inbound">
      <span>{text}</span>
      <span className="sk" style={{ width: "64%" }} />
    </div>
  );
}

export function HandoffFigure({ demo }: { demo: DemoData }) {
  const copy = demo.copy.agentsVisual;
  const notes = demo.copy.handoff;
  return (
    <div className="ho">
      <div className="fig-panel ho-win ho-win--plan">
        <Head agent="claude" title={copy.chatPlan} />
        <div className="ho-body">
          <span className="sk" style={{ width: "56%" }} />
          <div className="ho-plan">
            <div className="ho-plan-label">
              <Stroke d={D.lightbulb} size={13} width={1.8} />
              {copy.planLabel}
            </div>
            <div className="ho-plan-body">
              <b>{copy.planTitle}</b>
              <span className="sk" style={{ width: "100%" }} />
              <span className="sk" style={{ width: "82%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="fig-panel ho-win ho-win--impl">
        <Head agent="codex" title={copy.chatImpl} />
        <div className="ho-body">
          <Inbound text={relayText(copy.relayFrom, copy.chatPlan, RELAY_ID.plan)} />
          <div className="ho-working">
            <span className="ho-orb" />
            <span className="sk" style={{ width: "58%" }} />
          </div>
          <div className="ho-queue">
            <Stroke d={D.grip} size={12} width={2.4} />
            <span>{copy.queueItem.replace("{name}", copy.chatPlan)}</span>
          </div>
        </div>
      </div>

      <div className="fig-panel ho-win ho-win--back">
        <Head agent="claude" title={copy.chatPlan} />
        <div className="ho-body">
          <Inbound text={relayText(copy.relayFrom, copy.chatImpl, RELAY_ID.impl)} />
          <p className="ho-review">{copy.reviewLine}</p>
        </div>
      </div>

      {/* 只有两跳配字：箭头从一扇窗走到下一扇，说明站在它的外弯。 */}
      <p className="ho-note ho-note--sent">{notes.sent}</p>
      <p className="ho-note ho-note--back">{notes.back}</p>
      <svg className="ho-ink" viewBox="0 0 580 480" fill="none" aria-hidden="true">
        <path d="M146 90C96 110 96 226 190 240" />
        <path d="M180 231l11 9-11 9" />
        <path d="M192 308C146 320 146 376 234 386" />
        <path d="M224 377l11 9-11 9" />
      </svg>
    </div>
  );
}
