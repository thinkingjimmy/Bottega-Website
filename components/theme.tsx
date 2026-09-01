"use client";

/**
 * [INPUT]: 依赖 react 的 useState/useEffect，依赖 ./icons 的 Stroke 与 D
 * [OUTPUT]: 对外提供 ThemeToggle 组件与 THEME_BOOT 内联脚本字符串
 * [POS]: Bottega-Website 的主题开关。真相源是 <html data-theme>，
 *        React 只负责改它——不做第二份状态，否则两份迟早对不上
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useState } from "react";
import { D, Stroke } from "./icons";

const KEY = "bottega-theme";

/**
 * 首帧脚本：必须在 body 渲染前同步跑完，否则深色用户会先看到一帧白闪。
 * 写成字符串由 layout 内联注入，是这件事唯一能做对的时机——
 * 任何 React 生命周期都已经晚了一帧。
 */
export const THEME_BOOT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  KEY
)});if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}})();`;

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* 挂载后读回 <html> 上已经由首帧脚本定好的值，而不是自己再判一次。
     两处各判一次就会有两个答案，而真相只能有一个。 */
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* 隐私模式下写不进去也不影响本次会话，静默即可 */
    }
    setTheme(next);
  }

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label="Switch theme">
      <Stroke d={theme === "dark" ? D.sun : D.moon} size={18} width={1.8} />
    </button>
  );
}
