# Bottega-Website — the marketing site for [Bottega](https://github.com/thinkingjimmy/Bottega)

Next.js 15 (App Router, static export) + plain CSS + TypeScript

<directory>
app/ - 路由与页面 (2 页: `/` 首页, `/changelog` 更新日志)
components/ - 页面构件 (7 个: hero / product-window / agents-section / fork-band / site-footer / theme / icons)
lib/ - 数据与解析 (2 个: agents 演示数据, changelog 解析)
content/ - 构建期内容快照 (changelog.md)
scripts/ - 构建前置 (sync-changelog.mjs)
public/ - 品牌资产 (mark.png, wordmark.png, wordmark-dark.png)
</directory>

<config>
next.config.ts - 静态导出 (`output: "export"`)，站点无请求期数据
tsconfig.json - strict + `@/*` 路径别名
postcss.config.mjs - 空管道；本站不用 Tailwind
</config>

## 为什么不用 Tailwind

这套设计本来就是用 CSS 自定义属性写的。翻成工具类等于在设计与实现之间
加一层翻译，只会让两边悄悄漂移。全站样式集中在 `app/globals.css`，
两套 token 并存：`--ground/--ink/--line…` 是网站的暖纸色系，
`--app-*` 是产品窗口的中性色系，取值与 Bottega 的
`packages/ui/src/styles/globals.css` 的 oklch 中性阶一一对应。

分成两套是有意的：首屏那台机器必须长得跟真产品一样，不该跟着营销页的
暖色走；营销页也不该被产品的中性灰拖成一张后台界面。

## 首屏

页面不以一张讲产品的海报开场，而是直接给出产品本身。滚动时这台机器
钉住并从满幅收成一张内嵌卡片，上缘让出来的带子里浮出站点 header，
正文从它上面滑过去。

收缩改的是盒子的内边距与圆角，不是 `transform: scale`——scale 会把整台
机器连同窗口里的文字一起重采样，字会糊。三个 CSS 变量默认 0，也就是满幅：
脚本没跑起来时首屏是完好的，而不是一个缩了一半的中间态。

窗口的几何逐项抄自 Bottega 的 `apps/desktop/src/components/sidebar` 与
`components/bases/views/table`，agent logo 取自 `packages/model-logos`。

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

## 部署

Vercel 直接构建本仓库即可，无需额外配置（Framework 自动识别为 Next.js）。

## License

MIT
