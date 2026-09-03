# 変更履歴

このファイルは内部実装の反復ではなく、製品のマイルストーンを記録します。

## 2026-09-02 — v0.1.0

- 最初のインストーラーを公開しました。Bottega は GitHub Releases から macOS arm64 の DMG と ZIP、Windows x64 の NSIS インストーラー、Linux x64 の AppImage として入手できます。いずれもこの tag のコミットからビルドされています。これらのビルドは署名されていないため、初回起動時に各プラットフォームが求める一度きりの操作は getting-started ガイドに記載しています。
- Chat ストアを SQLite 上に作り直し、それを唯一の真実の源にしました。会話、turn、添付、fact が Chat ごとのファイルではなく一つの永続ローカルデータベースに収まり、Chat はクラッシュを越えて残り、再スキャンなしで再開し、長くなっても遅くなりません。
- 長い会話を開くコストを一定にしました。タイムライン、Chat アウトライン、Chat 内検索はすべてページングされ、数万 turn の Chat を開くコストは短い Chat と同じで、遡ってもトランスクリプト全体を読み直しません。
- gram ベースの全文検索を追加しました。中国語・日本語・韓国語のテキストも空白区切りの言語と同じ確実さで一致し、結果はトランスクリプトが読むのと同じストアから返ります。
- 取り込んだ履歴を一つのタイムラインに統合しました。ローカルの Codex、Claude Code、Kimi Code、OpenCode CLI から引き継いだ session が、独立した読み取り専用ビューではなく、Bottega で作成した Chat と同じトランスクリプト、アウトライン、検索、ナビゲーションで表示されます。
- fact の書き込みを狭めました。turn は自分が実際に所有する fact だけを更新するため、並行する turn、Memory の配信、Base の書き込みが互いの状態を上書きしなくなりました。
- マージレビューで見つかった問題を解消しました。App Use は completed の受領後にのみ遷移するため、拒否または復旧中の App がウィンドウを動かすことはありません。App の Base アクセス取り消しは一つの原子的な操作になり、アクセス権とライフサイクルが食い違わなくなりました。App と Project のピン留め、Project の外観、Settings のナビゲーションを整理し、サイドバーは常に実際に開いているものを反映します。

## 2026-08-29 — Project 単位のツール、Extension、Design Canvas ソースプレビュー

- 現在の本番ソースを、クリーンな公開履歴の通常の子コミットとして公開しました。テスト、開発自動化、内部証跡は引き続き Bottega-Dev のみに保持されます。
- 組み込みツールと手動 MCP server に、正確な Project 単位の上書きを追加しました。各 turn は副作用の開始前に、有効なツール計画、scope revision、runtime 対応状況、sealed MCP 設定を固定します。
- Extension の所有権を管理、Skill、App requirement、session、retained data、削除復旧にわたって `global | exact Project` に統一しました。明示的に空の旧 Registry と ledger は移行され、live または曖昧な権限を含む状態は fail closed を維持します。
- 自己完結型 HTML アートボード、方向と履歴の比較、番号付き視覚アンカー、sandbox preview、Agent 側 render check を備えた Bottega Design Canvas を同梱しました。
- 4 つのファーストパーティ App gitlink を公開到達可能な commit に更新しました。これはソースプレビューであり、引き続きリリースゲート下にある正式な `v0.1.0` installer release ではありません。

## 2026-08-25 — 公開ソースのリリース

- Bottega を MIT License の下、公開内容だけを含む新しい Git 履歴で公開しました。
- 明確な repository 境界を確立しました。本番 desktop source と milestone documentation は公開し、tests、test data、web application、internal evaluations、TODO、development notes、weekly engineering logs、repository automation は開発 repository に残します。
- 公開 documentation を docs/ 配下に集約し、getting started、features、changelog の第 2 階層に整理しました。root README は GitHub の入口に専念します。
- 製品、package、window、build artifact、ACP client、exported document の名称を **Bottega** に統一しました。

## 2026-08-18 から 2026-08-23 — 永続的なコラボレーション

- workspace reference を Chat から file と Section へ拡張しました。
- Section 間の永続的な image handoff と、Subagent 結果の再利用可能な idle Section への昇格を追加しました。
- Codex、Claude Code、Kimi Code、OpenCode のローカル Skill 管理を統一しました。
- 検索可能な読み取り専用 history federation と、ローカル Agent session の引き継ぎを追加しました。

## 2026-08-08 から 2026-08-23 — 明示的な同意に基づく Memory

- 管理対象のローカル OpenViking provider と EverOS provider を追加しました。
- Chat、Project group、personal の共有 scope に、明示的な同意と観測可能な delivery state を導入しました。
- rebuild、source、model download progress、信頼できる version switching を追加しました。

## 2026-08-04 から 2026-08-21 — App、ツール、ブラウザ

- in-process CDP で制御する multi-tab in-app browser を追加しました。
- built-in tool platform を Section、search、Base、file、App、browser action まで拡張しました。
- static、server、Base-backed App を、generation-bound permission と制約された GUI SDK の下で統一しました。

## 2026-07-28 から 2026-08-23 — Base

- Chat と Project に構造化データを導入し、Table、List、Kanban、Map、Chart、Gallery view を追加しました。
- formula、relation、attachment、row history、import/export、capability-scoped App mutation を追加しました。

## 2026-07-16 から 2026-08-09 — Desktop と Multi-agent の基盤

- web prototype から Electron desktop workspace へ移行しました。
- ローカル CLI と ACP を通じて Codex、Claude Code、Kimi Code、OpenCode を接続し、CLI credential の所有権を維持しました。
- streaming turn、approval、Plan mode、message steering、Subagent、Project workspace、archive semantics、OS-level file boundary を追加しました。
