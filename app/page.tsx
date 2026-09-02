import { AgentsSection } from "@/components/agents-section";
import { AppsSection } from "@/components/apps-section";
import { BaseSection } from "@/components/base-section";
import { CustomizableSection } from "@/components/customizable-section";
import { ForkBand } from "@/components/fork-band";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

/**
 * [INPUT]: 依赖 @/components 的 Hero/AgentsSection/AppsSection/
 *          CustomizableSection/BaseSection/ForkBand/SiteFooter
 * [OUTPUT]: 对外提供首页
 * [POS]: Bottega-Website 的首页。七块，顺着一个问题往下走：
 *        钉住的桌面（这是什么）→ Agents（谁来干）→ Apps（干出来的东西
 *        住在哪）→ Customize any app by chatting（那东西不是黑箱）→ Base（连数据的
 *        形状也归你）→ Fork 带（它是你的）→ 页脚。
 *        四节正文一节一换边：文左 → 图左 → 文左 → 图左
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */
export default function Home() {
  return (
    <>
      <Hero />
      {/* 正文自带底色，才能从钉住的桌面上干净地压过去 */}
      <div className="content">
        <AgentsSection />
        <AppsSection />
        <CustomizableSection />
        <BaseSection />
        <ForkBand />
        <SiteFooter />
      </div>
    </>
  );
}
