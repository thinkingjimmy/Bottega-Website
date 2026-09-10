# 変更履歴

このファイルは内部実装の反復ではなく、製品のマイルストーンを記録します。

## 2026-09-08 — v0.1.3

**アップグレード前に：** 0.1.3 は新しいローカルストレージ形式を使用します。0.1.2 以前の Chat データベースは開けず、自動移行もできません。Bottega を終了し、アプリケーションデータフォルダ全体をバックアップしてください。旧版用にバックアップを保持し、0.1.3 は新しいデータフォルダで起動します。以前の Chat や設定は自動的には取り込まれません。

- **Chat 内で Agent を切り替え。** 待機中に次の turn を担当する Codex、Claude Code、Kimi Code、OpenCode を選べます。発言者と切り替え位置を示したひとつの履歴を維持し、新しい Agent は必要な文脈を受け取り、関連する Chat 履歴を取得できます。
- **Agent の準備状況を表示。** 入力欄でインストール、認証、実行環境の状態を確認し、必要なインストール、サインイン、再試行を行えます。利用できない Agent がキューの作業を黙って消費せず、復旧は対象の Chat または Agent に限定されます。
- **macOS でメインウィンドウ外のタスクを確認。** ログイン時の起動、ウィンドウを閉じた後の実行継続、フローティングタスクパネルを個別に有効化できます。画面上部のパネルは実行中のタスクや対応が必要な要求を表示し、キーボード操作と関連 Chat の表示に対応します。初期状態ではすべて無効です。
- **インストール前に App の互換性を確認。** 4 つのファーストパーティ App は最低バージョンとして Bottega 0.1.3 を指定します。インストール、再ビルド、権限付与、有効化で確認し、アップグレード後の再起動から元の候補に戻れます。拒否された更新は稼働中のバージョンと権限を保持します。
- **App の作業を保ったまま名前を変更。** 表示名を変更しても、有効なバージョン、ソース、データ、権限は維持されます。
- **Project の追加を簡単に。** ローカル CLI 履歴が存在するときだけ取り込みの選択肢を表示し、履歴のない Project は直接追加できます。

macOS arm64 DMG/ZIP、Windows x64 NSIS、Linux x64 AppImage を提供します。未署名のため、初回起動の手順に従ってください。macOS が主要プラットフォームで、Windows/Linux のネイティブ App 分離と完全な機能同等性は引き続き開発中です。0.1.0 または 0.1.1 からは旧アップデーターの不具合により手動インストールが必要です。上記のストレージ準備はすべての旧版に適用されます。

## 2026-09-05 — v0.1.2

**0.1.0 または 0.1.1 からの更新：** 既存の更新ボタンには今回修正した不具合があるため、GitHub Releases から 0.1.2 をダウンロードし、手動でインストールしてください。

- 未署名ビルドで利用できないリリース互換性キーが更新のダウンロードを妨げる問題を修正しました。サイドバーは自動インストールと手動ダウンロードを区別し、進捗を表示します。更新やバックグラウンド確認の失敗時も Releases または About に進めます。
- Fitness Log をホストの React インターフェースで再構築しました。共通のコンポーネントとデータ API を使いながら、72 種目、17 の筋肉部位、5 言語、アニメーション実演、トレーニング計画、レスポンシブなライト／ダーク表示を維持します。
- App のデータ読み込みを完全かつ復旧可能にしました。Base はすべてのページを読み、一貫したリビジョンを公開します。Fitness の計画送信は再試行や結果が不確実な場合にも元の行 ID を保持し、重複送信を防ぎます。
- Chat 内検索の再試行と移動を修正しました。失敗したページは明示的な再試行を待ち、古い応答は新しい検索を上書きしません。Chat を切り替えた後に以前の管理対象 worktree のブランチが残る問題も修正しました。
- 古いスキーマの App カタログ起動を修復しました。元のバイト列を隔離して保存し、現在形式の空カタログを作成します。現在形式の破損には引き続き明示的な修復が必要です。保留 turn の復旧と Memory のキャンセル処理も強化しました。
- macOS arm64 DMG/ZIP、Windows x64 NSIS、Linux x64 AppImage を公開しました。未署名のため、従来の初回起動手順が引き続き必要です。

## 2026-09-04 — v0.1.1

- macOS arm64 DMG/ZIP、Windows x64 NSIS、Linux x64 AppImage の v0.1.1 インストーラーを公開しました。未署名のため、0.1.0 と同じ初回起動手順が必要です。
- Chat Fork を追加しました。任意のアシスタント返信から、それ以前の履歴を読み取り専用で引き継ぐ Chat を作れます。Git Project では製品が管理する専用 worktree を持てるため、会話の分岐が同じ作業コピーを上書きしません。
- App Use に履歴パネルを追加し、App をメインウィンドウ内だけでなく独立したウィンドウでも実行できるようにしました。
- App GUI Surface をひとつのコンポーネント群とメッセージチャネルに統一し、各 App ページが個別のプロトコルを持つ構成を解消しました。
- 履歴取り込み時の 2 つの欠落を修正しました。更新時に各 Chat の Project 所属を保持し、再取り込み時にはタイトル検索用の文書を更新して古い内容を残しません。
- 初期設定の 3 ステップを狭いウィンドウに対応させました。コンテナ幅に応じた能力表示と、Chat ホーム、Agent、追加機能に整理した説明で、読みやすい行幅を維持します。
- Chat ストアの検索投影のずれを、失敗で停止せず共通の書き込み経路で再計算・修復します。自己診断が失敗した場合は、復旧方法と事前入力済み GitHub issue を開く報告ボタンをサイドバーに表示します。
- リリース版のデータを専用の `Bottega` ディレクトリに分離し、開発ビルドと互いのローカル状態を再構築しないようにしました。
- 読めない永続 ledger を新しい名前で隔離して証跡を保存し、空の状態で再構築して起動を続行するようにしました。
- 同梱のファーストパーティ App プリセットを公開済みコミットに更新しました。

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
