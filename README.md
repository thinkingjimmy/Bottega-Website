# Bottega-Website — the marketing site for [Bottega](https://github.com/thinkingjimmy/Bottega)

Next.js 16 (App Router, static export) + plain CSS + TypeScript

<directory>
app/ - 路由与页面 (2 页: `/` 首页, `/changelog` 更新日志)
components/ - 页面构件 (6 个: hero / agents-section / agents-reel / fork-band / site-footer / theme / icons)
components/window/ - 首屏那台机器 (4 个: 外壳 / 对话 / 输入框 / 模型面板；见其 README)
lib/ - 数据与解析 (2 个: agents 演示数据, changelog 解析)
content/ - 构建期内容快照 (changelog.md)
scripts/ - 构建前置 (sync-changelog.mjs)
public/ - 品牌资产 (app-icon.png, mark.png, wordmark.png, wordmark-dark.png)
</directory>

<config>
next.config.ts - 静态导出 (`output: "export"`)，站点无请求期数据
tsconfig.json - strict + `@/*` 路径别名
postcss.config.mjs - 空管道；本站不用 Tailwind
</config>

## 唯一的运行时依赖

`thinking-orbs` —— 流式状态行左边那颗 orb。它是产品自己在用的那个包，版本
钉死在 `0.1.1`，与 `packages/ui` 的 `ThinkingShimmer` 同源。装它而不是照着
画一个，是因为「照着画」的东西第一天就开始漂移，而这颗 orb 恰恰是「体验
跟你熟悉的产品一致」这句话最难伪造的那一处证据。

除此之外全站零运行时依赖：图标是自己的两个 20 行组件，logo 路径与填色逐字
取自 `packages/model-logos/inline.ts`。

## 为什么不用 Tailwind

这套设计本来就是用 CSS 自定义属性写的。翻成工具类等于在设计与实现之间
加一层翻译，只会让两边悄悄漂移。全站样式集中在 `app/globals.css`，
两套 token 并存：`--ground/--ink/--line…` 是网站的暖纸色系，
`--app-*` 是产品窗口的中性色系，取值与 Bottega 的
`packages/ui/src/styles/globals.css` 的 oklch 中性阶一一对应。

分成两套是有意的：首屏那台机器必须长得跟真产品一样，不该跟着营销页的
暖色走；营销页也不该被产品的中性灰拖成一张后台界面。

## 一条竖线管全页

`--bleed` 是全页左右边界的唯一真相源：首屏那台机器收缩到位后左右各让出
的量。它同时决定三件事——舞台的收缩终点（`hero.tsx` 读它，不自己再算
一遍）、站点 header 的内缩、正文每一节的边界。于是「header 与正文对不齐」
这件事没有发生的余地：它们本来就靠的是同一个数。

正文相对舞台边缘再让 `--gutter`（8px）：卡片是一块表面，文字不该贴着它的
圆角起头；header 与正文让的是同一个量，所以共用同一条竖线。

`--bleed` 必须用 `@property` 注册成 `<length>`。未注册的自定义属性在
`getComputedStyle` 里原样返回记号流（拿到 `"min(120px, 6.5vw)"` 而不是
`"93.6px"`），脚本算收缩终点会得到 NaN，横向收缩**静默失效**——页面照样
好看，只是那台机器再也不往里收了。不支持 `@property` 的浏览器取到字符串，
`parseFloat` 落回 0：不收缩，但不塌。

正文因此没有 `max-width` 上限，宽度随视口走。行长改由文字自己封顶
（`.entry` 第二栏 72ch、几段正文 56ch）——容器宽了不等于句子该变长，
这两件事本来就该分开管。

## 首屏

页面不以一张讲产品的海报开场，而是直接给出产品本身。滚动时这台机器
钉住并从满幅收成一张内嵌卡片，上缘让出来的带子里浮出站点 header，
正文从它上面滑过去。

