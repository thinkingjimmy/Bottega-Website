# Bottega-Website — the marketing site for [Bottega](https://github.com/thinkingjimmy/Bottega)

Next.js 16 (App Router, static export) + plain CSS + TypeScript

<directory>
app/ - 路由与页面 (2 页: `/` 首页, `/changelog` 更新日志)
app/styles/ - 全站样式，按关注点拆成 7 项 (tokens / base / hero/ / apps/ / reel / bands / motion；见其 README)
components/ - 页面构件 (8 个: hero / agents-section / apps-section / fork-band / site-header / site-footer / theme / icons)
components/reels/ - 正文里那台会动的示意图 (1 个: agents；见其 README)
components/apps/ - Apps 一节的四台真机与那只换挡杆 (6 个；见其 README)
components/window/ - 首屏那台机器 (4 个: 外壳 / 对话 / 输入框 / 模型面板；见其 README)
lib/ - 数据与解析 (3 个: agents 演示数据, body-map.json 人体路径, changelog 解析)
content/ - 构建期内容快照 (changelog.md)
scripts/ - 构建前置 (sync-changelog.mjs)
public/ - Brand assets (app-icon.png, mark.png, wordmark.png, wordmark-dark.png, hero-bg-light.png, hero-bg-dark.png)
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
圆角起头；header 与正文让的是同一个量，所以共用同一条竖线。这条竖线写成
`--edge = --bleed + --gutter`，`.wrap` 与 `.site-header--framed` 都读它——
原来两处各算了一遍 `calc(...)`，同一条边界有两份定义，迟早分叉。

`--bleed` 必须用 `@property` 注册成 `<length>`。未注册的自定义属性在
`getComputedStyle` 里原样返回记号流（拿到 `"min(120px, 6.5vw)"` 而不是
`"93.6px"`），脚本算收缩终点会得到 NaN，横向收缩**静默失效**——页面照样
好看，只是那台机器再也不往里收了。不支持 `@property` 的浏览器取到字符串，
`parseFloat` 落回 0：不收缩，但不塌。

正文因此没有 `max-width` 上限，宽度随视口走。首页的长段落仍由文字角色控制
行长；Changelog 的简介与条目正文则占满可用栏宽，因为它们是短句与逐条扫描的
产品记录，提前封顶只会制造空白并造成不必要的换行。

## 站点 chrome：一个组件，两层皮

`site-header.tsx` 是全站唯一的 header。首页那条随桌面收缩浮出的带子
（`--stage`）与 changelog 那条常驻的横条（`--framed`）是同一段 DOM 的两层皮：
前者高度等于上缘让出的量、跟着收缩显影，后者定高 78px、下缘一条发丝线。
原来这两处各内联了一份，于是同一条导航长出了两副骨架——而先过时的那份
没人会发现。

一条带子上只允许一种控件高度：文字链、品牌文字与 CTA 一律 **32px**。
32 不是新数，产品自己那两颗 chip 就是 32（`.chip`），站点 chrome 跟着它走，
「网站」与「产品」于是落在同一条基线上。原来那一排是 30 / 21.75 / 34 / 36
四种高度，四个数里没有两个对得上，眼睛读出来的是一堆东西，不是一条导航。

导航与动作之间隔一条 `1×16` 的发丝线：左边是「去哪」，右边是「做什么」。
没有它，四样东西只是排成一行，而不是分成两族。

带子上不再挂那句 "the workshop that builds itself"——一句散文卡在一排标签
中间，跟左右两族都不同族，何况下面那台机器正在说同一句话。它现在只活在
`metadata` 里，那是它该在的地方。

窄屏（≤900px）不再把这条带子 `display: none`。桌面隐喻在 390 上不成立，
但「回到顶 / 去下载」这件事仍然成立：同一段 DOM 改成一条 56px 的普通横条，
两条文字链让位，CTA 整句留着（连按钮只占 169px，放得下）。

The footer is a compact text colophon, not a second site map. The MIT statement anchors the
left edge; Changelog, Docs, GitHub, Issues, and Download sit in one dot-separated row on the
right. On narrow screens the two groups stack intact, preserving reading order and touch clarity.

## 首屏

页面不以一张讲产品的海报开场，而是直接给出产品本身。滚动时这台机器
钉住并从满幅收成一张内嵌卡片，上缘让出来的带子里浮出站点 header，
正文从它上面滑过去。

The desktop wallpaper follows the active theme: `hero-bg-light.png` in light mode and
`hero-bg-dark.png` in dark mode. Both images cover the scene from the center so the
window remains framed by the open sky across viewport sizes.

Theme mode defaults to `auto`: the boot script resolves the system preference before first
paint, and the root runtime follows later OS changes. Manual light/dark choices remain stored;
returning to auto removes that override. The single visible toggle lives in the demo menu bar,
immediately left of the date, where theme is part of the simulated desktop rather than site nav.

