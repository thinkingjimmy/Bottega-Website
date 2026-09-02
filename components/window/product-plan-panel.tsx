"use client";

/**
 * [INPUT]: Uses Plan data, localized close copy, Rich text rendering, and shared icons
 * [OUTPUT]: Exports ProductPlanPanel for the product window's third column
 * [POS]: Expanded full-document destination for the transcript Plan card
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { Plan } from "@/lib/agents";
import { D, Stroke } from "../icons";
import { Rich } from "./product-transcript";

export function ProductPlanPanel({
  plan,
  open,
  onClose,
  closeLabel,
}: {
  /** 开着第三栏的那条 chat 的 plan。关上之后它仍留在这里，
      于是收拢的那 200ms 里读者看到的是文档退场，而不是内容先被抽空。 */
  plan: Plan | null;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
}) {
  return (
    <div className="win-panel" data-state={open ? "open" : "closed"}>
      <aside className="win-panel-face" aria-hidden={!open} inert={!open}>
        {/* 页头与主栏共用 .win-head：两栏的那条 40px 线本来就是同一条，
            各写各的高度就是给同一条线留两份定义。 */}
        <div className="win-head">
          <span className="win-title">{plan?.title}</span>
          <button
            type="button"
            className="icon-slot icon-btn"
            style={{ marginLeft: "auto" }}
            aria-label={closeLabel}
            onClick={onClose}
          >
            <Stroke d={D.x} size={16} width={1.9} />
          </button>
        </div>

        {/* 全文在这里没有上限，也没有那道渐变：第三栏存在的全部理由
            就是「预览够不着的部分」，它自己再截一次就白开了。 */}
        <div className="panel-doc">
          {plan?.sections.map((section) => (
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
        </div>
      </aside>
    </div>
  );
}
