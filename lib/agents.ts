/**
 * [INPUT]: Uses SiteCatalog demo copy while keeping product IDs, metrics, and icons locale-neutral
 * [OUTPUT]: Exports Agent/model contracts, the announced-backend roster, createDemoData, and the localized DemoData graph
 * [POS]: Typed boundary between stable product facts and translated website demonstrations
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "./i18n";

export type AgentId = "codex" | "claude" | "kimi" | "opencode";

/* `cli` and `login` are product facts, not copy: the CLI's own product name and the
   exact command the desktop app tells you to run (apps/desktop/shared/i18n/locales/
   setup.ts). They stay out of the catalogs because a terminal command is the same
   sentence in every language, and a translated one would be wrong. */
export const BACKENDS: { id: AgentId; label: string; cli: string; login: string }[] = [
  { id: "codex", label: "Codex", cli: "Codex CLI", login: "codex login" },
  { id: "claude", label: "Claude", cli: "Claude Code", login: "claude auth login" },
  { id: "kimi", label: "Kimi", cli: "Kimi Code", login: "kimi login" },
  { id: "opencode", label: "OpenCode", cli: "OpenCode", login: "opencode auth login" },
];

export const backendLabel = (id: AgentId) =>
  BACKENDS.find((backend) => backend.id === id)!.label;

/* Announced, not shipped. These carry a mark and a name but no login command,
   because none exists yet: printing one would be a promise the product cannot keep.
   Names come from the <title> of each mark in packages/model-logos. */
export type AnnouncedId = "hermes" | "pi" | "deepseek";

export const ANNOUNCED: { id: AnnouncedId; label: string }[] = [
  { id: "hermes", label: "Hermes Agent" },
  { id: "pi", label: "Pi" },
  { id: "deepseek", label: "DeepSeek" },
];

export type Model = {
  name: string;
  efforts: string[];
  effort: string;
  fast?: boolean;
};

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

export const effortLabel = (
  effort: string,
  labels: SiteCatalog["demo"]["model"]["efforts"]
) => labels[effort as keyof typeof labels] ?? effort;

export const compactModelLabel = (name: string) => name.replace(/^GPT-/i, "");

export const defaultTurn = (agent: AgentId) => {
  const model = MODELS[agent][0];
  return { model: model.name, effort: model.effort, fast: false };
};

export type Plan = {
  title: string;
  sections: { heading: string; items: string[] }[];
};

export type Question = {
  eyebrow: string;
  question: string;
  options: { label: string; description: string; recommended?: boolean }[];
};

export type Chat = {
  id: string;
  title: string;
  agent: AgentId;
  model: string;
  effort: string;
  home: "project" | "chats";
  ask: string;
  worked: string;
  trace: { icon: string; label: string }[];
  reply: string;
  bullets?: string[];
  status?: string;
  fast?: boolean;
  plan?: Plan;
  question?: Question;
  /* 上一轮。首屏那扇窗要读起来像一条正在进行的 Chat，而不是一条只有
     一问一答的示例；只有 releaseNotes 带它，别的 chat 从顶上开始。 */
  prior?: { ask: string; worked: string; trace: { icon: string; label: string }[]; reply: string };
};

export type App = {
  id: string;
  /* manifest 里那枚 emoji。产品页头写的就是 `${icon} ${displayName}`，
     所以凡是复刻产品窗口的地方（首屏那台机器、App 菜单那一支）印的
     必须是它——那不是站点的排版选择，是那台机器上真实的样子。 */
  icon: string;
  name: string;
  description: string;
};

export type KanbanChip = { label?: string; text: string; tone?: KanbanTone };
export type KanbanTone = "blue" | "amber" | "green" | "violet" | "red" | "teal";
export type KanbanCard = { title?: string; skeleton?: string[]; chips: KanbanChip[] };
export type KanbanLane = {
  id: string;
  name: string;
  tone: KanbanTone;
  count: number;
  cards: KanbanCard[];
};


const I_READ = "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20";
const I_EDIT = "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z";
const I_TEST = "M9 2v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V2M8 2h8M7 15h10";
const I_SEARCH = "M21 21l-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0";

