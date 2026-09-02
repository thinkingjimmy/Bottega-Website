/**
 * [INPUT]: Uses AppMenuReel, Reveal, and the shared feature detail CTA
 * [OUTPUT]: Exports the CustomizableSection component
 * [POS]: Home feature explaining that editable Apps reopen as Agent chats bound to their source Project
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { FeatureLink } from "./features/feature-link";
import { AppMenuReel } from "./reels/app-menu-reel";
import { Reveal } from "./reveal";

export function CustomizableSection() {
  return (
    <section className="section" id="customizable">
      <Reveal>
        <div className="wrap split">
          <div className="copy">
            <h2>Customize any app by chatting.</h2>
            <p>
              Every Bottega app has editable source—not a black box. Choose Edit App and describe what you want to change. Your Agent works directly with the source to update features, data, and interface—no code editor required.
            </p>
            <FeatureLink slug="customizable" />
          </div>

          <AppMenuReel />
        </div>
      </Reveal>
    </section>
  );
}
