/**
 * [INPUT]: Uses localized DemoData (the App names and widget copy), APP_SURFACES for the Expense Tracker surface, the dock-marks AppTile/DockIcon, and the ProductDock parts
 * [OUTPUT]: Exports DockFigure — the Expense Tracker the Apps story just showed, open above Bottega Dock with four Apps and two widgets
 * [POS]: Figure of the Dock story in the Apps section; the surface is the same component the Apps stage renders, so the two stories read as one continuous scene
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { APP_SURFACES } from "../../apps/surfaces";
import { AppTile, DockIcon } from "./dock-marks";
import { DockSeparator, DockSlot, LimitsFace, ProductDock, ValueFace } from "./product-dock";

const OPEN_APP = "expense-tracker";
const RUNNING = new Set(["dev-kanban", OPEN_APP]);

export function DockFigure({ demo }: { demo: DemoData }) {
  const Surface = APP_SURFACES[OPEN_APP];
  const copy = demo.copy.widgets;
  return (
    <div className="dkf">
      <div className="dkf-app">
        <div className="dkf-canvas">
          <Surface demo={demo} />
        </div>
      </div>
      <div className="dkf-dock">
        <ProductDock scale={0.82}>
          {demo.apps.map((app) => (
            <DockSlot running={RUNNING.has(app.id)} open={app.id === OPEN_APP} key={app.id}>
              <AppTile id={app.id} size={40} />
            </DockSlot>
          ))}
          <DockSeparator />
          <LimitsFace sources={[["codex", 72], ["claude", 12], ["kimi", 100]]} />
          <ValueFace value="1.2M" unit={copy.tokens} caption="$3.40" />
          <DockSeparator />
          <DockSlot>
            <DockIcon id="downloads" size={40} />
          </DockSlot>
          <DockSlot>
            <DockIcon id="trash" size={40} />
          </DockSlot>
        </ProductDock>
      </div>
    </div>
  );
}
