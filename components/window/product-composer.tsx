"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState，依赖 @/lib/agents 的
 *          BACKENDS/MODELS/backendLabel/effortLabel/compactModelLabel/Chat，
 *          依赖 ./product-model-menu 的 ProductModelMenu，
 *          依赖 ../icons 的 AgentLogo/Stroke/D
 * [OUTPUT]: 对外提供 ProductComposer 组件
 * [POS]: 产品窗口底部那只输入框。两行几何抄自 apps/desktop 的
 *        chat/composer：上行是编辑区，下行左侧工具、右侧 agent/模型/发送。
 *        agent 在等你回话时，输入框整只让位给问题卡——那是 chat-user-input-
 *        selector.tsx 的规矩：能做的只有回话，就别摆着一个能打字的框
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
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
} from "@/lib/agents";
import { AgentLogo, D, Stroke } from "../icons";
import { ProductModelMenu } from "./product-model-menu";

/* ── 浮层：一个原语，两处消费 ──────────────────────────────────────
 * agent 与模型两颗按钮的差别只有触发器的脸和面板里的内容，开合、关闭、
 * 锚定三件事完全一样。写两遍必然漂移成两种关法。
 * 菜单向上向右开：这一行贴着窗口底边，向下没有地方可去。
 * ────────────────────────────────────────────────────────── */
function Menu({
  open,
  onOpenChange,
  trigger,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onOpenChange]);

  return (
    <div className="menu-host" ref={host}>
      {trigger}
      {open ? children : null}
    </div>
  );
}

export function ProductComposer({
  chat,
  onAgent,
  onPatch,
}: {
  chat: Chat;
  onAgent: (agent: AgentId) => void;
  onPatch: (turn: Partial<Chat>) => void;
}) {
  const [openMenu, setOpenMenu] = useState<"agent" | "model" | "">("");

  if (chat.question) return <UserInputCard question={chat.question} />;

  const fast = Boolean(chat.fast);

  return (
    <div className="composer">
      <p className="composer-field">Ask anything</p>

      <div className="composer-tools">
        <span className="tool-round" aria-hidden>
          <Stroke d={D.plus} size={16} />
        </span>
        <span className="tool">
          <Stroke d={D.shieldCheck} size={16} />
          <span className="tool-name">Approve for me</span>
        </span>

        <div className="composer-right">
          <Menu
            open={openMenu === "agent"}
            onOpenChange={(open) => setOpenMenu(open ? "agent" : "")}
            trigger={
              <button
                type="button"
                className={`tool-round tool-btn${openMenu === "agent" ? " on" : ""}`}
                aria-label={`Current agent: ${backendLabel(chat.agent)}`}
                aria-expanded={openMenu === "agent"}
                title={backendLabel(chat.agent)}
                onClick={() => setOpenMenu(openMenu === "agent" ? "" : "agent")}
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
                    setOpenMenu("");
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
            open={openMenu === "model"}
            onOpenChange={(open) => setOpenMenu(open ? "model" : "")}
            trigger={
              <button
                type="button"
                className={`tool tool-btn${openMenu === "model" ? " on" : ""}`}
                aria-label={`Current model: ${chat.model}`}
                aria-expanded={openMenu === "model"}
                title={chat.effort ? `${chat.model} · ${effortLabel(chat.effort)}` : chat.model}
                onClick={() => setOpenMenu(openMenu === "model" ? "" : "model")}
              >
                {fast ? (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden
                    style={{ flex: "none" }}>
                    <path d={D.zap} />
                  </svg>
                ) : null}
                {/* 名长者让位：模型名省略，档位短且不可猜，整块保留。 */}
                <span className="tool-name">{compactModelLabel(chat.model)}</span>
                {chat.effort ? <span className="tool-dim">{effortLabel(chat.effort)}</span> : null}
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
              onClose={() => setOpenMenu("")}
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
function UserInputCard({ question }: { question: Question }) {
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
              {option.recommended ? <span className="ask-tag">Recommended</span> : null}
            </span>
            <span className="ask-desc">{option.description}</span>
          </button>
        ))}
        <button type="button" className="ask-other">
          <span className="ask-badge">
            <Stroke d={D.penLine} size={12} width={2} />
          </span>
          <span>None of these; tell the Agent another approach</span>
        </button>
      </div>
    </section>
  );
}
