/**
 * [INPUT]: 依赖 react 的 JSX
 * [OUTPUT]: 对外提供 Stroke（描边图标）、Glyph（实心 logo）与 Wordmark
 * [POS]: Bottega-Website 的图标底座。全站不用 emoji 也不装图标库——
 *        两个 20 行组件就够，装一个包反而多一份要跟着升级的东西
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

/** 描边图标：24 网格、2px 线宽，与产品里的 lucide 同口径。 */
export function Stroke({
  d,
  size = 16,
  width = 2,
}: {
  d: string;
  size?: number;
  width?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/** 实心图标：agent 的官方 logo 都是单条实心路径。 */
export function Glyph({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** 明暗两版都渲染，由 CSS 让其中一版让位——见 globals.css 的 .img-light/.img-dark。 */
export function Wordmark({ height = 22 }: { height?: number }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="img-light" src="/wordmark.png" alt="Bottega" style={{ height, width: "auto" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="img-dark" src="/wordmark-dark.png" alt="Bottega" style={{ height, width: "auto" }} />
    </>
  );
}

export const D = {
  plus: "M5 12h14M12 5v14",
  chevronDown: "m6 9 6 6 6-6",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  check: "M20 6 9 17l-5-5",
  folder:
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
  table: "M3 3h18v18H3zM3 9h18M9 21V9",
  columns: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v7h-4z",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  bulb: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4",
  arrowUp: "m5 12 7-7 7 7M12 19V5",
  importDown: "M12 3v12m-4-4 4 4 4-4M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  github:
    "M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18A2.69 2.69 0 0 0 5 16.5c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.15 2.15 0 0 0 2.91.83 2.16 2.16 0 0 1 .64-1.35c-2.22-.25-4.55-1.11-4.55-4.92a3.86 3.86 0 0 1 1-2.69 3.58 3.58 0 0 1 .1-2.64s.84-.27 2.75 1a9.63 9.63 0 0 1 5 0c1.91-1.29 2.75-1 2.75-1a3.58 3.58 0 0 1 .1 2.64 3.86 3.86 0 0 1 1 2.69c0 3.82-2.34 4.66-4.57 4.91a2.39 2.39 0 0 1 .69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2z",
};
