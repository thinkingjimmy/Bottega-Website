"use client";

/**
 * [INPUT]: Uses localized DemoData, visibility/replay primitives, and shared product icons
 * [OUTPUT]: Exports the localized AgentsReel component
 * [POS]: Animated Agents proof showing four official backends inside one translated sidebar
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { ReplayButton } from "./replay-button";
import { usePlayWhenSeen } from "./use-play-when-seen";
import { AgentLogo, D, Stroke, Wordmark } from "../icons";

/* 骨架条：宽度是这一行"本来会有多长"的示意，不是随机数。 */
const REPLY_LINES = ["96%", "88%", "72%", "90%", "54%"];

export function AgentsReel({ demo, replayLabel }: { demo: DemoData; replayLabel: string }) {
  const { frame, play, run, ended, replay, markEnded } = usePlayWhenSeen();
  const projectChats = demo.chats.filter((chat) => chat.home === "project");
  const rootChats = demo.chats.filter((chat) => chat.home === "chats");
  const chrome = demo.copy.chrome;

  return (
    /* aria-hidden 挂在机器上而不是画框上：画框里除了机器还有一颗真按钮，
       藏起一颗能被 Tab 停住的按钮，比不给按钮更坏。 */
    <div className="reel" ref={frame} data-play={play || undefined} onAnimationEnd={markEnded}>
      {/* key={run}：重挂一次就是重演一次，见 use-play-when-seen 的头部。 */}
      <div className="reel-cam" key={run} aria-hidden="true">
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
              <span className="reel-title">{chrome.newChat}</span>
            </div>
            <div className="reel-row">
              <span className="reel-mark">
                <Stroke d={D.grid} size={11} width={1.9} />
              </span>
              <span className="reel-title">{chrome.apps}</span>
            </div>

            <p className="reel-label">{chrome.projects}</p>
            <div className="reel-row">
              <span className="reel-mark">
                <Stroke d={D.folder} size={11} width={1.9} />
              </span>
              <span className="reel-title">{demo.project.name}</span>
            </div>
            {projectChats.map((chat, index) => (
              <div className={`reel-row sub${index === 0 ? " on" : ""}`} key={chat.id}>
                <span className="reel-mark">
                  <AgentLogo backend={chat.agent} size={11} />
                </span>
                <span className="reel-title">{chat.title}</span>
              </div>
            ))}

            <p className="reel-label">{chrome.chats}</p>
            {rootChats.map((chat) => (
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
              <span className="reel-title">{chrome.settings}</span>
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

      {ended && <ReplayButton onClick={replay} label={replayLabel} />}
    </div>
  );
}
