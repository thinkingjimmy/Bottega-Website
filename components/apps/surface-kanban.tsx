/**
 * [INPUT]: 依赖 @/lib/agents 的 KANBAN_LANES，依赖 ../icons 的 Stroke/D，
 *          依赖 ./surface-chrome 的 BaseChrome/Sk
 * [OUTPUT]: 对外提供 KanbanSurface
 * [POS]: Development Kanban 那一台。几何逐项取自
 *        bases/views/kanban：lane 宽 288（w-72）、header 36（h-9）、
 *        卡片槽下留 8（pb-2）、卡面 rounded-lg + border + p-3 + shadow-xs。
 *        lane 自己不画框——产品里卡片是这块板上唯一的盒子，给 lane 再画一圈
 *        就成了卡片套卡片
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { KANBAN_LANES, type KanbanChip, type KanbanTone } from "@/lib/agents";
import { D, Stroke } from "../icons";
import { BaseChrome, Sk } from "./surface-chrome";

/* ── 序位配色的字面值 ──────────────────────────────────────────────
 * 取自 kanban-fields.ts 的 TONES。产品里 option 未声明颜色时按它在
 * options 里的序位取色，于是相邻 lane 天然拿到不同色相，整块板读起来
 * 是一条有序的光谱。这里照抄那张表，不另配一套。
 * ────────────────────────────────────────────────────────── */
const TONES: Record<KanbanTone, { chip: string; text: string; dot: string }> = {
  blue: { chip: "rgba(59,130,246,.10)", text: "#1d4ed8", dot: "#3b82f6" },
  amber: { chip: "rgba(245,158,11,.15)", text: "#b45309", dot: "#f59e0b" },
  green: { chip: "rgba(34,197,94,.10)", text: "#15803d", dot: "#22c55e" },
  violet: { chip: "rgba(139,92,246,.10)", text: "#6d28d9", dot: "#8b5cf6" },
  red: { chip: "rgba(239,68,68,.10)", text: "#b91c1c", dot: "#ef4444" },
  teal: { chip: "rgba(20,184,166,.10)", text: "#0f766e", dot: "#14b8a6" },
};

function Chip({ chip }: { chip: KanbanChip }) {
  const tone = chip.tone ? TONES[chip.tone] : undefined;
  return (
    <span
      className={`kb-chip${tone ? "" : " neutral"}`}
      style={tone ? { background: tone.chip, color: tone.text } : undefined}
    >
      {chip.label && <b>{chip.label}</b>}
      <span className="kb-chip-text">{chip.text}</span>
    </span>
  );
}

export function KanbanSurface() {
  return (
    <div className="ba">
      <BaseChrome
        tabs={[
          { icon: "kanban", name: "Tasks" },
          { icon: "kanban", name: "Findings" },
          { icon: "table", name: "All" },
        ]}
        active={0}
      />
      <div className="ba-body">
        <div className="kb-board">
          {KANBAN_LANES.map((lane) => (
            <section className="kb-lane" key={lane.id}>
              <header className="kb-head">
                <span className="kb-dot-slot">
                  <i className="kb-dot" style={{ background: TONES[lane.tone].dot }} />
                </span>
                <span className="kb-name">{lane.name}</span>
                <span className="kb-count">{lane.count}</span>
                <span className="kb-add">
                  <Stroke d={D.plus} size={14} width={1.6} />
                </span>
              </header>
              <div className="kb-list">
                {lane.cards.map((card, at) => (
                  <article className="kb-card" key={card.title ?? `sk-${at}`}>
                    {card.title ? (
                      <p className="kb-title">{card.title}</p>
                    ) : (
                      <div className="kb-skel">
                        {card.skeleton?.map((width) => <Sk key={width} w={width} h={11} />)}
                      </div>
                    )}
                    {card.chips.length > 0 && (
                      <div className="kb-chips">
                        {card.chips.map((chip) => (
                          <Chip chip={chip} key={`${chip.label ?? ""}${chip.text}`} />
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
