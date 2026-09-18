"use client";

/**
 * [INPUT]: Uses ProductTranscript, AgentLogo/Stroke/D, and the Chat/DemoData contracts
 * [OUTPUT]: Exports ProductPhone, the Web shell of one Chat on a phone, mirrored from the desktop window
 * [POS]: components/window's second device; the Home Hero stacks it beside ProductWindow and the sync story mounts it alone
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { Chat, DemoData } from "@/lib/agents";
import { AgentLogo, D, Stroke } from "../icons";
import { ProductTranscript } from "./product-transcript";

/* ── 同一条 Chat，第二块屏 ──────────────────────────────────────────
 * 手机上跑的是 Web 壳，转录与桌面那扇窗读同一份数据、走同一个组件——
 * 所以两块屏永远逐字一致，差别只在尺寸与输入框上那枚「在哪台电脑上跑」的
 * 芯片。状态栏只留时间与信号：这是一部手机，不是一张 iOS 截图。
 * ────────────────────────────────────────────────────────── */
export function ProductPhone({
  chat,
  demo,
  time,
  className,
}: {
  chat: Chat;
  demo: DemoData;
  time: string;
  className?: string;
}) {
  const { chrome, sync } = demo.copy;
  return (
    <div className={`phone${className ? ` ${className}` : ""}`} aria-hidden="true">
      <div className="phone-screen">
        <span className="ph-island" />
        <div className="ph-status">
          <span>{time}</span>
          <span className="ph-signal">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="ph-head">
          <Stroke d={D.chevronLeft} size={14} width={2.2} />
          <AgentLogo backend={chat.agent} size={13} />
          <span className="ph-title">{chat.title}</span>
        </div>
        <ProductTranscript chat={chat} planOpen={false} onPlan={() => undefined} copy={chrome} />
        <div className="ph-composer">
          <span className="ph-field">{chrome.askAnything}</span>
          <div className="ph-tools">
            <span className="ph-chip">
              <Stroke d={D.monitor} size={11} width={2} />
              {sync.device}
            </span>
            <span className="ph-chip ph-chip--agent">
              <AgentLogo backend={chat.agent} size={11} />
            </span>
            <span className="ph-send">
              <Stroke d={D.arrowUp} size={13} width={2.4} />
            </span>
          </div>
        </div>
        <span className="ph-home" />
      </div>
    </div>
  );
}
