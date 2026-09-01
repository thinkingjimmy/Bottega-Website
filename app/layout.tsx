import type { Metadata } from "next";

import "./globals.css";
import { THEME_BOOT } from "@/components/theme";

/**
 * [INPUT]: 依赖 next 的 Metadata，依赖 ./globals.css，依赖 @/components/theme 的 THEME_BOOT
 * [OUTPUT]: 对外提供 metadata 与 RootLayout
 * [POS]: Bottega-Website 的根布局。只做三件事：注入样式、在首帧前定好主题、
 *        挂 metadata；页面结构一律归各自的 page
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

const SITE = "https://bottega.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Bottega — the workshop that builds itself",
    template: "%s · Bottega",
  },
  description:
    "One workshop for Codex, Claude Code, Kimi Code and OpenCode — local-first, on the subscriptions you already pay for.",
  openGraph: {
    title: "Bottega — the workshop that builds itself",
    description:
      "One workshop for Codex, Claude Code, Kimi Code and OpenCode — local-first, on the subscriptions you already pay for.",
    url: SITE,
    siteName: "Bottega",
    type: "website",
  },
  icons: { icon: "/mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* 必须在 body 渲染前同步跑完，否则深色用户会先吃一帧白闪。
            任何 React 生命周期都已经晚了一帧。 */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
