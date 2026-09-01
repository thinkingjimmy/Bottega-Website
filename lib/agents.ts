/**
 * [INPUT]: 无运行时依赖；后端目录、模型目录与档位文案逐项取自
 *          apps/desktop/src/lib/settings-client.ts 与 chat-model-selection.ts
 * [OUTPUT]: 对外提供 AgentId/BACKENDS/MODELS/MODEL_OPTIONS/CHATS/PROJECT/
 *           PINNED_APPS、defaultTurn 与 effortLabel/compactModelLabel，以及 LEDGER
 * [POS]: Bottega-Website 的演示数据唯一真相源，被 hero 与 agents 两处消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

export type AgentId = "codex" | "claude" | "kimi" | "opencode";

/* 名字是产品里的名字，不是 CLI 的名字：产品的选择器上写着 Claude 与 Kimi，
   官网若写 Claude Code / Kimi Code，人点开产品会以为选错了地方。
   （散文里仍可写 CLI 全名——那是在说另一件东西。） */
export const BACKENDS: { id: AgentId; label: string }[] = [
  { id: "codex", label: "Codex" },
  { id: "claude", label: "Claude" },
  { id: "kimi", label: "Kimi" },
  { id: "opencode", label: "OpenCode" },
];

export const backendLabel = (id: AgentId) =>
  BACKENDS.find((backend) => backend.id === id)!.label;

/* ── 模型目录 ────────────────────────────────────────────────────
 * 逐项抄自 settings-client.ts 的 browserModels。每家自带几档 effort 是
 * 事实而非装饰：Fable 5 与 Haiku 4.5 一档都没有，K3 有三档，Sol 有三档
 * 且默认最高。切 agent 之后模型与档位一起换掉，正是产品里发生的事。
 *
 * 默认项排在首位，于是「默认是哪个」不必再记一列布尔——`MODELS[a][0]`
 * 就是答案。一列能被算出来的数据，不该被存下来等着和事实漂移。
 * ────────────────────────────────────────────────────────── */
export type Model = {
  /** 展示名。OpenCode 的展示名就是 slug 本身，与真机一致。 */
  name: string;
  efforts: string[];
  /** 默认档位；无档位的模型给空串，触发器随之只剩模型名。 */
  effort: string;
  /** 这只模型有没有 Fast 服务档（codex/models.ts 的 serviceTiers）。 */
  fast?: boolean;
};

/* ── 模型选择器的两种脸 ────────────────────────────────────────────
 * `full` 是 Codex 独有的那一套：一条蓝色档位滑轨 + Fast 开关，Advanced
 * 之后才是列表。其余三家是 `list-only`：Model / Effort 两行摘要，点进去
 * 才是列表。这不是两种设计口味，是 capabilities.modelOptions 这一位的
 * 直接后果——各家给得出什么，选择器就长什么样。
 * ────────────────────────────────────────────────────────── */
export const MODEL_OPTIONS: Record<AgentId, "full" | "list-only"> = {
  codex: "full",
  claude: "list-only",
  kimi: "list-only",
  opencode: "list-only",
};

export const MODELS: Record<AgentId, Model[]> = {
  codex: [
    { name: "GPT-5.6 Sol", efforts: ["medium", "high", "xhigh"], effort: "xhigh", fast: true },
    { name: "GPT-5.6 Codex", efforts: ["medium", "high"], effort: "high" },
  ],
  claude: [
    { name: "Opus 5", efforts: ["low", "medium", "high"], effort: "high" },
    { name: "Sonnet 5", efforts: ["low", "medium", "high", "max"], effort: "high" },
    { name: "Fable 5", efforts: [], effort: "" },
    { name: "Haiku 4.5", efforts: [], effort: "" },
  ],
  kimi: [
    { name: "K3", efforts: ["low", "high", "max"], effort: "high" },
    { name: "K3-256k", efforts: ["low", "high", "max"], effort: "high" },
  ],
  opencode: [
    { name: "opencode/grok-code", efforts: [], effort: "" },
    { name: "opencode/big-pickle", efforts: [], effort: "" },
  ],
};

