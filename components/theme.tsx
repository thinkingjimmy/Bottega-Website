"use client";

/**
 * [INPUT]: Uses React effects/state and Stroke/D from ./icons
 * [OUTPUT]: Exports THEME_BOOT, ThemeRuntime, and ThemeToggle
 * [POS]: Owns the auto/light/dark theme mode and resolves it to the rendered <html data-theme>
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useState } from "react";
import { D, Stroke } from "./icons";

const KEY = "bottega-theme";
const QUERY = "(prefers-color-scheme: dark)";

type Theme = "light" | "dark";
type ThemeMode = "auto" | Theme;

function readMode(value?: string): ThemeMode {
  return value === "light" || value === "dark" ? value : "auto";
}

function systemTheme(query: MediaQueryList): Theme {
  return query.matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode, system: Theme) {
  const root = document.documentElement;
  root.dataset.themeMode = mode;
  root.dataset.theme = mode === "auto" ? system : mode;
}

function nextMode(mode: ThemeMode, system: Theme): ThemeMode {
  if (mode === "auto") return system === "dark" ? "light" : "dark";
  if (mode !== system) return system;
  return "auto";
}

/**
 * 首帧脚本：必须在 body 渲染前同步跑完，否则深色用户会先看到一帧白闪。
 * 写成字符串由 layout 内联注入，是这件事唯一能做对的时机——
 * 任何 React 生命周期都已经晚了一帧。
 */
export const THEME_BOOT = `(function(){var d=document.documentElement,m="auto";try{var s=localStorage.getItem(${JSON.stringify(
  KEY
)});if(s==="light"||s==="dark"||s==="auto")m=s;}catch(e){}var y=matchMedia(${JSON.stringify(
  QUERY
)}).matches?"dark":"light";d.dataset.themeMode=m;d.dataset.theme=m==="auto"?y:m;})();`;

/** Auto mode belongs to the whole site, including pages without the visible toggle. */
export function ThemeRuntime() {
  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const sync = () => {
      if (readMode(document.documentElement.dataset.themeMode) === "auto") {
        applyTheme("auto", systemTheme(query));
      }
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return null;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [system, setSystem] = useState<Theme>("light");

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const sync = () => setSystem(systemTheme(query));

    setMode(readMode(document.documentElement.dataset.themeMode));
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  function toggle() {
    const next = nextMode(mode, system);
    applyTheme(next, system);
    try {
      if (next === "auto") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      /* Storage is optional; the current document still receives the requested mode. */
    }
    setMode(next);
  }

  const next = nextMode(mode, system);
  const currentLabel = mode === "auto" ? `Auto (${system})` : mode;
  const label = `Theme: ${currentLabel}. Switch to ${next}.`;
  const icon = next === "light" ? D.sun : next === "dark" ? D.moon : D.monitor;

  return (
    <button
      type="button"
      className="scene-theme-toggle"
      data-mode={mode}
      data-next={next}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <Stroke d={icon} size={16} width={1.8} />
    </button>
  );
}
