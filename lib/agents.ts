/**
 * [INPUT]: 无运行时依赖；logo 路径逐字取自 packages/model-logos/*.svg
 * [OUTPUT]: 对外提供 AGENTS（四条 chat 的完整演示数据）、LEDGER、GANG、图标 path 常量
 * [POS]: Bottega-Website 的演示数据唯一真相源，被 hero 与 agents 两处消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

/* logo 是抄的不是仿的：一枚画错，「我们真的接了这四家」这句话当场就塌。 */
export const ICON_OPENAI =
  "M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z";

export const ICON_CLAUDE =
  "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z";

export const ICON_KIMI =
  "M17.962 1.844h-4.326l-3.425 7.81H5.369V1.878H1.5V22h3.87v-8.477h6.824a3.025 3.025 0 002.743-1.75V22h3.87v-8.477a3.87 3.87 0 00-3.588-3.86v-.01h-2.125a3.94 3.94 0 002.323-2.12l2.545-5.689z";

export const ICON_OPENCODE = "M16 6H8v12h8V6zm4 16H4V2h16v20z";

export const SUN =
  "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0";
export const MOON = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9";

const I_READ = "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20";
const I_EDIT = "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z";
const I_TEST = "M9 2v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V2M8 2h8M7 15h10";

export type Chat = {
  title: string;
  agent: string;
  iconPath: string;
  model: string;
  hasPlan: boolean;
  ask: string;
  trace: { icon: string; label: string }[];
  reply: string;
  running: string;
};

/**
 * 四条 chat = 四个 agent。点边栏换的不是「模式」，是打开谁的那条对话——
 * 切 agent 在产品里本来就是这个动作，不是拨一个开关。
 * hasPlan 那一位是这块屏最要紧的一件事：OpenCode 上 Plan 按钮不是置灰，
 * 是压根没画，因为上游没有这个通道。
 */
export const AGENTS: Chat[] = [
  {
    title: "Ship the release notes",
    agent: "Codex",
    iconPath: ICON_OPENAI,
    model: "gpt-5.3-codex · high",
    hasPlan: true,
    ask: "Draft the 0.2.0 release notes from the merged PRs since 0.1.9.",
    trace: [
      { icon: I_READ, label: "Read 18 commits across 4 packages" },
      { icon: I_EDIT, label: "Edited CHANGELOG.md" },
    ],
    reply:
      "Grouped into six headline changes. The agent-parity work is the lede — it is the only one users will notice on day one.",
    running: "Checking the version table",
  },
  {
    title: "Port the settings panel",
    agent: "Claude Code",
    iconPath: ICON_CLAUDE,
    model: "Opus 5 · 1M",
    hasPlan: true,
    ask: "Move the backend settings under Agents and keep the deep links working.",
    trace: [
      { icon: I_READ, label: "Read 9 files in components/settings" },
      { icon: I_EDIT, label: "Edited 3 files" },
    ],
    reply:
      "Moved the group and kept the old routes as redirects, so bookmarks and the command palette both still land.",
    running: "Running the settings tests",
  },
  {
    title: "Draft the changelog",
    agent: "Kimi Code",
    iconPath: ICON_KIMI,
    model: "k3-turbo",
    hasPlan: true,
    ask: "Summarise this week's merges for the changelog page.",
    trace: [
      { icon: I_READ, label: "Read 24 commit messages" },
      { icon: I_EDIT, label: "Edited docs/changelog/README.md" },
    ],
    reply:
      "Six entries, newest first. Two were internal refactors, so they are folded into one line rather than given their own.",
    running: "Formatting the dates",
  },
  {
    title: "Add integration tests",
    agent: "OpenCode",
    iconPath: ICON_OPENCODE,
    model: "glm-5",
    hasPlan: false,
    ask: "Cover the import path for existing CLI sessions.",
    trace: [
      { icon: I_READ, label: "Read the import module" },
      { icon: I_TEST, label: "Ran 48 tests" },
    ],
    reply:
      "All green. The malformed-session path was uncovered, so that case now has a test of its own.",
    running: "Writing the fixture",
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

/** Agents 那一节左侧的边栏图：一眼看见四家 logo 混在同一列 chat 里。 */
export const GANG = [
  { title: "Ship the release notes", agent: "Codex", iconPath: ICON_OPENAI },
  { title: "Port the settings panel", agent: "Claude Code", iconPath: ICON_CLAUDE },
  { title: "Draft the changelog", agent: "Kimi Code", iconPath: ICON_KIMI },
  { title: "Add integration tests", agent: "OpenCode", iconPath: ICON_OPENCODE },
  { title: "Trim the onboarding copy", agent: "Codex", iconPath: ICON_OPENAI },
  { title: "Audit the update path", agent: "Claude Code", iconPath: ICON_CLAUDE },
];