收缩改的是盒子的内边距与圆角，不是 `transform: scale`——scale 会把整台
机器连同窗口里的文字一起重采样，字会糊。三个 CSS 变量默认 0，也就是满幅：
脚本没跑起来时首屏是完好的，而不是一个缩了一半的中间态。

header 的显影不跟收缩进度走，跟「带子装不装得下它」走：带子矮于 44px
（那一排 32px 控件加一点呼吸）时它一个字都不露，装下了才在 22px 的行程里
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
所以它最左边那一枚也是苹果，不是我们自己的标。窗口封顶 1080×780、
矮屏按 `100vh − 250px` 收缩，上缘另让 20px：居中只保证两头等分，
而这一头顶着菜单栏，等分下来仍然贴得太近。

那条系统菜单栏右边多让 16px（左 16 右 32）。mac 与新版 Chrome 的滚动条是
**覆盖式**的——不占布局宽度，直接浮在内容上，于是最右端的时钟正好被压在
它下面。经典滚动条会挤窄视口、内容自己就让开了，覆盖式不会，只能由内容
自己退一步。

The wallpaper adds real texture behind the menu bar, so its small type uses a medium
weight, near-solid menu labels, and theme-aware glass. Legibility comes from the surface
and type together rather than a heavy text shadow.

Plan 预览的高度跟着窗口一起长（`clamp(150px, 100vh − 750px, 280px)`）。
窗口在高屏上长到 780，转录的内容却是固定的那几行，于是空出两百多像素
——等于把外面的空白搬进了里面。把多出来的高度还给 Plan：它本来就是个
带渐变的预览，能多露几行只是更诚实。

站点 header 直接渲染原生文字 `Bottega`，不依赖图标或字标图片；主题变化只切换
文字颜色。窗口侧栏继续显示产品自身的图片字标——它属于 demo 的界面内容，
不与站点 chrome 混用。

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

The switcher sits over the landscape's highest-detail area. Its dark glass therefore has
an explicit alpha border and layered shadow, while the selected tab gets the brighter
inner surface; the labels stay readable without turning the control into an opaque bar.

## Agents 一节

右侧那台机器是会动的，一镜到底：镜头开在侧栏左上角，自上而下摇到底，让
每一行行首那枚 agent logo 一个一个走过镜头，然后停住（对话区是骨架屏，此刻
要看的不是它）。这一节要讲的话就是这个动作本身，所以右侧文字只需要说
「有谁」和「谁付钱」，不必再解释「你怎么知道是谁干的」——原来那三条勾选
清单因此整块撤掉了。

**首帧即论点**。开场不给全景：全景在第一眼上读不出一个字，却要占掉近四秒。
更要紧的是，「首帧」从来不是时间轴的 0%，是**观众看见的第一帧**——一段
`infinite` 从页面加载起就在视口外空转，等人滚到这儿，镜头停在哪一格全看
随机数。所以这一段破了 reels 的「无脚本」成规：十来行 IntersectionObserver，
镜头在被看见的那一刻才走，第一次相交之后 observer 自己退场。用十来行赎回
「这一节第一眼说什么」，这笔买卖划算。

**不循环**。摇到底就停在那儿（`forwards`）。一段永动的循环在说「我是个
装饰」，而这台机器在做的是一次陈述——说完该停在结论上，而不是把人拽回
开头再演一遍；演第二遍不会多说出一个字。原来那段「拉远给一眼整机」是
循环回开头前的过门，循环一去，过门就是纯粹的多余动作，三个 `--cam-out-*`
也随之一并删掉：没人读的变量比没人跑的代码更坏，它看起来还像个真值。

静息 `transform` 就是 `@keyframes` 的 0%。脚本没跑（SSR、hydrate 之前、JS
挂了）、`prefers-reduced-motion` 关掉动效、等着起播——三种时刻留下的都是
同一格，一次跳变都没有。降级不是退到一张坏图，是退到首帧。

镜头由四个 CSS 变量钉住（`--cam-in` / `--cam-in-x` / `--cam-in-y` /
`--cam-pan-y`），都是从画框的 580×360 与机器的 720×420 推出来的；改画框只改
这四个数，`@keyframes` 一行都不用动。画框加宽时 `--cam-in` 不跟着涨：涨了
只是整体放大，不涨才是真的把视野放宽——右边多露出的那截对话区，正是
「侧栏只是这台机器的一栏」这句话的证据。

画框底色是**桌面色**（`--ground-2`）而不是机器色，机身自己带一圈边与影。
两者同色时读起来是「一台机器浮在白里」——letterbox 与机身分不出边界，
于是它既不像一台机器，也不像一张图。

