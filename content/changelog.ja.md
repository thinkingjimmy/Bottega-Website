# 変更履歴

このファイルは内部実装の反復ではなく、製品のマイルストーンを記録します。

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
