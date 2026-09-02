"use client";

/**
 * [INPUT]: 依赖 ./use-play-when-seen 的 usePlayWhenSeen，依赖 ./replay-button 的
 *          ReplayButton，依赖 ../icons 的 Stroke/D/glyph，
 *          依赖 @/lib/agents 的 APP_MENU/DESIGN_APP/DESIGN_APP_WINDOW_TITLE
 * [OUTPUT]: 对外提供 AppMenuReel 组件
 * [POS]: Fully customizable 一节右侧那台会动的机器。镜头开在窗口左上角，
 *        右移到「···」，它亮起来、掉出真实的 App 菜单，落焦停在 Edit App，
 *        窗口底下升起一条 chat 输入框，一个字一个字打完那句话，发送——
 *        输入框退场，画布上多出第三块板。产品里「Edit App」打开的正是一个
 *        绑定这只 App 的 chat（openAppEditor → app-editor-chat），不是代码
 *        编辑器；而这一镜的结论不是「输入框出现了」，是「说的那句话生效了」
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { APP_MENU, DESIGN_APP, DESIGN_APP_WINDOW_TITLE } from "@/lib/agents";
import { D, Stroke, glyph } from "../icons";
import { ReplayButton } from "./replay-button";
import { usePlayWhenSeen } from "./use-play-when-seen";

/* 窗口里那张画布是 Agent 写的 HTML——不可信内容只画骨架。
   画的是一张 compare view：先两块板，因为要说的那句话是「再来一块」。 */
const PANES = ["72%", "66%"];

/* 输入框里打的那句话与画布上发生的事必须是同一件事——否则这一镜演的是
   「有个输入框」，而不是「你说的话算数」。 */
const EDIT_ASK = "Give the compare view a third pane.";

export function AppMenuReel() {
  const { frame, play, run, ended, replay, markEnded } = usePlayWhenSeen();

  return (
    /* aria-hidden 挂在机器上而不是画框上：画框里除了机器还有一颗真按钮，
       藏起一颗能被 Tab 停住的按钮，比不给按钮更坏。 */
    <div className="reel" ref={frame} data-play={play || undefined} onAnimationEnd={markEnded}>
      {/* key={run}：重挂一次就是重演一次，见 use-play-when-seen 的头部。 */}
      <div className="aw-cam" key={run} aria-hidden="true">
        <div className="appwin">
          <div className="aw-head">
            <span className="aw-back">
              <Stroke d={D.arrowLeft} size={12} width={1.8} />
            </span>
            {/* 标题栏读的是 manifest 里的全名，不是站点目录那条短名——
                产品的页头写着 `${icon} ${displayName}`，而 app.json 里
                这只 App 就叫 Bottega Design Canvas。 */}
            <span className="aw-title">
              <i>{DESIGN_APP.icon}</i>
              {DESIGN_APP_WINDOW_TITLE}
            </span>
            <span className="aw-more">
              <Stroke d={D.moreHorizontal} size={16} width={1.8} />
            </span>
          </div>

          <div className="aw-body">
            <div className="aw-board">
              <span className="aw-sk" style={{ width: "38%", height: 22 }} />
              <span className="aw-sk" style={{ width: "64%", height: 12 }} />
              <div className="aw-cards">
                {PANES.map((width) => (
                  <div className="aw-card" key={width}>
                    <span className="aw-sk" style={{ width: "100%", height: 64 }} />
                    <span className="aw-sk" style={{ width, height: 10 }} />
                    <span className="aw-sk" style={{ width: "52%", height: 10 }} />
                  </div>
                ))}
                {/* 第三块板：这句话的结果。它从零宽长出来，两块旧板自己让位
                    ——compare view 真的重排了一次，不是旁边贴了一张图。 */}
                <div className="aw-card aw-pane3">
                  <span className="aw-sk" style={{ width: "100%", height: 64 }} />
                  <span className="aw-sk" style={{ width: "70%", height: 10 }} />
                  <span className="aw-sk" style={{ width: "52%", height: 10 }} />
                </div>
              </div>
            </div>

            {/* 中场：菜单收起，画布压暗，一条绑着这只 App 的输入框在右下角
                升起来。它是一张窄而高的 composer，不是横贯画面的一条搜索栏
                ——横贯的那条会读成「这台机器的底栏」，而它其实是浮在 App
                上的一扇会话。 */}
            <div className="aw-veil" />
            <div className="aw-chat">
              <span className="aw-chip">
                <i>{DESIGN_APP.icon}</i>
                {DESIGN_APP_WINDOW_TITLE} · App source
              </span>
              {/* 打字用「裁掉溢出 + 定宽推进」，右边框就是光标：它自己跟着
                  字尾走，不必再摆一根竖线去跟文字对齐——对齐是会错的，
                  而边框不会。 */}
              <span className="aw-ask">
                <span className="aw-typed">{EDIT_ASK}</span>
              </span>
              <span className="aw-send">
                <Stroke d={D.arrowRight} size={14} width={2} />
              </span>
            </div>
          </div>

          <div className="aw-menu">
            <span className="aw-focus" />
            {APP_MENU.map((item, at) =>
              item.sep ? (
                // eslint-disable-next-line react/no-array-index-key
                <div className="aw-sep" key={`sep-${at}`} />
              ) : (
                <div className="aw-item" key={item.name}>
                  <Stroke d={glyph(item.icon)} size={14} width={1.8} />
                  {item.name}
                  {item.sub && (
                    <span className="tail">
                      <Stroke d={D.chevronRight} size={14} width={1.8} />
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {ended && <ReplayButton onClick={replay} />}
    </div>
  );
}
