# app/

> L2 | Parent: [project README](../README.md)

Member list

`globals.css`: 全站样式的唯一入口，只剩一份十五行的 `@import` 清单——那份清单的顺序就是级联本身，不是审美排列。

`styles/`: 拆开后的全站样式（7 项：tokens / base / hero/ / apps/ / reel / bands / motion）；见其 README。

`layout.tsx`: Provides root metadata, the pre-hydration theme bootstrap, and global auto-theme runtime.

`page.tsx`: Composes the home page from the hero, product sections, fork band, and footer.

`changelog/`: Owns the product milestone route and its build-time content rendering.

[PROTOCOL]: 变更时更新此头部，然后检查 README.md
