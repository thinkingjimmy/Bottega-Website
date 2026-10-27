/**
 * [INPUT]: Uses node:fs/node:path and one locale-specific content/changelog.*.md snapshot
 * [OUTPUT]: Exports Entry, readEntries(locale), and renderInline() for milestone lists, release-context paragraphs, and safe inline formatting
 * [POS]: Build-time Changelog data layer; every locale reads an independent static snapshot
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "./i18n/locale";

export type Entry = {
  date: string;
  title: string;
  items: string[];
  paragraphs: string[];
};

/** Keeps milestone lists unchanged and collects plain release context without a Markdown dependency. */
export function readEntries(locale: Locale): Entry[] {
  const raw = readFileSync(join(process.cwd(), "content", `changelog.${locale}.md`), "utf8");
  const entries: Entry[] = [];
  let current: Entry | null = null;
  let paragraph: string[] = [];
  let fence: string | null = null;
  const flushParagraph = () => {
    if (current && paragraph.length) current.paragraphs.push(paragraph.join(" "));
    paragraph = [];
  };

  for (const line of raw.split("\n")) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !line.slice(marker[0].length).trim()) fence = null;
      continue;
    }
    if (marker) { flushParagraph(); fence = marker[1]; continue; }
    const head = line.match(/^##\s+(.+)$/);
    if (head) {
      flushParagraph();
      const [date, ...rest] = head[1].split(/\s+[—-]\s+/);
      current = { date: date.trim(), title: rest.join(" — ").trim(), items: [], paragraphs: [] };
      entries.push(current);
      continue;
    }
    if (/^#{1,6}\s+/.test(line)) { flushParagraph(); continue; }
    const item = line.match(/^[-*]\s+(.+)$/);
    if (item) { flushParagraph(); if (current) current.items.push(item[1].trim()); }
    else if (!line.trim()) flushParagraph();
    else if (current) paragraph.push(line.trim());
  }
  flushParagraph();
  return entries.filter((e) => e.items.length > 0);
}

/**
 * `**粗体**` 与 `` `代码` `` 两种行内标记，其余原样输出。
 *
 * 第三条是链接，但它只取文字、丢掉地址——上游那份 Changelog 里的链接指的
 * 是 docs 仓里的相对路径（`../getting-started/README.md`），这个网站上没有
 * 那个地方。渲染成 <a> 等于当场造一个死链；原样输出则把整串 markdown 漏到
 * 页面上（v0.1.0 那条就是这么漏的）。留文字是唯一一个两头都不撒谎的选择。
 */
export function renderInline(text: string): { kind: "text" | "strong" | "code"; value: string }[] {
  const out: { kind: "text" | "strong" | "code"; value: string }[] = [];
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\([^)]*\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push({ kind: "text", value: text.slice(last, match.index) });
    if (match[1] !== undefined) out.push({ kind: "strong", value: match[1] });
    else if (match[2] !== undefined) out.push({ kind: "code", value: match[2] });
    else out.push({ kind: "text", value: match[3] });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ kind: "text", value: text.slice(last) });
  return out;
}
