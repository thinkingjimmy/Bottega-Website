"use client";

/**
 * [INPUT]: 依赖 react 的 useState，依赖 @/lib/agents 的 MODELS/MODEL_OPTIONS/
 *          effortLabel/compactModelLabel/AgentId，依赖 ../icons 的 Stroke/D
 * [OUTPUT]: 对外提供 ProductModelMenu 组件
 * [POS]: 输入框上模型那颗按钮的面板。两张脸，因为产品有两张脸：
 *        Codex 是 `modelOptions: "full"`（一条蓝色档位滑轨 + Fast 开关，
 *        Advanced 之后才是列表），其余三家是 `list-only`（Model / Effort
 *        两行摘要，点进去才是列表）。抄自 chat/composer 的
 *        chat-model-selector.tsx 与 chat-model-list-selector.tsx
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useState } from "react";
import {
  MODELS,
  MODEL_OPTIONS,
  compactModelLabel,
  effortLabel,
  type AgentId,
} from "@/lib/agents";
import { D, Stroke } from "../icons";

/* 真产品里这是四个视图：quick（只有 Codex 有）、advanced、model、effort。
   两家的第二层长得一样，差别只在从哪儿进去——所以是一个视图栈，
   不是两套组件。 */
type View = "quick" | "root" | "model" | "effort";

export function ProductModelMenu({
  agent,
  model,
  effort,
  fast,
  onTurn,
  onFast,
  onClose,
}: {
  agent: AgentId;
  model: string;
  effort: string;
  fast: boolean;
  onTurn: (turn: { model: string; effort: string }) => void;
  onFast: (fast: boolean) => void;
  onClose: () => void;
}) {
  const full = MODEL_OPTIONS[agent] === "full";
  const [view, setView] = useState<View>(full ? "quick" : "root");
  const models = MODELS[agent];
  const current = models.find((entry) => entry.name === model) ?? models[0];

  const pickModel = (name: string) => {
    const next = models.find((entry) => entry.name === name)!;
    /* 换模型时保住能保住的档位：新模型也有这一档就留着，没有才落回它的
       默认档。产品里这条规则叫 optionsForModel，不是「一律重置」。 */
    onTurn({
      model: next.name,
      effort: next.efforts.includes(effort) ? effort : next.effort,
    });
    onClose();
  };

  if (view === "quick") {
    return (
      <div className="menu-panel menu-quick">
        <div className="quick-head">
          <button type="button" className="quick-link" onClick={() => setView("root")}>
            <span>Advanced</span>
            <Stroke d={D.chevronRight} size={16} />
          </button>
          <button
            type="button"
            className={`quick-zap${fast ? " on" : ""}`}
            aria-pressed={fast}
            aria-label={fast ? "Disable Fast speed" : "Enable Fast speed"}
            title={fast ? "Disable Fast speed" : "Enable Fast speed"}
            disabled={!current.fast}
            onClick={() => onFast(!fast)}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill={fast ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={D.zap} />
            </svg>
          </button>
        </div>
        <EffortSlider
          efforts={current.efforts}
          effort={effort}
          fast={fast}
          onPick={(next) => onTurn({ model, effort: next })}
        />
      </div>
    );
  }

  if (view === "root") {
    return (
      <div className="menu-panel">
        <SummaryRow label="Model" value={compactModelLabel(model)} onClick={() => setView("model")} />
        {/* 档位是模型的属性：没有档位的模型不给这一行开门，而不是开一扇
            空门。Fable 5 与 Haiku 4.5 在产品里就是这个待遇。 */}
        <SummaryRow
          label="Effort"
          value={effort ? effortLabel(effort) : "Not available"}
          onClick={current.efforts.length > 1 ? () => setView("effort") : undefined}
        />
      </div>
    );
  }

  return (
    <div className="menu-panel">
      <button type="button" className="menu-back" onClick={() => setView(full ? "quick" : "root")}>
        <Stroke d={D.chevronLeft} size={16} />
        <span>{view === "model" ? "Model" : "Effort"}</span>
      </button>
      {view === "model"
        ? models.map((entry) => (
            <ChoiceItem
              key={entry.name}
              on={entry.name === model}
              label={entry.name}
              onClick={() => pickModel(entry.name)}
            />
          ))
        : current.efforts.map((entry) => (
            <ChoiceItem
              key={entry}
              on={entry === effort}
              label={effortLabel(entry)}
              onClick={() => {
                onTurn({ model, effort: entry });
                onClose();
              }}
            />
          ))}
    </div>
  );
}

/* 标签吃掉全部余量，值列与箭头各自定宽——否则箭头会与值平分空隙，
   值于是浮在行中间。 */
function SummaryRow({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="summary-row" onClick={onClick} disabled={!onClick}>
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
      {onClick ? <Stroke d={D.chevronRight} size={16} /> : null}
    </button>
  );
}

function ChoiceItem({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="menu-item" onClick={onClick} aria-pressed={on}>
      <span className="menu-item-body">{label}</span>
      <span className="menu-check">{on ? <Stroke d={D.check} size={15} /> : null}</span>
    </button>
  );
}

/* ── 档位滑轨 ────────────────────────────────────────────────────
 * 28px 高的胶囊，蓝色填到当前档，每一档的位置上钉一颗点。用原生 range
 * 而不是自己造：拖拽、键盘、无障碍三件事它天生就对，自己造要写三遍还
 * 都不如它。点是覆盖层，pointer-events 关掉，免得挡住把手。
 * 左右各让 14px（把手半径），首尾两颗点才落在把手能到的两个端点上。
 * ────────────────────────────────────────────────────────── */
function EffortSlider({
  efforts,
  effort,
  fast,
  onPick,
}: {
  efforts: string[];
  effort: string;
  fast: boolean;
  onPick: (effort: string) => void;
}) {
  const index = Math.max(0, efforts.indexOf(effort));
  const last = Math.max(1, efforts.length - 1);
  /* 把手 travel 的两端各让了半个把手，所以色界不是裸的百分比：
     裸百分比会让蓝色边界与把手中心一路错开，越到两端错得越明显。 */
  const fill = `calc(14px + (100% - 28px) * ${index / last})`;

  return (
    <div className="slider-shell">
      <input
        type="range"
        className="slider"
        min={0}
        max={efforts.length - 1}
        step={1}
        value={index}
        aria-label="Quick model tier"
        aria-valuetext={effortLabel(effort)}
        style={{ ["--fill" as string]: fill }}
        onChange={(event) => onPick(efforts[Number(event.target.value)])}
      />
      <div className="slider-dots" aria-hidden>
        {efforts.map((entry, at) => (
          <i key={entry} className={at <= index ? "on" : ""} />
        ))}
      </div>
      {fast ? (
        <div className="slider-sparks" aria-hidden>
          {[0, 0.55, 1.1].map((delay, at) => (
            <svg
              key={delay}
              className="spark"
              style={{ top: `${5 + at * 6}px`, animationDelay: `${delay}s` }}
              width={10}
              height={10}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d={D.sparkle} />
            </svg>
          ))}
        </div>
      ) : null}
    </div>
  );
}
