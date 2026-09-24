/**
 * [INPUT]: Uses localized DemoData (widget copy and App names), the AgentLogo mark, the dock-marks AppTile/DockIcon, and the ProductDock parts
 * [OUTPUT]: Exports WidgetsFigure and WIDGET_CASES — four widgets on one Dock, the active one opened (data-open) and drawn large in a centred card
 * [POS]: Figure of the Widgets story; the centred card is an illustration of what the widget says, the Dock strip below follows the product's metrics
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { Ref } from "react";
import type { AgentId, DemoData } from "@/lib/agents";
import { AgentLogo } from "../../icons";
import { AppTile, DockIcon } from "./dock-marks";
import { DockSeparator, DockSlot, LimitsFace, ProductDock, ValueFace } from "./product-dock";

/* 顺序即案例清单的顺序：一份目录驱动一台机器。前两只是产品内置，后两只是「描述出来的」。 */
export const WIDGET_CASES = ["limits", "usage", "spend", "streak"] as const;
const LIMITS = [["codex", 72], ["claude", 12], ["kimi", 100]] as const satisfies readonly (readonly [AgentId, number])[];
const HOURLY = [18, 30, 22, 46, 60, 38, 72, 54, 88, 64, 40, 26];
const STREAK = [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];

function Head({ title, note }: { title: string; note: string }) {
  return (
    <div className="wgc-head">
      <span>{title}</span>
      <span>{note}</span>
    </div>
  );
}

function Big({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="wgc-big">
      <b>{value}</b>
      <span>{unit}</span>
    </div>
  );
}

function BigRing({ agent, value }: { agent: AgentId; value: number }) {
  const r = 32;
  const length = 2 * Math.PI * r;
  return (
    <div className="wgc-ring" data-agent={agent} data-low={value < 20 || undefined}>
      <span className="wgc-ring-gauge">
        <svg viewBox="0 0 72 72" aria-hidden="true">
          <circle className="wgc-ring-track" cx={36} cy={36} r={r} />
          <circle className="wgc-ring-arc" cx={36} cy={36} r={r} strokeDasharray={length} strokeDashoffset={length * (1 - value / 100)} transform="rotate(-90 36 36)" />
        </svg>
        <b>
          {value}
          <small>%</small>
        </b>
      </span>
      <span className="wgc-ring-name">
        <AgentLogo backend={agent} size={12} />
        {agent === "codex" ? "Codex" : agent === "claude" ? "Claude" : "Kimi"}
      </span>
    </div>
  );
}

export function WidgetsFigure({ demo, active, frame }: { demo: DemoData; active: number; frame?: Ref<HTMLDivElement> }) {
  const copy = demo.copy.widgets;
  const appName = (id: string) => demo.apps.find((app) => app.id === id)?.name ?? "";
  const open = (at: number) => active === at;
  return (
    <div className="wgf" data-active={active} ref={frame}>
      <div className="wgf-cards">
        <div className="wgc">
          <Head title={copy.limits} note={copy.leftInWindow} />
          <div className="wgc-rings">
            {LIMITS.map(([agent, value]) => (
              <BigRing agent={agent} value={value} key={agent} />
            ))}
          </div>
        </div>
        <div className="wgc">
          <Head title={copy.usage} note={copy.today} />
          <Big value="1.2M" unit={copy.tokens} />
          <p className="wgc-line">{copy.estimatedCost.replace("{cost}", "$3.40")}</p>
          <div className="wgc-bars">
            {HOURLY.map((height, at) => (
              <i key={at} style={{ height: `${height}%`, opacity: 0.2 + height / 125 }} />
            ))}
          </div>
        </div>
        <div className="wgc">
          <Head title={copy.spend} note={appName("expense-tracker")} />
          <Big value="$4,531" unit={copy.inMonth} />
          <svg className="wgc-spark" viewBox="0 0 312 64" preserveAspectRatio="none" aria-hidden="true">
            <path className="wgc-spark-fill" d="M0 56L28 51 57 53 85 42 113 45 142 34 170 37 198 25 227 28 255 16 284 12 312 7V64H0Z" />
            <path className="wgc-spark-line" d="M0 56L28 51 57 53 85 42 113 45 142 34 170 37 198 25 227 28 255 16 284 12 312 7" />
          </svg>
        </div>
        <div className="wgc">
          <Head title={copy.streak} note={appName("fitness-log")} />
          <Big value="12" unit={copy.streakUnit} />
          <div className="wgc-days">
            {STREAK.map((on, at) => (
              <i key={at} data-on={on === 1 || undefined} data-later={at > 11 || undefined} />
            ))}
          </div>
        </div>
      </div>

      <div className="wgf-dock">
        <ProductDock scale={0.82}>
          <DockSlot running>
            <AppTile id="expense-tracker" size={40} />
          </DockSlot>
          <DockSeparator />
          <LimitsFace sources={LIMITS} open={open(0)} />
          <ValueFace value="1.2M" unit={copy.tokens} caption="$3.40" open={open(1)} />
          <ValueFace value="$4,531" caption={copy.month} open={open(2)} />
          <ValueFace value="12" unit={copy.days} caption={copy.streak} width={96} open={open(3)} />
          <DockSeparator />
          <DockSlot>
            <DockIcon id="downloads" size={40} />
          </DockSlot>
        </ProductDock>
      </div>
    </div>
  );
}
