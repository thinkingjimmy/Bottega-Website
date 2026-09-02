# window/

> L2 | 父级: ../../README.md

首屏里那台机器。五个文件，一个原则：**几何与形状逐项抄自 Bottega 的真组件**，
不是眼量的近似。差 2px 就不像同一个产品，形状差一层就不是同一个产品。

## 成员清单

- **product-window.tsx**: 窗口外壳。侧栏（48px 的字标行，加搜索与通知 /
  New chat / Apps + 置顶 App / Projects 折叠区 + Show more / Chats / Settings）
  与主区（40px 页头 + 会话或 App 表面）。整只窗口可被压扁（`flex: 0 1 auto`），
  矮视口下先压窗口再交给内部滚动，而不是顶穿系统菜单栏。
  字标 26px 是全站唯一一处有意偏离产品真值（产品是 32px），理由见站点 README。
  侧栏只有一条左缘——`--sidebar-pad`（容器 2px）+ `--sidebar-gutter`（药丸内 8px）= 10px，
  字标、New chat、分组标签、每条 chat 的行首痕迹全从这两个数推导；谁私自写死一个数，
  谁就多造一条对不齐的线。会话的 agent / 模型 / 档位 / Fast 是 chat 自己的属性而非
  选择器的局部状态——行首 logo、页头 logo、输入框按钮读的是同一个值，所以换
  agent 时三处一起改口。抄自 `components/sidebar/` 与 `components/page-shell.tsx`。
- **product-transcript.tsx**: 一段对话，自带内滚并在换会话时落到最新一句上。计时头（标签在前、箭头紧随、下缘一条
  全宽发丝线，可折叠）、Plan 卡（预览有上限，够不着的部分由底部渐变自陈；复制
  给的是全文，放大钮与预览整块通向第三栏）、流式状态行（`thinking-orbs` 的
  orb + 扫光文字）。抄自 `components/chat/transcript/` 的 `chat-turn.tsx` /
  `chat-plan-card.tsx` 与 `ai-elements/thinking-shimmer.tsx`。
  `planText`（plan 的纯文本全文）与 `Rich`（行内反引号）从这里出口——
  第三栏读的是同一份 plan，规则各写一遍就会分叉。
- **product-plan-panel.tsx**: 第三栏，也就是那颗放大钮的落点：页头借主栏那条
  40px 的 `.win-head`（两栏的线本就是同一条），正文是同一份 plan 的全文，
  没有上限也没有那道渐变——第三栏存在的全部理由就是「预览够不着的部分」。
  抄自 `components/chat/side-panel/side-panel.tsx`：外层只管宽度、里层那张脸
  定宽绝对定位并从右侧滑入，于是聊天区在这 200ms 里让位，文档一个字都不重排。
  200ms 与产品的 `SIDE_PANEL_TRANSITION_MS` 同一个数。
- **product-composer.tsx**: 输入框。两行几何（上行编辑区、下行左工具右身份），
  agent 菜单，以及问题卡——agent 在等你回话时，输入框整只让位，因为此刻你能
  做的就只有回话。抄自 `components/chat/composer/` 的 `chat-composer.tsx` 与
  `chat-user-input-selector.tsx`。
- **product-model-menu.tsx**: 模型面板的两张脸。Codex 是 `modelOptions: "full"`
  ——一条蓝色档位滑轨 + Fast 开关，Advanced 之后才是列表；其余三家是
  `list-only`——Model / Effort 两行摘要，点进去才是列表。这不是两种设计口味，
  是 capabilities 那一位的直接后果。抄自 `chat-model-selector.tsx` 与
  `chat-model-list-selector.tsx`。

## 真能按下去的东西

首屏不是一张截图。侧栏每条 chat 都打得开，Show more 真的把下一页放进来，
Apps 与置顶 App 切到表格那一面，agent 与模型两颗按钮开真菜单，档位滑轨拖得动，
Fast 按得亮，Plan 的放大钮开第三栏、复制钮真往剪贴板里写。`+` 与权限那两颗是
静态的，所以不给悬停反馈——给了就是许一个按不动的诺。

## 第三栏开在哪条 chat 上，不是一个 boolean

产品里侧栏是会话自己的属性（`SidePanelState` 挂在 session 上），换走再换回来
它还开着。这里记的于是也是 `planChatId` 而不是 `planOpen`：记成 boolean 就得在
换会话、换表面两处各写一句「顺手关掉」，而两句顺手迟早有一句忘了写。
关上的那 200ms 里 plan 也不清空——内容先被抽空，读者看到的就成了「文档没了」，
而不是「文档退场了」。

## 数据

全部演示数据住在 `@/lib/agents`，样式住在 `app/styles/hero/` 那三支
（`shell` 窗壳与第三栏的开合 / `surface` 输出侧 / `composer` 输入侧）。
这一层只负责形状：没有自己的 token，也没有自己的数据。

[PROTOCOL]: 变更时更新此头部，然后检查 README.md
