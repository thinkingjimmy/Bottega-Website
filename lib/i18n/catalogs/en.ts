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
      chatChip: "Use it like Codex",
      appChip: "Apps your Agent builds",
    },
    agents: {
      title: "Your Agents, one sidebar.",
      paragraphs: [
        "Codex, Claude, Kimi and OpenCode all run in Bottega — directly through the official CLIs you already have installed, with no additional Agent service required.",
        "Every Agent also uses your own subscription, at no extra cost.",
      ],
    },
    apps: {
      title: "Build AI-native Apps.",
      body:
        "Build an AI fitness coach, an AI expense tracker, or something entirely your own. Describe the idea—Bottega turns it into a working App, from data to interface. Here are four Apps built with Bottega:",
    },
    customizable: {
      title: "Customize any App by chatting.",
      body:
        "Every Bottega App has editable source. Click Edit App and describe what you want to change. Your Agent modifies the code directly to update features, data, and interface—no separate code editor required.",
    },
    base: {
      title: "Every Chat, one data space.",
      body:
        "Information from each conversation is captured in Base. Let your Agent organize, summarize, and analyze it directly, then view the same data as a table, chart, gallery, or map—no exports required.",
    },
    fork: {
      title: "Release your own version.",
      body:
        "Bottega is licensed under the MIT License. You’re free to fork the repository, modify the code, and share your own version with others.",
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
      title: "Switch Agents, keep your workspace.",
      deck:
        "Run Codex, Claude Code, Kimi Code, and OpenCode in the same local workspace—using their official CLIs and the subscriptions you already have, with no extra fees.",
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
          title: "One interaction model, not one Agent.",
          paragraphs: [
            "Each Agent Harness has its own runtime model. To keep the experience consistent, Bottega provides one interaction layer and adapts streaming replies, tool status, Plan mode, queued messages, and more to each backend.",
            "Here is the current capability coverage, which continues to evolve:",
          ],
        },
        {
          index: "03 · Cross-Agent collaboration",
          title: "Beyond a unified experience, Agents finish the work together.",
          paragraphs: [
            "Let Claude frame the problem and create a Plan, then pass the necessary context to Codex for implementation. When it is done, the result returns automatically to the original Chat for review, revision, or handoff to the next Agent.",
            "Each Chat keeps its own Agent, workspace, and task history. Messages can run immediately or wait in a queue; the process stays visible, and every result remains traceable and reusable.",
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
      records: "{count} records",
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
      items: [
        { name: "Design Canvas", description: "Turn ideas into an editable visual canvas" },
        { name: "Development Kanban", description: "Plan tasks, progress, and findings on one board" },
        { name: "Expense Tracker", description: "Track spending by category and over time" },
        { name: "Fitness Log", description: "Log workouts and see which muscles worked" },
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
      doc: "Doc",
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
      selectedCount: "{count} selected",
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
    chats: {
      releaseNotes: {
        title: "Ship the release notes",
        ask: "Draft the 0.2.0 release notes from the merged PRs since 0.1.9.",
        trace: ["Read 18 commits across 4 packages", "Edited CHANGELOG.md"],
        reply: "Plan above. Say go and I will write it; say which grouping you want changed and I will redraw it first.",
        plan: {
          title: "0.2.0 release notes",
          sections: [
            { heading: "Summary", items: ["Six headline changes since `0.1.9`, grouped by what a user notices first.", "Agent parity is the lede — `Kimi` and `OpenCode` now reach the same permission ladder as `Codex`.", "Two internal refactors fold into one line; nobody outside the repo felt them."] },
            { heading: "Sequence", items: ["Group the 18 merged PRs by the surface a user touches, not by the package they landed in.", "Write each entry as what changed — the PR number is provenance, not news.", "Mirror the file into `docs/`, then read both back so the two can never disagree."] },
            { heading: "Files", items: ["`CHANGELOG.md` — six entries, newest first, absolute dates.", "`docs/changelog/README.md` — the public mirror, same six entries."] },
            { heading: "Not in this pass", items: ["The `0.1.x` backfill — older entries are a separate decision about how far back the record goes.", "Release tagging and the download page; they read this file, they do not write it."] },
          ],
        },
        status: "Responding",
      },
      settingsPanel: {
        title: "Port the settings panel",
        ask: "Move the backend settings under Agents and keep the deep links working.",
        trace: ["Read 9 files in components/settings", "Found 12 call sites"],
        reply: "Three ways to do it, and they differ only in what happens to links people already saved.",
        bullets: ["The 12 call sites are mechanical either way.", "What is not mechanical is the two deep links and the command palette entry.", "So the question is really what you want to promise about old links."],
        question: {
          eyebrow: "Main Agent · Route strategy",
          text: "The old settings routes are bookmarked. How should I move them?",
          options: [
            { label: "Keep them as redirects", description: "Old paths resolve to the new ones; bookmarks and the palette keep landing." },
            { label: "Hard rename", description: "Cleanest tree, but every link anyone saved stops working." },
            { label: "Ship both for one release", description: "Two live routes now, drop the old pair in 0.3.0." },
          ],
        },
      },
      changelog: {
        title: "Draft the changelog", ask: "Summarise this week's merges for the changelog page.", trace: ["Read 24 commit messages", "Edited docs/changelog/README.md"],
        reply: "Six entries. The week reads as one story, not as a list of merges.",
        bullets: ["Six entries, newest first, each one line.", "The two internal refactors are folded together — nobody outside the repo felt them.", "Dates are absolute, not relative: a changelog is read months later."],
        status: "Editing docs/changelog/README.md",
      },
      importTests: {
        title: "Cover the CLI import path", ask: "Add integration tests for importing existing CLI sessions.", trace: ["Read the import module", "Ran 48 tests"],
        reply: "All green, and one path that had no test before now has one.",
        bullets: ["48 tests pass, including the four new ones.", "A malformed session file now fails the import, not the App.", "Fixtures live beside the module, so the next reader finds them."],
        status: "Running 48 tests",
      },
      onboarding: {
        title: "Trim the onboarding copy", ask: "The first-run screen reads like a manual. Cut it to what someone needs before their first Chat.", trace: ["Read 4 onboarding screens", "Edited onboarding.ts in 5 locales"],
        reply: "Everything I cut was something the interface already says on its own.",
        bullets: ["140 words down to 42.", "The permission explainer moved to the place where permission is chosen.", "All five locales rewritten, not machine-translated from the English."],
        status: "Thinking",
      },
      updatePath: {
        title: "Audit the update path", ask: "Walk the auto-update flow and tell me where a half-downloaded release can strand someone.", trace: ["Traced 3 update states", "Ran the updater suite"],
        reply: "One real hole, and it is the one you would hit on a flaky connection.",
        bullets: ["One real hole: an interrupted install leaves the button reading Installing forever.", "Everything else recovers on relaunch — the download resumes from its own ledger.", "Suggested fix: treat a missing installer process as a failed phase, not a pending one."],
        status: "Reading electron/main/updater.ts",
      },
      settingsRoutes: {
        title: "Rename the settings routes", ask: "Rename /settings/backends to /settings/agents without breaking anyone's bookmarks.", trace: ["Found 12 call sites", "Edited 12 files"],
        reply: "Renamed everywhere, and nobody's bookmark notices.",
        bullets: ["12 call sites renamed, none of them by search-and-replace.", "The old route is a redirect, so bookmarks and the palette both still land.", "Route tests green."],
        status: "Responding",
      },
      iconGrid: {
        title: "Compare the two icon grids", ask: "The sidebar icons look a pixel off from the Composer's. Which grid is wrong?", trace: ["Measured 14 icon slots", "Read sidebar-row.tsx"],
        reply: "Neither grid is wrong. What looks like a misalignment is a deliberate 1px of air.",
        bullets: ["Neither grid is wrong — both slots are 16px.", "The sidebar puts a 14px mark inside its slot; the Composer's icon fills it.", "What you are seeing is the slot, not the icon."],
        status: "Thinking",
      },
      acp: {
        title: "Explain the ACP handshake", ask: "Walk me through what happens between launching a CLI and the first token arriving.", trace: ["Read the ACP session module", "Traced 6 messages"],
        reply: "Three round trips before the first token. Everything after them is one stream.",
        bullets: ["initialize — the client states what it can render.", "session/new — the CLI opens a session against your working directory.", "session/prompt — everything after this is streaming on the same channel."],
        status: "Responding",
      },
    },
    agentsVisual: {
      pickerLabel: "The Bottega Home Hero product window with the Agent picker open in the Composer",
      matrixLabel: "Capability matrix for Codex, Claude, Kimi, and OpenCode",
      capability: "Capability",
      rows: [
        { label: "Streaming replies", values: ["✅", "✅", "✅", "✅"] },
        { label: "Model / Thinking selection", values: ["✅", "✅", "✅", "✅"] },
        { label: "Tool status", values: ["✅", "✅", "✅", "✅"] },
        { label: "Plan mode", values: ["✅", "✅", "✅", "✅"] },
        { label: "Queue mode", values: ["✅", "✅", "✅", "✅"] },
        { label: "User approvals", values: ["✅", "✅", "✅", "✅"] },
        { label: "@ mentions", values: ["✅", "✅", "✅", "✅"] },
        { label: "Browser Use", values: ["✅", "✅", "✅", "✅"] },
        { label: "Edit previous message", values: ["✅", "✅", "✅", "✅"] },
      ],
      collaborationLabel: "Claude drafts the Plan, Codex implements it, and the result returns to the original Chat for Claude to review",
      chatPlan: "Unify the nav bar",
      chatImpl: "Nav implementation",
      planLabel: "Plan",
      planTitle: "Navigation implementation plan",
      relayFrom: "[From Section @{name} (source_section_id={id})]",
      queueItem: "@{name} · also verify the mobile breakpoints",
      reviewLine: "Plan intent and implementation match; no blocking issues.",
      notePlan: "First let Claude turn the problem\ninto a Plan",
      noteSend: "Drop the work into\nanother Chat's queue",
      noteBack: "When it finishes, the result returns on its own",
      noteReview: "Back in the original Chat — review it,\nor hand it to the next Agent",
      handoffCaption: "Three frames of one machine. Everything outside the skeleton is the product's own text — the Plan title, the inbound message header, the review verdict; the two handoffs call send_to_section and expect_reply.",
    },
  },
} as const;
