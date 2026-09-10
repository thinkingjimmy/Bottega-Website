/**
 * [INPUT]: Uses BACKENDS/ANNOUNCED product facts, localized subscription copy, Reveal, icons, and FeatureLink
 * [OUTPUT]: Exports the localized SubscriptionSection component
 * [POS]: Home feature answering who pays for the tokens; sits between the Agents reel and Apps
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { ANNOUNCED, BACKENDS } from "@/lib/agents";
import { FeatureLink } from "./features/feature-link";
import { AgentLogo, AnnouncedLogo } from "./icons";
import { Reveal } from "./reveal";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

export function SubscriptionSection({
  copy,
  readMore,
  locale,
}: {
  copy: SiteCatalog["home"]["subscription"];
  readMore: string;
  locale: Locale;
}) {
  return (
    <section className="section section--feature" id="subscription">
      <Reveal>
        <div className="wrap split split-figure-first">
          {/* Each CLI is named by the command that signs it in — the same string the
              desktop app prints when a backend is not signed in. The command is the
              whole argument: you run it, against your own account, in your terminal. */}
          <div className="figure-frame">
            <ul className="roster">
              {BACKENDS.map((backend) => (
                <li className="roster-cell" key={backend.id}>
                  <AgentLogo backend={backend.id} size={26} />
                  <div className="roster-label">
                    <span className="roster-name">{backend.cli}</span>
                    <span className="mono roster-note">{backend.login}</span>
                  </div>
                </li>
              ))}

              {/* The open end of the list. These three carry no command because they have
                  none yet, so the cell states what it is instead. The names are read but
                  not drawn: three marks say "more of these" faster than three more names. */}
              <li className="roster-cell roster-cell--open">
                <span className="roster-marks">
                  {ANNOUNCED.map((agent) => (
                    <span key={agent.id}>
                      <AnnouncedLogo id={agent.id} />
                      <span className="sr-only">{agent.label}</span>
                    </span>
                  ))}
                </span>
                <div className="roster-label">
                  <span className="roster-name">{copy.more}</span>
                  <span className="roster-note">{copy.soon}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="copy">
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
            <FeatureLink slug="agents" locale={locale} label={readMore} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
