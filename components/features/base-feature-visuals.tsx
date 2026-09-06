/**
 * [INPUT]: Uses localized DemoData, the shared receipt drawing, the animated six-view figure, and product icons
 * [OUTPUT]: Exports the receipt-to-row figure, the two-Chat figure, and the Base section figure order
 * [POS]: Product-faithful visual evidence for the Base feature page; both static figures are inert
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { ReactNode } from "react";

import type { DemoData } from "@/lib/agents";
import { D, Stroke, glyph } from "../icons";
import { Receipt } from "./base-receipt";
import { BaseViewsFigure } from "./base-views-figure";

/* ── 十枚列类型 ──────────────────────────────────────────────────
 * 顺序与图标逐项抄自 bases/chrome/base-toolbar.tsx 的 COLUMN_TYPES，
 * 名字取产品自己的 bases.columnType.*。挑一套形近的图形或另编一版译名，
 * 「这就是产品里那十种」这句话就少了一份证据。
 * ────────────────────────────────────────────────────────── */
const COLUMN_TYPE_ICONS = [
  "type", "hash", "calendar", "check", "squareCheck",
  "link", "mapPin", "image", "sigma", "gitFork",
];

/* 记账那四列。四列是 resources/skills/base-ops 自己举的例子，不是这一页编的。 */
const LEDGER_COLUMNS = [
  { key: "date", icon: D.calendar },
  { key: "amount", icon: D.hash },
  { key: "category", icon: D.check },
  { key: "note", icon: D.type },
] as const;

/* 视图配置条上那四颗，与首屏那一支同一组。 */
const BAR_ACTIONS = [D.funnel, D.columns3, D.sortAsc, D.moreHorizontal] as const;

