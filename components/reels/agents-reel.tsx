/**
 * [INPUT]: 依赖 @/lib/agents 的 CHATS/PROJECT，依赖 ../icons 的 AgentLogo/Stroke/Wordmark/D
 * [OUTPUT]: 对外提供 AgentsReel 组件
 * [POS]: Agents 一节左侧那台会动的机器。一镜到底：先给整台机器（对话区是
 *        骨架屏，因为此刻要看的不是它），推近到侧栏，再自上而下摇下去，
 *        让每一行行首那枚 logo 一个一个走过镜头。这一节要讲的话就是这个
 *        动作本身——四家 agent 混住在同一列 chat 里，看一眼就完了。
 *        无 hook、无脚本：整段是一条 CSS keyframes，服务端渲染即可
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { CHATS, PROJECT } from "@/lib/agents";
import { AgentLogo, D, Stroke, Wordmark } from "../icons";

const PROJECT_CHATS = CHATS.filter((chat) => chat.home === "project");
const ROOT_CHATS = CHATS.filter((chat) => chat.home === "chats");

/* 骨架条：宽度是这一行"本来会有多长"的示意，不是随机数。 */
const REPLY_LINES = ["96%", "88%", "72%", "90%", "54%"];

export function AgentsReel() {
  return (
    <div className="reel" aria-hidden="true">
      <div className="reel-cam">
        <div className="reel-app">
          <aside className="reel-side">
            <div className="reel-traffic">
              <i style={{ background: "#FF5F57" }} />
              <i style={{ background: "#FEBC2E" }} />
              <i style={{ background: "#28C840" }} />
            </div>
            <div className="reel-brand">
              <Wordmark height={13} />
            </div>

            <div className="reel-row">
              <span className="reel-mark">
                <Stroke d={D.squarePen} size={11} width={1.9} />
              </span>
              <span className="reel-title">New chat</span>
            </div>
            <div className="reel-row">
              <span className="reel-mark">
                <Stroke d={D.grid} size={11} width={1.9} />
              </span>
              <span className="reel-title">Apps</span>
            </div>

            <p className="reel-label">Projects</p>
            <div className="reel-row">
              <span className="reel-mark">
                <Stroke d={D.folder} size={11} width={1.9} />
              </span>
              <span className="reel-title">{PROJECT.name}</span>
            </div>
            {PROJECT_CHATS.map((chat, index) => (
              <div className={`reel-row sub${index === 0 ? " on" : ""}`} key={chat.id}>
                <span className="reel-mark">
                  <AgentLogo backend={chat.agent} size={11} />
                </span>
                <span className="reel-title">{chat.title}</span>
              </div>
            ))}

            <p className="reel-label">Chats</p>
            {ROOT_CHATS.map((chat) => (
              <div className="reel-row" key={chat.id}>
                <span className="reel-mark">
                  <AgentLogo backend={chat.agent} size={11} />
                </span>
                <span className="reel-title">{chat.title}</span>
              </div>
            ))}

            <div className="reel-row reel-foot">
              <span className="reel-mark">
                <Stroke d={D.settings} size={11} width={1.9} />
              </span>
              <span className="reel-title">Settings</span>
            </div>
          </aside>

          {/* 对话区留骨架：镜头最终要停在侧栏，这一侧此刻只需要证明
              「那边确实是一台在干活的机器」，不需要被读。 */}
          <div className="reel-main">
            <div className="reel-head">
              <span className="sk sk-dot" />
              <span className="sk sk-bar" style={{ width: 96 }} />
            </div>
            <div className="reel-body">
              <span className="sk sk-bubble" />
              <span className="sk sk-bar" style={{ width: 84 }} />
              {REPLY_LINES.map((width) => (
                <span className="sk sk-bar" key={width} style={{ width }} />
              ))}
            </div>
            <div className="reel-composer">
              <span className="sk sk-bar" style={{ width: 72 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
