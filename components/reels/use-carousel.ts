"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState
 * [OUTPUT]: 对外提供 useCarousel
 * [POS]: 两处轮播共用的换挡逻辑——Apps 一节的四只 App、Base 一节的四种看法。
 *        两处各写一份的话，「点过之后还回不回到跑马灯」这种决定迟早会分叉，
 *        而它必须是同一个决定
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";

/** 一格停留五秒。比四秒读得完一张表，比六秒不至于让人以为它卡住了。 */
const DWELL = 5000;

/* ── 自动走一格，点过即停 ──────────────────────────────────────────
 * 人一伸手，机器就该让位：点过之后不再回到跑马灯，也不设「过一会儿恢复」——
 * 那等于把观众刚做的选择判为暂时的。
 *
 * 关掉动效的人不该被跑马灯追着跑，所以 reduce 之下一格都不走，停在第一格。
 * 停下来那一格是「这一节要说的话」的开头，不是随机的一帧。
 *
 * `armed` 给需要「被看见才开始」的那一处用（见 use-play-when-seen）：
 * 一段在视口外空转的跑马灯，等人滚到时早已停在随机的一格上。
 * ────────────────────────────────────────────────────────── */
export function useCarousel(count: number, armed = true) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!armed) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    timer.current = setInterval(() => setActive((at) => (at + 1) % count), DWELL);
    return () => clearInterval(timer.current);
  }, [armed, count]);

  const pick = (index: number) => {
    clearInterval(timer.current);
    setAuto(false);
    setActive(index);
  };

  return { active, auto, pick };
}
