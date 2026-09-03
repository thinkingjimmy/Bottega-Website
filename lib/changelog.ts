/**
 * [INPUT]: Uses node:fs/node:path and one locale-specific content/changelog.*.md snapshot
 * [OUTPUT]: Exports Entry, readEntries(locale), and renderInline() for bold, inline code, and link labels
 * [POS]: Build-time Changelog data layer; every locale reads an independent static snapshot
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "./i18n/locale";

export type Entry = {
  date: string;
  title: string;
  items: string[];
};

/**
 * 只认两种行：`## 日期 — 标题` 开一节，`- ` 开一条。
 * 不引 markdown 库是有意的：这份文件的格式由我们自己写、自己约束，
 * 为三种语法装一个解析器，等于把一个已知的小问题换成一个未知的大依赖。
 */
export function readEntries(locale: Locale): Entry[] {
  const raw = readFileSync(join(process.cwd(), "content", `changelog.${locale}.md`), "utf8");
  const entries: Entry[] = [];
  let current: Entry | null = null;

  for (const line of raw.split("\n")) {
    const head = line.match(/^##\s+(.+)$/);
    if (head) {
      /* 破折号有 em dash 与 hyphen 两种写法，两种都收——
         上游改一个字符不该让整页变空。 */
      const [date, ...rest] = head[1].split(/\s+[—-]\s+/);
      current = { date: date.trim(), title: rest.join(" — ").trim(), items: [] };
      entries.push(current);
      continue;
    }
    const item = line.match(/^[-*]\s+(.+)$/);
    if (item && current) current.items.push(item[1].trim());
  }

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
