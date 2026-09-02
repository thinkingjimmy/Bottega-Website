import type { NextConfig } from "next";

/**
 * [INPUT]: Uses the NextConfig type from Next.js
 * [OUTPUT]: Exports the complete website build configuration
 * [POS]: Bottega-Website build entry; all thirty canonical and six Auto routes are fully static
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
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
