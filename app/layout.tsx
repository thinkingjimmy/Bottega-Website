import type { Metadata } from "next";

import "./globals.css";
import { THEME_BOOT, ThemeRuntime } from "@/components/theme";

/**
 * [INPUT]: Uses Next metadata, ./globals.css, and the theme boot/runtime from @/components/theme
 * [OUTPUT]: Exports metadata and RootLayout
 * [POS]: The site root that resolves auto theme before first paint and tracks system changes
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
    <html lang="en" data-theme="light" data-theme-mode="auto" suppressHydrationWarning>
      <head>
        {/* 必须在 body 渲染前同步跑完，否则深色用户会先吃一帧白闪。
            任何 React 生命周期都已经晚了一帧。 */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <ThemeRuntime />
        {children}
      </body>
    </html>
  );
}
