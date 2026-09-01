"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState，依赖 thinking-orbs 的 ThinkingOrb，
 *          依赖 @/lib/agents 的 Chat/Plan，依赖 ../icons 的 Stroke/D
 * [OUTPUT]: 对外提供 ProductTranscript 组件
 * [POS]: 产品窗口里那段对话。三件东西逐项抄自 chat/transcript：
 *        计时头（WorkedForRow：标签在前、箭头在后、下缘一条全宽发丝线）、
 *        Plan 卡（chat-plan-card.tsx）、流式状态行（ThinkingShimmer——
 *        orb 与扫光文字，orb 就是产品用的那个 thinking-orbs 包）
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import type { Chat, Plan } from "@/lib/agents";
import { D, Stroke } from "../icons";

export function ProductTranscript({ chat }: { chat: Chat }) {
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
      <WorkedFor chat={chat} />
      {chat.plan ? <PlanCard plan={chat.plan} /> : null}
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
function WorkedFor({ chat }: { chat: Chat }) {
  /* 默认折叠，与产品的 useFoldState 一致（`useState(false)`）。
     过程不是被藏了，是折起来了——展开这个动作本身也是要演的东西之一。 */
  const [open, setOpen] = useState(false);
  return (
    <div className="turn">
      <button type="button" className="worked" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>Worked for {chat.worked}</span>
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

/* Plan 卡：预览有上限，够不着的部分由底部那道渐变自陈——
   截断若不留痕迹，人会以为读完了。 */
function PlanCard({ plan }: { plan: Plan }) {
  return (
    <section className="plan-card">
      <div className="plan-head">
        <Stroke d={D.lightbulb} size={16} width={1.7} />
        <span>Plan</span>
        <span className="plan-actions">
          <span className="icon-slot">
            <Stroke d={D.copy} size={16} width={1.7} />
          </span>
          <span className="icon-slot">
            <Stroke d={D.maximize} size={16} width={1.7} />
          </span>
        </span>
      </div>
      <div className="plan-body">
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

/* 反引号即 code。产品那边是整个 markdown 渲染器，这里只需要这一条规则——
   演示里出现的行内标记只有它，为剩下的九成语法装一个解析器不划算。 */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((piece, at) =>
        at % 2 ? <code key={`${piece}-${at}`}>{piece}</code> : piece
      )}
    </>
  );
}
