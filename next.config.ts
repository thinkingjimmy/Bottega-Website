import type { NextConfig } from "next";

/**
 * [INPUT]: Uses the NextConfig type from Next.js
 * [OUTPUT]: Exports the complete website build configuration
 * [POS]: Bottega-Website build entry; all six routes are static, so deployment requires no request-time server
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Every route is finalized at build time, so the entire site is pre-rendered.
  output: "export",
  images: { unoptimized: true },
  // Directory-style output works on any static host, not only Vercel.
  trailingSlash: true,
};

export default nextConfig;
