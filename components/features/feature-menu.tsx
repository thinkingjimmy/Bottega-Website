"use client";

/**
 * [INPUT]: Uses React effects/refs only; the menu's content arrives as children
 * [OUTPUT]: Exports FeatureMenu — the <details> shell that owns open and close
 * [POS]: The site header's only client boundary; the catalog it lists stays on the server
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 只包行为，不包内容。
 *
 * 把 "use client" 写在 site-header 上是更短的一行，代价是 catalog.ts 那 8.8KB
 * ——四个详情页的全部正文——会跟着进每一页的客户端包，只为了换一个关菜单的
 * 监听器。内容当 children 穿过去，它就仍然是服务端渲染的。
 *
 * open 是唯一真相源。原来 CSS 里 :hover 与 :focus-within 各自也能把面板打开，
 * 于是「点触发器关掉它」这件事在鼠标还停在上面时永远不成立——两个开关并联，
 * 谁也关不掉谁。菜单是点开的，就该只由点决定开合。
 */
export function FeatureMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;

    const close = () => {
      menu.open = false;
    };

    /* pointerdown 而不是 click：按下的那一刻就该收起，否则松手前面板还悬在
       用户要点的东西上面。它同时覆盖触屏，不必再分一路。 */
    const onPointerDown = (event: PointerEvent) => {
      if (!menu.open) return;
      if (event.target instanceof Node && menu.contains(event.target)) return;
      close();
    };

    /* 面板内的链接走客户端路由，header 不重挂载——不显式关，它会跟着到下一页。 */
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.open) return;
      close();
      menu.querySelector("summary")?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    menu.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      menu.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details className="nav-menu" ref={ref}>
      {children}
    </details>
  );
}
