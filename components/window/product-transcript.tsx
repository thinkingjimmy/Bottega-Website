"use client";

/**
 * [INPUT]: Uses React state, ThinkingOrb, localized demo copy, Chat/Plan contracts, and icons
 * [OUTPUT]: Exports ProductTranscript, planText, and inline-code Rich rendering
 * [POS]: Localized product transcript covering elapsed work, Plan review, and streaming state
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import type { Chat, DemoData, Plan } from "@/lib/agents";
import { D, Stroke } from "../icons";

export function ProductTranscript({
  chat,
  planOpen,
  onPlan,
  copy,
}: {
  chat: Chat;
  /** 第三栏此刻是否为这条 chat 开着——放大钮的脸由它决定。 */
  planOpen: boolean;
  onPlan: () => void;
  copy: DemoData["copy"]["chrome"];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  /* 换一条 chat 就落到最新一句上。真转录本来就是这样开场的——
     顶部那几条不是被藏了，是已经翻过去了，往上滚仍然找得回来。 */
  useEffect(() => {
    const node = scroller.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [chat.id]);

  return (
    <div className="chat" ref={scroller}>
      <div className="bubble">{chat.ask}</div>
      <WorkedFor chat={chat} label={copy.workedFor} />
      {chat.plan ? <PlanCard plan={chat.plan} open={planOpen} onToggle={onPlan} copy={copy} /> : null}
      <div className="reply">
        <p>{chat.reply}</p>
        {chat.bullets ? (
          <ul>
            {chat.bullets.map((point) => (
              <li key={point}>
                <Rich text={point} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {/* 「进行中」只由这一行表达。转圈、光标、跳动的点各来一个，说的是
          同一件事，而同一件事说三遍，人只会记住最吵的那一个。 */}
      {chat.status ? (
        <div className="shimmer-row">
          <span className="mark">
            <ThinkingOrb size={20} state="shaping" style={{ width: 14, height: 14 }} />
          </span>
          <p className="shimmer">{chat.status}</p>
        </div>
      ) : null}
    </div>
  );
}

/* ── 计时头 ──────────────────────────────────────────────────────
 * 标签在前、箭头紧随其后（不是推到行尾），下缘一条全宽发丝线——
 * 线不是装饰，它是「过程到此为止，下面是结论」这句话。
 * 展开与否是真开关：过程不是被藏起来了，只是折起来了。
 * ────────────────────────────────────────────────────────── */
function WorkedFor({ chat, label }: { chat: Chat; label: string }) {
  /* 默认折叠，与产品的 useFoldState 一致（`useState(false)`）。
     过程不是被藏了，是折起来了——展开这个动作本身也是要演的东西之一。 */
  const [open, setOpen] = useState(false);
  return (
    <div className="turn">
      <button type="button" className="worked" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{label.replace("{duration}", chat.worked)}</span>
        <span className={`worked-caret${open ? " on" : ""}`}>
          <Stroke d={D.chevronRight} size={14} width={1.9} />
        </span>
      </button>
      {open ? (
        <div className="turn-parts">
          {chat.trace.map((step) => (
            <p className="trace" key={step.label}>
              <span className="mark">
                <Stroke d={step.icon} size={14} width={1.8} />
              </span>
              <span>{step.label}</span>
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ── Plan 卡：抄自 chat/transcript 的 chat-plan-card.tsx ────────────
 * 预览有上限，够不着的部分由底部那道渐变自陈——截断若不留痕迹，人会以为
 * 读完了。而「够不着」这句话必须有下文：放大钮与预览整块都通向第三栏，
 * 那里放的是同一份 plan 的全文。一道说「还有」的渐变若点不开，它就只是
 * 一道装饰。
 * ────────────────────────────────────────────────────────── */
function PlanCard({
  plan,
  open,
  onToggle,
  copy,
}: {
  plan: Plan;
  open: boolean;
  onToggle: () => void;
  copy: DemoData["copy"]["chrome"];
}) {
  /* 复制成功后钩子顶两秒班再交回——按钮按下去若毫无回声，人只会再按一次。 */
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <section className="plan-card">
      <div className="plan-head">
        <Stroke d={D.lightbulb} size={16} width={1.7} />
        <span>{copy.plan}</span>
        <span className="plan-actions">
          <button
            type="button"
            className="icon-slot icon-btn"
            aria-label={copied ? copy.planCopied : copy.copyPlan}
            onClick={() =>
              void navigator.clipboard?.writeText(planText(plan)).then(
                () => setCopied(true),
                () => undefined
              )
            }
          >
            <Stroke d={copied ? D.check : D.copy} size={16} width={1.7} />
          </button>
          <button
            type="button"
            className="icon-slot icon-btn"
            aria-label={open ? copy.closePlan : copy.openPlan}
            aria-pressed={open}
            onClick={onToggle}
          >
            <Stroke d={open ? D.minimize : D.maximize} size={16} width={1.7} />
          </button>
        </span>
      </div>
      {/* 预览整块就是那颗放大钮的第二个把手：人要读全文时手会往正文上落，
          不会先去找行尾那枚 16px 的图标。键盘上 Enter/Space 与点击同义。 */}
      <div
        className="plan-body"
        role="button"
        tabIndex={0}
        aria-label={open ? copy.closePlan : copy.openPlan}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          onToggle();
        }}
      >
        <h3>{plan.title}</h3>
        {plan.sections.map((section) => (
          <div key={section.heading}>
            <h4>{section.heading}</h4>
            <ul>
              {section.items.map((item) => (
                <li key={item}>
                  <Rich text={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <span className="plan-fade" aria-hidden />
      </div>
    </section>
  );
}

/* 剪贴板里躺的是全文，不是屏幕上被渐变切掉一半的那一段——复制若只复制
   看得见的部分，这颗按钮就是在撒谎。行内反引号原样留着：它本来就是
   markdown，粘到哪里都还念得通。 */
export function planText(plan: Plan) {
  return [
    `# ${plan.title}`,
    ...plan.sections.map((section) =>
      [`## ${section.heading}`, ...section.items.map((item) => `- ${item}`)].join("\n")
    ),
  ].join("\n\n");
}

/* 反引号即 code。产品那边是整个 markdown 渲染器，这里只需要这一条规则——
   演示里出现的行内标记只有它，为剩下的九成语法装一个解析器不划算。
   第三栏读的是同一份 plan，故与这里共用同一条规则，而不是各写一遍。 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((piece, at) =>
        at % 2 ? <code key={`${piece}-${at}`}>{piece}</code> : piece
      )}
    </>
  );
}
