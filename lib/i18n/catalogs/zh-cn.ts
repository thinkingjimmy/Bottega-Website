/**
 * [INPUT]: Uses the English baseline and CatalogShape parity type
 * [OUTPUT]: Exports the complete Simplified Chinese website catalog
 * [POS]: Simplified Chinese translation of every visitor-visible website string
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { CatalogShape } from "../catalog-shape.ts";
import type { en } from "./en.ts";

export const zhCN = {
  meta: {
    siteTitle: "Bottega — 会自我构建的工作坊",
    siteDescription: "一个工作坊，同时运行 Codex、Claude Code、Kimi Code 与 OpenCode；本地优先，沿用你已有的订阅。",
  },
  language: { label: "语言", autoDetect: "自动检测", selected: "已选择" },
  nav: { features: "功能", changelog: "更新日志", download: "下载", downloadMac: "下载 macOS 版" },
  footer: {
    noteBefore: "Bottega 是自由开源软件（",
    noteAfter: "）。",
    navigation: "页脚导航",
    links: { changelog: "更新日志", docs: "文档", github: "GitHub", issues: "问题", download: "下载" },
  },
  common: { readMore: "了解更多", replay: "重新播放" },
  home: {
    hero: {
      menu: ["文件", "编辑", "显示", "对话", "窗口", "帮助"],
      date: "9 月 1 日 周二  9:36",
      chatChip: "像 CLI 一样自然地对话",
      appChip: "由 Agent 构建的 App",
    },
    agents: {
      title: "你订阅的每一个 Agent，都在同一个侧栏。",
      paragraphs: [
        "Codex、Claude、Kimi 与 OpenCode 都在 Bottega 中运行——直接使用你已经安装的官方 CLI，不重新实现一套替代品。",
        "每个 Agent 都使用你自己的订阅：费用由服务商按你已有的套餐结算，而不是由我们收费。",
      ],
    },
    apps: {
      title: "构建 AI 原生 App。",
      body: "构建 AI 健身教练、AI 记账工具，或任何只属于你的东西。描述想法，Bottega 会把它从数据到界面变成可运行的 App。以下四个 App 随 Bottega 一起提供：",
    },
    customizable: {
      title: "通过对话定制任何 App。",
      body: "每个 Bottega App 都有可编辑源码，不是黑箱。选择 Edit App，描述你想改变什么；Agent 会直接操作源码，更新功能、数据与界面，无需另开代码编辑器。",
    },
    base: {
      title: "每个 Chat 都带有一个 Base。",
      body: "Bottega 用它组织、分析和可视化数据。询问总计、摘要、分类占比或趋势，再用表格、图表、画廊或地图查看同一份数据，无需导出。",
    },
    fork: {
      title: "Fork 它，发布你自己的构建。",
      body: "Bottega 从头到尾采用 MIT License。Fork 仓库，修改 Agent、工具与界面，再把自己的版本交付给整个团队。它仍在成员的机器上本地优先运行，并沿用他们已有的订阅。",
      download: "下载 macOS 版",
      source: "查看源码",
      terminalLabel: "构建 Bottega 的终端命令",
    },
  },
  changelog: {
    metaTitle: "更新日志",
    metaDescription: "Bottega 产品里程碑，以及各项能力首次形成完整形态的时间。",
    eyebrow: "更新日志",
    title: "真正交付了什么。",
    introduction: "这里只记录产品里程碑，不堆叠内部迭代。每个日期表示对应能力首次形成真正可用的完整形态。",
  },
  features: {
    sidebarLabel: "功能",
    sidebarNavigation: "功能文档",
    breadcrumb: "功能",
    agents: {
      label: "Agents",
      menuCopy: "Codex、Claude、Kimi 与 OpenCode",
      title: "多个 Agent，一个工作空间。",
      deck: "在同一个本地工作空间运行 Codex、Claude Code、Kimi Code 与 OpenCode——使用它们的官方 CLI、你已有的服务商权限，以及统一的对话体验。",
    },
    apps: {
      label: "Apps",
      menuCopy: "围绕任务构建的可用界面",
      title: "把 Agent 的成果变成可以持续使用的界面。",
      deck: "App 为工作流提供自己的界面、数据和权限，让有用的结果不再困在聊天记录里。",
      imageAlt: "Bottega Apps 库，其中已安装的 Bottega Design Canvas 标记为 Ready",
      imageCaption: "截取自 Bottega：已安装的 App 在 Apps 库中拥有持久位置和明确的就绪状态。",
      sections: [
        {
          heading: "App 是持久的产品界面",
          paragraphs: [
            "Bottega 可以从不可变 Git revision 安装 static、server-backed 与 Base-backed App。App 可以提供专用 GUI、结构化数据，或两者兼有；Chat 则继续作为请求 Agent 工作的控制面。",
            "第一方示例面向不同任务，而不是共用一个万能仪表盘：Design Canvas、Development Kanban、Expense Tracker 与 Fitness Log。每个 App 都围绕自己的工作塑形，因此界面彼此不同。",
          ],
          points: [],
        },
        {
          heading: "界面与数据始终相连",
          paragraphs: ["Base-backed App 可以把自己的 GUI 放在驱动它的数据行旁边。用户看到为任务定制的界面，Agent 则获得读写底层记录的明确工具。"],
          points: [
            "Design Canvas 渲染自包含 HTML 方向稿，并能把带编号的视觉锚点送回 Chat。",
            "Development Kanban 把实现任务与评审发现保存为结构化记录。",
            "Expense Tracker 把自然语言支出规范化为账本和分析视图。",
            "Fitness Log 记录训练组，并投影成肌群热力图。",
          ],
        },
        {
          heading: "安装拥有真正的信任边界",
          paragraphs: [
            "App 权限在使用前声明并确认。数据访问按能力分别授予读、插入、修改、删除或附件，并绑定到精确 App generation。GUI 不会静默继承本地文件或数据的无限访问权。",
            "可复用 App 可以分享，而不会把本地凭据或私有工作空间状态复制进安装包。",
          ],
          points: [],
        },
      ],
    },
    customizable: {
      label: "可定制",
      menuCopy: "在 App 自己的源码 Chat 中编辑",
      title: "和源码对话，就能编辑 App。",
      deck: "对于源码可编辑的 App，Bottega 会在其源码 Project 内打开普通 Agent Chat，而不是把你丢进另一个代码编辑器。",
      imageAlt: "Bottega Design Canvas 详情页，包含 App 与 Data 标签、设置、Chat 和更多操作菜单",
      imageCaption: "截取自 Bottega：App 详情页把界面、数据、使用 Chat、设置和源码操作放在一起。",
      sections: [
        {
          heading: "编辑是一级产品动作",
          paragraphs: [
            "当 App 拥有可编辑源码时，详情页会在更多操作中显示 Edit App。该动作恢复 App 的编辑器 Project，并打开绑定源码的标准 Agent Chat。",
            "你用与 Bottega 其他地方相同的交互方式描述改动。所选 Agent 可以在正常工作空间边界内检查、更新并重新构建 App。",
          ],
          points: [],
        },
        {
          heading: "使用与编辑属于不同上下文",
          paragraphs: ["App 的使用 Chat 用来操作已安装 App 及其记录；编辑器 Chat 用来修改 App 本身。分开两种角色，普通使用请求就不会悄悄变成源码修改。"],
          points: ["使用 Chat 始终属于已安装 App。", "Edit App 激活该 App 专用的源码 Project。", "数据授权仍绑定已安装 generation，不从编辑器继承。"],
        },
        {
          heading: "源码不是黑箱",
          paragraphs: [
            "同一个 App 详情界面还会在适用时提供工作台、版本历史、导入路径与 GitHub 分享流程。产品让源码生命周期清晰可见，而不是把定制藏在一次不可见的重新生成之后。",
            "并非所有第三方 App 都默认可编辑。只有持久源码证据表明确实可用时，Bottega 才显示编辑动作。",
          ],
          points: [],
        },
      ],
    },
    base: {
      label: "Base",
      menuCopy: "紧邻对话的本地结构化数据",
      title: "每段对话旁边，都有结构化本地数据。",
      deck: "Base 是 Bottega 面向 Chat、Project 和数据型 App 的行式数据层，始终靠近操作它的对话。",
      imageAlt: "Bottega App 的 Data 标签，显示带视图、筛选、列、分组和新增行控件的 Base 表格",
      imageCaption: "截取自 Bottega：同一 App 详情界面从 GUI 切换到完整 Base 工作台。",
      sections: [
        {
          heading: "对话与数据集共享同一个所有者",
          paragraphs: [
            "Chat 可以使用自己的本地 Base。没有私有 Base 且属于某个 Project 时，它可以回退到该 Project 的共享 Base。所有权规则明确，因此 Agent 与界面操作的是同一份持久数据。",
            "Agent 获得内置 Base 工具，用来读取 schema 与数据行、查询、聚合和执行带 revision 检查的修改。跟踪器、库存、账本或计划都能直接成为结构化数据，而不必另建电子表格文件。",
          ],
          points: [],
        },
        {
          heading: "六种视图，一个真相源",
          paragraphs: ["Table、List、Kanban、Map、Chart 与 Gallery 都是同一批数据行的投影。切换视图不会把数据分叉成不同文档。"],
          points: ["筛选、排序、分组和选择可见字段，无需重写记录。", "使用公式与 relation 生成派生或关联数据。", "附加媒体、检查行历史，并交换 CSV、JSON 或 XLSX 数据。", "让 App 提供定制 GUI，同时在 Data 标签保留底层 Base。"],
        },
        {
          heading: "访问范围生来狭窄",
          paragraphs: [
            "App 对 Base 的访问按精确 generation 限定能力。读取、插入行、修改、删除和附件各自授权，revision 检查避免过期写入静默覆盖新数据。",
            "因此 Agent 可以操作本地数据界面，却不会让每个已安装 GUI 都变成无限制数据库客户端。",
          ],
          points: [],
        },
      ],
    },
    agentsArticle: {
      stories: [
        {
          index: "01 · Multi-Agent",
          title: "官方 CLI，一个工作入口。",
          paragraphs: [
            "Bottega 通过官方本地 CLI 运行 Codex、Claude Code、Kimi Code 与 OpenCode，不用通用 Agent 层替换它们自己的执行框架。",
            "认证、订阅权限和额度仍归服务商所有。模型与 reasoning effort 控件来自每个 CLI 的实时目录，只有后端真正能接受的选项才会出现。",
            "一段对话始终绑定创建它的 Agent。需要另一个 Agent 时新开对话，两者仍可住在同一个 Project。",
          ],
        },
        {
          index: "02 · 对话能力对齐",
          title: "一套对话体验，适配而不抹平差异。",
          paragraphs: [
            "流式回复、工具活动、Plan 评审、问题、权限、模型控制与排队消息共用一套视觉系统。Bottega 把各后端协议投影进来，但不会假装它们能力完全相同。",
            "矩阵展示当前产品契约。“共享”表示 Bottega 界面一致；原生和适配说明实现差异。运行时缺失的能力不会变成不可用的死控件。",
          ],
        },
        {
          index: "03 · 跨 Agent 协作",
          title: "让一个 Agent 把工作交给另一个。",
          paragraphs: [
            "Claude 对话可以准备 Plan，把有界上下文发送给 Codex 对话并请它实现；Codex 还能把结果返回原对话评审。",
            "交接使用 Bottega 的持久 Chat 通信工具：目标 Chat 保留自己的 Agent 与工作空间，消息会立即开始或在那里排队，结果始终可见、可复用，不会消失在隐藏运行中。",
          ],
        },
      ],
    },
  },
  demo: {
    chrome: {
      newChat: "新建 Chat", apps: "Apps", projects: "Projects", chats: "Chats", settings: "设置", showMore: "显示更多",
      ledger: "账本", analysis: "分析", byMonth: "按月", date: "日期", amount: "金额", category: "分类", note: "备注", sum: "合计", records: "{count} 条记录",
      askAnything: "问任何问题", approveForMe: "替我批准", currentAgent: "当前 Agent：{name}", currentModel: "当前模型：{name}",
      recommended: "推荐", anotherApproach: "都不合适；告诉 Agent 另一种方案", workedFor: "工作了 {duration}", plan: "Plan",
      planCopied: "已复制 Plan", copyPlan: "复制 Plan", closePlan: "关闭 Plan 面板", openPlan: "打开 Plan 面板",
    },
    model: {
      advanced: "高级", disableFast: "关闭 Fast 速度", enableFast: "开启 Fast 速度", model: "模型", effort: "思考强度", unavailable: "不可用", quickTier: "快速模型档位",
      efforts: { low: "轻量", medium: "中等", high: "高", xhigh: "极高", max: "最高" },
    },
    apps: { shapes: ["工作空间产物 App · 隔离 GUI 界面", "Base App · 9 列 · 任务 / 发现 / 台账", "Base App · 4 列 · 明细 / 分析视图", "带 GUI 界面的 Base App · 肌群热力图"] },
    baseViews: [
      { name: "表格视图", tab: "表格", blurb: "类型化列、排序、筛选，以及任意列汇总" },
      { name: "图表视图", tab: "图表", blurb: "分类占比与每日支出" },
      { name: "画廊视图", tab: "画廊", blurb: "把附件列显示为缩略图" },
      { name: "地图视图", tab: "地图", blurb: "把位置列显示为图钉" },
    ],
    ledger: {
      categories: ["交通", "设备", "杂货", "健康", "外出就餐"],
      notes: ["滴滴，机场行程", "Apple Store", "盒马鲜生", "健身房，季度", "博多一幸舍拉面", "高铁", "社区市场", "团队午餐", "机场快线", "周末采购", "显示器支架", "咖啡，两杯", "药房", "地铁充值", "机械键盘", "盒马鲜生", "深夜面条", "牙医"],
      categoryShare: "分类占比", dailySpend: "每日支出", location: "位置", where: "地址", label: "标签",
    },
    kanban: {
      tabs: ["任务", "发现", "全部"], lanes: ["进行中", "评审", "完成"], task: "任务", source: "来源", doc: "文档",
      titles: ["把设置面板移到 Agents 下", "为 CLI 导入路径补集成测试", "审计自动更新流程", "在文档中解释 ACP 握手", "重命名 /settings/backends 且不破坏书签", "把 onboarding 文案缩到 42 个词", "定义安装协议", "拆分发布身份与获取源", "发布 0.2.0 更新说明"],
    },
    canvas: {
      live: "实时", focus: "聚焦", directions: "方向", compare: "比较", browse: "浏览", element: "元素", region: "区域",
      desktop: "桌面", tablet: "平板", mobile: "手机", fit: "适合", anchors: "锚点", selectedCount: "已选 {count} 个", stale: "已过期", clear: "清除", addToChat: "添加到 Chat",
    },
    fitness: {
      trainingRecord: "Fitness Log · 训练记录", title: "覆盖，而非指导", subtitle: "只统计已完成的组。通过使用 Chat 或数据表记录和修正条目。",
      revision: "修订版本", createPlan: "创建训练计划", coverage: "覆盖", heatmap: "肌群热力图", body: "身体", male: "男性", timeRange: "时间范围", last30Days: "最近 30 天",
      front: "正面", back: "背面", intensity: "覆盖强度", offlineCatalog: "离线目录 · 1324 个动作", exerciseCatalog: "动作目录", clearFilters: "清除筛选",
      search: "搜索", searchHint: "名称、别名、肌群或器械", bodyPart: "身体部位", muscleRegion: "肌群区域", equipment: "器械", all: "全部", exercises: "1324 个动作", showing: "显示 1–24", groups: ["胸部", "大腿", "背部"],
    },
    appMenu: { items: ["编辑 App", "App 工作台", "关于此 App", "导入", "版本历史", "分享到 GitHub"], ask: "给比较视图增加第三个面板。", source: "App 源码" },
    chats: {
      releaseNotes: {
        title: "发布 Release Notes", ask: "根据 0.1.9 之后合并的 PR 起草 0.2.0 Release Notes。", trace: ["读取 4 个 package 的 18 个 commit", "编辑 CHANGELOG.md"],
        reply: "Plan 在上面。说开始我就写；告诉我想改哪组，我会先重新整理。",
        plan: { title: "0.2.0 Release Notes", sections: [
          { heading: "摘要", items: ["自 `0.1.9` 以来有六项主要变化，按用户最先感知的部分分组。", "Agent 能力对齐是头条——`Kimi` 与 `OpenCode` 现在拥有和 `Codex` 相同的权限阶梯。", "两项内部重构合并成一句；仓库之外没人感受到它们。"] },
          { heading: "顺序", items: ["按用户触及的界面分组 18 个已合并 PR，而不是按落入的 package。", "每条写清发生了什么——PR 编号是来源，不是新闻。", "把文件镜像到 `docs/`，再读回两份，确保它们永不分叉。"] },
          { heading: "文件", items: ["`CHANGELOG.md`——六条记录，最新优先，使用绝对日期。", "`docs/changelog/README.md`——公开镜像，同样六条。"] },
          { heading: "本轮不做", items: ["补齐 `0.1.x`——旧记录追溯多远是另一个决定。", "Release tag 与下载页；它们读取此文件，不写入。"] },
        ] }, status: "正在回复",
      },
      settingsPanel: {
        title: "迁移设置面板", ask: "把后端设置移到 Agents 下，同时保留 deep link。", trace: ["读取 components/settings 中的 9 个文件", "找到 12 个调用点"],
        reply: "有三种做法，差别只在用户已经保存的链接会怎样。", bullets: ["12 个调用点无论如何都只是机械修改。", "真正不能机械决定的是两个 deep link 和 command palette 入口。", "所以问题其实是：你想对旧链接作出什么承诺。"],
        question: { eyebrow: "Main Agent · 路由策略", text: "旧设置路由已被加入书签。该怎么迁移？", options: [
          { label: "保留重定向", description: "旧路径跳到新路径，书签与 palette 仍能到达。" }, { label: "直接重命名", description: "目录最干净，但所有已保存链接都会失效。" }, { label: "保留两个版本", description: "本版同时提供两套路由，在 0.3.0 删除旧路由。" },
        ] },
      },
      changelog: { title: "起草更新日志", ask: "汇总本周 merge，写成更新日志页面。", trace: ["读取 24 条 commit message", "编辑 docs/changelog/README.md"], reply: "六条。本周读起来是一段完整故事，而不是 merge 清单。", bullets: ["六条，最新优先，每条一行。", "两项内部重构合并在一起——仓库之外没人感受到它们。", "日期使用绝对值，不用相对时间：更新日志会在数月后被阅读。"], status: "正在编辑 docs/changelog/README.md" },
      importTests: { title: "覆盖 CLI 导入路径", ask: "为导入现有 CLI session 增加集成测试。", trace: ["读取导入模块", "运行 48 个测试"], reply: "全部通过，而且此前没有测试的一条路径现在有了。", bullets: ["48 个测试通过，包括 4 个新增用例。", "畸形 session 文件现在让导入失败，而不是让 App 崩溃。", "Fixture 与模块放在一起，下一位读者可以直接找到。"], status: "正在运行 48 个测试" },
      onboarding: { title: "精简 Onboarding 文案", ask: "首次启动页像一本手册。把它精简到第一次 Chat 前真正需要的内容。", trace: ["读取 4 个 Onboarding 页面", "编辑 5 种语言的 onboarding.ts"], reply: "删掉的每句话，界面本身都已经说过。", bullets: ["从 140 词缩到 42 词。", "权限说明移到真正选择权限的位置。", "五种语言全部重写，不从英文机器翻译。"], status: "正在思考" },
      updatePath: { title: "审计更新路径", ask: "走查自动更新流程，找出下载一半的 Release 会把人卡在哪里。", trace: ["追踪 3 个更新状态", "运行更新器测试套件"], reply: "有一个真实漏洞，而且网络不稳时正会撞上。", bullets: ["一个真实漏洞：安装中断后按钮会永远显示正在安装。", "其他状态都能在重启时恢复——下载会从自己的 ledger 继续。", "建议：安装进程缺失应视为失败阶段，而不是等待中。"], status: "正在读取 electron/main/updater.ts" },
      settingsRoutes: { title: "重命名设置路由", ask: "把 /settings/backends 改成 /settings/agents，同时不破坏任何书签。", trace: ["找到 12 个调用点", "编辑 12 个文件"], reply: "所有地方都已重命名，书签毫无察觉。", bullets: ["重命名 12 个调用点，没有使用搜索替换。", "旧路由保留重定向，书签与 palette 仍能到达。", "路由测试全绿。"], status: "正在回复" },
      iconGrid: { title: "比较两套图标网格", ask: "侧栏图标看起来比 Composer 偏了一个像素。哪套网格错了？", trace: ["测量 14 个图标槽", "读取 sidebar-row.tsx"], reply: "两套网格都没错。看起来的错位，是刻意留出的 1px 空气。", bullets: ["两套网格都没错——槽位都是 16px。", "侧栏在槽中放 14px 标记，Composer 图标填满槽位。", "你看到的是槽位，而不是图标。"], status: "正在思考" },
      acp: { title: "解释 ACP 握手", ask: "说明从启动 CLI 到收到第一个 token 之间发生了什么。", trace: ["读取 ACP session 模块", "追踪 6 条消息"], reply: "第一个 token 前有三次往返，此后全都进入同一条 stream。", bullets: ["initialize——client 声明自己能渲染什么。", "session/new——CLI 在你的工作目录中打开 session。", "session/prompt——从此之后都在同一 channel 上流式传输。"], status: "正在回复" },
    },
    agentsVisual: {
      pickerLabel: "Bottega 首页产品窗口，Composer 中的 Agent 选择器已展开", matrixLabel: "Codex、Claude、Kimi 与 OpenCode 能力矩阵", capability: "能力",
      rows: [
        { label: "流式回复", values: ["共享", "共享", "共享", "共享"] }, { label: "工具活动", values: ["共享", "共享", "共享", "共享"] },
        { label: "Plan 与评审", values: ["原生", "原生", "原生", "适配"] }, { label: "提问", values: ["共享 UI", "共享 UI", "共享 UI", "共享 UI"] },
        { label: "模型选择器", values: ["完整", "列表", "列表", "列表"] }, { label: "权限", values: ["3 级", "2 级", "2 级", "2 级"] },
        { label: "轮中消息", values: ["即时", "即时", "下轮", "下轮"] },
      ],
      collaborationLabel: "Claude 规划、Codex 实现，再由 Claude 通过持久 Chat 交接完成评审", persistentChats: "持久 CHATS", flowTitle: "规划 → 实现 → 评审", visibleHandoff: "可见交接",
      phases: ["01 · 规划", "02 · 实现", "03 · 评审"], planSummary: "导航实现计划", planItems: ["使用共享 Header 边界", "保留移动端行为", "验证静态路由"],
      filesChanged: "修改了 3 个文件", typecheckPassed: "类型检查通过", implementationComplete: "实现完成", noIssues: "没有阻塞问题", reviewMatch: "计划意图与实现一致。", reviewReturned: "评审已返回",
    },
  },
} satisfies CatalogShape<typeof en>;
