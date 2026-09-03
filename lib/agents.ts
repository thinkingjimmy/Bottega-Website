/**
 * [INPUT]: Uses SiteCatalog demo copy while keeping product IDs, metrics, and icons locale-neutral
 * [OUTPUT]: Exports Agent/model contracts, createDemoData, and the localized DemoData graph
 * [POS]: Typed boundary between stable product facts and translated website demonstrations
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "./i18n";

export type AgentId = "codex" | "claude" | "kimi" | "opencode";

export const BACKENDS: { id: AgentId; label: string }[] = [
  { id: "codex", label: "Codex" },
  { id: "claude", label: "Claude" },
  { id: "kimi", label: "Kimi" },
  { id: "opencode", label: "OpenCode" },
];

export const backendLabel = (id: AgentId) =>
  BACKENDS.find((backend) => backend.id === id)!.label;

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
};

export type App = {
  id: string;
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

export type AppMenuItem =
  | { name: string; icon: string; sub?: boolean; sep?: false }
  | { sep: true };

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

const APP_MENU_ICONS = ["pencilLine", "flask", "info", "importDown", "history", "share"];
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
  const categoryShare = CATEGORY_METRICS.map(([category, value, tone]) => ({
    label: copy.ledger.categories[category],
    value,
    tone,
  }));
  const appMenu: AppMenuItem[] = [
    { name: copy.appMenu.items[0], icon: APP_MENU_ICONS[0] }, { sep: true },
    { name: copy.appMenu.items[1], icon: APP_MENU_ICONS[1] },
    { name: copy.appMenu.items[2], icon: APP_MENU_ICONS[2] }, { sep: true },
    { name: copy.appMenu.items[3], icon: APP_MENU_ICONS[3], sub: true },
    { name: copy.appMenu.items[4], icon: APP_MENU_ICONS[4] }, { sep: true },
    { name: copy.appMenu.items[5], icon: APP_MENU_ICONS[5] },
  ];
  const baseViews = copy.baseViews.map((view, index) => ({ ...view, icon: VIEW_ICONS[index] }));
  return {
    copy,
    project: { name: "Bottega Site" },
    projectPageSize: 5,
    apps,
    pinnedApps: apps.filter((app) => ["expense-tracker", "dev-kanban"].includes(app.id)),
    ledgerApp: apps.find((app) => app.id === "expense-tracker")!,
    designApp: apps.find((app) => app.id === "design-canvas")!,
    designAppWindowTitle: "Bottega Design Canvas",
    chats: createChats(copy.chats),
    ledger: ledgerLong.slice(0, 8),
    ledgerSum: "2,383.20",
    ledgerLong,
    ledgerLongSum: "4,531.20",
    categoryShare,
    dailySpend: DAILY_SPEND,
    kanbanLanes: createKanban(copy.kanban),
    appMenu,
    baseViews,
    basePins: BASE_PINS,
    muscleHeat: MUSCLE_HEAT,
  };
}

export type DemoData = ReturnType<typeof createDemoData>;