function Figure({
  label,
  caption,
  children,
  aside,
}: {
  label: string;
  caption: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <figure className="bfd-figure">
      <div className="bfd-visual" role="img" aria-label={label} inert>
        {children}
      </div>
      {aside}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* 工具行照转录里那截过程展开后的样子：16px 痕迹槽 + 一行等宽名字。
   四行同一枚标记：它们同属 Base 这一个工具域，各配一枚形近的图标反而
   会读成「四件不同的事」。 */
function Tool({ name }: { name: string }) {
  return (
    <p className="trace bfd-tool">
      <span className="mark"><Stroke d={D.table} size={13} width={1.8} /></span>
      <span>{name}</span>
    </p>
  );
}

/* 附件照 transcript/chat-user-attachments.tsx：64px 方块、圆角 6、靠右，
   压在那句话上面——真产品里图就在气泡之上，不在气泡里。 */
function Attachment() {
  return (
    <div className="bfd-attachments">
      <span className="bfd-thumb"><Receipt size={64} /></span>
    </div>
  );
}

/* 侧栏行的词汇与产品同一套：32px 行高、8px 内边距、16px 痕迹槽。 */
function ChatRow({ name, open }: { name: string; open?: boolean }) {
  return (
    <div className={`bfd-side-row${open ? " is-open" : ""}`}>
      <span className="mark"><Stroke d={D.message} size={14} width={1.8} /></span>
      <span className="bfd-side-title">{name}</span>
    </div>
  );
}

/* 一张表的样子：表头 + 若干行 + 汇总条。行数由外面给，因为两张图里
   它一次是九行一次是三行——而「一行长什么样」只该定义一次。 */
function Ledger({
  demo,
  rows,
  lit,
}: {
  demo: DemoData;
  rows: DemoData["ledgerLong"];
  lit?: string;
}) {
  const { chrome } = demo.copy;
  return (
    <div className="bfd-grid">
      <div className="bfd-rows">
        <div className="bfd-row bfd-row-head">
          {LEDGER_COLUMNS.map((column) => (
            <span className={`bfd-c bfd-c-${column.key}`} key={column.key}>
              <Stroke d={column.icon} size={12} width={1.8} />
              {chrome[column.key]}
            </span>
          ))}
          {/* 表头末尾那枚「＋」是产品里真有的加列钮：四列不是全部，
              它自己说得出这件事，图注不必再说一遍。 */}
          <span className="bfd-c bfd-c-add"><Stroke d={D.plus} size={13} width={1.8} /></span>
        </div>
        {rows.map((row) => (
          <div className={`bfd-row${row.date === lit ? " is-lit" : ""}`} key={row.date}>
            <span className="bfd-c bfd-c-date">{row.date}</span>
            <span className="bfd-c bfd-c-amount">{row.amount}</span>
            <span className="bfd-c bfd-c-category">{row.category}</span>
            <span className="bfd-c bfd-c-note">{row.note}</span>
            <span className="bfd-c bfd-c-add" />
          </div>
        ))}
      </div>
      {/* 汇总的是整本账，不是露脸的这几行——一条只统计可见行的汇总条，
          是产品里不存在的那种表。 */}
      <div className="bfd-row bfd-row-foot">
        <span className="bfd-c bfd-c-date"><i>{chrome.sum}</i></span>
        <span className="bfd-c bfd-c-amount">{demo.ledgerLongSum}</span>
        <span className="bfd-c bfd-c-category" />
        <span className="bfd-c bfd-c-note" />
        <span className="bfd-c bfd-c-add" />
      </div>
    </div>
  );
}

/* ── 01 · 一张小票，一行记录 ─────────────────────────────────────
 * 左边一栏对话，右边一栏 Base。这不是版式选择，是产品的事实：Base 不是
 * 另开的一扇窗，它是这条 Chat 的第三栏（见 chat/side-panel）——所以对话
 * 那一栏要画实：抬头、附件、气泡、过程、回答、输入框，一样都不能省成骨架。
 * 省掉输入框，读到的就是一张截图；留着它，读到的才是一台还能接着说话的机器。
 *
 * 小票上的钱与新增那一行的钱是同一个数。这是这张图唯一的机关：它证明
 * 那一行是从这张图里读出来的，而不是替产品说了一句好听的话。
 * ────────────────────────────────────────────────────────── */
export function BaseReceiptDemo({ demo }: { demo: DemoData }) {
  const copy = demo.copy.baseVisual;
  const row = demo.ledgerLong[0];
  const reply = copy.replyReceipt.replace(
    "{row}",
    `${row.date} · ${row.amount} · ${row.category}`
  );
  return (
    <Figure
      label={copy.schemaLabel}
      caption={copy.schemaCaption}
      aside={
        <ul className="bfd-types">
          <li className="bfd-types-label mono">{copy.typesLabel}</li>
          {COLUMN_TYPE_ICONS.map((icon, at) => (
            <li key={icon}>
              <Stroke d={glyph(icon)} size={14} width={1.8} />
              {copy.columnTypes[at]}
            </li>
          ))}
        </ul>
      }
    >
      <div className="bfd-schema">
        <div className="bfd-chat">
          <header className="bfd-chat-head">
            <span className="bfd-chat-name">{copy.chatLedger}</span>
            {/* 第三栏是被这颗钮拉开的——它在这儿，「Base 为什么在旁边」
                就不需要另写一句话。 */}
            <span className="icon-slot"><Stroke d={D.panelRight} size={15} width={1.8} /></span>
          </header>
          <div className="bfd-chat-body">
            <Attachment />
            <p className="bubble">{copy.askReceipt}</p>
            <Tool name="base_describe" />
            <Tool name="base_insert_rows" />
            <div className="reply"><p>{reply}</p></div>
          </div>
          <div className="bfd-composer">
            <span className="icon-slot"><Stroke d={D.plus} size={15} width={1.9} /></span>
            <span className="bfd-composer-rest" />
            <span className="bfd-send"><Stroke d={D.arrowUp} size={14} width={2.2} /></span>
          </div>
        </div>

        <div className="bfd-work">
          <div className="bfd-bar">
            <div className="bfd-tabs">
              <span className="bfd-tab is-on">
                <Stroke d={D.table} size={13} width={1.8} />
                {copy.viewNames[0]}
              </span>
              <span className="bfd-bar-icon"><Stroke d={D.plus} size={14} width={1.8} /></span>
            </div>
            <div className="bfd-bar-actions">
              {BAR_ACTIONS.map((icon) => (
                <span className="bfd-bar-icon" key={icon}>
                  <Stroke d={icon} size={14} width={1.8} />
                </span>
              ))}
            </div>
          </div>
          {/* 整本账都交给它，露几行由画框说了算：一张十八行的表在十行的
              框里，那道裁边就是「下面还有」这句话，而一片空白说不出来。 */}
          <Ledger demo={demo} rows={demo.ledgerLong} lit={row.date} />
        </div>
      </div>
    </Figure>
  );
}

/* ── 03 · 一张小票进去，一个总数出来 ─────────────────────────────
 * 与 Agents 那张交接图同一套词汇：三帧同一处工作区错落摆开，折线串起来，
 * 让开的半边写批注。不同的是那边三帧是三条 Chat 的接力，这边中间那一帧
 * 不是 Chat 而是 Base——所以两跳不是「转交」，是「写进去」与「读出来」。
 *
 * 笔形按关系分：折线走结构（两跳是同一种事，用同一种线），直线走指认
 * （这句批注说的是那个东西）。一种笔形从头画到尾，读起来就是一台机器在画。
 *
 * 批注不是界面的一部分，它是站在界面旁边说话的那个人，所以它用手写体，
 * 而不是把产品的字号缩小。
 * ────────────────────────────────────────────────────────── */
const INK = [
  /* 指认：这枚方块是那张小票 */
  "M606 108 L514 78",
  "M523.1 87.3 L514 78 L526.9 76.9",
  /* 结构：记账那条 Chat 写进 Base */
  "M250 208 V236 Q250 254, 268 254 H422 Q440 254, 440 272 V296",
  "M434.2 284.4 L440 296 L445.8 284.4",
  /* 结构：另一条 Chat 从同一张 Base 读出来 */
  "M520 568 V596 Q520 614, 502 614 H318 Q300 614, 300 632 V664",
  "M294.2 652.4 L300 664 L305.8 652.4",
  /* 指认：这个总数就是上面那张表汇总条上的数 */
  "M596 770 L520 830",
  "M532.7 827 L520 830 L525.8 818.4",
];

function Note({ kind, text }: { kind: string; text: string }) {
  const lines = text.split("\n");
  return (
    <p className={`bfd-note bfd-note--${kind}`}>
      {/* 行序即键：两句批注写成同一行字是允许的，拿正文当键就会撞。 */}
      {lines.map((line, at) => (
        <span key={`${kind}-${at}`}>
          {at > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </p>
  );
}

export function BaseChatsDemo({ demo }: { demo: DemoData }) {
  const copy = demo.copy.baseVisual;
  const rows = demo.ledgerLong;
  const row = rows[0];
  const receiptReply = copy.replyReceipt.replace(
    "{row}",
    `${row.date} · ${row.amount} · ${row.category}`
  );
  const monthlyReply = copy.replyMonthly
    .replace("{count}", String(rows.length))
    .replace("{sum}", demo.ledgerLongSum);
  return (
    <Figure label={copy.chatsLabel} caption={copy.chatsCaption}>
      <div className="bfd-chats">
        {/* 笔画整幅一张，坐标全用 860×880 的绝对值——每根线各住一只小 svg、
            各算各的局部坐标时，「起点没对上、终点没落上」是迟早的：对齐若要
            靠人算两遍，它迟早对不上。起止点直接从卡片矩形推出来。 */}
        <svg
          className="bfd-ink"
          viewBox="0 0 860 880"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {INK.map((d) => <path d={d} key={d} vectorEffect="non-scaling-stroke" />)}
        </svg>

        <article className="bfd-card bfd-card--1">
          <div className="bfd-card-side">
            <ChatRow name={copy.chatLedger} open />
            <ChatRow name={copy.chatMonthly} />
          </div>
          <div className="bfd-card-main">
            <Attachment />
            <p className="bubble">{copy.askReceipt}</p>
            <div className="reply"><p>{receiptReply}</p></div>
          </div>
        </article>

        {/* 中间这一帧不是 Chat。project: 是 ownerKey 的真前缀，不是为这张图
            起的标签——它说清了这些行归谁，于是下面那条 Chat 够得着它这件事
            不需要另画一根「共享」的线。 */}
        <div className="bfd-card bfd-card--2">
          <p className="bfd-store-owner">
            <span className="mono">project:</span>
            {copy.baseOwner}
          </p>
          <Ledger demo={demo} rows={rows.slice(0, 5)} lit={row.date} />
        </div>

        <article className="bfd-card bfd-card--3">
          <div className="bfd-card-side">
            <ChatRow name={copy.chatLedger} />
            <ChatRow name={copy.chatMonthly} open />
          </div>
          <div className="bfd-card-main">
            <p className="bubble">{copy.askMonthly}</p>
            <div className="reply"><p>{monthlyReply}</p></div>
          </div>
        </article>

        <Note kind="file" text={copy.noteFile} />
        <Note kind="store" text={copy.noteStore} />
        <Note kind="reuse" text={copy.noteReuse} />
        <Note kind="same" text={copy.noteSame} />
      </div>
    </Figure>
  );
}

/** 三节正文，三张图，按 catalog 里 base.sections 的顺序排。 */
export function baseSectionFigures(demo: DemoData): ReactNode[] {
  return [
    <BaseReceiptDemo demo={demo} key="receipt" />,
    <BaseViewsFigure demo={demo} key="views" />,
    <BaseChatsDemo demo={demo} key="chats" />,
  ];
}
