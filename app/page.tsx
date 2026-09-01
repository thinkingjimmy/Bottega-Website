import { AgentsSection } from "@/components/agents-section";
import { AppsSection } from "@/components/apps-section";
import { ForkBand } from "@/components/fork-band";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

/**
 * [INPUT]: 依赖 @/components 的 Hero/AgentsSection/AppsSection/ForkBand/SiteFooter
 * [OUTPUT]: 对外提供首页
 * [POS]: Bottega-Website 的首页。五块，顺着一个问题往下走：
 *        钉住的桌面（这是什么）→ Agents（谁来干）→ Apps（干出来的东西
 *        住在哪）→ Fork 带（它是你的）→ 页脚
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
        <ForkBand />
        <SiteFooter />
      </div>
    </>
  );
}
