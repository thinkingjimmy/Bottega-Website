/**
 * [INPUT]: Has no runtime dependencies
 * [OUTPUT]: Exports the complete English website copy baseline
 * [POS]: Canonical catalog whose structure defines every translated catalog
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

export const en = {
  meta: {
    siteTitle: "Bottega — the workshop that builds itself",
    siteDescription:
      "One workshop for Codex, Claude Code, Kimi Code and OpenCode — local-first, on the subscriptions you already pay for.",
  },
  language: {
    label: "Language",
    autoDetect: "Auto detect",
    selected: "Selected",
  },
  nav: {
    features: "Features",
    changelog: "Changelog",
    download: "Download",
    downloadMac: "Download for macOS",
  },
  footer: {
    noteBefore: "Bottega is free and open source (",
    noteAfter: ").",
    navigation: "Footer navigation",
    links: {
      changelog: "Changelog",
      docs: "Docs",
      github: "GitHub",
      issues: "Issues",
      download: "Download",
    },
  },
  common: {
    readMore: "Read More",
    replay: "Replay",
  },
  home: {
    hero: {
      menu: ["File", "Edit", "View", "Chat", "Window", "Help"],
      date: "Tue Sep 1  9:36",
      chatChip: "Chat, just like your CLI",
      appChip: "Apps your Agent builds",
    },
    agents: {
      title: "Every Agent you pay for, in one sidebar.",
      paragraphs: [
        "Codex, Claude, Kimi and OpenCode all live in Bottega — the official CLIs you already have installed, nothing reimplemented.",
        "Each runs on your own subscription: the plan you already pay for, billed by the provider, not by us.",
      ],
    },
    apps: {
      title: "Build AI-native Apps.",
      body:
        "Build an AI fitness coach, an AI expense tracker, or something entirely your own. Describe the idea—Bottega turns it into a working App, from data to interface. Here are the four Apps that come with Bottega:",
    },
    customizable: {
      title: "Customize any App by chatting.",
      body:
        "Every Bottega App has editable source—not a black box. Choose Edit App and describe what you want to change. Your Agent works directly with the source to update features, data, and interface—no code editor required.",
    },
    base: {
      title: "Every Chat comes with a Base.",
      body:
        "Bottega uses it to structure, analyze, and visualize your data. Ask for totals, summaries, category breakdowns, or trends—then explore the same data as a table, chart, gallery, or map. No exports required.",
    },
    fork: {
      title: "Fork it. Ship your own build.",
      body:
        "Bottega is MIT-licensed, end to end. Fork the repo, change the Agents, the tools, the UI — then roll your own build out to your whole team. It still runs local-first on their machines, on the subscriptions they already pay for.",
      download: "Download for macOS",
      source: "View the source",
      terminalLabel: "Terminal commands to build Bottega",
    },
  },
  changelog: {
    metaTitle: "Changelog",
    metaDescription:
      "Product milestones for Bottega — when each capability reached its first coherent form.",
    eyebrow: "Changelog",
    title: "What actually shipped.",
    introduction:
      "Product milestones, not internal iterations. Each date is when that capability first reached a coherent shape a person could use.",
  },
  features: {
    sidebarLabel: "Features",
    sidebarNavigation: "Feature documentation",
    breadcrumb: "Features",
    agents: {
      label: "Agents",
      menuCopy: "Codex, Claude, Kimi, and OpenCode",
      title: "Multiple Agents. One workspace.",
      deck:
        "Run Codex, Claude Code, Kimi Code, and OpenCode in one local workspace—using their official CLIs, your existing provider access, and one shared conversation experience.",
    },
    apps: {
      label: "Apps",
      menuCopy: "Working interfaces built around your task",
      title: "Turn Agent work into a surface you can keep using.",
      deck:
        "Apps give a workflow its own interface, data, and permissions, so the useful result is not trapped in a transcript.",
      imageAlt: "Bottega Apps library showing an installed Bottega Design Canvas marked Ready",
      imageCaption:
        "Captured in Bottega: an installed App has a durable place in the Apps library and an explicit readiness state.",
      sections: [
        {
          heading: "An App is a durable product surface",
          paragraphs: [
            "Bottega can install static, server-backed, and Base-backed Apps from immutable Git revisions. An App can present a dedicated GUI, structured data, or both, while Chats remain the control surface for asking an Agent to do work.",
            "The first-party examples cover distinct jobs rather than one generic dashboard: Design Canvas, Development Kanban, Expense Tracker, and Fitness Log. Their interfaces differ because each App is shaped around its task.",
          ],
          points: [],
        },
        {
          heading: "Interface and data stay connected",
          paragraphs: [
            "A Base-backed App can place its own GUI beside the rows that power it. The user sees a purpose-built surface; the Agent sees explicit tools for reading or changing the underlying records.",
          ],
          points: [
            "Design Canvas renders self-contained HTML directions and can send numbered visual anchors back to Chat.",
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
          points: [],
        },
      ],
    },
    customizable: {
      label: "Customizable",
      menuCopy: "Edit an App through its own source Chat",
      title: "Edit the App by talking to its source.",
      deck:
        "For Apps with editable source, Bottega opens a normal Agent Chat inside the App's source Project instead of dropping you into a separate code editor.",
      imageAlt:
        "Bottega Design Canvas detail screen with App and Data tabs, settings, Chat, and a More actions menu",
      imageCaption:
        "Captured in Bottega: an App detail page keeps its surface, data, use Chat, settings, and source actions together.",
      sections: [
        {
          heading: "Edit is a first-class product action",
          paragraphs: [
            "When an App has editable source, its detail page exposes Edit App under More actions. That action resumes the App's editor Project and opens a standard Agent Chat bound to the source.",
            "You describe the change in the same interaction model used everywhere else in Bottega. The selected Agent can inspect the App, update it, and rebuild it through the product's normal workspace boundaries.",
          ],
          points: [],
        },
        {
          heading: "Using and editing are separate contexts",
          paragraphs: [
            "The App's use Chat is for working with the installed App and its records. The editor Chat is for changing the App itself. Keeping those roles separate prevents an ordinary use request from quietly becoming a source-code change.",
          ],
          points: [
            "Use Chat stays attached to the installed App experience.",
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
          points: [],
        },
      ],
    },
    base: {
      label: "Base",
      menuCopy: "Structured local data beside the conversation",
      title: "Structured local data beside every conversation.",
      deck:
        "A Base is Bottega's row-backed data layer for Chats, Projects, and data-aware Apps—kept close to the conversation that operates it.",
      imageAlt:
        "Bottega App Data tab showing a Base table with view, filter, column, grouping, and add-row controls",
      imageCaption:
        "Captured in Bottega: the same App detail surface switches from its GUI to a full Base workbench.",
      sections: [
        {
          heading: "The conversation and dataset share an owner",
          paragraphs: [
            "A Chat can use its own local Base. When it has no private Base and belongs to a Project, it can fall back to that Project's shared Base. The ownership rule is explicit, so the Agent and the interface act on the same durable dataset.",
            "Agents receive built-in Base tools for reading schema and rows, querying, aggregating, and making revision-checked mutations. A request such as a tracker, inventory, ledger, or plan can become structured data without creating a separate spreadsheet file.",
          ],
          points: [],
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
          points: [],
        },
      ],
    },
    agentsArticle: {
      stories: [
        {
          index: "01 · Multi-Agent",
          title: "Official CLIs. One place to work.",
          paragraphs: [
            "Bottega runs Codex, Claude Code, Kimi Code, and OpenCode through their official local CLIs. It does not replace their harness with a generic Agent layer.",
            "Authentication, subscription access, and quotas stay with the provider. Model and reasoning-effort controls come from each CLI's live catalog, so an option appears only when that backend can actually accept it.",
            "A conversation stays bound to the Agent that started it. Open another conversation when you want a different Agent; both can live in the same Project.",
          ],
        },
        {
          index: "02 · Conversation parity",
          title: "One conversation experience, adapted—not flattened.",
          paragraphs: [
            "Streaming replies, tool activity, Plan review, questions, permissions, model controls, and queued messages share one visual system. Bottega translates each backend's protocol into that system without pretending their capabilities are identical.",
            "The matrix shows the current product contract. “Shared” means the Bottega surface is the same; Native and Adapted show where the implementation differs. Missing runtime capabilities do not render as dead controls.",
          ],
        },
        {
          index: "03 · Cross-Agent collaboration",
          title: "Let one Agent hand work to another.",
          paragraphs: [
            "A Claude conversation can prepare a Plan, send the bounded context to a Codex conversation, and ask Codex to implement it. Codex can return the result to the original conversation for review.",
            "The handoff uses Bottega's persistent Chat communication tools: the target Chat keeps its own Agent and workspace, the message starts or queues there, and the result remains visible and reusable instead of disappearing inside a hidden run.",
          ],
        },
      ],
    },
  },
  demo: {
    chrome: {
      newChat: "New Chat",
      apps: "Apps",
      projects: "Projects",
      chats: "Chats",
      settings: "Settings",
      showMore: "Show more",
      ledger: "Ledger",
      analysis: "Analysis",
      byMonth: "By month",
      date: "Date",
      amount: "Amount",
      category: "Category",
      note: "Note",
      sum: "Sum",
      askAnything: "Ask anything",
      approveForMe: "Approve for me",
      currentAgent: "Current Agent: {name}",
      currentModel: "Current model: {name}",
      recommended: "Recommended",
      anotherApproach: "None of these; tell the Agent another approach",
      workedFor: "Worked for {duration}",
      plan: "Plan",
      planCopied: "Plan copied",
      copyPlan: "Copy Plan",
      closePlan: "Close Plan panel",
      openPlan: "Open Plan panel",
    },
    model: {
      advanced: "Advanced",
      disableFast: "Disable Fast speed",
      enableFast: "Enable Fast speed",
      model: "Model",
      effort: "Effort",
      unavailable: "Not available",
      quickTier: "Quick model tier",
      efforts: {
        low: "Light",
        medium: "Medium",
        high: "High",
        xhigh: "Extra High",
        max: "Max",
      },
    },
    apps: {
      shapes: [
        "Workspace-artifact App · isolated GUI surface",
        "Base App · 9 columns · task / findings / ledger",
        "Base App · 4 columns · detail / analysis views",
        "Base App with GUI surface · muscle heatmap",
      ],
    },
    baseViews: [
      { name: "Table view", tab: "Table", blurb: "Typed columns, sorts, filters, a sum on any of them" },
      { name: "Chart view", tab: "Chart", blurb: "Share by category, spend by day" },
      { name: "Gallery view", tab: "Gallery", blurb: "The attachment column, as thumbnails" },
      { name: "Map view", tab: "Map", blurb: "The location column, as pins" },
    ],
    ledger: {
      categories: ["Transit", "Equipment", "Groceries", "Health", "Eating out"],
      notes: [
        "Didi, airport run", "Apple Store", "Hema Fresh", "Gym, quarterly", "Ramen Ikkousha",
        "High-speed rail", "Corner market", "Team lunch", "Airport express", "Weekend run",
        "Monitor arm", "Coffee, twice", "Pharmacy", "Metro top-up", "Mechanical keyboard",
        "Hema Fresh", "Noodles, late", "Dentist",
      ],
      categoryShare: "Category share",
      dailySpend: "Daily spend",
      location: "Location",
      where: "Where",
      label: "Label",
    },
    kanban: {
      tabs: ["Tasks", "Findings", "All"],
      lanes: ["In progress", "Review", "Done"],
      task: "Task",
      source: "Source",
      titles: [
        "Port the settings panel under Agents",
        "Cover the CLI import path with integration tests",
        "Audit the auto-update flow",
        "Explain the ACP handshake in the docs",
        "Rename /settings/backends without breaking bookmarks",
        "Trim the onboarding copy to 42 words",
        "Define the install protocol",
        "Split publish identity from fetch source",
        "Ship the 0.2.0 release notes",
      ],
    },
    canvas: {
      live: "Live",
      focus: "Focus",
      directions: "Directions",
      compare: "Compare",
      browse: "Browse",
      element: "Element",
      region: "Region",
      desktop: "Desktop",
      tablet: "Tablet",
      mobile: "Mobile",
      fit: "Fit",
      anchors: "Anchors",
      stale: "stale",
      clear: "Clear",
      addToChat: "Add to Chat",
    },
    fitness: {
      trainingRecord: "Fitness Log · Training record",
      title: "Coverage, not coaching",
      subtitle: "Counts completed sets only. Log and correct entries through Use Chat or the data table.",
      revision: "Revision",
      createPlan: "Create training plan",
      coverage: "Coverage",
      heatmap: "Muscle heatmap",
      body: "Body",
      male: "Male",
      timeRange: "Time range",
      last30Days: "Last 30 days",
      front: "Front",
      back: "Back",
      intensity: "Coverage intensity",
      offlineCatalog: "Offline catalog · 1324 exercises",
      exerciseCatalog: "Exercise catalog",
      clearFilters: "Clear filters",
      search: "Search",
      searchHint: "Name, alias, muscle, or equipment",
      bodyPart: "Body part",
      muscleRegion: "Muscle region",
      equipment: "Equipment",
      all: "All",
      exercises: "1324 exercises",
      showing: "Showing 1–24",
      groups: ["Chest", "Upper legs", "Back"],
    },
    appMenu: {
      items: ["Edit App", "App Workbench", "About this App", "Import", "Version history", "Share to GitHub"],
      ask: "Give the compare view a third pane.",
      source: "App source",
    },
    agentsVisual: {
      pickerLabel: "The Bottega Home Hero product window with the Agent picker open in the Composer",
      matrixLabel: "Capability matrix for Codex, Claude, Kimi, and OpenCode",
      capability: "Capability",
      rows: [
        { label: "Streaming replies", values: ["Shared", "Shared", "Shared", "Shared"] },
        { label: "Tool activity", values: ["Shared", "Shared", "Shared", "Shared"] },
        { label: "Plan + review", values: ["Native", "Native", "Native", "Adapted"] },
        { label: "Questions", values: ["Shared UI", "Shared UI", "Shared UI", "Shared UI"] },
        { label: "Model picker", values: ["Full", "List", "List", "List"] },
        { label: "Permissions", values: ["3 levels", "2 levels", "2 levels", "2 levels"] },
        { label: "Mid-turn message", values: ["Live", "Live", "Next turn", "Next turn"] },
      ],
      collaborationLabel: "Claude plans, Codex implements, and Claude reviews through persistent Chat handoffs",
      persistentChats: "PERSISTENT CHATS",
      flowTitle: "Plan → implement → review",
      visibleHandoff: "Visible handoff",
      phases: ["01 · PLAN", "02 · IMPLEMENT", "03 · REVIEW"],
      planSummary: "Navigation implementation plan",
      planItems: ["Use the shared header boundary", "Preserve mobile behavior", "Verify static routes"],
      filesChanged: "3 files changed",
      typecheckPassed: "Typecheck passed",
      implementationComplete: "Implementation complete",
      noIssues: "No blocking issues",
      reviewMatch: "Plan intent and implementation match.",
      reviewReturned: "Review returned",
    },
  },
} as const;
