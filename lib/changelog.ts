/**
 * [INPUT]: 依赖 node:fs/node:path 读取 content/changelog.md
 * [OUTPUT]: 对外提供 Entry 类型、readEntries()、renderInline()
 * [POS]: Bottega-Website 的 changelog 数据层。真相源是 Bottega 仓库的
 *        docs/changelog/README.md，此处只读构建期快照——站点必须能独立
 *        clone、独立构建，跨仓库读文件在 Vercel 上根本不存在那个目录
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

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
export function readEntries(): Entry[] {
  const raw = readFileSync(join(process.cwd(), "content", "changelog.md"), "utf8");
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

/** `**粗体**` 与 `` `代码` `` 两种行内标记，其余原样输出。 */
export function renderInline(text: string): { kind: "text" | "strong" | "code"; value: string }[] {
  const out: { kind: "text" | "strong" | "code"; value: string }[] = [];
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push({ kind: "text", value: text.slice(last, match.index) });
    if (match[1] !== undefined) out.push({ kind: "strong", value: match[1] });
    else out.push({ kind: "code", value: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ kind: "text", value: text.slice(last) });
  return out;
}
