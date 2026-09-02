/**
 * [INPUT]: 依赖 ./apps/apps-stage 的 AppsStage
 * [OUTPUT]: 对外提供 AppsSection 组件
 * [POS]: Bottega-Website 讲 App 系统那一节。左图右文，与上一节的文左图右
 *        交替。上一节说的是「谁来干」，这一节说的是「干出来的东西住在哪」
 *        ——左边那台机器一次演一只 App 的真实表面，右边那份目录既是名单
 *        也是它的换挡杆。整节的主体在 apps/，这里只剩一层 section 外壳
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { AppsStage } from "./apps/apps-stage";
import { Reveal } from "./reveal";

export function AppsSection() {
  return (
    <section className="section" id="apps">
      <Reveal>
        <div className="wrap">
          <AppsStage />
        </div>
      </Reveal>
    </section>
  );
}
