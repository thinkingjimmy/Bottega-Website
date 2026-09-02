"use client";

/**
 * [INPUT]: Uses React effects/refs; trigger and panel markup arrive as server-rendered children
 * [OUTPUT]: Exports Disclosure, a persistent-DOM details shell with outside-click and Escape dismissal
 * [POS]: Shared client behavior for the header feature menu and footer language selector
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useRef, type ReactNode } from "react";

export function Disclosure({ children, className }: { children: ReactNode; className: string }) {
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
