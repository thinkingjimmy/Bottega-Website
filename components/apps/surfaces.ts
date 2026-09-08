/**
 * [INPUT]: Uses the four App surface components and the App identities carried by DemoData
 * [OUTPUT]: Exports AppSurfaceView and the id-keyed APP_SURFACES lookup
 * [POS]: The single place an App id becomes a surface; the Apps section and the Hero Studio window both read it
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { CanvasSurface } from "./surface-canvas";
import { FitnessSurface } from "./surface-fitness";
import { KanbanSurface } from "./surface-kanban";
import { LedgerSurface } from "./surface-ledger";

export type AppSurfaceView = (props: { demo: DemoData }) => React.ReactNode;

/* 按 id 而不是按下标：两个宿主的排法本就不同——Apps 一节按目录顺序走一遍，
   首屏的 Apps 页把最新做好的那只排在最前。下标一旦是共享的那把钥匙，
   其中一处改了排法，另一处就会安静地打开错的那台机器。 */
export const APP_SURFACES: Record<string, AppSurfaceView> = {
  "design-canvas": CanvasSurface,
  "dev-kanban": KanbanSurface,
  "expense-tracker": LedgerSurface,
  "fitness-log": FitnessSurface,
};
