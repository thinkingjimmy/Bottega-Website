"use client";

/**
 * [INPUT]: Uses the shared replay icon and a locale-specific accessible label
 * [OUTPUT]: Exports ReplayButton for one-shot product reels
 * [POS]: Shared replay control for AgentsReel and AppMenuReel
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { D, Stroke } from "../icons";

export function ReplayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      className="reel-replay"
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Stroke d={D.rotateCcw} size={15} width={1.8} />
    </button>
  );
}