const CHAT_SHELLS = [
  ["releaseNotes", "release-notes", "codex", "GPT-5.6 Sol", "xhigh", "project", "1m 12s", [I_READ, I_EDIT]],
  ["settingsPanel", "settings-panel", "claude", "Opus 5", "high", "project", "22s", [I_READ, I_SEARCH]],
  ["changelog", "changelog", "kimi", "K3", "high", "project", "19s", [I_READ, I_EDIT]],
  ["importTests", "import-tests", "opencode", "opencode/grok-code", "", "project", "2m 4s", [I_READ, I_TEST]],
  ["onboarding", "onboarding-copy", "codex", "GPT-5.6 Codex", "high", "project", "36s", [I_READ, I_EDIT]],
  ["updatePath", "update-path", "claude", "Sonnet 5", "high", "project", "1m 31s", [I_SEARCH, I_TEST]],
  ["settingsRoutes", "settings-routes", "kimi", "K3-256k", "high", "project", "27s", [I_SEARCH, I_EDIT]],
  ["iconGrid", "icon-grid", "codex", "GPT-5.6 Sol", "xhigh", "chats", "22s", [I_SEARCH, I_READ]],
  ["acp", "acp-handshake", "claude", "Haiku 4.5", "", "chats", "11s", [I_READ, I_SEARCH]],
] as const;

/* icon 是产品 manifest 里那枚 emoji，只在复刻产品窗口的地方出现。站点
   目录与 Dock 上的彩色方章按 id 取自 components/home/figures/dock-marks.tsx。 */
const APP_SHELLS = [
  { id: "design-canvas", icon: "✦" },
  { id: "dev-kanban", icon: "🧭" },
  { id: "expense-tracker", icon: "💰" },
  { id: "fitness-log", icon: "🏋️" },
] as const;

const LEDGER_ROWS = [
  ["08-26", "43.20", 0], ["08-25", "1,299.00", 1], ["08-24", "286.50", 2],
  ["08-23", "360.00", 3], ["08-22", "49.50", 4], ["08-21", "128.00", 0],
  ["08-20", "96.00", 2], ["08-19", "121.00", 4], ["08-18", "55.00", 0],
  ["08-17", "238.00", 2], ["08-16", "680.00", 1], ["08-15", "32.00", 4],
  ["08-14", "164.00", 3], ["08-13", "72.00", 0], ["08-12", "415.00", 1],
  ["08-11", "188.00", 2], ["08-10", "64.00", 4], ["08-09", "240.00", 3],
] as const;
/* Expense Tracker 那台机器在首页会跟着字栏长高到 1125：十八行只够 780 那一档，
   长高之后表格下面就空了一截。这十六行接在同一本账后面（日期继续往前数、
   同五个类别、同一套备注宽度），只归那只 App；Base 的图与文档仍是十八行。 */
const LEDGER_ROWS_EARLIER = [
  ["08-08", "58.00", 0], ["08-07", "312.40", 2], ["08-06", "27.50", 4],
  ["08-05", "450.00", 3], ["08-04", "96.00", 0], ["08-03", "1,120.00", 1],
  ["08-02", "143.60", 2], ["08-01", "88.00", 4], ["07-31", "39.90", 0],
  ["07-30", "265.00", 2], ["07-29", "520.00", 1], ["07-28", "76.00", 4],
  ["07-27", "180.00", 3], ["07-26", "61.00", 0], ["07-25", "398.00", 1],
  ["07-24", "212.30", 2],
] as const;

const ledgerSum = (rows: readonly (readonly [string, string, number])[]) =>
  rows.reduce((sum, [, amount]) => sum + Number(amount.replace(/,/g, "")), 0)
    .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CATEGORY_METRICS = [
  [1, 2394, "#8b5cf6"], [2, 620.5, "#22c55e"], [3, 600, "#ef4444"],
  [0, 298.2, "#f59e0b"], [4, 234.5, "#3b82f6"],
] as const;

export const DAILY_SPEND = [0.08, 0.62, 0.14, 0.24, 0.05, 1, 0.36, 0.4, 0.19];
export const BASE_PINS: [number, number][] = [
  [22, 34], [38, 58], [57, 27], [69, 62], [46, 44], [80, 40], [31, 72],
];

export const MUSCLE_HEAT: Record<string, number> = {
  chest: 4,
  anterior_lateral_deltoids: 3,
  biceps: 2,
  abs: 3,
  quadriceps: 4,
  obliques: 1,
  forearms: 2,
  triceps: 1,
  calves: 1,
  neck: 0,
  upper_back_traps: 2,
  adductors_hip_flexors: 0,
  lats: 3,
  posterior_deltoids: 2,
  lower_back: 1,
  glutes: 0,
  hamstrings: 0,
};

const VIEW_ICONS = ["table", "chartPie", "images", "map"];

