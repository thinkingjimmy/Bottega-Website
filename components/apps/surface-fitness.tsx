/**
 * [INPUT]: 依赖 @/lib/body-map.json 的人体路径，依赖 @/lib/agents 的 MUSCLE_HEAT，
 *          依赖 ../icons 的 Stroke/D，依赖 ./surface-chrome 的 Sk
 * [OUTPUT]: 对外提供 FitnessSurface
 * [POS]: Fitness Log 那一台。它长得像一本训练手册而不是一张后台界面——
 *        衬线标题、3px 粗横规、双线图版，逐项取自
 *        resources/apps/Bottega-app-fitness-log/gui/styles.css，文案取自
 *        gui/scripts/i18n.js 的英文档。994 > 900，按真规则 main 展成两栏：
 *        左图版，右动作目录（目录是「不关键」的那一半，条目留骨架）
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import BODY from "@/lib/body-map.json";
import { MUSCLE_HEAT } from "@/lib/agents";
import { D, Stroke } from "../icons";
import { Sk } from "./surface-chrome";

type BodyView = { viewBox: string; outline: string; zones: { id: string; paths: string[] }[] };
const VIEWS = BODY as Record<"front" | "back", BodyView>;

/* ── 人体图 ────────────────────────────────────────────────────────
 * 路径与肌群 id 逐条取自 gui/data/body-map.json。
 * 一条子路径一个 <path>，与产品同构：把一只肌群的六条子路径并进一条 d，
 * nonzero 填充规则会让互相叠着的子路径彼此抵消——热区于是画成几道细红线，
 * 而不是一整块。形状对不对，不取决于坐标抄没抄对。
 * ────────────────────────────────────────────────────────── */
function Body({ view }: { view: "front" | "back" }) {
  const data = VIEWS[view];
  return (
    <svg className="fl-body" viewBox={data.viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="outline" d={data.outline} />
      {data.zones.flatMap((zone) => {
        const level = MUSCLE_HEAT[zone.id] ?? 0;
        return zone.paths.map((d, at) => (
          <path className="zone" data-level={level || undefined} d={d} key={`${zone.id}-${at}`} />
        ));
      })}
    </svg>
  );
}

/* 目录里那几组。分组标题与计数是真的，条目留骨架。
   三组而不是四组：机器 780 高，第四组只露得出半行——半行读起来像没加载完，
   而不是「下面还有」。列表要说的「还有更多」由最后一组被框裁掉那一下说，
   不由一个残缺的标题说。 */
const GROUPS = [
  { name: "Chest", count: 118, rows: ["72%", "54%", "63%"] },
  { name: "Upper legs", count: 214, rows: ["66%", "48%", "58%"] },
  { name: "Back", count: 176, rows: ["70%", "52%", "61%"] },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="fl-field">
      <span>{label}</span>
      <b>
        {value}
        <Stroke d={D.chevronDown} size={12} width={1.6} />
      </b>
    </label>
  );
}

export function FitnessSurface() {
  return (
    <div className="fl">
      <header className="fl-header">
        <div className="fl-rule" />
        <div className="fl-masthead">
          <div>
            <p className="fl-eyebrow">Fitness Log · Training record</p>
            <h3>Coverage, not coaching</h3>
            <p className="fl-sub">
              Counts completed sets only. Log and correct entries through Use chat or the data table.
            </p>
          </div>
          <div className="fl-actions">
            <div className="fl-rev">
              <span>Revision</span>
              <strong>41</strong>
            </div>
            <span className="fl-cta">Create training plan</span>
          </div>
        </div>
      </header>

      <main className="fl-main">
        <section>
          <div className="fl-sec">
            <div>
              <p className="fl-eyebrow">Coverage</p>
              <h4>Muscle heatmap</h4>
            </div>
            <div className="fl-controls">
              <Field label="Body" value="Male" />
              <Field label="Time range" value="Last 30 days" />
            </div>
          </div>
          {/* 图版：外一道 rule、内一道 line，中间夹 5px——解剖插图的做法。 */}
          <div className="fl-plate">
            <div className="fl-plate-inner">
              <div className="fl-maps">
                <figure>
                  <figcaption>Front</figcaption>
                  <Body view="front" />
                </figure>
                <figure>
                  <figcaption>Back</figcaption>
                  <Body view="back" />
                </figure>
              </div>
              <div className="fl-key">
                <span className="fl-key-title">Coverage intensity</span>
                <div className="fl-scale">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level}>
                      <i data-level={level || undefined} />
                      <span>{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="fl-sec">
            <div>
              <p className="fl-eyebrow">Offline catalog · 1324 exercises</p>
              <h4>Exercise catalog</h4>
            </div>
            <span className="fl-ghost">Clear filters</span>
          </div>
          <label className="fl-search">
            <span>Search</span>
            <b>Name, alias, muscle, or equipment</b>
          </label>
          <div className="fl-filters">
            <Field label="Body part" value="All" />
            <Field label="Muscle region" value="All" />
            <Field label="Equipment" value="All" />
          </div>
          <p className="fl-result">
            <span>1324 exercises</span>
            <span>Showing 1–24</span>
          </p>
          {GROUPS.map((group) => (
            <div className="fl-group" key={group.name}>
              <h5>
                {group.name}
                <b>{group.count}</b>
              </h5>
              <div className="fl-cards">
                {group.rows.map((width) => (
                  <div className="fl-card" key={width}>
                    <Sk w={width} h={13} />
                    <Sk w={64} h={11} />
                    <Sk w="46%" h={11} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
