/**
 * [INPUT]: 依赖 ./reels/app-menu-reel 的 AppMenuReel
 * [OUTPUT]: 对外提供 CustomizableSection 组件
 * [POS]: Bottega-Website 讲「App 自己也能改」那一节。文左图右，与上一节的
 *        图左文右交替。上一节说的是「干出来的东西住在哪」，这一节说的是
 *        「那东西不是黑箱」——而产品里「Edit App」打开的是一个绑定这只 App
 *        的 chat，于是这一节把整页收了口：改 App 用的还是 Agents 一节里
 *        那几家 agent
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { AppMenuReel } from "./reels/app-menu-reel";
import { Reveal } from "./reveal";

export function CustomizableSection() {
  return (
    <section className="section" id="customizable">
      <Reveal>
        <div className="wrap split">
          <div className="copy">
            <h2>Fully customizable.</h2>
            <p>
              The four Apps that ship with Bottega are editable source, not black boxes. Open
              the menu on any of them and Edit App is right there.
            </p>
            <p>
              It does not open a code editor. It opens a chat bound to that App&apos;s own
              source — so you change an App the same way you got it: by asking one of the
              Agents you already pay for.
            </p>
          </div>

          <AppMenuReel />
        </div>
      </Reveal>
    </section>
  );
}
