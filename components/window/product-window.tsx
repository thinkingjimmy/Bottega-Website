"use client";

/**
 * [INPUT]: 依赖 react 的 useState，依赖 @/lib/agents 的
 *          CHATS/PROJECT/PINNED_APPS/LEDGER_APP/PROJECT_PAGE_SIZE/LEDGER/defaultTurn，
 *          依赖 ./product-transcript 与 ./product-composer，
 *          依赖 ../icons 的 AgentLogo/Stroke/Wordmark/D
 * [OUTPUT]: 对外提供 ProductWindow 组件
 * [POS]: Bottega-Website 首屏里那台机器。几何逐项抄自
 *        apps/desktop/src/components/sidebar 与 chat/composer、page-shell，
 *        不是眼量的近似——差 2px 就不像同一个产品
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useState } from "react";
import {
  CHATS,
  LEDGER,
  LEDGER_SUM,
  LEDGER_APP,
  PINNED_APPS,
  PROJECT,
  PROJECT_PAGE_SIZE,
  defaultTurn,
  type AgentId,
  type Chat,
} from "@/lib/agents";
import { AgentLogo, D, Stroke, Wordmark } from "../icons";
import { ProductComposer } from "./product-composer";
import { ProductTranscript } from "./product-transcript";

/* ── 行：一套词汇，三个宿主 ────────────────────────────────────────
 * 根级导航、Project 折叠区里的 chat、根级 Chats 分组里的 chat，在产品里
 * 本就是同一个 ChatThreadItem 被三处消费。缩进已经把「我是子行」说完了，
 * 行高再说一遍就成了第二种说法——而两种说法必然有一种多余。
 * ────────────────────────────────────────────────────────── */
function Row({
  mark,
  title,
  on,
  sub,
  dim,
  onClick,
}: {
  mark: React.ReactNode;
  title: string;
  on?: boolean;
  sub?: boolean;
  dim?: boolean;
  onClick?: () => void;
}) {
  const className = `row${on ? " on" : ""}${sub ? " sub" : ""}${dim ? " dim" : ""}`;
  const body = (
    <>
      <span className="mark">{mark}</span>
      <span className="title">{title}</span>
    </>
  );
  return onClick ? (
    <button type="button" className={className} onClick={onClick} aria-pressed={on}>
      {body}
    </button>
  ) : (
    <div className={className}>{body}</div>
  );
}

