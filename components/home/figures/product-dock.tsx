/**
 * [INPUT]: Uses the AgentLogo mark and React children for slot glyphs
 * [OUTPUT]: Exports ProductDock (the strip), DockSlot, DockSeparator, LimitsFace and ValueFace — Bottega Dock drawn to the product's own metrics
 * [POS]: Shared by the Dock and Widgets figures; geometry mirrors apps/desktop shared/system-dock/metrics.ts and bar.css, colours live in ../../../app/styles/home/dock.css
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { CSSProperties, ReactNode } from "react";
import type { AgentId } from "@/lib/agents";
import { AgentLogo } from "../../icons";

/* 产品 metrics.ts 的原数：格 48、间距 6、内边距 10、分隔 13、条高 68、圆角 17；
   AI 额度 Widget 宽 136、AI 用量 116。画框放不下原尺寸时整条一起缩（--dz），
   不改任何一格的比例。 */
export const WIDGET_W = { limits: 136, value: 116 } as const;

export function ProductDock({ scale = 1, children }: { scale?: number; children: ReactNode }) {
  return (
    <div className="pd" style={{ "--dz": scale } as CSSProperties}>
      {children}
    </div>
  );
}

export function DockSlot({
  running = false,
  open = false,
  width = 48,
  children,
}: {
  running?: boolean;
  open?: boolean;
  width?: number;
  children: ReactNode;
}) {
  return (
    <span className="pd-slot" data-running={running || undefined} data-open={open || undefined} style={{ width }}>
      {children}
    </span>
  );
}

export function DockSeparator() {
  return <span className="pd-sep" />;
}

/* faces.tsx 的 SourceRing：弧长是剩下的那一份，低于 20% 转警示色；环心是 Agent 标记压在数字上。 */
const RING = { size: 36, radius: 15 } as const;
const CIRCUMFERENCE = 2 * Math.PI * RING.radius;

function SourceRing({ agent, value }: { agent: AgentId; value: number }) {
  return (
    <span className="pd-ring" data-low={value < 20 || undefined}>
      <svg viewBox={`0 0 ${RING.size} ${RING.size}`} aria-hidden="true">
        <circle className="pd-ring-track" cx={18} cy={18} r={RING.radius} />
        <circle
          className="pd-ring-arc"
          cx={18}
          cy={18}
          r={RING.radius}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - value / 100)}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <span className="pd-ring-center">
        <AgentLogo backend={agent} size={9} />
        <span>{value}</span>
      </span>
    </span>
  );
}

export function LimitsFace({ sources, open = false }: { sources: readonly (readonly [AgentId, number])[]; open?: boolean }) {
  return (
    <DockSlot width={WIDGET_W.limits} open={open}>
      <span className="pd-face pd-face--limits">
        {sources.map(([agent, value]) => (
          <SourceRing agent={agent} value={value} key={agent} />
        ))}
      </span>
    </DockSlot>
  );
}

/* ActivityFace 的版式：15px 数值 + 10px 单位，下面一行 10px 说明。自定义 Widget 借同一张脸。 */
export function ValueFace({
  value,
  unit,
  caption,
  width = WIDGET_W.value,
  open = false,
}: {
  value: string;
  unit?: string;
  caption: string;
  width?: number;
  open?: boolean;
}) {
  return (
    <DockSlot width={width} open={open}>
      <span className="pd-face pd-face--value">
        <span className="pd-face-row">
          <b>{value}</b>
          {unit ? <span className="pd-face-unit">{unit}</span> : null}
        </span>
        <span className="pd-face-caption">{caption}</span>
      </span>
    </DockSlot>
  );
}
