"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState，依赖 @/lib/agents 的
 *          CHATS/PROJECT，依赖 ../icons 的 AgentLogo/Stroke/Wordmark/D
 * [OUTPUT]: 对外提供 AgentsReel 组件
 * [POS]: Agents 一节左侧那台会动的机器。一镜到底：镜头开在侧栏左上角，
 *        自上而下摇到底，让每一行行首那枚 logo 一个一个走过镜头，然后停住
 *        （对话区是骨架屏，因为此刻要看的不是它）。这一节要讲的话就是这个
 *        动作本身——四家 agent 混住在同一列 chat 里，看一眼就完了。
 *        全站唯一一支带脚本的 reel：十来行 IntersectionObserver，理由见下
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";
import { CHATS, PROJECT } from "@/lib/agents";
import { AgentLogo, D, Stroke, Wordmark } from "../icons";

const PROJECT_CHATS = CHATS.filter((chat) => chat.home === "project");
const ROOT_CHATS = CHATS.filter((chat) => chat.home === "chats");

/* 骨架条：宽度是这一行"本来会有多长"的示意，不是随机数。 */
const REPLY_LINES = ["96%", "88%", "72%", "90%", "54%"];

/* ── 首帧是观众看见的第一帧，不是时间轴的 0% ──────────────────────
 * 这一段本来是纯 CSS 的 `infinite`：页面一加载就开始转，等人滚到这儿，
 * 镜头早已在视口外空转了不知多少圈——于是「这一节第一眼说什么」实际上
 * 交给了随机数。把 0% 排成左上角只解决了时间轴的起点，解决不了观众的。
 *
 * 十来行脚本把首帧赎回来，是笔划算的买卖：镜头在被看见的那一刻才走，
 * 走完一次就停，不再回头。第一次相交之后 observer 自己退场——它的差事
 * 只有一件，办完就不该还在场上。
 *
 * 脚本没跑（SSR、hydrate 之前、JS 挂了）时留下的是静息态那一格，
 * 与 keyframes 的 0% 逐位相同：降级不是退到一张坏图，是退到首帧。
 * ────────────────────────────────────────────────────────── */
function usePlayWhenSeen() {
  const frame = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { frame, play };
}

export function AgentsReel() {
  const { frame, play } = usePlayWhenSeen();

  return (
    <div className="reel" ref={frame} data-play={play || undefined} aria-hidden="true">
      <div className="reel-cam">
        <div className="reel-app">
          <aside className="reel-side">
            <div className="reel-traffic">
              <i style={{ background: "#FF5F57" }} />
              <i style={{ background: "#FEBC2E" }} />
              <i style={{ background: "#28C840" }} />
            </div>
            <div className="reel-brand">
              <Wordmark height={20} />
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