export function ProductWindow({
  surface,
  onSurface,
}: {
  surface: "chat" | "app";
  onSurface: (surface: "chat" | "app") => void;
}) {
  /* 一个 chat 的 agent/模型/档位是它自己的属性，不是选择器的局部状态：
     行首那枚 logo、页头那枚 logo、输入框那颗按钮读的都是这一个值，
     所以换 agent 时三处一起变，不必再有第二处去同步。 */
  const [chats, setChats] = useState<Chat[]>(CHATS);
  /* 默认落在 Codex 那条：它是 `modelOptions: "full"` 的唯一一家，
     首屏第一眼给出的就该是产品最完整的那张脸。 */
  const [openId, setOpenId] = useState(CHATS[0].id);
  const [limit, setLimit] = useState(PROJECT_PAGE_SIZE);

  const open = chats.find((chat) => chat.id === openId) ?? chats[0];
  const project = chats.filter((chat) => chat.home === "project");
  const rest = project.length - limit;
  const isApp = surface === "app";

  const patch = (turn: Partial<Chat>) =>
    setChats((current) =>
      current.map((chat) => (chat.id === openId ? { ...chat, ...turn } : chat))
    );

  const pick = (id: string) => {
    setOpenId(id);
    onSurface("chat");
  };

  const chatRow = (chat: Chat, sub: boolean) => (
    <Row
      key={chat.id}
      mark={<AgentLogo backend={chat.agent} />}
      title={chat.title}
      on={!isApp && chat.id === openId}
      sub={sub}
      onClick={() => pick(chat.id)}
    />
  );

  return (
    <div className="window rise">
      <aside className="win-sidebar">
        {/* mac 的折叠钮浮在红绿灯旁，Windows 才把它收回 logo 右侧。 */}
        <div className="traffic">
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
          <span className="icon-slot">
            <Stroke d={D.panelRight} size={16} width={1.5} />
          </span>
        </div>

        <div className="brand">
          <Wordmark height={26} />
          <span className="icon-slot">
            <Stroke d={D.search} size={16} width={1.9} />
          </span>
          <span className="icon-slot">
            <Stroke d={D.bell} size={16} width={1.9} />
          </span>
        </div>

        <div className="sidebar-nav">
          <Row mark={<Stroke d={D.squarePen} size={16} width={1.9} />} title="New chat" />
          <Row
            mark={<Stroke d={D.grid} size={16} width={1.9} />}
            title="Apps"
            on={isApp}
            onClick={() => onSurface("app")}
          />
          {PINNED_APPS.map((app) => (
            <Row
              key={app.id}
              mark={<span className="emoji">{app.icon}</span>}
              title={app.name}
              sub
              on={isApp && app.id === LEDGER_APP.id}
              onClick={() => onSurface("app")}
            />
          ))}
        </div>

        {/* 行首那枚痕迹就是 agent 的 logo——「谁在干这活」在产品里从来
            不用问，看一眼行首就知道。这块屏最要紧的就是这件事。 */}
        <div className="sidebar-scroll">
          <p className="group-label">Projects</p>
          <Row mark={<Stroke d={D.folder} size={16} width={1.9} />} title={PROJECT.name} />
          {project.slice(0, limit).map((chat) => chatRow(chat, true))}
          {/* 站在列表里当一行，而不是浮在列表外当一个控件：它的位置就是
              「下面还有」这句话本身。弱前景色说明这一行不是其中一员，
              是通往其中的门。 */}
          {rest > 0 ? (
            <Row
              mark={<Stroke d={D.chevronDown} size={16} width={1.9} />}
              title="Show more"
              sub
              dim
              onClick={() => setLimit((current) => current + PROJECT_PAGE_SIZE)}
            />
          ) : null}

          <p className="group-label">Chats</p>
          {chats.filter((chat) => chat.home === "chats").map((chat) => chatRow(chat, false))}
        </div>

        <div className="sidebar-foot">
          <Row mark={<Stroke d={D.settings} size={16} width={1.9} />} title="Settings" />
        </div>
      </aside>

      <div className="win-main">
        <div className="win-head">
          <span className="mark">
            {isApp ? <span className="emoji">{LEDGER_APP.icon}</span> : <AgentLogo backend={open.agent} />}
          </span>
          <span className="win-title">{isApp ? LEDGER_APP.name : open.title}</span>
          <span className="icon-slot" style={{ marginLeft: "auto" }}>
            <Stroke d={D.panelRight} size={16} width={1.5} />
          </span>
        </div>

        {isApp ? (
          <AppSurface />
        ) : (
          <>
            <ProductTranscript chat={open} />
            <ProductComposer
              chat={open}
              onAgent={(agent: AgentId) => patch({ agent, ...defaultTurn(agent) })}
              onPatch={patch}
            />
          </>
        )}
      </div>
    </div>
  );
}

/** App 表面：取自 apps/desktop/src/components/bases/views/table */
function AppSurface() {
  return (
    <>
      <div className="tabs">
        <span className="on">Ledger</span>
        <span>Analysis</span>
        <span>By month</span>
      </div>
      <div className="grid-row head">
        <span className="c-date">Date</span>
        <span className="c-amount">Amount</span>
        <span className="c-cat">Category</span>
        <span className="c-note">Note</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {LEDGER.map((record) => (
          <div className="grid-row" key={record.date}>
            <span className="c-date mono">{record.date}</span>
            <span className="c-amount mono">{record.amount}</span>
            <span className="c-cat">
              <span className="tag">{record.category}</span>
            </span>
            <span className="c-note">{record.note}</span>
          </div>
        ))}
      </div>
      <div className="grid-row foot">
        <span className="c-date">{LEDGER.length} records</span>
        <span className="c-amount mono">
          <span style={{ color: "var(--app-muted-fg)", fontSize: 11 }}>SUM</span>
          {LEDGER_SUM}
        </span>
        <span className="c-note" />
      </div>
    </>
  );
}
