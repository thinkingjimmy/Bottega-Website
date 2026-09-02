"use client";

/**
 * [INPUT]: Uses React state, localized demo copy, stable Agent/model capabilities, and product icons
 * [OUTPUT]: Exports ProductComposer with optional persistent Agent or model disclosure
 * [POS]: Canonical localized two-row Composer used by every ProductWindow presentation
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useRef, useState } from "react";
import {
  BACKENDS,
  backendLabel,
  compactModelLabel,
  effortLabel,
  type AgentId,
  type Chat,
  type Question,
  type DemoData,
} from "@/lib/agents";
import { AgentLogo, D, Stroke } from "../icons";
import { ProductModelMenu } from "./product-model-menu";

/* ── 浮层：一个原语，两处消费 ──────────────────────────────────────
 * agent 与模型两颗按钮的差别只有触发器的脸和面板里的内容，开合、关闭、
 * 锚定三件事完全一样。写两遍必然漂移成两种关法。
 * 菜单向上向右开：这一行贴着窗口底边，向下没有地方可去。
 * ────────────────────────────────────────────────────────── */
function Menu({
  dismissible = true,
  open,
  onOpenChange,
  trigger,
  children,
}: {
  dismissible?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !dismissible) return;
    const dismiss = (event: Event) => {
      if (!host.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [dismissible, open, onOpenChange]);

  return (
    <div className="menu-host" ref={host}>
      {trigger}
      {open ? children : null}
    </div>
  );
}

export function ProductComposer({
  chat,
  pinnedMenu,
  onAgent,
  onPatch,
  copy,
}: {
  chat: Chat;
  pinnedMenu?: "agent" | "model";
  onAgent: (agent: AgentId) => void;
  onPatch: (turn: Partial<Chat>) => void;
  copy: DemoData["copy"];
}) {
  const [openMenu, setOpenMenu] = useState<"agent" | "model" | "">("");
  const visibleMenu = pinnedMenu ?? openMenu;
  const changeMenu = (menu: "agent" | "model" | "") => {
    if (!pinnedMenu) setOpenMenu(menu);
  };

  if (chat.question) return <UserInputCard question={chat.question} copy={copy.chrome} />;

  const fast = Boolean(chat.fast);

  return (
    <div className="composer">
      <p className="composer-field">{copy.chrome.askAnything}</p>

      <div className="composer-tools">
        <span className="tool-round" aria-hidden>
          <Stroke d={D.plus} size={16} />
        </span>
        <span className="tool">
          <Stroke d={D.shieldCheck} size={16} />
          <span className="tool-name">{copy.chrome.approveForMe}</span>
        </span>

        <div className="composer-right">
          <Menu
            dismissible={!pinnedMenu}
            open={visibleMenu === "agent"}
            onOpenChange={(open) => changeMenu(open ? "agent" : "")}
            trigger={
              <button
                type="button"
                className={`tool-round tool-btn${visibleMenu === "agent" ? " on" : ""}`}
                aria-label={copy.chrome.currentAgent.replace("{name}", backendLabel(chat.agent))}
                aria-expanded={visibleMenu === "agent"}
                title={backendLabel(chat.agent)}
                onClick={() => changeMenu(visibleMenu === "agent" ? "" : "agent")}
              >
                <AgentLogo backend={chat.agent} size={16} />
              </button>
            }
          >
            <div className="menu-panel">
              {BACKENDS.map((backend) => (
                <button
                  type="button"
                  key={backend.id}
                  className="menu-item"
                  aria-pressed={backend.id === chat.agent}
                  onClick={() => {
                    /* 换 agent 就换目录：模型、档位、Fast 一起落回新家的
                       默认值。那条规则住在数据层，此处只负责关菜单。 */
                    onAgent(backend.id);
                    changeMenu("");
                  }}
                >
                  <span className="menu-item-body">
                    <AgentLogo backend={backend.id} size={16} />
                    <span>{backend.label}</span>
                  </span>
                  <span className="menu-check">
                    {backend.id === chat.agent ? <Stroke d={D.check} size={15} /> : null}
                  </span>
                </button>
              ))}
            </div>
          </Menu>

          <Menu
            dismissible={!pinnedMenu}
            open={visibleMenu === "model"}
            onOpenChange={(open) => changeMenu(open ? "model" : "")}
            trigger={
              <button
                type="button"
                className={`tool tool-btn${visibleMenu === "model" ? " on" : ""}`}
                aria-label={copy.chrome.currentModel.replace("{name}", chat.model)}
                aria-expanded={visibleMenu === "model"}
                title={chat.effort ? `${chat.model} · ${effortLabel(chat.effort, copy.model.efforts)}` : chat.model}
                onClick={() => changeMenu(visibleMenu === "model" ? "" : "model")}
              >
                {fast ? (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden
                    style={{ flex: "none" }}>
                    <path d={D.zap} />
                  </svg>
                ) : null}
                {/* 名长者让位：模型名省略，档位短且不可猜，整块保留。 */}
                <span className="tool-name">{compactModelLabel(chat.model)}</span>
                {chat.effort ? <span className="tool-dim">{effortLabel(chat.effort, copy.model.efforts)}</span> : null}
                <Stroke d={D.chevronDown} size={16} />
              </button>
            }
          >
            <ProductModelMenu
              agent={chat.agent}
              model={chat.model}
              effort={chat.effort}
              fast={fast}
              onTurn={onPatch}
              onFast={(next) => onPatch({ fast: next })}
              onClose={() => changeMenu("")}
              copy={copy.model}
            />
          </Menu>

          <span className="send" aria-hidden>
            <Stroke d={D.arrowUp} size={18} width={2} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 问题卡 ──────────────────────────────────────────────────────
 * 徽章直径 = 它对齐的那一行的行高（20px 对 20px 的标题行）：徽章上下沿
 * 正好扣在标题行盒上，越不进描述行。数不是拍的，是这条律推出来的。
 * 整行就是按钮，所以行尾不再画一枚「点了就走」的箭头——那句话整行已经
 * 说过了，再说一遍只会把每一行都拉成满宽，标题与箭头之间裂开一片空白。
 * ────────────────────────────────────────────────────────── */
function UserInputCard({ question, copy }: { question: Question; copy: DemoData["copy"]["chrome"] }) {
  const [picked, setPicked] = useState("");
  return (
    <section className="ask-card">
      <div className="ask-head">
        <div className="ask-title">
          <p className="ask-eyebrow">{question.eyebrow}</p>
          <h2>{question.question}</h2>
        </div>
        <span className="icon-slot">
          <Stroke d={D.x} size={16} width={1.9} />
        </span>
      </div>
      <div className="ask-options">
        {question.options.map((option, index) => (
          <button
            type="button"
            key={option.label}
            className={`ask-option${option.recommended || picked === option.label ? " lit" : ""}`}
            aria-pressed={picked === option.label}
            onClick={() => setPicked(option.label)}
          >
            <span className="ask-badge">
              {picked === option.label ? <Stroke d={D.check} size={12} width={2.4} /> : index + 1}
            </span>
            <span className="ask-label">
              <span>{option.label}</span>
              {option.recommended ? <span className="ask-tag">{copy.recommended}</span> : null}
            </span>
            <span className="ask-desc">{option.description}</span>
          </button>
        ))}
        <button type="button" className="ask-other">
          <span className="ask-badge">
            <Stroke d={D.penLine} size={12} width={2} />
          </span>
          <span>{copy.anotherApproach}</span>
        </button>
      </div>
    </section>
  );
}
