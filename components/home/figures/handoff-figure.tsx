/**
 * [INPUT]: Uses localized DemoData (handoff, chrome and chat copy) and the AgentLogo/Stroke/D icon primitives
 * [OUTPUT]: Exports HandoffFigure — one Chat switching Agents mid-way, with three Chats by three Agents in the sidebar
 * [POS]: Static figure for the Handoff story; every string it prints is the product's own (divider, Undo, Usage limit)
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { AgentLogo, D, Stroke } from "../../icons";

const SKELETON = ["92%", "58%"];

export function HandoffFigure({ demo }: { demo: DemoData }) {
  const { handoff, chrome, chats } = demo.copy;
  const [plan, impl, test] = handoff.chats;
  const divider = handoff.divider.split("{agent}");
  /* 时长与状态借 releaseNotes / importTests 两条真 chat 的：这张图没有自己的
     一套数字，也不该有。 */
  const worked = demo.chats.find((chat) => chat.id === "import-tests")?.worked ?? demo.chats[0].worked;
  return (
    <div className="fig-panel hf">
      <div className="hf-side">
        <div className="hf-group">{chrome.projects}</div>
        <div className="hf-row">
          <span className="mark">
            <Stroke d={D.folder} size={14} width={1.9} />
          </span>
          <span className="title">{demo.project.name}</span>
        </div>
        <div className="hf-row hf-row--sub">
          <span className="mark"><AgentLogo backend="claude" /></span>
          <span className="title">{plan}</span>
        </div>
        <div className="hf-row hf-row--sub hf-row--on">
          <span className="mark"><AgentLogo backend="codex" /></span>
          <span className="title">{impl}</span>
        </div>
        <div className="hf-row hf-row--sub">
          <span className="mark"><AgentLogo backend="kimi" /></span>
          <span className="title">{test}</span>
        </div>
        <div className="hf-group" style={{ marginTop: 6 }}>{chrome.chats}</div>
        <div className="hf-row">
          <span className="mark"><AgentLogo backend="opencode" /></span>
          <span className="title">{chats.importTests.title}</span>
        </div>
      </div>

      <div className="hf-main">
        <div className="hf-head">
          <AgentLogo backend="codex" size={15} />
          <span>{impl}</span>
        </div>
        <div className="hf-chat">
          <div className="hf-bubble">{handoff.ask}</div>
          <div className="hf-worked">
            <AgentLogo backend="claude" size={11} />
            {chrome.workedFor.replace("{duration}", worked)}
            <Stroke d={D.chevronRight} size={11} width={2} />
          </div>
          <div className="hf-lines">
            {SKELETON.map((width) => (
              <span className="sk sk-bar" style={{ width }} key={width} />
            ))}
          </div>
          <div className="hf-divider">
            <span>
              <AgentLogo backend="codex" size={11} />
              {divider[0]}
              Codex
              {divider[1]}
            </span>
            <b>{handoff.undo}</b>
          </div>
          <div className="hf-status">
            <span className="hf-orb" />
            {chats.releaseNotes.status}
          </div>
        </div>
        <div className="hf-composer">
          <p>{chrome.askAnything}</p>
          <div className="hf-tools">
            <span className="hf-tool">
              <Stroke d={D.plus} size={13} width={2} />
            </span>
            <span className="hf-tool hf-tool--agent">
              <AgentLogo backend="codex" size={13} />
            </span>
            <span className="hf-send">
              <Stroke d={D.arrowUp} size={13} width={2.4} />
            </span>
          </div>
        </div>
        <div className="hf-menu">
          <div className="hf-menu-row">
            <span className="mark"><AgentLogo backend="codex" size={13} /></span>
            Codex
            <span className="hf-menu-check">
              <Stroke d={D.check} size={12} width={2.4} />
            </span>
          </div>
          <div className="hf-menu-row hf-menu-row--limit">
            <span className="mark"><AgentLogo backend="claude" size={13} /></span>
            Claude
            <span className="hf-menu-note">{handoff.usageLimit}</span>
          </div>
          <div className="hf-menu-row">
            <span className="mark"><AgentLogo backend="kimi" size={13} /></span>
            Kimi
          </div>
          <div className="hf-menu-row">
            <span className="mark"><AgentLogo backend="opencode" size={13} /></span>
            OpenCode
          </div>
        </div>
      </div>
    </div>
  );
}
