# components/

> L2 | 父级: ../README.md

页面构件。两条分界：**站点 chrome**（header / footer）在两页之间共用一段 DOM，
**正文各节**各说一句话、彼此不共享状态；`icons.tsx` 与 `theme.tsx` 是这两族
共同的底座。会动的示意图在 `reels/`，首屏那台机器在 `window/`，Apps 一节那四台真机在 `apps/`。

## 成员清单

- **site-header.tsx**: 全站唯一的 header。`stage`（首屏上缘让出来的那条带子，
  高度与显影跟着收缩走）与 `framed`（子页定高 78px、下缘一条发丝线）是同一段
  DOM 的两层皮。文字链与 CTA 一律 32px，品牌入口是 18px 的原生文字；导航与动作之间隔一条
  `1×16` 的发丝线。
- **site-footer.tsx**: A compact text-only colophon. The MIT statement owns the left edge;
  five verified product links form a dot-separated row on the right and wrap as a group on small screens.
- **hero.tsx**: 首屏。钉住的桌面从满幅收成一张内嵌卡片，正文从它上面滑过去。
  收缩改的是内边距不是 `transform: scale`（scale 会把窗口里的字一起重采样）。
  横向让出的量读 `--bleed`，不自己再算一遍。主题按钮位于系统菜单栏日期左侧。
  窄屏不演收缩。
- **agents-section.tsx**: 「谁来干」。四家 agent 各自具名，行首那枚 logo
  连同填色一并抄自 `packages/model-logos/inline.ts`。
- **apps-section.tsx**: 「干出来的东西住在哪」。只剩一层 section 外壳，
  主体在 `apps/`：左边一台机器一次演一只 App 的真实表面，右边那份目录
  既是名单也是它的换挡杆。
- **apps/**: Apps 一节的四台真机与那只换挡杆；见 `apps/README.md`。
- **fork-band.tsx**: The closing source pitch. Its desktop headline stays on one line,
  redundant license metadata is omitted, and a titled terminal window presents the build commands.
- **icons.tsx**: 图标底座。`Stroke`（描边，24 网格）/ `Glyph`（实心单路径）/
  `AgentLogo`（四家官方标记）/ `AppIcon`（圆角方章）/ `Wordmark` / `D`（路径表）。
  全站不用 emoji 也不装图标库。
- **theme.tsx**: The auto/light/dark state machine. `THEME_BOOT` resolves auto before paint,
  `ThemeRuntime` follows later system changes, and `ThemeToggle` advances the visible control.

## 子目录

- **reels/**: 正文里两台会动的示意图（agents / apps）。
- **window/**: 首屏那台机器（外壳 / 对话 / 输入框 / 模型面板），几何逐项抄真组件。

[PROTOCOL]: 变更时更新此头部，然后检查 README.md
