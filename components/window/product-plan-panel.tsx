"use client";

/**
 * [INPUT]: 依赖 @/lib/agents 的 Plan，依赖 ./product-transcript 的 Rich，
 *          依赖 ../icons 的 Stroke/D
 * [OUTPUT]: 对外提供 ProductPlanPanel 组件（产品窗口的第三栏）
 * [POS]: Plan 卡那颗放大钮的落点。抄自 chat/side-panel 的 side-panel.tsx：
 *        外层只管宽度，里层那张脸定宽绝对定位、从右侧滑入——聊天区在这
 *        200ms 里被挤窄，文档本身却一个字都不重排
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import type { Plan } from "@/lib/agents";
import { D, Stroke } from "../icons";
import { Rich } from "./product-transcript";

export function ProductPlanPanel({
  plan,
  open,
  onClose,
}: {
  /** 开着第三栏的那条 chat 的 plan。关上之后它仍留在这里，
      于是收拢的那 200ms 里读者看到的是文档退场，而不是内容先被抽空。 */
  plan: Plan | null;
  open: boolean;
  onClose: () => void;
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
            aria-label="Close plan panel"
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
