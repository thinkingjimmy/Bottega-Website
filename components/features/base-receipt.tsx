/**
 * [INPUT]: Uses React JSX and the product-surface tokens
 * [OUTPUT]: Exports the Receipt thumbnail drawn for Base attachment covers
 * [POS]: One drawing of the receipt that travels through all three Base figures — Chat attachment, then Gallery cover
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

/* ── 一张小票 ────────────────────────────────────────────────────
 * 缺一枚图标就画一个占位，别去仿真的那一张——一张假照片会让人以为
 * 产品自带素材库。这里画的是「小票」这个形状本身：一张齿边的纸、
 * 几行字、一条加粗的合计。64px 下这几笔就够认出来。
 *
 * 纸面用 --app-bg、笔画用 --app-muted-fg：深浅两个主题各自成立，
 * 不必为这一枚另开一套颜色。
 * ────────────────────────────────────────────────────────── */
export function Receipt({ size = 64 }: { size?: number }) {
  return (
    <svg
      className="bfd-receipt"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M20 11h24v37l-4 4-4-4-4 4-4-4-4 4-4-4z"
        fill="var(--app-bg)"
        stroke="color-mix(in srgb, var(--app-muted-fg) 62%, transparent)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g
        stroke="color-mix(in srgb, var(--app-muted-fg) 78%, transparent)"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M25 19h14" strokeWidth="2.4" />
        <path d="M25 26h14M25 31h11M25 36h14" strokeWidth="1.4" />
        <path d="M25 43h14" strokeWidth="3" />
      </g>
    </svg>
  );
}
