import { AgentsSection } from "@/components/agents-section";
import { ForkBand } from "@/components/fork-band";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

/**
 * [INPUT]: 依赖 @/components 的 Hero/AgentsSection/ForkBand/SiteFooter
 * [OUTPUT]: 对外提供首页
 * [POS]: Bottega-Website 的首页。0.1 只有四块：钉住的桌面、一节 Agents、
 *        一条 Fork 带、页脚。少即是能说清
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */
export default function Home() {
  return (
    <>
      <Hero />
      {/* 正文自带底色，才能从钉住的桌面上干净地压过去 */}
      <div className="content">
        <AgentsSection />
        <ForkBand />
        <SiteFooter />
      </div>
    </>
  );
}
