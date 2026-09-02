"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState
 * [OUTPUT]: 对外提供 usePlayWhenSeen
 * [POS]: 三支 reel 共用的起播闸，也是一遍的生命周期本身：什么时候开始、
 *        什么时候算演完、怎么再来一遍。抽出来不是为了省行数，是因为
 *        「什么时候开始」这件事三支的答案必须一样——各写一份，迟早有一支
 *        被改成「一加载就转」，而那正是这段代码要防的那个 bug
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";

/* ── 首帧是观众看见的第一帧，不是时间轴的 0% ──────────────────────
 * 纯 CSS 的 `infinite` 会在页面一加载就开始转：等人滚到这儿，动作早已
 * 在视口外空转了不知多少圈——于是「这一节第一眼说什么」实际上交给了
 * 随机数。把 0% 排成静息态只解决了时间轴的起点，解决不了观众的。
 *
 * 十来行脚本把首帧赎回来，是笔划算的买卖：动作在被看见的那一刻才走，
 * 走完一次就停，不再回头。第一次相交之后 observer 自己退场——它的差事
 * 只有一件，办完就不该还在场上。
 *
 * 脚本没跑（SSR、hydrate 之前、JS 挂了）时留下的是静息态那一格，
 * 与 keyframes 的 0% 逐位相同：降级不是退到一张坏图，是退到首帧。
 *
 * 相交之后还要再等一拍：这一节自己正在淡进来（见 components/reveal.tsx），
 * 两件事叠在一起，观众两件都看不清。
 * ────────────────────────────────────────────────────────── */

/** 比这一节的进场（0.7s）多留 20ms。两件事同时发生，两件都看不清。 */
const AFTER_REVEAL = 720;

/* ── 一遍演完，再来一遍 ──────────────────────────────────────────
 * CSS 动画没有「回到 0%」这个动作，只有「重新开始」这个事实：run 当 key 用，
 * 整台机器重新挂一次，所有 keyframes 一起从头走——比逐条 cancel/play 少一份
 * 需要维护的名单，而那份名单每加一条动画就会过期一次。
 *
 * 「演完了」不问时长，问 DOM：一镜里几支动画同时收尾（它们都跑满 --dur），
 * 谁的 animationend 先冒泡上来算谁。把 9s/11s 抄进脚本，就等于把同一个事实
 * 写了两遍，而两遍迟早会不一样。动效被关掉时压根没有 animationend——
 * 于是重播钮自己不出现，一颗对着静止画面的重播钮本就无话可说。
 * ────────────────────────────────────────────────────────── */

export function usePlayWhenSeen() {
  const frame = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [run, setRun] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    /* 没有 IntersectionObserver 就直接开演：动作停在首帧不算坏图，
       但一台永远不动的机器会被读成「坏了」。 */
    if (!("IntersectionObserver" in window)) {
      setPlay(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => setPlay(true), AFTER_REVEAL);
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return {
    frame,
    play,
    run,
    ended,
    replay: () => {
      setEnded(false);
      setRun((at) => at + 1);
    },
    /* 挂在画框上收全部冒泡：重播钮自己那下淡入也会撞进来，而把 true
       再置一次 true 什么都不会发生——这比列一张「哪些动画算数」的白名单诚实。 */
    markEnded: () => setEnded(true),
  };
}
