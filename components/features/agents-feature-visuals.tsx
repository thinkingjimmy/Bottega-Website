/**
 * [INPUT]: Uses localized DemoData, the canonical ProductWindow, shared Agent logos, skeleton primitives, and product icons
 * [OUTPUT]: Exports localized Agent picker, capability matrix, and the annotated cross-Agent handoff sketch
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

function MatrixStatus({ value }: { value: string }) {
  return <span className="afd-status">{value}</span>;
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
        {copy.rows.map((row) => (
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

/* ── 交接图例：三帧同一台机器 + 两跳折线 ──────────────────────────
 * 窗口的壳整只撤掉——红绿灯、字标、设置、输入框都不是这一节要讲的事，
 * 留着只是把每张卡撑宽。剩下两样：**有哪几条 Chat**（行首那枚标记就是它的
 * Agent）与**这条 Chat 里此刻在说什么**，而跨 Agent 协作要讲的正好就是这两样。
 *
 * 卡片左右左错落，是因为规整的三段竖排读起来像一张流程图；拐一个弯，那个弯
 * 本身就是「换了一条 Chat」。让开的半边留给手写批注——批注不是界面的一部分，
 * 它是站在界面旁边说话的那个人，所以它用手写体，而不是把产品的字号缩小。
 *
 * 入站消息那行抬头不是为这一页编的说明，是 relayInputText 的原文：产品里
 * 一次交接就是另一条 Chat 往你的转录里写了一条 user 消息。「可见交接」因此
 * 不需要一枚 pill 来声明——那行字自己就是。
 * ────────────────────────────────────────────────────────── */

/** 演示用的 Section id：产品里它们是随机的，这里定死好让两跳互相对得上。 */
const RELAY_ID = { plan: "sec_7f2a3c", impl: "sec_91b4e0" } as const;

const relayText = (template: string, name: string, id: string) =>
  template.replace("{name}", name).replace("{id}", id);

/** 骨架条借站点自己那一副（reels/shared.css 的 .sk），不另起一套。 */
function Bar({ w }: { w: string }) {
  return <span className="sk" style={{ width: w, height: 7 }} />;
}

/* 上一轮留一段骨架。转录里只摆一件东西，读起来是「空」，不是「省略」。
   三条恒定，只有第一条换脸——它必须比转录高出一截，好让顶上被裁掉半条：
   「上面还有」这句话是那道裁边说的，摆得整整齐齐的一块灰说不出来。 */
function History({ bubble }: { bubble?: boolean }) {
  return (
    <div className="afd-sk-stack">
      {bubble ? <span className="sk sk-bubble" /> : <Bar w="88%" />}
      <Bar w="94%" />
      <Bar w="66%" />
    </div>
  );
}

function ChatRow({
  agent,
  title,
  open,
  running,
}: {
  agent: AgentId;
  title: string;
  open?: boolean;
  running?: boolean;
}) {
  return (
    <div className={`afd-cd-row${open ? " is-open" : ""}`}>
      <span className="mark"><AgentLogo backend={agent} size={16} /></span>
      <span className="afd-cd-title">{title}</span>
      {running ? <span className="afd-orb" /> : null}
    </div>
  );
}

/* 入站消息就是一条普通的 user 气泡——抬头是真话，正文让给骨架。
   .bubble 借产品窗口那一条，几何一个数都不必新定。 */
function Relay({ text }: { text: string }) {
  return (
    <div className="bubble afd-cd-relay">
      <p>{text}</p>
      <div className="afd-sk-stack"><Bar w="100%" /><Bar w="70%" /></div>
    </div>
  );
}

