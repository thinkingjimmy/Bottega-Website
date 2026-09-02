/**
 * [INPUT]: Uses the shared GlyphName type from ../icons
 * [OUTPUT]: Exports the four Feature records, their document/custom layout identity, slug lookup, and public types
 * [POS]: Single source of truth for home CTAs, header dropdown, feature sidebar, and static detail pages
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import type { GlyphName } from "../icons";

export type FeatureSlug = "agents" | "apps" | "customizable" | "base";

type FeatureSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

type FeatureIdentity = {
  slug: FeatureSlug;
  label: string;
  menuCopy: string;
  icon: GlyphName;
  title: string;
  deck: string;
};

export type AgentsFeatureRecord = FeatureIdentity & {
  slug: "agents";
  layout: "agents";
};

export type DocumentFeatureRecord = FeatureIdentity & {
  layout: "document";
  image: string;
  imageAlt: string;
  imageCaption: string;
  sections: FeatureSection[];
};

export type FeatureRecord = AgentsFeatureRecord | DocumentFeatureRecord;

export const FEATURES: FeatureRecord[] = [
  {
    slug: "agents",
    layout: "agents",
    label: "Agents",
    menuCopy: "Codex, Claude, Kimi, and OpenCode",
    icon: "sparkle",
    title: "Multiple Agents. One workspace.",
    deck:
      "Run Codex, Claude Code, Kimi Code, and OpenCode in one local workspace—using their official CLIs, your existing provider access, and one shared conversation experience.",
  },
  {
    slug: "apps",
    layout: "document",
    label: "Apps",
    menuCopy: "Working interfaces built around your task",
    icon: "grid",
    title: "Turn Agent work into a surface you can keep using.",
    deck:
      "Apps give a workflow its own interface, data, and permissions, so the useful result is not trapped in a transcript.",
    image: "/features/apps-library.jpg",
    imageAlt: "Bottega Apps library showing an installed Bottega Design Canvas marked Ready",
    imageCaption:
      "Captured in Bottega: an installed App has a durable place in the Apps library and an explicit readiness state.",
    sections: [
      {
        heading: "An App is a durable product surface",
        paragraphs: [
          "Bottega can install static, server-backed, and Base-backed Apps from immutable Git revisions. An App can present a dedicated GUI, structured data, or both, while chats remain the control surface for asking an Agent to do work.",
          "The first-party examples cover distinct jobs rather than one generic dashboard: Design Canvas, Development Kanban, Expense Tracker, and Fitness Log. Their interfaces differ because each App is shaped around its task.",
        ],
      },
      {
        heading: "Interface and data stay connected",
        paragraphs: [
          "A Base-backed App can place its own GUI beside the rows that power it. The user sees a purpose-built surface; the Agent sees explicit tools for reading or changing the underlying records.",
        ],
        points: [
          "Design Canvas renders self-contained HTML directions and can send numbered visual anchors back to chat.",
          "Development Kanban keeps implementation tasks and review findings as structured records.",
          "Expense Tracker normalizes natural-language expenses into a ledger and analysis views.",
          "Fitness Log records training sets and projects them into a muscle heatmap.",
        ],
      },
      {
        heading: "Installation has a real trust boundary",
        paragraphs: [
          "App permissions are declared and confirmed before use. Data access is granted by capability—read, insert, patch, delete, or attachments—for an exact App generation. A GUI does not silently inherit unrestricted access to local files or data.",
          "Reusable Apps can be shared without copying local credentials or private workspace state into the package.",
        ],
      },
    ],
  },
  {
    slug: "customizable",
    layout: "document",
    label: "Customizable",
    menuCopy: "Edit an App through its own source chat",
    icon: "pencilLine",
    title: "Edit the App by talking to its source.",
    deck:
      "For Apps with editable source, Bottega opens a normal Agent chat inside the App's source Project instead of dropping you into a separate code editor.",
    image: "/features/app-detail.jpg",
    imageAlt: "Bottega Design Canvas detail screen with App and Data tabs, settings, chat, and a More actions menu",
    imageCaption:
      "Captured in Bottega: an App detail page keeps its surface, data, use chat, settings, and source actions together.",
    sections: [
      {
        heading: "Edit is a first-class product action",
        paragraphs: [
          "When an App has editable source, its detail page exposes Edit App under More actions. That action resumes the App's editor Project and opens a standard Agent chat bound to the source.",
          "You describe the change in the same interaction model used everywhere else in Bottega. The selected Agent can inspect the App, update it, and rebuild it through the product's normal workspace boundaries.",
        ],
      },
      {
        heading: "Using and editing are separate contexts",
        paragraphs: [
          "The App's use chat is for working with the installed App and its records. The editor chat is for changing the App itself. Keeping those roles separate prevents an ordinary use request from quietly becoming a source-code change.",
        ],
        points: [
          "Use chat stays attached to the installed App experience.",
          "Edit App activates the App's dedicated source Project.",
          "Data authorization remains scoped to the installed generation rather than inherited from the editor.",
        ],
      },
      {
        heading: "The source is not a black box",
        paragraphs: [
          "The same App detail surface also exposes its workbench, version history, import path, and GitHub sharing flow when those actions apply. The product makes the source lifecycle visible instead of treating customization as a hidden regeneration step.",
          "Not every third-party App is assumed to be editable. Bottega only shows the edit action when durable source evidence says it is available.",
        ],
      },
    ],
  },
  {
    slug: "base",
    layout: "document",
    label: "Base",
    menuCopy: "Structured local data beside the conversation",
    icon: "table",
    title: "Structured local data beside every conversation.",
    deck:
      "A Base is Bottega's row-backed data layer for Chats, Projects, and data-aware Apps—kept close to the conversation that operates it.",
    image: "/features/base-data.jpg",
    imageAlt: "Bottega App Data tab showing a Base table with view, filter, column, grouping, and add-row controls",
    imageCaption:
      "Captured in Bottega: the same App detail surface switches from its GUI to a full Base workbench.",
    sections: [
      {
        heading: "The conversation and dataset share an owner",
        paragraphs: [
          "A Chat can use its own local Base. When it has no private Base and belongs to a Project, it can fall back to that Project's shared Base. The ownership rule is explicit, so the Agent and the interface act on the same durable dataset.",
          "Agents receive built-in Base tools for reading schema and rows, querying, aggregating, and making revision-checked mutations. A request such as a tracker, inventory, ledger, or plan can become structured data without creating a separate spreadsheet file.",
        ],
      },
      {
        heading: "Six views, one source of truth",
        paragraphs: [
          "Table, List, Kanban, Map, Chart, and Gallery are projections of the same rows. Changing the view does not fork the data into separate documents.",
        ],
        points: [
          "Filter, sort, group, and choose visible fields without rewriting the records.",
          "Use formulas and relations for derived or connected data.",
          "Attach media, inspect row history, and exchange CSV, JSON, or XLSX data.",
          "Let an App present a tailored GUI while keeping the underlying Base available in the Data tab.",
        ],
      },
      {
        heading: "Access is narrow by design",
        paragraphs: [
          "App access to a Base is capability-scoped for an exact App generation. Read, row insertion, patching, deletion, and attachments are separate grants, and revision checks prevent stale writes from silently overwriting newer data.",
          "The result is a local data surface that Agents can operate without turning every installed interface into an unrestricted database client.",
        ],
      },
    ],
  },
];

export const featureBySlug = (slug: string) =>
  FEATURES.find((feature) => feature.slug === slug);
