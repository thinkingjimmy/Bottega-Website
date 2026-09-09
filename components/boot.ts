/**
 * [INPUT]: Has no dependencies
 * [OUTPUT]: Exports THEME_KEY, THEME_QUERY, THEME_BOOT, and PLATFORM_BOOT
 * [POS]: The pre-paint contract shared by the server document root and the client theme runtime
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

/* ── 首帧脚本不能住在 "use client" 模块里 ──────────────────────
 * 这两支脚本必须在 body 渲染前同步跑完，于是它们是被服务端内联进 <head>
 * 的字符串。而服务端从 "use client" 模块取到的不是那个字符串，是 React
 * 为客户端引用生成的一支「你不该在服务端调用我」的桩函数——把它的源码
 * 印进 <script> 里，整支脚本当场 SyntaxError。
 *
 * 生产构建把真串烘焙了回去，所以这件事只在 next dev 里发作：开发时深色
 * 用户每次刷新都白闪一下，控制台每次多一条未捕获错误，而站点看起来
 * 一切正常。放在这个不带 "use client" 的模块里，两侧各自拿到的都是它本身。
 * ────────────────────────────────────────────────────────── */

export const THEME_KEY = "bottega-theme";
export const THEME_QUERY = "(prefers-color-scheme: dark)";

/**
 * 首帧脚本：必须在 body 渲染前同步跑完，否则深色用户会先看到一帧白闪。
 * 写成字符串由 layout 内联注入，是这件事唯一能做对的时机——
 * 任何 React 生命周期都已经晚了一帧。
 */
export const THEME_BOOT = `(function(){var d=document.documentElement,m="auto";try{var s=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)});if(s==="light"||s==="dark"||s==="auto")m=s;}catch(e){}var y=matchMedia(${JSON.stringify(
  THEME_QUERY
)}).matches?"dark":"light";d.dataset.themeMode=m;d.dataset.theme=m==="auto"?y:m;})();`;

/**
 * 同一个理由：下载按钮上写的是哪个平台，是访客打开页面时就该成立的事实，
 * 不是一次 effect 之后的更正。Windows 用户先读到「Download for macOS」
 * 再看它改口，比慢半拍更糟——那半拍里站点说了句假话。
 *
 * 三条链接都在 DOM 里，由 CSS 认领其中一条（与 .img-light/.img-dark 同一套
 * 写法）。于是这支脚本不跑也还有一颗能按的按钮：默认 mac，正是这个产品
 * 当下的主力平台。Android 的 UA 里也有 Linux，得先把它让开。
 */
export const PLATFORM_BOOT = `(function(){var u=navigator.userAgent||"",p="mac";if(/Windows|Win64|Win32/i.test(u))p="windows";else if(/Linux/i.test(u)&&!/Android/i.test(u))p="linux";document.documentElement.dataset.platform=p;})();`;