收缩改的是盒子的内边距与圆角，不是 `transform: scale`——scale 会把整台
机器连同窗口里的文字一起重采样，字会糊。三个 CSS 变量默认 0，也就是满幅：
脚本没跑起来时首屏是完好的，而不是一个缩了一半的中间态。

header 的显影不跟收缩进度走，跟「带子装不装得下它」走：带子矮于 48px
（那颗 36px 的 CTA 加一点呼吸）时它一个字都不露，装下了才在 22px 的行程里
落定，顺带落 7px 滑进来。原来那条随进度线性显影的斜坡，会让一条被切掉上下
沿的横条正压在系统菜单栏上——两样东西都读不成。透明的那一段同时把
`pointer-events` 关掉：看不见不等于点不到。

窗口的几何逐项抄自 Bottega 的真组件，不是眼量的近似值：侧栏来自
`apps/desktop/src/components/sidebar`（宽 256px、行高 32px、行首 16px
等宽槽、子行缩进 24px、字标那一行 48px），页头来自 `components/page-shell`
（40px，标题 14px/500），输入框来自 `components/chat/composer`（圆角 18px、
发送钮 28px），表格来自 `components/bases/views/table`。侧栏 12px、聊天与
输入框 14px，是产品里 `text-xs` 与 `text-sm` 的原样——密度也是层级的一部分。
过程块默认折叠，与 `useFoldState` 的 `useState(false)` 一致。

**唯一一处有意偏离**：侧栏字标 26px，产品是 32px（`lib/brand.ts` 的
`PRODUCT_LOGO_SIZE` 配 `h-8`）。这是营销图的取景决定，不是抄错——两份资产
都贴着墨迹裁过（产品 751×206 里 747×202 是墨，本站 360×98 里 358×98 是墨），
所以差的是尺寸本身，不是画布留白。改回去只需把这一个数写回 32。

窗口可被压扁：`flex: 0 1 auto` + `min-height: 0`，视口一矮先压窗口，
内容交给对话区自己滚。写成 `flex: none` 的那一版会向两头同时溢出，
上半截正好压在系统菜单栏上——那条带子是 macOS 的，不是我们的地界，
所以它最左边那一枚也是苹果，不是我们自己的标。窗口本身封顶
1080×660，上缘另让 20px：居中只保证两头等分，而这一头顶着菜单栏，
等分下来仍然贴得太近。

站点自己的 header 与 footer（首页与 changelog 两处）挂的是应用图标那枚
圆角方章（`app-icon.png`，自 `apps/desktop/resources/icon.png` 裁掉四周
104px 的 macOS 出血留白）。
字标只留在窗口里的侧栏——那本来就是产品自己在那个位置显示的东西。

四家 agent 的标记连同填色一并抄自 `packages/model-logos/inline.ts`：
claude 通体品牌橙，kimi 主体随语境、右上一点品牌蓝。行首那一格因此不许
统一涂灰——涂了，四家就成了同一家。

会话里那三样东西同样是抄的，不是仿的：计时头（标签在前、箭头紧随、下缘
一条全宽发丝线）来自 `chat-turn.tsx` 的 `WorkedForRow`，Plan 卡来自
`chat-plan-card.tsx`，流式状态行来自 `ai-elements/thinking-shimmer.tsx`
——连那颗 orb 都是产品用的同一个包。状态行的那句话也不是自由发挥的文案：
产品里它只有三种来源（正在跑的工具标题、`Responding`、`Thinking`），
见 `shared/chat-turn-reducer.ts` 的 `shimmerLabel`。

### 这台机器上真能按下去的东西

首屏不是一张截图，而这一点本身就是要说的话：**你已经会用的那些东西，
在这里原样都在**。

默认落在 Codex 那条会话上——它是 `modelOptions: "full"` 的唯一一家，
第一眼就该给出产品最完整的那张脸：一张 Plan 卡，和一条带滑轨的模型面板。
侧栏里 Claude 那条正停在 agent 反问你的时刻：输入框整只让位给问题卡，
因为此刻你能做的就只有回话。