function createChats(copy: SiteCatalog["demo"]["chats"]): Chat[] {
  return CHAT_SHELLS.map((shell) => {
    const [key, id, agent, model, effort, home, worked, icons] = shell;
    const value = copy[key];
    const question = "question" in value
      ? {
          eyebrow: value.question.eyebrow,
          question: value.question.text,
          options: value.question.options.map((option, index) => ({
            ...option,
            recommended: index === 0,
          })),
        }
      : undefined;
    return {
      id,
      title: value.title,
      agent: agent as AgentId,
      model,
      effort,
      home,
      ask: value.ask,
      worked,
      trace: value.trace.map((label, index) => ({ icon: icons[index], label })),
      reply: value.reply,
      bullets: "bullets" in value ? [...value.bullets] : undefined,
      status: "status" in value ? value.status : undefined,
      plan: "plan" in value
        ? { ...value.plan, sections: value.plan.sections.map((section) => ({ ...section, items: [...section.items] })) }
        : undefined,
      question,
      prior: "prior" in value
        ? { ask: value.prior.ask, worked: value.prior.worked, reply: value.prior.reply, trace: value.trace.map((label, index) => ({ icon: icons[index], label })) }
        : undefined,
    };
  });
}

function createKanban(copy: SiteCatalog["demo"]["kanban"]): KanbanLane[] {
  const task = (): KanbanChip => ({ text: copy.task, tone: "blue" });
  const source = (): KanbanChip => ({ label: copy.source, text: "Bottega" });
  const title = (index: number, extras: KanbanChip[] = []): KanbanCard => ({
    title: copy.titles[index],
    chips: [task(), ...extras],
  });
  return [
    {
      id: "in_progress", name: copy.lanes[0], tone: "green", count: 9,
      cards: [
        title(0, [source()]), { skeleton: ["88%", "64%"], chips: [task(), { text: "+2" }] },
        title(1, [{ label: copy.doc, text: "todo/08-19-acp.md" }]), { skeleton: ["76%"], chips: [task()] },
        { skeleton: ["94%", "52%"], chips: [task(), { text: "+1" }] }, title(2, [source()]),
        { skeleton: ["82%", "58%"], chips: [task()] }, { skeleton: ["68%"], chips: [task(), { text: "+3" }] },
        title(3, [source()]),
      ],
    },
    {
      id: "review", name: copy.lanes[1], tone: "violet", count: 3,
      cards: [title(4, [source()]), { skeleton: ["92%", "58%"], chips: [task(), { text: "+1" }] }, title(5)],
    },
    {
      id: "done", name: copy.lanes[2], tone: "red", count: 6,
      cards: [title(6, [source()]), { skeleton: ["84%", "50%"], chips: [task()] },
        { skeleton: ["70%"], chips: [task(), { text: "+2" }] }, title(7, [source()]),
        { skeleton: ["90%"], chips: [task()] }, title(8, [{ label: copy.doc, text: "CHANGELOG.md" }])],
    },
  ];
}

export function createDemoData(copy: SiteCatalog["demo"]) {
  const apps: App[] = APP_SHELLS.map((app, index) => ({ ...app, ...copy.apps.items[index] }));
  const ledgerLong = LEDGER_ROWS.map(([date, amount, category], index) => ({
    date,
    amount,
    category: copy.ledger.categories[category],
    note: copy.ledger.notes[index],
  }));
  const ledgerApp = [...LEDGER_ROWS, ...LEDGER_ROWS_EARLIER].map(([date, amount, category], index) => ({
    date,
    amount,
    category: copy.ledger.categories[category],
    note: copy.ledger.notes[index % copy.ledger.notes.length],
  }));
  const categoryShare = CATEGORY_METRICS.map(([category, value, tone]) => ({
    label: copy.ledger.categories[category],
    value,
    tone,
  }));
  const baseViews = copy.baseViews.map((view, index) => ({ ...view, icon: VIEW_ICONS[index] }));
  return {
    copy,
    project: { name: "Bottega Site" },
    projectPageSize: 5,
    apps,
    pinnedApps: apps.filter((app) => ["expense-tracker", "dev-kanban"].includes(app.id)),
    /* 首屏那张 Apps 页把目录倒过来排。产品的列表按 addedAt 升序，最早装的
       在最前——那条顺序对访客不说明任何事。这一节要说的是「你的 Agent 造得出
       这些」，于是最新做好的那只领头，也就是那台机器自己会打开的那一只：
       「第一张卡」与「打开的那只 App」必须是同一张，否则演的是别的事。 */
    galleryApps: [...apps].reverse(),
    designApp: apps.find((app) => app.id === "design-canvas")!,
    designAppWindowTitle: "Bottega Design Canvas",
    chats: createChats(copy.chats),
    ledgerLong,
    ledgerLongSum: ledgerSum(LEDGER_ROWS),
    ledgerApp,
    ledgerAppSum: ledgerSum([...LEDGER_ROWS, ...LEDGER_ROWS_EARLIER]),
    categoryShare,
    dailySpend: DAILY_SPEND,
    kanbanLanes: createKanban(copy.kanban),
    baseViews,
    basePins: BASE_PINS,
    muscleHeat: MUSCLE_HEAT,
  };
}

export type DemoData = ReturnType<typeof createDemoData>;
