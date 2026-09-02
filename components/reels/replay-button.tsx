"use client";

/**
 * [INPUT]: 依赖 ../icons 的 Stroke/D
 * [OUTPUT]: 对外提供 ReplayButton 组件
 * [POS]: 两支「走一次就停」的 reel（agents-reel / app-menu-reel）共用的重播钮。
 *        只在停住之后出现：演的时候挂一颗钮，等于在一句话说到一半时递上打断
 *        的把手；说完了再递，才是把选择权交回去。位置钉在画框右下角——
 *        那是三支 reel 的结论都不在的地方（一支停在侧栏底部、一支停在画布
 *        中央），一颗控件不该压着结论
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { D, Stroke } from "../icons";

export function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="reel-replay"
      type="button"
      onClick={onClick}
      aria-label="Replay"
      title="Replay"
    >
      <Stroke d={D.rotateCcw} size={15} width={1.8} />
    </button>
  );
}
