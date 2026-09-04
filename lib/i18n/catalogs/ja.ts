/**
 * [INPUT]: Uses the English baseline and CatalogShape parity type
 * [OUTPUT]: Exports the complete Japanese website catalog
 * [POS]: Japanese translation of every visitor-visible website string
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { CatalogShape } from "../catalog-shape.ts";
import type { en } from "./en.ts";

export const ja = {
  meta: {
    siteTitle: "Bottega — 自らを組み上げるワークショップ",
    siteDescription: "Codex、Claude Code、Kimi Code、OpenCode をひとつの場所で。ローカルファーストで、すでに契約しているサブスクリプションをそのまま使えます。",
  },
  language: { label: "言語", selected: "選択中" },
  nav: { features: "機能", changelog: "更新履歴", download: "ダウンロード", downloadMac: "macOS 版をダウンロード" },
  footer: {
    navigation: "フッターナビゲーション",
    links: { changelog: "更新履歴", docs: "ドキュメント", github: "GitHub", issues: "Issues", download: "ダウンロード" },
  },
  common: { readMore: "詳しく見る", replay: "もう一度再生" },
  home: {
    hero: {
      menu: ["ファイル", "編集", "表示", "チャット", "ウインドウ", "ヘルプ"],
      date: "9月1日(火)  9:36",
      chatChip: "Codex と同じように使う",
      appChip: "Agent がつくる Apps",
    },
    agents: {
      title: "あなたの Agent を、ひとつのサイドバーに。",
      paragraphs: [
        "Codex、Claude、Kimi、OpenCode はすべて Bottega で動作します。インストール済みの公式 CLI を直接使うため、追加の Agent サービスは必要ありません。",
        "さらに、各 Agent はご自身のサブスクリプションを使用するため、追加料金はかかりません。",
      ],
    },
    apps: {
      title: "AI ネイティブな Apps をつくる。",
      body: "AI フィットネスコーチ、AI 支出トラッカー、あるいはまったく新しいもの。アイデアを伝えるだけで、Bottega がデータから画面まで、動く App に仕上げます。以下は Bottega で構築した 4 つの Apps です。",
    },
    customizable: {
      title: "会話するだけで、どんな App もカスタマイズ。",
      body: "Bottega のすべての App には編集可能なソースがあります。Edit App をクリックして、変えたいことを伝えると、Agent がコードを直接変更し、機能・データ・画面を更新します。別のコードエディターは不要です。",
    },
    base: {
      title: "Chat ごとに、ひとつのデータ空間。",
      body: "会話の情報は Base に蓄積されます。Agent にそのまま整理・集計・分析させ、同じデータをテーブル、チャート、ギャラリー、またはマップで確認できます。エクスポートは不要です。",
    },
    fork: {
      title: "自分のバージョンを公開する。",
      body: "Bottega は MIT License を採用しています。リポジトリを Fork し、コードを変更して、自分のバージョンをほかの人に届けることができます。",
      download: "macOS 版をダウンロード",
      source: "ソースを見る",
      terminalLabel: "Bottega をビルドするターミナルコマンド",
    },
  },
  changelog: {
    metaTitle: "更新履歴",
    metaDescription: "Bottega の各機能が、初めて一貫した形になった時点を記録する製品マイルストーン。",
    eyebrow: "更新履歴",
    title: "実際に届けたもの。",
    introduction: "内部の細かな反復ではなく、製品のマイルストーンを記録します。各日付は、その機能が初めて人に使える一貫した形になった時点です。",
  },
  features: {
    sidebarLabel: "機能",
    sidebarNavigation: "機能ドキュメント",
    breadcrumb: "機能",
    agents: {
      label: "Agents",
      menuCopy: "Codex、Claude、Kimi、OpenCode",
      title: "Agent を替えても、ワークスペースはそのまま。",
      deck: "Codex、Claude Code、Kimi Code、OpenCode を同じローカルワークスペースで実行。公式 CLI と既存のサブスクリプションを使うため、追加料金はかかりません。",
    },
    apps: {
      label: "Apps",
      menuCopy: "タスクに合わせてつくられた実用的な画面",
      title: "Agent の成果を、使い続けられる画面に。",
      deck: "Apps はワークフロー固有の画面、データ、権限を持ち、有用な成果を会話ログの中に閉じ込めません。",
      imageAlt: "Bottega Apps ライブラリ。インストール済みの Bottega Design Canvas が Ready と表示されている",
      imageCaption: "Bottega の実画面：インストールした App は Apps ライブラリに永続的な場所と明示的な準備状態を持ちます。",
      sections: [
        {
          heading: "App は長く使える製品画面",
          paragraphs: [
            "Bottega は immutable な Git revision から static、server-backed、Base-backed Apps をインストールできます。App は専用 GUI、構造化データ、またはその両方を提供し、Chat は Agent に作業を頼むための操作面として残ります。",
            "第一方の例は汎用ダッシュボードではなく、それぞれ異なる仕事に向き合います。Design Canvas、Development Kanban、Expense Tracker、Fitness Log は、タスクに合わせて形づくられるため、画面も異なります。",
          ],
          points: [],
        },
        {
          heading: "画面とデータはつながったまま",
          paragraphs: ["Base-backed App は、自分を動かす行の隣に専用 GUI を置けます。ユーザーには目的に合った画面が見え、Agent には基盤レコードを読み書きする明示的なツールが見えます。"],
          points: [
            "Design Canvas は自己完結 HTML の方向案を表示し、番号付きの視覚アンカーを Chat に送り返せます。",
            "Development Kanban は実装タスクとレビュー指摘を構造化レコードとして保ちます。",
            "Expense Tracker は自然言語の支出を台帳と分析ビューへ正規化します。",
            "Fitness Log はトレーニングセットを記録し、筋肉ヒートマップへ投影します。",
          ],
        },
        {
          heading: "インストールには本物の信頼境界がある",
          paragraphs: [
            "App の権限は利用前に宣言され、確認されます。データアクセスは read、insert、patch、delete、attachments の能力ごとに、正確な App generation へ付与されます。GUI がローカルファイルやデータへの無制限アクセスを黙って継承することはありません。",
            "再利用できる Apps は、ローカル認証情報や非公開ワークスペース状態をパッケージにコピーせず共有できます。",
          ],
          points: [],
        },
      ],
    },
    customizable: {
      label: "カスタマイズ",
      menuCopy: "App 自身のソース Chat で編集",
      title: "ソースと話して App を編集する。",
      deck: "編集可能なソースを持つ App では、別のコードエディターではなく、App のソース Project 内に通常の Agent Chat を開きます。",
      imageAlt: "App と Data タブ、設定、Chat、その他メニューを表示した Bottega Design Canvas の詳細画面",
      imageCaption: "Bottega の実画面：App の画面、データ、利用 Chat、設定、ソース操作をひとつの詳細ページにまとめます。",
      sections: [
        {
          heading: "編集は第一級の製品操作",
          paragraphs: [
            "App に編集可能なソースがある場合、詳細ページのその他メニューに Edit App が表示されます。これは App の editor Project を再開し、ソースに紐づく標準 Agent Chat を開きます。",
            "Bottega のほかの場所と同じ対話モデルで変更を説明します。選択した Agent は通常のワークスペース境界の中で App を調べ、更新し、再ビルドできます。",
          ],
          points: [],
        },
        {
          heading: "利用と編集は別のコンテキスト",
          paragraphs: ["App の use Chat はインストール済み App とレコードを扱い、editor Chat は App 自体を変更します。役割を分けることで、通常の利用依頼が静かにソース変更へ化けることを防ぎます。"],
          points: ["Use Chat はインストール済み App 体験に結びつきます。", "Edit App は App 専用のソース Project を有効にします。", "データ権限は editor から継承されず、インストール済み generation に限定されます。"],
        },
        {
          heading: "ソースはブラックボックスではない",
          paragraphs: [
            "同じ App 詳細画面は、必要に応じて workbench、version history、import 経路、GitHub 共有フローも公開します。カスタマイズを隠れた再生成として扱わず、ソースのライフサイクルを見える形にします。",
            "すべての第三方 App が編集可能とは仮定しません。永続的なソース証拠が利用可能だと示す場合だけ編集操作を表示します。",
          ],
          points: [],
        },
      ],
    },
    base: {
      label: "Base",
      menuCopy: "会話の隣にある構造化ローカルデータ",
      title: "すべての会話の隣に、構造化ローカルデータを。",
      deck: "Base は Chat、Project、データ対応 Apps のための行ベースデータ層で、操作する会話のそばに置かれます。",
      imageAlt: "ビュー、フィルター、列、グループ化、行追加コントロールを備えた Base テーブルを表示する Bottega App の Data タブ",
      imageCaption: "Bottega の実画面：同じ App 詳細画面が GUI から完全な Base workbench へ切り替わります。",
      sections: [
        {
          heading: "会話とデータセットは同じ所有者を持つ",
          paragraphs: [
            "Chat は専用のローカル Base を使えます。専用 Base がなく Project に属する場合、その Project の共有 Base へフォールバックできます。所有規則が明確なので、Agent と画面は同じ永続データセットを操作します。",
            "Agents は schema と行の読み取り、検索、集計、revision 検査付き更新を行う内蔵 Base ツールを受け取ります。トラッカー、在庫、台帳、計画といった依頼を、別のスプレッドシートなしで構造化データにできます。",
          ],
          points: [],
        },
        {
          heading: "6 つのビュー、ひとつの真実",
          paragraphs: ["Table、List、Kanban、Map、Chart、Gallery は同じ行の投影です。ビューを変えてもデータが別文書へ分岐しません。"],
          points: ["レコードを書き換えずに、フィルター、並べ替え、グループ化、表示フィールド選択ができます。", "数式と relation で派生・関連データを扱えます。", "メディア添付、行履歴の確認、CSV・JSON・XLSX の交換ができます。", "App に専用 GUI を持たせつつ、Data タブで基盤 Base を利用できます。"],
        },
        {
          heading: "アクセスは意図的に狭い",
          paragraphs: [
            "App の Base アクセスは正確な generation に対して能力単位で限定されます。読み取り、行追加、patch、削除、添付は別々の grant で、revision 検査が古い書き込みによる新しいデータの上書きを防ぎます。",
            "その結果、Agents はローカルデータ画面を操作できても、インストールしたすべての GUI が無制限のデータベースクライアントになることはありません。",
          ],
          points: [],
        },
      ],
    },
    agentsArticle: {
      stories: [
        {
          index: "01 · Multi-Agent",
          title: "公式 CLI を、ひとつの仕事場で。",
          paragraphs: [
            "Bottega は Codex、Claude Code、Kimi Code、OpenCode を公式ローカル CLI で実行します。汎用 Agent レイヤーで各 CLI の仕組みを置き換えません。",
            "認証、サブスクリプションアクセス、割り当てはプロバイダー側に残ります。モデルと reasoning effort のコントロールは各 CLI のライブカタログから得るため、バックエンドが本当に受け付ける選択肢だけが表示されます。",
            "会話は開始した Agent に結びついたままです。別の Agent が必要なら別の会話を開き、どちらも同じ Project に置けます。",
          ],
        },
        {
          index: "02 · 会話機能の整合",
          title: "統一するのは操作体験。Agent ではありません。",
          paragraphs: [
            "Agent Harness ごとに独自の実行モデルがあります。操作体験を統一するため、Bottega は共通のインタラクション層を用意し、ストリーミング応答、ツール状態、Plan モード、キューメッセージなどを各バックエンドに合わせて適応させています。",
            "現在の機能対応状況は以下のとおりです（継続的に更新中）。",
          ],
        },
        {
          index: "03 · Agent 間コラボレーション",
          title: "体験の統一にとどまらず、Agent が連携して仕事を完了。",
          paragraphs: [
            "Claude に問題を整理して Plan を作らせ、必要なコンテキストを Codex に渡して実装させます。完了すると結果は元の Chat に自動で戻り、レビューや修正を続けたり、次の Agent に引き継いだりできます。",
            "各 Chat はそれぞれの Agent、ワークスペース、タスク履歴を保持します。メッセージはすぐに実行することもキューで待機させることもでき、プロセスは常に見え、結果は追跡・再利用できます。",
          ],
        },
      ],
    },
  },
  demo: {
    chrome: {
      newChat: "新しい Chat", apps: "Apps", projects: "Projects", chats: "Chats", settings: "設定", showMore: "さらに表示",
      ledger: "台帳", analysis: "分析", byMonth: "月別", date: "日付", amount: "金額", category: "カテゴリ", note: "メモ", sum: "合計", records: "{count} 件",
      askAnything: "何でも聞いてください", approveForMe: "代わりに承認", currentAgent: "現在の Agent: {name}", currentModel: "現在のモデル: {name}",
      recommended: "おすすめ", anotherApproach: "どれにも当てはまらない。別の方法を Agent に伝える", workedFor: "作業時間 {duration}", plan: "Plan",
      planCopied: "Plan をコピーしました", copyPlan: "Plan をコピー", closePlan: "Plan パネルを閉じる", openPlan: "Plan パネルを開く",
    },
    model: {
      advanced: "詳細", disableFast: "Fast を無効にする", enableFast: "Fast を有効にする", model: "モデル", effort: "思考強度", unavailable: "利用不可", quickTier: "クイックモデル階層",
      efforts: { low: "軽量", medium: "中", high: "高", xhigh: "非常に高", max: "最大" },
    },
    apps: {
      items: [
        { name: "デザインキャンバス", description: "アイデアを編集できるビジュアルキャンバスに" },
        { name: "開発カンバン", description: "開発タスク、進捗、課題をボードで管理" },
        { name: "支出トラッカー", description: "支出を記録し、カテゴリと傾向を確認" },
        { name: "フィットネスログ", description: "トレーニングと筋肉への負荷を記録" },
      ],
    },
    baseViews: [
      { name: "テーブルビュー", tab: "テーブル", blurb: "型付き列、並べ替え、フィルター、任意列の合計" },
      { name: "チャートビュー", tab: "チャート", blurb: "カテゴリ別比率、日別支出" },
      { name: "ギャラリービュー", tab: "ギャラリー", blurb: "添付列をサムネイルで表示" },
      { name: "マップビュー", tab: "マップ", blurb: "位置列をピンで表示" },
    ],
    ledger: {
      categories: ["交通", "機器", "食料品", "健康", "外食"],
      notes: ["DiDi、空港まで", "Apple Store", "Hema Fresh", "ジム、四半期", "ラーメン一幸舎", "高速鉄道", "近所の市場", "チームランチ", "空港エクスプレス", "週末の買い物", "モニターアーム", "コーヒー 2 杯", "薬局", "地下鉄チャージ", "メカニカルキーボード", "Hema Fresh", "夜食の麺", "歯科"],
      categoryShare: "カテゴリ別比率", dailySpend: "日別支出", location: "位置", where: "場所", label: "ラベル",
    },
    kanban: {
      tabs: ["タスク", "指摘", "すべて"], lanes: ["進行中", "レビュー", "完了"], task: "タスク", source: "ソース", doc: "文書",
      titles: ["設定パネルを Agents の下へ移す", "CLI インポート経路に統合テストを追加", "自動更新フローを監査", "ACP ハンドシェイクを文書化", "ブックマークを壊さず /settings/backends を変更", "オンボーディング文を 42 語へ短縮", "インストールプロトコルを定義", "公開 identity と取得元を分離", "0.2.0 リリースノートを公開"],
    },
    canvas: {
      live: "ライブ", focus: "フォーカス", directions: "方向", compare: "比較", browse: "閲覧", element: "要素", region: "領域",
      desktop: "デスクトップ", tablet: "タブレット", mobile: "モバイル", fit: "全体表示", anchors: "アンカー", selectedCount: "{count} 件を選択", stale: "古い", clear: "クリア", addToChat: "Chat に追加",
    },
    fitness: {
      trainingRecord: "Fitness Log · トレーニング記録", title: "指導ではなく、網羅", subtitle: "完了したセットだけを集計します。Use Chat またはデータ表から記録・修正してください。",
      revision: "リビジョン", createPlan: "トレーニング計画を作成", coverage: "カバレッジ", heatmap: "筋肉ヒートマップ", body: "身体", male: "男性", timeRange: "期間", last30Days: "過去 30 日",
      front: "前面", back: "背面", intensity: "カバレッジ強度", offlineCatalog: "オフラインカタログ · 1324 種目", exerciseCatalog: "エクササイズカタログ", clearFilters: "フィルターを解除",
      search: "検索", searchHint: "名前、別名、筋肉、器具", bodyPart: "身体部位", muscleRegion: "筋肉領域", equipment: "器具", all: "すべて", exercises: "1324 種目", showing: "1–24 を表示", groups: ["胸", "大腿", "背中"],
    },
    appMenu: { items: ["App を編集", "App Workbench", "この App について", "インポート", "バージョン履歴", "GitHub に共有"], ask: "比較ビューに 3 つ目のペインを追加して。", source: "App ソース" },
    chats: {
      releaseNotes: {
        title: "リリースノートを公開", ask: "0.1.9 以降にマージされた PR から 0.2.0 のリリースノートを作成して。", trace: ["4 パッケージの 18 commit を確認", "CHANGELOG.md を編集"], reply: "Plan は上です。開始と言えば書きます。グループを変えたいなら、まず組み直します。",
        plan: { title: "0.2.0 リリースノート", sections: [
          { heading: "概要", items: ["`0.1.9` 以降の主要な 6 変更を、ユーザーが先に気づく順に分類。", "Agent parity を先頭へ——`Kimi` と `OpenCode` が `Codex` と同じ権限段階に到達。", "内部リファクタリング 2 件は 1 行に統合。リポジトリ外の誰にも影響しない。"] },
          { heading: "順序", items: ["18 件の PR を package ではなく、ユーザーが触る画面で分類する。", "各項目は変更内容を書く。PR 番号は出典でありニュースではない。", "`docs/` にミラーし、両方を読み戻して不一致を防ぐ。"] },
          { heading: "ファイル", items: ["`CHANGELOG.md` — 6 項目、新しい順、絶対日付。", "`docs/changelog/README.md` — 同じ 6 項目の公開ミラー。"] },
          { heading: "今回は対象外", items: ["`0.1.x` の補完——どこまで遡るかは別の判断。", "Release tag とダウンロードページ。これらはファイルを読み、書き込まない。"] },
        ] }, status: "応答中",
      },
      settingsPanel: { title: "設定パネルを移行", ask: "backend 設定を Agents の下へ移し、deep link を維持して。", trace: ["components/settings の 9 ファイルを確認", "12 の呼び出し箇所を発見"], reply: "方法は 3 つ。違いは保存済みリンクの扱いだけです。", bullets: ["12 箇所の変更はいずれも機械的です。", "機械的でないのは 2 本の deep link と command palette 項目です。", "本当の問いは、古いリンクに何を約束するかです。"], question: { eyebrow: "Main Agent · ルート戦略", text: "古い設定ルートはブックマークされています。どう移しますか？", options: [{ label: "redirect を残す", description: "旧パスを新パスへ解決し、ブックマークと palette を維持。" }, { label: "完全に改名", description: "最もきれいですが、保存されたリンクはすべて切れます。" }, { label: "1 リリース併存", description: "今は 2 ルートを提供し、0.3.0 で旧ルートを削除。" }] } },
      changelog: { title: "更新履歴を作成", ask: "今週のマージを更新履歴ページ向けに要約して。", trace: ["24 件の commit message を確認", "docs/changelog/README.md を編集"], reply: "6 項目です。マージ一覧ではなく、ひとつの物語として読めます。", bullets: ["6 項目、新しい順、各 1 行。", "内部リファクタ 2 件はまとめる——外部の人には影響がない。", "日付は絶対表記。更新履歴は数か月後にも読まれます。"], status: "docs/changelog/README.md を編集中" },
      importTests: { title: "CLI import 経路をカバー", ask: "既存 CLI session の import に統合テストを追加して。", trace: ["import module を確認", "48 テストを実行"], reply: "すべて成功。これまで未検証だった経路にもテストができました。", bullets: ["新規 4 件を含む 48 テストが成功。", "壊れた session file は App ではなく import を失敗させます。", "Fixture は module の隣にあり、次の読者が見つけられます。"], status: "48 テストを実行中" },
      onboarding: { title: "Onboarding 文を短縮", ask: "初回画面が説明書のようです。最初の Chat 前に必要な内容だけにして。", trace: ["Onboarding 4 画面を確認", "5 言語の onboarding.ts を編集"], reply: "削った内容はすべて、画面自身がすでに語っていました。", bullets: ["140 語から 42 語へ。", "権限説明を権限選択の場所へ移動。", "5 言語すべてを書き直し、英語から機械翻訳しない。"], status: "思考中" },
      updatePath: { title: "更新経路を監査", ask: "自動更新を追い、半分だけ落ちた Release がどこで人を止めるか教えて。", trace: ["3 つの更新状態を追跡", "updater suite を実行"], reply: "本物の穴が 1 つあり、不安定な回線で当たる場所です。", bullets: ["中断された install でボタンが永遠に Installing のまま。", "ほかは再起動で復旧し、download は ledger から再開。", "installer process 不在を pending ではなく failed phase として扱うべき。"], status: "electron/main/updater.ts を確認中" },
      settingsRoutes: { title: "設定ルートを改名", ask: "ブックマークを壊さず /settings/backends を /settings/agents に変えて。", trace: ["12 の呼び出し箇所を発見", "12 ファイルを編集"], reply: "すべて改名し、ブックマークには気づかれません。", bullets: ["12 箇所を改名し、検索置換には頼っていません。", "旧ルートは redirect のため、ブックマークも palette も到達します。", "ルートテスト成功。"], status: "応答中" },
      iconGrid: { title: "2 つのアイコングリッドを比較", ask: "サイドバーのアイコンが Composer より 1px ずれて見えます。どちらが誤り？", trace: ["14 のアイコンスロットを計測", "sidebar-row.tsx を確認"], reply: "どちらも正しいです。ずれに見えるのは意図的な 1px の余白です。", bullets: ["どちらも正しく、スロットは両方 16px。", "サイドバーは 14px mark、Composer はスロットを満たします。", "見えているのはアイコンではなくスロットです。"], status: "思考中" },
      acp: { title: "ACP ハンドシェイクを説明", ask: "CLI 起動から最初の token までに起きることを説明して。", trace: ["ACP session module を確認", "6 メッセージを追跡"], reply: "最初の token まで 3 往復。その後は 1 本の stream です。", bullets: ["initialize — client が描画能力を宣言。", "session/new — CLI が作業ディレクトリで session を開始。", "session/prompt — 以後は同じ channel で streaming。"], status: "応答中" },
    },
    agentsVisual: {
      pickerLabel: "Composer の Agent 選択メニューを開いた Bottega ホーム Hero の製品ウインドウ", matrixLabel: "Codex、Claude、Kimi、OpenCode の機能マトリクス", capability: "機能",
      rows: [
        { label: "ストリーミング応答", values: ["✅", "✅", "✅", "✅"] },
        { label: "Model / Thinking 選択", values: ["✅", "✅", "✅", "✅"] },
        { label: "ツール状態", values: ["✅", "✅", "✅", "✅"] },
        { label: "Plan モード", values: ["✅", "✅", "✅", "✅"] },
        { label: "キューモード", values: ["✅", "✅", "✅", "✅"] },
        { label: "ユーザー承認", values: ["✅", "✅", "✅", "✅"] },
        { label: "@ 機能", values: ["✅", "✅", "✅", "✅"] },
        { label: "Browser Use", values: ["✅", "✅", "✅", "✅"] },
        { label: "Fork", values: ["✅", "✅", "✅", "✅"] },
        { label: "直前のメッセージを修正", values: ["✅", "✅", "✅", "✅"] },
      ],
      collaborationLabel: "Claude が Plan を立て、Codex が実装し、結果が元の Chat に戻って Claude がレビューする——同じ一台の三つのコマ",
      chatPlan: "ナビゲーションの統一", chatImpl: "ナビゲーション実装", planLabel: "Plan", planTitle: "ナビゲーション実装計画",
      relayFrom: "【Section @{name} より（source_section_id={id}）】",
      queueItem: "@{name} · モバイルのブレークポイントも検証",
      reviewLine: "計画意図と実装が一致、ブロッキング問題なし。",
      notePlan: "まず Claude に問題を\nPlan へ整理させる",
      noteSend: "やるべきことを\n別の Chat のキューへ",
      noteBack: "終われば、結果は自動で戻ってくる",
      noteReview: "元の対話に戻ってレビュー ——\nまたは次の Agent へ",
      handoffCaption: "三枚のカードは同じ一台の先後三コマ。スケルトン以外はすべて製品そのままの文字——Plan の題、受信メッセージの見出し、レビューの結論。二つの受け渡しは send_to_section と expect_reply を呼ぶ。",
    },
  },
} satisfies CatalogShape<typeof en>;
