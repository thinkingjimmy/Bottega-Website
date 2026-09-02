"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState
 * [OUTPUT]: 对外提供 Reveal 组件与 useReveal
 * [POS]: 正文每一节的进场。站点原来立过一条规矩——「不做滚动驱动的显隐，
 *        那类写法一旦没触发，元素就永久停在 opacity:0」。这一支不违反它，
 *        因为**藏是脚本藏的**：服务端渲染出来的是完好的一节，脚本没跑、
 *        observer 没触发、JS 挂了，看到的都是它本来的样子。
 *        只有确认「这一节还在视口下方」时，脚本才把它先藏起来再放出来
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";

/* ── 已经看得见的东西不做「出现」 ──────────────────────────────────
 * 首屏那一节在页面加载时就在视口里。给它做进场，观众看到的是它先消失
 * 一下再回来——那不是进场，那是闪。所以挂载时先量一眼：已经越过这条线的
 * 直接判为「已出现」，只有还在下面的才藏起来等。
 * 0.85 而不是 1：贴着视口下缘那一点点算「已经看见了」，
 * 它一露头就抖一下，比不动更差。
 * ────────────────────────────────────────────────────────── */
export function useReveal() {
  const node = useRef<HTMLDivElement>(null);
  /** idle 是服务端与首帧的状态——它渲染成「可见」，于是降级即完好。 */
  const [state, setState] = useState<"idle" | "waiting" | "shown">("idle");

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    /* 没有 IntersectionObserver 就不藏。宁可不做进场，也不能把一整节
       押在一个可能不存在的 API 上——藏起来容易，放出来才是要还的债。 */
    if (!("IntersectionObserver" in window)) {
      setState("shown");
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setState("shown");
      return;
    }
    setState("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { node, shown: state !== "waiting" };
}

/** 一节的进场外壳。`data-reveal` 只有两种取值，没有第三种「半开」。 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const { node, shown } = useReveal();
  return (
    <div className="reveal" data-reveal={shown ? "in" : "out"} ref={node}>
      {children}
    </div>
  );
}