侧栏每一条 chat 都打得开，Show more 真的把下一页放进来，Apps 与置顶的 App
切到表格那一面，计时头折得起来。输入框右侧两颗按钮开真菜单：换 agent 就换
目录，模型、档位、Fast 一起落回新家的默认值，行首 logo、页头 logo、按钮
三处同时改口——因为它们读的本来就是同一个值。

模型面板有两张脸，因为产品有两张脸：Codex 是一条蓝色档位滑轨 + Fast 开关
（拖得动，按得亮），其余三家是 Model / Effort 两行摘要。档位随模型而有无
（Fable 5 与 Haiku 4.5 一档都没有，K3 有三档），OpenCode 的模型名就是它的
slug 本身。这些都是 `browserModels` 与 `capabilities.modelOptions` 里的事实，
不是为了好看编的。

`+` 与权限那两颗是静态的：它们是这张照片的一部分，所以不给悬停反馈——
给了就是许一个按不动的诺。

两颗芯片直说这一面是什么（"Chat, just like your CLI" / "Apps your agent
builds"），底下不再挂一行注解——注解要说的话，上面那台机器正在演，
写下来只是把演过的再讲一遍。

## Agents 一节

左侧那台机器是会动的，一镜到底：先给整台机器（对话区是骨架屏，此刻要看
的不是它），推近到侧栏，再自上而下摇下去，让每一行行首那枚 agent logo
一个一个走过镜头。这一节要讲的话就是这个动作本身，所以右侧文字只需要说
「有谁」和「谁付钱」，不必再解释「你怎么知道是谁干的」——原来那三条勾选
清单因此整块撤掉了。

镜头由六个 CSS 变量钉住（`--cam-out` / `--cam-out-x` / `--cam-out-y` /
`--cam-in` / `--cam-in-x` / `--cam-pan-y`），都是从画框的 460×330 与机器的
720×420 推出来的；改画框只改这六个数，`@keyframes` 一行都不用动。

画框底色是**桌面色**（`--ground-2`）而不是机器色，机身自己带一圈边与影。
两者同色时全景那一格读起来是「一台机器浮在白里」——letterbox 与机身分不出
边界，于是它既不像一台机器，也不像一张图。`--cam-in-x` 的 −12px 是把机身
左圆角推出画框：推近之后那个圆角会在左上角豁开一小块桌面，看着像渲染事故。

整段是一条 keyframes，没有 hook 也没有脚本，服务端渲染即可。不写
`will-change`：那会把这一层钉成一张固定分辨率的位图，推近之后字就糊了；
让浏览器在每段停顿里自己重新栅格化，停住时才是清楚的。
`prefers-reduced-motion` 下动效整个停掉，静息态就是「推近到侧栏」那一格
——留下的该是这一节要说的话，而不是一张什么都看不清的全景。

## Changelog

真相源是 Bottega 仓库的 `docs/changelog/README.md`。本仓库存一份构建期
快照（`content/changelog.md`），因为站点必须能独立 clone、独立构建——
Vercel 上没有那个兄弟目录。

作为 Bottega-Dev 的 submodule 开发时，用 `pnpm sync:changelog` 拉齐快照；
`pnpm build` 会以 `--if-present` 方式尝试同步，缺席时沿用已提交的快照。

## 开发

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 产物在 out/
pnpm typecheck
```

作为 Bottega-Dev 的 submodule 开发时，`pnpm install` 会被父级的
`pnpm-workspace.yaml` 吸进 monorepo 的 store，依赖于是链到本仓库之外，
Turbopack 拒绝编译工作区外的文件（"Could not find the Next.js package"）。
在这里装依赖一律加 `--ignore-workspace`：

```bash
pnpm install --ignore-workspace
```

Vercel 上不存在这个问题——那边只有本仓库，`pnpm install` 就够了。

## 部署

Vercel 直接构建本仓库即可，无需额外配置（Framework 自动识别为 Next.js）。

## License

MIT
