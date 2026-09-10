/**
 * [INPUT]: Uses Next ImageResponse, local brand assets, and the shared social image dimensions
 * [OUTPUT]: Exports a build-time PNG response for the default social preview
 * [POS]: Static social image route with no browser JavaScript or remote image/font dependencies
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/seo/site";

export const dynamic = "force-static";

export async function GET() {
  const bytes = await readFile(join(process.cwd(), "public", "wordmark.png"));
  const wordmark = `data:image/png;base64,${bytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        width: "100%", height: "100%", padding: "64px 72px", background: "#f8f5f0", color: "#252521",
      }}>
        <div style={{ display: "flex", alignItems: "center", height: 112 }}>
          <img src={wordmark} width={360} height={98} alt="Bottega" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 60, letterSpacing: "-2px" }}>
          <div style={{ display: "flex" }}>Codex + Claude Code</div>
          <div style={{ display: "flex" }}>Kimi Code + OpenCode</div>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", borderTop: "1px solid #d9d4ca",
          paddingTop: 24, color: "#6c6a62", fontSize: 23,
        }}>
          <span>macOS / Windows / Linux</span>
          <span>{new URL(SITE_URL).hostname}</span>
        </div>
      </div>
    ),
    { width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height }
  );
}
