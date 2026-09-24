/**
 * [INPUT]: Uses ProductPhone, localized DemoData (sync and chrome copy, the first Chat), and the AgentLogo/Stroke/D icon primitives
 * [OUTPUT]: Exports SyncFigure — the phone beside the desktop panel of the same Chat, one step handled on the phone, ciphertext in between
 * [POS]: Static figure for the Sync & remote control story; the phone is the same component the Home Hero stacks on its desktop
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { AgentLogo, D, Stroke } from "../../icons";
import { ProductPhone } from "../../window/product-phone";

const SKELETON = ["88%", "64%", "76%"];

export function SyncFigure({ demo, time }: { demo: DemoData; time: string }) {
  const { sync, chrome } = demo.copy;
  const chat = demo.chats[0];
  return (
    <>
      <div className="fig-panel sf-panel">
        <div className="sf-head">
          <AgentLogo backend={chat.agent} size={14} />
          <span>{chat.title}</span>
          <span className="ph-chip">
            <Stroke d={D.monitor} size={11} width={2} />
            {sync.device}
          </span>
        </div>
        <div className="sf-body">
          <div className="sf-bubble">{sync.ask}</div>
          <div className="sf-handled">
            <Stroke d={D.check} size={12} width={2.4} />
            {sync.handledOn.replace("{device}", sync.phone)}
          </div>
          <div className="sf-lines">
            {SKELETON.map((width) => (
              <span className="sk sk-bar" style={{ width }} key={width} />
            ))}
          </div>
          <div className="sf-status">
            <span className="sf-orb" />
            {sync.editing}
          </div>
        </div>
        <div className="sf-foot">
          <Stroke d={D.shieldCheck} size={12} width={2} />
          {sync.encrypted}
        </div>
      </div>
      <ProductPhone chat={chat} demo={demo} time={time} className="sf-phone" />
    </>
  );
}
