"use client";

/**
 * [INPUT]: Uses React effects/refs; trigger and panel markup arrive as server-rendered children
 * [OUTPUT]: Exports Disclosure, a persistent-DOM details shell with outside-click, Escape, and opt-in hover opening
 * [POS]: Shared client behavior for the header feature menu, the download platform menu, and the footer language selector
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useRef, type ReactNode } from "react";

/* 指针离开与重新进入之间要留一点余地：面板与触发器之间有 8px 的缝，
   穿过它的那一两帧里指针谁也不在，没有这段延迟菜单就会在缝上闪一下。 */
const LEAVE_GRACE = 140;

export function Disclosure({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className: string;
  /**
   * 让指针悬停也能打开它。悬停区域是最近的 [data-hover-group] 祖先——
   * 拆分按钮把主操作放在 details 之外，于是「什么算悬停在这颗按钮上」
   * 必须由那个分组自己声明，而不是由 details 的盒子推断。
   *
   * 开合始终只有 open 一个开关。曾经 :hover 与 open 并联，于是「点触发器
   * 把它关掉」在鼠标还停在上面时永远不成立：open 被取消了，hover 还举着它。
   * 这里悬停是去写 open，不是去绕开它——点掉之后指针原地不动，
   * pointerenter 不会再发一次，菜单就老老实实关着。
   */
  hover?: boolean;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const disclosure = ref.current;
    if (!disclosure) return;

    const close = () => {
      disclosure.open = false;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!disclosure.open || disclosure.contains(event.target as Node)) return;
      close();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !disclosure.open) return;
      close();
      disclosure.querySelector("summary")?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    disclosure.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      disclosure.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const disclosure = ref.current;
    if (!hover || !disclosure) return;
    /* 触屏上 pointerenter 与点击同时发生，两者一起写 open 就等于没写。
       悬停是鼠标的语汇，只在真有鼠标的地方成立。 */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const region = disclosure.closest("[data-hover-group]") ?? disclosure;
    let grace = 0;
    const enter = () => {
      window.clearTimeout(grace);
      disclosure.open = true;
    };
    const leave = () => {
      grace = window.setTimeout(() => {
        disclosure.open = false;
      }, LEAVE_GRACE);
    };

    region.addEventListener("pointerenter", enter);
    region.addEventListener("pointerleave", leave);
    return () => {
      window.clearTimeout(grace);
      region.removeEventListener("pointerenter", enter);
      region.removeEventListener("pointerleave", leave);
    };
  }, [hover]);

  return (
    <details
      className={className}
      ref={ref}
      suppressHydrationWarning
      onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest("a") && ref.current) {
          ref.current.open = false;
        }
      }}
    >
      {children}
    </details>
  );
}
