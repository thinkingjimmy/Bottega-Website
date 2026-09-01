import type { NextConfig } from "next";

/**
 * [INPUT]: 依赖 next 的 NextConfig 类型
 * [OUTPUT]: 对外提供站点构建配置
 * [POS]: Bottega-Website 的构建入口配置；站点是纯静态的两页，
 *        故不开任何服务端能力，Vercel 上按静态站部署
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 两页都在构建期定稿，没有任何请求期数据，故整站预渲染。
  output: "export",
  images: { unoptimized: true },
  // 静态导出下目录式产物对任何静态托管都成立，不只 Vercel。
  trailingSlash: true,
};

export default nextConfig;
