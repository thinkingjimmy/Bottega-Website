/**
 * [INPUT]: 依赖 @/lib/agents 的 BACKENDS/backendLabel，依赖 ./reels/agents-reel 的
 *          AgentsReel，依赖 ./icons 的 AgentLogo
 * [OUTPUT]: 对外提供 AgentsSection 组件
 * [POS]: Bottega-Website 唯一的功能介绍段。左文右图——图是一台会动的机器，
 *        镜头开在侧栏左上角摇下去，让四家 logo 一个一个走过，摇完才拉远
 *        给一眼整机；文字因此只需要说「有谁」和「谁付钱」，不必再解释
 *        「你怎么知道是谁干的」
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { BACKENDS, backendLabel } from "@/lib/agents";
import { AgentsReel } from "./reels/agents-reel";
import { AgentLogo } from "./icons";

export function AgentsSection() {
  return (
    <section className="section" id="agents">
      <div className="wrap split">
        <div>
          <h1 style={{ fontSize: 56, lineHeight: 1.03, maxWidth: "16ch", marginBottom: 22 }}>
            Every agent you pay for, in one sidebar.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 18, maxWidth: "56ch" }}>
            Codex, Claude, Kimi and OpenCode all live in Bottega — the official CLIs you already have
            installed, nothing reimplemented.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 30, maxWidth: "56ch" }}>
            Each runs on your own subscription: the plan you already pay for, billed by the provider, not
            by us.
          </p>

          {/* 四枚标记就是那句「有谁」的全部证据。名字写在 title 里而不是画在
              旁边：一行 logo 读得比一行名字快，而读不出来的人一 hover 就有。 */}
          <ul className="agent-marks">
            {BACKENDS.map((backend) => (
              <li key={backend.id} title={backendLabel(backend.id)}>
                <AgentLogo backend={backend.id} size={28} />
                <span className="sr-only">{backendLabel(backend.id)}</span>
              </li>
            ))}
          </ul>
        </div>

        <AgentsReel />
      </div>
    </section>
  );
}