/** 档位文案表取自 chat-model-selection.ts——low 在产品里读作 Light，不是 Low。 */
const EFFORT_LABELS: Record<string, string> = {
  low: "Light",
  medium: "Medium",
  high: "High",
  xhigh: "Extra High",
  max: "Max",
};

export const effortLabel = (effort: string) => EFFORT_LABELS[effort] ?? effort;

/* 触发器上的短名。产品里这条规则只喂给 Codex 的目录，因为只有那一家的
   名字带 GPT- 前缀；其余三家的展示名照原样上屏，OpenCode 更是连 slug 本身
   就是展示名。所以这里只去前缀，不动连字符——顺手把 `opencode/grok-code`
   改成 `grok code`，就把一个真实的模型名说成了一个不存在的模型名。 */
export const compactModelLabel = (name: string) => name.replace(/^GPT-/i, "");

/** 换 agent 即换目录：模型、档位、Fast 一起落回新家的默认值，不留上一家的残影。 */
export const defaultTurn = (agent: AgentId) => {
  const model = MODELS[agent][0];
  return { model: model.name, effort: model.effort, fast: false };
};

/* ── 演示会话 ────────────────────────────────────────────────────
 * 九条 chat，四家 agent 混住在同一个 Project 里——这正是产品要说的那句话：
 * 「谁在干这活」从不用问，看一眼行首那枚 logo 就知道。
 * ────────────────────────────────────────────────────────── */
const I_READ = "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20";
const I_EDIT = "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z";
const I_TEST = "M9 2v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V2M8 2h8M7 15h10";
const I_SEARCH = "M21 21l-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0";

export type Chat = {
  id: string;
  title: string;
  agent: AgentId;
  model: string;
  effort: string;
  /** 住在 Project 折叠区里，还是根级 Chats 分组里。 */
  home: "project" | "chats";
  ask: string;
  worked: string;
  trace: { icon: string; label: string }[];
  reply: string;
  /* 回答里的要点。产品里的答复大多是这个形状，不是一整块散文——
     除非这一轮已经交出了 Plan：结构在卡里，正文再列一遍就是列两遍。 */
  bullets?: string[];
  /* 流式状态行那一句。产品里它不是自由发挥的文案，只有三种来源：
     正在跑的那件工具的标题、`Responding`、`Thinking`——见
     shared/chat-turn-reducer.ts 的 shimmerLabel。 */
  status?: string;
  /** Fast 服务档（产品里的 serviceTier: "priority"）。 */
  fast?: boolean;
  /** Plan 卡。有 plan 的 turn，卡片排在最终回复之前。 */
  plan?: Plan;
  /* 待答问题。产品里它不是加在输入框旁边的一块，而是整只顶掉输入框：
     agent 在等你回话时，你能做的就只有回话。 */
  question?: Question;
};

export type Plan = {
  title: string;
  sections: { heading: string; items: string[] }[];
};

export type Question = {
  /** 来源 · 主题：只说问题正文没说过的事实。 */
  eyebrow: string;
  question: string;
  options: { label: string; description: string; recommended?: boolean }[];
};

export const PROJECT = { name: "Bottega Site" };

export const PINNED_APPS = [
  { id: "expense", icon: "💸", name: "Expense Tracker" },
  { id: "kanban", icon: "🗂️", name: "Dev Kanban" },
];

/** Project 折叠区的初始页长。多出来的由「Show more」放进来，与产品同构。 */
export const PROJECT_PAGE_SIZE = 5;

