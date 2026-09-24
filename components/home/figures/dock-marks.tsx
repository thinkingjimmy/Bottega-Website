/**
 * [INPUT]: Uses React useId/ReactNode and the AgentLogo primitive with the AgentId contract
 * [OUTPUT]: Exports Tile (the coloured squircle), AppTile (the four first-party App icons), DockIcon (Finder, Browser, Notes, Downloads, Trash), and LimitRing (the AI Limits ring gauge)
 * [POS]: Mark vocabulary for the Apps section — its cells, its case lists, the Dock and Widgets figures, and the Trust claim tiles all draw from here
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useId, type ReactNode } from "react";
import type { AgentId } from "@/lib/agents";
import { AgentLogo } from "../../icons";

/* ── 一枚彩色方章 ────────────────────────────────────────────────
 * 渐变底 + 白色字形，圆角 24%（macOS 图标的比例）。色板写在 dock.css 的
 * data-tone 上：同一枚章出现在格子、清单与 Dock 里，颜色只写一次。 */
export type TileTone =
  | "design" | "kanban" | "expense" | "fitness"
  | "finder" | "browser" | "notes"
  | "blue" | "graphite" | "violet" | "green";

export function Tile({ tone, size, lifted = false, children }: { tone: TileTone; size: number; lifted?: boolean; children: ReactNode }) {
  return (
    <span className={lifted ? "tile tile--claim" : "tile"} data-tone={tone} style={{ width: size, height: size }} aria-hidden="true">
      {children}
    </span>
  );
}

/* 字形画在 48 网格里、方章占 2..46：viewBox 从 2 起，字形与方章边缘的
   距离就与产品图标一致。 */