function Card({
  step,
  open,
  copy,
  children,
  queue,
}: {
  step: 1 | 2 | 3;
  open: "plan" | "impl";
  copy: DemoData["copy"]["agentsVisual"];
  children: ReactNode;
  queue?: string;
}) {
  return (
    <article className={`afd-cd afd-cd--${step}`}>
      <div className="afd-cd-side">
        <ChatRow agent="claude" title={copy.chatPlan} open={open === "plan"} />
        <ChatRow agent="codex" title={copy.chatImpl} open={open === "impl"} running={open === "impl"} />
      </div>
      <div className="afd-cd-main">
        <div className="afd-cd-chat">{children}</div>
        {queue ? (
          <div className="afd-cd-queue">
            <span className="icon-slot"><Stroke d={D.grip} size={14} width={2} /></span>
            <p>{queue}</p>
            <span className="icon-slot"><Stroke d={D.cornerDownRight} size={14} width={2} /></span>
            <span className="icon-slot"><Stroke d={D.trash} size={14} width={2} /></span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/* ── 笔画 ────────────────────────────────────────────────────────
 * 一张整幅画布，坐标全用 860×900 的绝对值——上一版每根线各住一只小 svg、
 * 各算各的局部坐标，「起点没对上、终点没落上」就是这么来的：对齐若要靠人
 * 算两遍，它迟早对不上。起止点直接从卡片矩形推出来。
 *
 * 笔形按关系分：折线走结构（两跳交接是同一种事，用同一种线），直线走指认
 * （这句话说的是那个东西）。一种笔形从头画到尾，读起来就是一台机器在画。
 *
 * preserveAspectRatio="none" 让整幅随栏宽横向伸缩，vector-effect 保住线宽；
 * 竖直段横拉不歪，箭头须最多歪 19%（栏宽 700 时），肉眼读不出来。
 * ────────────────────────────────────────────────────────── */
const INK = [
  "M620 100 L532 128",
  "M541.4 119 L532 128 L544.9 130",
  "M250 198 V226 Q250 244, 268 244 H422 Q440 244, 440 262 V292",
  "M434.2 280.4 L440 292 L445.8 280.4",
  "M520 562 V588 Q520 606, 502 606 H318 Q300 606, 300 624 V650",
  "M294.2 638.4 L300 650 L305.8 638.4",
  "M600 776 L530 846",
  "M534.2 833.7 L530 846 L542.3 841.9",
];

function Note({ kind, text }: { kind: string; text: string }) {
  const lines = text.split("\n");
  return (
    <p className={`afd-note afd-note--${kind}`}>
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

export function CollaborationDemo({ demo }: { demo: DemoData }) {
  const copy = demo.copy.agentsVisual;
  const inbound = relayText(copy.relayFrom, copy.chatPlan, RELAY_ID.plan);
  const returned = relayText(copy.relayFrom, copy.chatImpl, RELAY_ID.impl);
  return (
    <figure className="afd-figure">
      <div className="afd-sketch" role="img" aria-label={copy.collaborationLabel} inert>
        <div className="afd-scene">
          <svg
            className="afd-ink"
            viewBox="0 0 860 900"
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

          <Card step={1} open="plan" copy={copy}>
            <History />
            <section className="plan-card">
              <div className="plan-head">
                <Stroke d={D.lightbulb} size={16} width={1.7} />
                <span>{copy.planLabel}</span>
                <span className="plan-actions">
                  <span className="icon-slot"><Stroke d={D.copy} size={16} width={1.7} /></span>
                  <span className="icon-slot"><Stroke d={D.maximize} size={16} width={1.7} /></span>
                </span>
              </div>
              <div className="plan-body">
                <h3>{copy.planTitle}</h3>
                <div className="afd-sk-stack"><Bar w="100%" /><Bar w="84%" /></div>
              </div>
            </section>
          </Card>

          <Card
            step={2}
            open="impl"
            copy={copy}
            queue={copy.queueItem.replace("{name}", copy.chatPlan)}
          >
            <History bubble />
            <Relay text={inbound} />
            <div className="shimmer-row">
              <span className="mark"><span className="afd-orb" /></span>
              <Bar w="184px" />
            </div>
          </Card>

          <Card step={3} open="plan" copy={copy}>
            <History bubble />
            <Relay text={returned} />
            <div className="reply"><p>{copy.reviewLine}</p></div>
          </Card>

          <Note kind="plan" text={copy.notePlan} />
          <Note kind="send" text={copy.noteSend} />
          <Note kind="back" text={copy.noteBack} />
          <Note kind="review" text={copy.noteReview} />
        </div>
      </div>
      <figcaption>{copy.handoffCaption}</figcaption>
    </figure>
  );
}