export const CHATS: Chat[] = [
  {
    id: "release-notes",
    title: "Ship the release notes",
    agent: "codex",
    model: "GPT-5.6 Sol",
    effort: "xhigh",
    home: "project",
    ask: "Draft the 0.2.0 release notes from the merged PRs since 0.1.9.",
    worked: "1m 12s",
    trace: [
      { icon: I_READ, label: "Read 18 commits across 4 packages" },
      { icon: I_EDIT, label: "Edited CHANGELOG.md" },
    ],
    reply:
      "Plan above. Say go and I will write it; say which grouping you want changed and I will redraw it first.",
    plan: {
      title: "0.2.0 release notes",
      sections: [
        {
          heading: "Summary",
          items: [
            "Six headline changes since `0.1.9`, grouped by what a user notices first.",
            "Agent parity is the lede — `Kimi` and `OpenCode` now reach the same permission ladder as `Codex`.",
            "Two internal refactors fold into one line; nobody outside the repo felt them.",
          ],
        },
        {
          heading: "Files",
          items: [
            "`CHANGELOG.md` — six entries, newest first, absolute dates.",
            "`docs/changelog/README.md` — the public mirror, same six entries.",
          ],
        },
      ],
    },
    status: "Responding",
  },
  {
    id: "settings-panel",
    title: "Port the settings panel",
    agent: "claude",
    model: "Opus 5",
    effort: "high",
    home: "project",
    ask: "Move the backend settings under Agents and keep the deep links working.",
    worked: "22s",
    trace: [
      { icon: I_READ, label: "Read 9 files in components/settings" },
      { icon: I_SEARCH, label: "Found 12 call sites" },
    ],
    reply:
      "Three ways to do it, and they differ only in what happens to links people already saved.",
    bullets: [
      "The 12 call sites are mechanical either way.",
      "What is not mechanical is the two deep links and the command palette entry.",
      "So the question is really what you want to promise about old links.",
    ],
    question: {
      eyebrow: "Main Agent · Route strategy",
      question: "The old settings routes are bookmarked. How should I move them?",
      options: [
        {
          label: "Keep them as redirects",
          description: "Old paths resolve to the new ones; bookmarks and the palette keep landing.",
          recommended: true,
        },
        {
          label: "Hard rename",
          description: "Cleanest tree, but every link anyone saved stops working.",
        },
        {
          label: "Ship both for one release",
          description: "Two live routes now, drop the old pair in 0.3.0.",
        },
      ],
    },
  },
  {
    id: "changelog",
    title: "Draft the changelog",
    agent: "kimi",
    model: "K3",
    effort: "high",
    home: "project",
    ask: "Summarise this week's merges for the changelog page.",
    worked: "19s",
    trace: [
      { icon: I_READ, label: "Read 24 commit messages" },
      { icon: I_EDIT, label: "Edited docs/changelog/README.md" },
    ],
    reply:
      "Six entries. The week reads as one story, not as a list of merges.",
    bullets: [
      "Six entries, newest first, each one line.",
      "The two internal refactors are folded together — nobody outside the repo felt them.",
      "Dates are absolute, not relative: a changelog is read months later.",
    ],
    status: "Editing docs/changelog/README.md",
  },
  {
    id: "import-tests",
    title: "Cover the CLI import path",
    agent: "opencode",
    model: "opencode/grok-code",
    effort: "",
    home: "project",
    ask: "Add integration tests for importing existing CLI sessions.",
    worked: "2m 4s",
    trace: [
      { icon: I_READ, label: "Read the import module" },
      { icon: I_TEST, label: "Ran 48 tests" },
    ],
    reply:
      "All green, and one path that had no test before now has one.",
    bullets: [
      "48 tests pass, including the four new ones.",
      "A malformed session file now fails the import, not the app.",
      "Fixtures live beside the module, so the next reader finds them.",
    ],
    status: "Running 48 tests",
  },
  {
    id: "onboarding-copy",
    title: "Trim the onboarding copy",
    agent: "codex",
    model: "GPT-5.6 Codex",
    effort: "high",
    home: "project",
    ask: "The first-run screen reads like a manual. Cut it to what someone needs before their first chat.",
    worked: "36s",
    trace: [
      { icon: I_READ, label: "Read 4 onboarding screens" },
      { icon: I_EDIT, label: "Edited onboarding.ts in 5 locales" },
    ],
    reply:
      "Everything I cut was something the interface already says on its own.",
    bullets: [
      "140 words down to 42.",
      "The permission explainer moved to the place where permission is chosen.",
      "All five locales rewritten, not machine-translated from the English.",
    ],
    status: "Thinking",
  },
  {
    id: "update-path",
    title: "Audit the update path",
    agent: "claude",
    model: "Sonnet 5",
    effort: "high",
    home: "project",
    ask: "Walk the auto-update flow and tell me where a half-downloaded release can strand someone.",
    worked: "1m 31s",
    trace: [
      { icon: I_SEARCH, label: "Traced 3 update states" },
      { icon: I_TEST, label: "Ran the updater suite" },
    ],
    reply:
      "One real hole, and it is the one you would hit on a flaky connection.",
    bullets: [
      "One real hole: an interrupted install leaves the button reading Installing forever.",
      "Everything else recovers on relaunch — the download resumes from its own ledger.",
      "Suggested fix: treat a missing installer process as a failed phase, not a pending one.",
    ],
    status: "Reading electron/main/updater.ts",
  },
  {
    id: "settings-routes",
    title: "Rename the settings routes",
    agent: "kimi",
    model: "K3-256k",
    effort: "high",
    home: "project",
    ask: "Rename /settings/backends to /settings/agents without breaking anyone's bookmarks.",
    worked: "27s",
    trace: [
      { icon: I_SEARCH, label: "Found 12 call sites" },
      { icon: I_EDIT, label: "Edited 12 files" },
    ],
    reply:
      "Renamed everywhere, and nobody's bookmark notices.",
    bullets: [
      "12 call sites renamed, none of them by search-and-replace.",
      "The old route is a redirect, so bookmarks and the palette both still land.",
      "Route tests green.",
    ],
    status: "Responding",
  },
  {
    id: "icon-grid",
    title: "Compare the two icon grids",
    agent: "codex",
    model: "GPT-5.6 Sol",
    effort: "xhigh",
    home: "chats",
    ask: "The sidebar icons look a pixel off from the composer's. Which grid is wrong?",
    worked: "22s",
    trace: [
      { icon: I_SEARCH, label: "Measured 14 icon slots" },
      { icon: I_READ, label: "Read sidebar-row.tsx" },
    ],
    reply:
      "Neither grid is wrong. What looks like a misalignment is a deliberate 1px of air.",
    bullets: [
      "Neither grid is wrong — both slots are 16px.",
      "The sidebar puts a 14px mark inside its slot; the composer's icon fills it.",
      "What you are seeing is the slot, not the icon.",
    ],
    status: "Thinking",
  },
  {
    id: "acp-handshake",
    title: "Explain the ACP handshake",
    agent: "claude",
    model: "Haiku 4.5",
    effort: "",
    home: "chats",
    ask: "Walk me through what happens between launching a CLI and the first token arriving.",
    worked: "11s",
    trace: [
      { icon: I_READ, label: "Read the ACP session module" },
      { icon: I_SEARCH, label: "Traced 6 messages" },
    ],
    reply:
      "Three round trips before the first token. Everything after them is one stream.",
    bullets: [
      "initialize — the client states what it can render.",
      "session/new — the CLI opens a session against your working directory.",
      "session/prompt — everything after this is streaming on the same channel.",
    ],
    status: "Responding",
  },
];

/** 记账本 App 的示例行。列取自 Bottega-app-expense-tracker 的 base.json。 */
export const LEDGER = [
  { date: "08-26", amount: "43.20", category: "Transit", note: "Didi, airport run" },
  { date: "08-25", amount: "1,299.00", category: "Equipment", note: "Apple Store" },
  { date: "08-24", amount: "286.50", category: "Groceries", note: "Hema Fresh" },
  { date: "08-23", amount: "360.00", category: "Health", note: "Gym, quarterly" },
  { date: "08-22", amount: "49.50", category: "Eating out", note: "Ramen Ikkousha" },
  { date: "08-21", amount: "128.00", category: "Transit", note: "High-speed rail" },
  { date: "08-20", amount: "96.00", category: "Groceries", note: "Corner market" },
  { date: "08-19", amount: "121.00", category: "Eating out", note: "Team lunch" },
];

export const LEDGER_SUM = "2,383.20";
