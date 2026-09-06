/**
 * [INPUT]: Uses React JSX and the localized category-share shape from @/lib/agents
 * [OUTPUT]: Exports BaseDonut and BaseSparkline, the two chart shapes Base dashboards draw
 * [NOTE]: Neither carries its own width or height — a shape that sizes itself cannot be reused by a second layout
 * [POS]: One definition per chart shape, shared by the home Base reel and the Base feature figure
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

type Slice = { label: string; value: number; tone: string };

/* ── 分类占比 ────────────────────────────────────────────────────
 * 角度按真实求和算出来——画一个跟表里对不上的环，这张图就成了装饰。
 * 中心那枚洞用 --app-bg 抠：产品的 dashboard 卡片就坐在这个底色上，
 * 换成透明会在深色主题下露出下面那圈弧。
 * ────────────────────────────────────────────────────────── */
export function BaseDonut({ slices, hole = 0.5 }: { slices: readonly Slice[]; hole?: number }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let angle = -Math.PI / 2;
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      {slices.map((slice) => {
        const sweep = (slice.value / total) * Math.PI * 2;
        const x1 = 40 + 38 * Math.cos(angle);
        const y1 = 40 + 38 * Math.sin(angle);
        angle += sweep;
        const x2 = 40 + 38 * Math.cos(angle);
        const y2 = 40 + 38 * Math.sin(angle);
        return (
          <path
            key={slice.label}
            d={`M40 40 L${x1.toFixed(1)} ${y1.toFixed(1)} A38 38 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`}
            fill={slice.tone}
          />
        );
      })}
      <circle cx="40" cy="40" r={38 * hole} fill="var(--app-bg)" />
    </svg>
  );
}

/* ── 按天的走势 ──────────────────────────────────────────────────
 * base-ops 举的月度 dashboard 例子是「一张 pie + 一张 line」，所以这里是
 * 折线而不是又一组柱：柱与环各说一次「哪一类多」，折线说的是另一件事。
 * viewBox 撑满、preserveAspectRatio="none"，线宽交给 vector-effect——
 * 卡片宽度随栏宽变，线不该跟着变粗。
 * ────────────────────────────────────────────────────────── */
export function BaseSparkline({ points, tone = "#3b82f6" }: { points: readonly number[]; tone?: string }) {
  const step = 100 / Math.max(points.length - 1, 1);
  const path = points
    .map((value, at) => `${at === 0 ? "M" : "L"}${(at * step).toFixed(2)} ${(100 - value * 92 - 4).toFixed(2)}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${path} L100 100 L0 100 Z`} fill={tone} opacity={0.12} />
      <path
        d={path}
        fill="none"
        stroke={tone}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
