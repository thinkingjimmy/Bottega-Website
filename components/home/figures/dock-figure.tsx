/**
 * [INPUT]: Uses localized DemoData (the Expense Tracker's ledger, daily spend and category share, the App names) and the dock-marks AppTile/DockIcon/LimitRing
 * [OUTPUT]: Exports DockFigure — Bottega Dock on the wallpaper with the Expense Tracker open above it
 * [POS]: Figure of the Dock story in the Apps section; the bar shares its geometry with widgets-figure through dock.css
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { AppTile, DockIcon, LimitRing, type DockIconId } from "./dock-marks";

const SYSTEM: { id: DockIconId; running: boolean }[] = [
  { id: "finder", running: true },
  { id: "browser", running: true },
  { id: "notes", running: false },
];
const RUNNING_APPS = new Set(["dev-kanban", "expense-tracker"]);
const OPEN_APP = "expense-tracker";

export function DockFigure({ demo }: { demo: DemoData }) {
  const { chrome, ledger } = demo.copy;
  const open = demo.apps.find((app) => app.id === OPEN_APP)!;
  const total = demo.categoryShare.reduce((sum, slice) => sum + slice.value, 0);
  const peak = Math.max(...demo.dailySpend);
  return (
    <div className="dkf">
      <div className="fig-panel dkf-window">
        <div className="dkf-side">
          <span className="dkf-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="dkf-name">{open.name}</span>
          <span className="dkf-tab dkf-tab--on">{chrome.analysis}</span>
          <span className="dkf-tab">{chrome.ledger}</span>
        </div>
        <div className="dkf-main">
          <span className="dkf-label">{ledger.dailySpend}</span>
          <span className="dkf-total">{demo.ledgerAppSum}</span>
          <div className="dkf-bars">
            {demo.dailySpend.map((height, at) => (
              <i key={at} data-peak={height === peak || undefined} style={{ height: `${Math.max(8, Math.round(height * 100))}%` }} />
            ))}
          </div>
          <span className="dkf-legend">
            {demo.categoryShare.slice(0, 3).map((slice) => (
              <span key={slice.label}>
                {slice.label} {Math.round((slice.value / total) * 100)}%
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="dk-bar dkf-bar">
        {SYSTEM.map((item) => (
          <span className="dk-item" data-running={item.running || undefined} key={item.id}>
            <DockIcon id={item.id} size={36} />
          </span>
        ))}
        <span className="dk-sep" />
        {demo.apps.map((app) => (
          <span className="dk-item" data-running={RUNNING_APPS.has(app.id) || undefined} key={app.id}>
            <AppTile id={app.id} size={36} />
            {app.id === OPEN_APP ? <span className="dk-tip">{app.name}</span> : null}
          </span>
        ))}
        <span className="dk-sep" />
        <span className="dk-rings">
          <LimitRing size={32} value={87} agent="codex" />
          <LimitRing size={32} value={12} agent="claude" />
        </span>
        <span className="dk-item">
          <DockIcon id="downloads" size={36} />
        </span>
        <span className="dk-item">
          <DockIcon id="trash" size={36} />
        </span>
      </div>
    </div>
  );
}