function TileArt({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="2 2 44 44" width="100%" height="100%" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const APP_ART: Record<string, { tone: TileTone; art: ReactNode }> = {
  "design-canvas": {
    tone: "design",
    art: (
      <g stroke="#fffaf7">
        <rect x="12" y="13" width="24" height="18" rx="2.5" strokeWidth="2.4" />
        <path d="M17 26l5-5 4 4 3-3 3 3" strokeWidth="2.2" />
        <path d="M20 36h8" strokeWidth="2.4" />
      </g>
    ),
  },
  "dev-kanban": {
    tone: "kanban",
    art: (
      <>
        <rect x="12" y="13" width="6" height="20" rx="2" fill="#ffffff" />
        <rect x="21" y="13" width="6" height="14" rx="2" fill="rgba(255,255,255,0.75)" />
        <rect x="30" y="13" width="6" height="9" rx="2" fill="rgba(255,255,255,0.5)" />
      </>
    ),
  },
  "expense-tracker": {
    tone: "expense",
    art: (
      <>
        <path d="M13 33h22" stroke="#ffffff" strokeWidth="2.2" />
        <rect x="15" y="22" width="4" height="9" rx="1.2" fill="#ffffff" />
        <rect x="22" y="16" width="4" height="15" rx="1.2" fill="#ffffff" />
        <rect x="29" y="25" width="4" height="6" rx="1.2" fill="#ffffff" />
      </>
    ),
  },
  "fitness-log": {
    tone: "fitness",
    art: (
      <>
        <path d="M14 24h20" stroke="#ffffff" strokeWidth="3" />
        <rect x="11" y="18" width="5" height="12" rx="1.5" fill="#ffffff" />
        <rect x="32" y="18" width="5" height="12" rx="1.5" fill="#ffffff" />
      </>
    ),
  },
};

export function AppTile({ id, size }: { id: string; size: number }) {
  const { tone, art } = APP_ART[id];
  return (
    <Tile tone={tone} size={size}>
      <TileArt>{art}</TileArt>
    </Tile>
  );
}

/* ── Dock 上的系统成员 ───────────────────────────────────────────
 * 访达、浏览器、备忘录是方章；下载与废纸篓不是方章，是整幅画，渐变 id
 * 用 useId 取，同一页画两次也不会撞。 */
export type DockIconId = "finder" | "browser" | "notes" | "downloads" | "trash";

export function DockIcon({ id, size }: { id: DockIconId; size: number }) {
  if (id === "downloads") return <DownloadsArt size={size} />;
  if (id === "trash") return <TrashArt size={size} />;
  return (
    <Tile tone={id} size={size}>
      <TileArt>
        {id === "finder" ? (
          <>
            <path d="M16 17c3 2.5 13 2.5 16 0M19 11v4M29 11v4" stroke="#0b2a4a" strokeWidth="2.2" />
            <path d="M24 5v38" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          </>
        ) : id === "browser" ? (
          <g stroke="#1d6fd6">
            <circle cx="24" cy="24" r="11" strokeWidth="2.2" />
            <path d="M13 24h22M24 13c4 4 4 18 0 22M24 13c-4 4-4 18 0 22" strokeWidth="1.8" />
          </g>
        ) : (
          <>
            <rect x="2" y="2" width="44" height="13" fill="#ffd54a" />
            <path d="M12 22h24M12 28h24M12 34h16" stroke="rgba(0,0,0,0.22)" strokeWidth="1.8" />
          </>
        )}
      </TileArt>
    </Tile>
  );
}

function DownloadsArt({ size }: { size: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fb3f6" />
          <stop offset="1" stopColor="#2b8fe0" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd2ff" />
          <stop offset="1" stopColor="#4eb0f5" />
        </linearGradient>
      </defs>
      <path d="M4 12.5A2.5 2.5 0 0 1 6.5 10h11.2l3.3 3.4h20.5A2.5 2.5 0 0 1 44 15.9V38a2.5 2.5 0 0 1-2.5 2.5h-35A2.5 2.5 0 0 1 4 38z" fill={`url(#${id}b)`} />
      <rect x="4" y="17" width="40" height="23.5" rx="2.6" fill={`url(#${id}f)`} />
      <path d="M24 22.5v10M19.5 28.5l4.5 4.5 4.5-4.5" stroke="#2479c6" strokeOpacity="0.75" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashArt({ size }: { size: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dde1e8" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c6cbd5" />
        </linearGradient>
      </defs>
      <path d="M10 11h28l-2.6 29.2a3 3 0 0 1-3 2.8H15.6a3 3 0 0 1-3-2.8z" fill={`url(#${id}t)`} fillOpacity="0.8" stroke="rgba(60,66,80,0.38)" strokeWidth="0.8" />
      <path d="M15.5 14.5l1.2 26M20.5 14.5l.5 26.5M24 14.5v26.5M27.5 14.5l-.5 26.5M32.5 14.5l-1.2 26" stroke="rgba(70,78,94,0.3)" strokeWidth="0.9" />
      <path d="M12 18.5h24M12.4 24h23.2M12.9 29.5h22.2M13.3 35h21.4" stroke="rgba(70,78,94,0.18)" strokeWidth="0.8" />
      <ellipse cx="24" cy="11" rx="14.2" ry="2.6" fill="rgba(255,255,255,0.9)" stroke="rgba(60,66,80,0.42)" strokeWidth="0.9" />
      <ellipse cx="24" cy="11.3" rx="12.4" ry="1.6" fill="rgba(40,46,60,0.24)" />
    </svg>
  );
}

/* ── AI Limits 的一枚环 ──────────────────────────────────────────
 * 与产品 system-dock/bar/faces.tsx 同一套语法：弧长是剩下的那一份，低于
 * 20% 转橙；环心是 Agent 标记压在数字上。线宽 3、半径 = 边长/2 − 3。 */
export function LimitRing({ size, value, agent }: { size: number; value: number; agent?: AgentId }) {
  const r = size / 2 - 3;
  const length = 2 * Math.PI * r;
  return (
    <span className="ring" data-low={value < 20 || undefined} style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} />
        <circle
          className="ring-arc"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeDasharray={length}
          strokeDashoffset={length * (1 - value / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-center" style={{ fontSize: size * 0.3 }}>
        {agent ? <AgentLogo backend={agent} size={Math.round(size * 0.24)} /> : null}
        <span>{value}</span>
      </span>
    </span>
  );
}
