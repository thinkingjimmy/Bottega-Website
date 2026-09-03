"use client";

/**
 * [INPUT]: Uses current locale/copy, the shared language-preference hook, locale marks/paths, and Disclosure
 * [OUTPUT]: Exports SceneLanguage, the hero menu-bar input-source control
 * [POS]: Menu-bar skin over the shared preference behavior; it sits beside ThemeToggle in the Hero scene
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "@/lib/i18n";
import {
  LANGUAGE_OPTIONS,
  languageMark,
  localizedPath,
  type Locale,
} from "@/lib/i18n/locale";
import { useLanguagePreference } from "@/lib/i18n/use-language-preference";
import { Disclosure } from "./disclosure";
import { D, Stroke } from "./icons";

/* Hero 只演首页那一屏，所以这里的逻辑路径就是根。把它做成 prop 只会
   多一条永远传同一个值的线，反倒让「这是哪一页」失去唯一答案。 */
const LOGICAL_PATH = "/";

/**
 * 菜单栏上的语言不是一个开关，是一格输入源——真 macOS 上它就长这样：
 * 一个字，点开是一列可选项，选中那行左边打勾。借用这个每天都在用的
 * 隐喻，语言切换不必再自己发明一套说法；Auto 与主题共用同一颗绿点。
 */
export function SceneLanguage({
  locale,
  copy,
}: {
  locale: Locale;
  copy: SiteCatalog["language"];
}) {
  const { preference, chooseOnClick } = useLanguagePreference(locale);

  return (
    <Disclosure className="scene-input-menu">
      <summary
        className="scene-input-trigger"
        data-mode={preference}
        aria-label={copy.label}
        title={copy.label}
      >
        <span aria-hidden="true">{languageMark(locale)}</span>
      </summary>
      <div className="scene-input-panel">
        <ul>
          {LANGUAGE_OPTIONS.map((option) => {
            const selected = preference === option.value;
            const href = option.value === "auto"
              ? LOGICAL_PATH
              : localizedPath(option.value, LOGICAL_PATH);
            return (
              <li key={option.value}>
                <a
                  href={href}
                  hrefLang={option.value === "auto" ? undefined : option.value}
                  aria-current={selected ? "true" : undefined}
                  onClick={chooseOnClick(option.value)}
                >
                  <span className="scene-input-check" aria-hidden="true">
                    {selected ? <Stroke d={D.check} size={14} width={2.2} /> : null}
                  </span>
                  <span className="scene-input-mark" aria-hidden="true">
                    {languageMark(option.value)}
                  </span>
                  <span>{option.value === "auto" ? copy.autoDetect : option.label}</span>
                  {selected ? <span className="sr-only">{copy.selected}</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Disclosure>
  );
}
