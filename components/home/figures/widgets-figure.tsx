/**
 * [INPUT]: Uses localized DemoData (the widgets copy), the BACKENDS labels, and the dock-marks AppTile/DockIcon/LimitRing
 * [OUTPUT]: Exports WidgetsFigure — the AI Limits panel open above a Dock segment carrying three limit rings and today's usage
 * [POS]: Figure of the Widgets story in the Apps section; the bar shares its geometry with dock-figure through dock.css
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { backendLabel, type AgentId, type DemoData } from "@/lib/agents";
import { AppTile, DockIcon, LimitRing } from "./dock-marks";

/* 一档低于 20% 的 Claude 是这张图要说的那句话：环转橙、面板里那一行也转橙。 */
const LIMITS: { agent: AgentId; value: number; reset?: string }[] = [
  { agent: "codex", value: 87, reset: "18:40" },
  { agent: "claude", value: 12, reset: "16:05" },
  { agent: "kimi", value: 100 },
];

export function WidgetsFigure({ demo }: { demo: DemoData }) {
  const copy = demo.copy.widgets;
  return (
    <div className="wgf">
      <div className="dk-panel wgf-panel">
        <div className="wgf-head">
          <span>{copy.limits}</span>
          <span className="wgf-muted">{copy.updated}</span>
        </div>
        {LIMITS.map((limit) => (
          <div className="wgf-row" data-low={limit.value < 20 || undefined} key={limit.agent}>
            <div className="wgf-line">
              <span>{backendLabel(limit.agent)}</span>
              <span className="wgf-left">{copy.left.replace("{percent}", String(limit.value))}</span>
            </div>
            <span className="wgf-meter">
              <i style={{ width: `${limit.value}%` }} />
            </span>
            <span className="wgf-muted">{limit.reset ? copy.window.replace("{time}", limit.reset) : copy.weekly}</span>
          </div>
        ))}
      </div>

      <div className="dk-bar dk-bar--large wgf-bar">
        <span className="dk-item" data-running>
          <AppTile id="dev-kanban" size={48} />
        </span>
        <span className="dk-sep" />
        <span className="dk-rings dk-rings--on">
          {LIMITS.map((limit) => (
            <LimitRing size={44} value={limit.value} agent={limit.agent} key={limit.agent} />
          ))}
        </span>
        <span className="wgf-usage">
          <strong>1.2M</strong>
          <span>{copy.tokensToday}</span>
          <span>≈ $3.40</span>
        </span>
        <span className="dk-item">
          <DockIcon id="downloads" size={48} />
        </span>
      </div>
    </div>
  );
}
