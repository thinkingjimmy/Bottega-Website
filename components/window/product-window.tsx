"use client";

/**
 * [INPUT]: Uses React state, localized DemoData, transcript/composer/Plan modules, and product icons
 * [OUTPUT]: Exports ProductWindow with localized surfaces and optional persistent Composer disclosure
 * [POS]: Canonical product-window implementation shared by Home and Agents feature illustrations
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useState } from "react";
import {
  defaultTurn,
  type AgentId,
  type Chat,
  type DemoData,
} from "@/lib/agents";
import { AgentLogo, D, Stroke, Wordmark } from "../icons";
import { ProductComposer } from "./product-composer";
import { ProductPlanPanel } from "./product-plan-panel";
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
  pinnedComposerMenu,
  surface,
  onSurface,
  demo,
}: {
  pinnedComposerMenu?: "agent" | "model";
  surface: "chat" | "app";
  onSurface?: (surface: "chat" | "app") => void;
  demo: DemoData;
}) {
  /* 一个 chat 的 agent/模型/档位是它自己的属性，不是选择器的局部状态：
     行首那枚 logo、页头那枚 logo、输入框那颗按钮读的都是这一个值，
     所以换 agent 时三处一起变，不必再有第二处去同步。 */
  const [chats, setChats] = useState<Chat[]>(demo.chats);
  /* 默认落在 Codex 那条：它是 `modelOptions: "full"` 的唯一一家，
     首屏第一眼给出的就该是产品最完整的那张脸。 */
  const [openId, setOpenId] = useState(demo.chats[0].id);
  const [limit, setLimit] = useState(demo.projectPageSize);
  /* 第三栏开在哪条 chat 上——不是一个 boolean。产品里侧栏是会话自己的
     属性（SidePanelState 挂在 session 上），所以换走再换回来，它还开着；
     记成 boolean 就得在换会话、换表面两处各写一句「顺手关掉」，而两句
     顺手迟早有一句忘了写。 */
  const [planChatId, setPlanChatId] = useState<string | null>(null);

  const open = chats.find((chat) => chat.id === openId) ?? chats[0];
  const project = chats.filter((chat) => chat.home === "project");
  const rest = project.length - limit;
  const isApp = surface === "app";
  const planChat = chats.find((chat) => chat.id === planChatId) ?? null;
  const planOpen = !isApp && planChatId === open.id;
  const chrome = demo.copy.chrome;

  const patch = (turn: Partial<Chat>) =>
    setChats((current) =>
      current.map((chat) => (chat.id === openId ? { ...chat, ...turn } : chat))
    );

  const pick = (id: string) => {
    setOpenId(id);
    onSurface?.("chat");
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
          <Row mark={<Stroke d={D.squarePen} size={16} width={1.9} />} title={chrome.newChat} />
          <Row
            mark={<Stroke d={D.grid} size={16} width={1.9} />}
            title={chrome.apps}
            on={isApp}
            onClick={onSurface ? () => onSurface("app") : undefined}
          />
          {demo.pinnedApps.map((app) => (
            <Row
              key={app.id}
              mark={<span className="emoji">{app.icon}</span>}
              title={app.name}
              sub
              on={isApp && app.id === demo.ledgerApp.id}
              onClick={onSurface ? () => onSurface("app") : undefined}
            />
          ))}
        </div>

        {/* 行首那枚痕迹就是 agent 的 logo——「谁在干这活」在产品里从来
            不用问，看一眼行首就知道。这块屏最要紧的就是这件事。 */}
        <div className="sidebar-scroll">
          <p className="group-label">{chrome.projects}</p>
          <Row mark={<Stroke d={D.folder} size={16} width={1.9} />} title={demo.project.name} />
          {project.slice(0, limit).map((chat) => chatRow(chat, true))}
          {/* 站在列表里当一行，而不是浮在列表外当一个控件：它的位置就是
              「下面还有」这句话本身。弱前景色说明这一行不是其中一员，
              是通往其中的门。 */}
          {rest > 0 ? (
            <Row
              mark={<Stroke d={D.chevronDown} size={16} width={1.9} />}
              title={chrome.showMore}
              sub
              dim
              onClick={() => setLimit((current) => current + demo.projectPageSize)}
            />
          ) : null}

          <p className="group-label">{chrome.chats}</p>
          {chats.filter((chat) => chat.home === "chats").map((chat) => chatRow(chat, false))}
        </div>

        <div className="sidebar-foot">
          <Row mark={<Stroke d={D.settings} size={16} width={1.9} />} title={chrome.settings} />
        </div>
      </aside>

      <div className="win-main">
        <div className="win-head">
          <span className="mark">
            {isApp ? <span className="emoji">{demo.ledgerApp.icon}</span> : <AgentLogo backend={open.agent} />}
          </span>
          <span className="win-title">{isApp ? demo.ledgerApp.name : open.title}</span>
          <span className="icon-slot" style={{ marginLeft: "auto" }}>
            <Stroke d={D.panelRight} size={16} width={1.5} />
          </span>
        </div>

        {isApp ? (
          <AppSurface demo={demo} />
        ) : (
          <>
            <ProductTranscript
              chat={open}
              planOpen={planOpen}
              onPlan={() => setPlanChatId((current) => (current === open.id ? null : open.id))}
              copy={chrome}
            />
            <ProductComposer
              chat={open}
              pinnedMenu={pinnedComposerMenu}
              onAgent={(agent: AgentId) => patch({ agent, ...defaultTurn(agent) })}
              onPatch={patch}
              copy={demo.copy}
            />
          </>
        )}
      </div>

      <ProductPlanPanel
        plan={planChat?.plan ?? null}
        open={planOpen}
        onClose={() => setPlanChatId(null)}
        closeLabel={chrome.closePlan}
      />
    </div>
  );
}

/** App 表面：取自 apps/desktop/src/components/bases/views/table */
function AppSurface({ demo }: { demo: DemoData }) {
  const copy = demo.copy.chrome;
  return (
    <>
      <div className="tabs">
        <span className="on">{copy.ledger}</span>
        <span>{copy.analysis}</span>
        <span>{copy.byMonth}</span>
      </div>
      <div className="grid-row head">
        <span className="c-date">{copy.date}</span>
        <span className="c-amount">{copy.amount}</span>
        <span className="c-cat">{copy.category}</span>
        <span className="c-note">{copy.note}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {demo.ledger.map((record) => (
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
        <span className="c-date">{copy.records.replace("{count}", String(demo.ledger.length))}</span>
        <span className="c-amount mono">
          <span style={{ color: "var(--app-muted-fg)", fontSize: 11 }}>{copy.sum.toUpperCase()}</span>
          {demo.ledgerSum}
        </span>
        <span className="c-note" />
      </div>
    </>
  );
}