镜头开在机器的**左上角**上（`--cam-in-x` 26px、`--cam-in-y` 20px）：左边与
上边各留一条桌面，于是「镜头就在那台机器的一角」这件事自己说得出口。
满幅的侧栏说不出这句话——人看不出镜头此刻在哪儿，那就不是一台机器的一角，
只是一张图。往下摇的全程这条桌面都留着，方向感因此不断线。

**这台缩影只有一个缩放比：0.75**（行高 32→24、行首槽 16→12）。字标那行
原本自己写了 28px 的行与 13px 的字标——0.583 与 0.5，两个谁也不认识谁的
比例，于是缩影里最该被认出来的那个标识反倒缩得最狠，与首屏那台机器对不上。
归队之后是 36px 的行装 20px 的字标，上下各留 8px：与产品「48px 行装 32px
字标」的留白一字不差。

文在左、图在右：文吃余量，图定宽 **580×360**。540×400 那一版分量够了，却比
左边那栏文字高出 41px——图与文各站各的高度，两栏就没有共同的下缘，读起来
是两块拼在一起而不是一件事的两面。580×360 是从文字块量出来的：段落封在
56ch，所以文字栏只要不窄于 565px，这块文字就恒是 359px 高；1440 视口下 580
的图恰好给文字栏留 567px，于是图高 360 与文高 359 落在同一条线上。图定宽的
另一个原因是镜头那四个数按 580 算，栏一浮动它们就全不作数。
DOM 顺序即阅读顺序（文在前、图在后），不靠 `order` 把两栏倒回来——
堆叠之后先读到的仍该是标题。

两张图不共用尺寸，只共用形状（圆角、桌面底色、定宽居中、溢出裁掉）：
Agents 那栏文字 359px 高，Apps 那栏 509px，共用一个尺寸只能保证其中一节
是错的。

两栏只在 1300px 以上成立，这个数是从标题倒推的：内容宽 ≈ 0.87vw − 16，
减去图栏与 90 之后要给 56px/16ch 的标题留下足够宽度。1250px 上文字栏只剩
四百多，标题会碎成四行；1000px 上更只剩 220px，一行放不下四个词。堆叠不是
降级，是这个宽度下唯一还给两边留着呼吸的排法。

列宽写在样式表里（`.split` / `.split-narrow`）而不是内联——内联会压过窄屏
那条 `1fr`，于是手机上两栏永远拆不开，Fork 带原来就是这个毛病。

不写 `will-change`：那会把这一层钉成一张固定分辨率的位图，推近之后字就糊了；
让浏览器在停顿里自己重新栅格化，停住时才是清楚的。

## Apps 一节

左图右文，与上一节的文左图右交替。上一节说的是「谁来干」，这一节说的是
「干出来的东西住在哪」。

图里同一台窗口轮播四只 App 的表面——画布、看板、账本、热力图。**四张长得
都不一样，正是「App 是为这件事长出来的一张面孔」这句话唯一的证据**；写四行
文案说「它们各不相同」，不如把四张摆出来。四张共用一条 keyframes，靠负
delay 各自错开一格（`-20s / -15s / -10s / -5s`）：写四条各自的 keyframes，
改一次节奏就要改四处。

文案与右侧那张清单逐项抄自 `public/awesome-bottega-app` 的目录，**包括每行
尾巴上那句限定语**——`Base App` 与 `workspace-artifact App` 是产品里两种真实的
形状（前者你说话、Agent 写成结构化的行，后者 Agent 写下项目文件、App 提供
围着这些文件的预览与评审），不是营销上编出来的分类。「能自定义成什么」这句
话，只有具体到形状才有人信。

清单上那四枚 emoji 是 App manifest 自己的图标，产品的侧栏里画的就是它们。
全站不用 emoji 做装饰这条仍然成立：这四枚不是装饰，是这四只 App 的身份。

目录住在 `lib/agents.ts` 的 `APPS`，三处消费：这一节的清单、首屏侧栏置顶的
两只（`PINNED_APPS` 由它过滤）、窗口 App 表面的页头（`LEDGER_APP`）。
一份目录三处读，图标与名字不会各写各的。

图在左而 DOM 里图也排在前——它 `aria-hidden`，本就不在阅读顺序里；堆叠时由
一条 `order: 1` 把它退到标题之后，手机上先读到的仍是那句话。

## Fork band

The closing headline stays on one line wherever the desktop and tablet canvas can support
it, then returns to natural wrapping below 640px. The former “Free · MIT · Local-first”
eyebrow repeated the body copy and has been removed, leaving the claim as the section's
single visual anchor.

The build steps live in a recognizable terminal rather than a generic code card: a restrained
titlebar, macOS traffic lights, aligned prompts, and a separate output row establish the command
hierarchy without competing with the download action.

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
