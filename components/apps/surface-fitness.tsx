/**
 * [INPUT]: Uses body-map geometry, localized DemoData, product icons, and surface skeletons
 * [OUTPUT]: Exports the localized FitnessSurface product demonstration
 * [POS]: Fitness Log surface whose anatomical facts stay fixed while every label is translated
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import BODY from "@/lib/body-map.json";
import type { DemoData } from "@/lib/agents";
import { D, Stroke } from "../icons";
import { Sk } from "./surface-chrome";

type BodyView = { viewBox: string; outline: string; zones: { id: string; paths: string[] }[] };
const VIEWS = BODY as Record<"front" | "back", BodyView>;

/* ── 人体图 ────────────────────────────────────────────────────────
 * 路径与肌群 id 逐条取自 gui/data/body-map.json。
 * 一条子路径一个 <path>，与产品同构：把一只肌群的六条子路径并进一条 d，
 * nonzero 填充规则会让互相叠着的子路径彼此抵消——热区于是画成几道细红线，
 * 而不是一整块。形状对不对，不取决于坐标抄没抄对。
 *
 * 坐标一位不改地抄。曾把它们四舍五入到一位小数省 6KB，代价是弧形指令
 * 里那两个单字符 flag 被一起改写——`A38 38 0 0 1 x y` 揉成了 `a.4 0 1.1.1`，
 * 浏览器静默丢掉整条子路径。省下的字节，换的是一批画错却不报错的热区。
 * ────────────────────────────────────────────────────────── */
function Body({ view, heat }: { view: "front" | "back"; heat: DemoData["muscleHeat"] }) {
  const data = VIEWS[view];
  return (
    <svg className="fl-body" viewBox={data.viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="outline" d={data.outline} />
      {data.zones.flatMap((zone) => {
        const level = heat[zone.id] ?? 0;
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
  { count: 118, rows: ["72%", "54%", "63%"] },
  { count: 214, rows: ["66%", "48%", "58%"] },
  { count: 176, rows: ["70%", "52%", "61%"] },
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

export function FitnessSurface({ demo }: { demo: DemoData }) {
  const copy = demo.copy.fitness;
  return (
    <div className="fl">
      <header className="fl-header">
        <div className="fl-rule" />
        <div className="fl-masthead">
          <div>
            <p className="fl-eyebrow">{copy.trainingRecord}</p>
            <h3>{copy.title}</h3>
            <p className="fl-sub">{copy.subtitle}</p>
          </div>
          <div className="fl-actions">
            <div className="fl-rev">
              <span>{copy.revision}</span>
              <strong>41</strong>
            </div>
            <span className="fl-cta">{copy.createPlan}</span>
          </div>
        </div>
      </header>

      <main className="fl-main">
        <section>
          <div className="fl-sec">
            <div>
              <p className="fl-eyebrow">{copy.coverage}</p>
              <h4>{copy.heatmap}</h4>
            </div>
            <div className="fl-controls">
              <Field label={copy.body} value={copy.male} />
              <Field label={copy.timeRange} value={copy.last30Days} />
            </div>
          </div>
          {/* 图版：外一道 rule、内一道 line，中间夹 5px——解剖插图的做法。 */}
          <div className="fl-plate">
            <div className="fl-plate-inner">
              <div className="fl-maps">
                <figure>
                  <figcaption>{copy.front}</figcaption>
                  <Body view="front" heat={demo.muscleHeat} />
                </figure>
                <figure>
                  <figcaption>{copy.back}</figcaption>
                  <Body view="back" heat={demo.muscleHeat} />
                </figure>
              </div>
              <div className="fl-key">
                <span className="fl-key-title">{copy.intensity}</span>
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
              <p className="fl-eyebrow">{copy.offlineCatalog}</p>
              <h4>{copy.exerciseCatalog}</h4>
            </div>
            <span className="fl-ghost">{copy.clearFilters}</span>
          </div>
          <label className="fl-search">
            <span>{copy.search}</span>
            <b>{copy.searchHint}</b>
          </label>
          <div className="fl-filters">
            <Field label={copy.bodyPart} value={copy.all} />
            <Field label={copy.muscleRegion} value={copy.all} />
            <Field label={copy.equipment} value={copy.all} />
          </div>
          <p className="fl-result">
            <span>{copy.exercises}</span>
            <span>{copy.showing}</span>
          </p>
          {GROUPS.map((group, index) => (
            <div className="fl-group" key={copy.groups[index]}>
              <h5>
                {copy.groups[index]}
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
