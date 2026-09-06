import { useState } from "react";
import { WireframeInstrument } from "./components/WireframeInstrument";
import { WireframeTuner } from "./components/WireframeTuner";
import { WireframeSongs } from "./components/WireframeSongs";
import { WireframeTools } from "./components/WireframeTools";
import { Menu } from "lucide-react";

type Screen = "instrument" | "tuner" | "songs" | "tools";

const NAV: { id: Screen; label: string; icon: string }[] = [
  { id: "instrument", label: "Instrument", icon: "🎸" },
  { id: "tuner", label: "Tuner", icon: "🎵" },
  { id: "songs", label: "Songs", icon: "📖" },
  { id: "tools", label: "Tools", icon: "🔧" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("instrument");

  function handleNavigateToTuner() {
    setScreen("tuner");
  }

  return (
    /* Outer page — neutral desktop mat */
    <div className="min-h-screen bg-[#d0d0d0] flex items-start justify-center py-10 px-4">
      <div className="flex flex-col items-center gap-3">

        {/* Desktop label */}
        <div className="text-xs font-mono text-[#666] uppercase tracking-widest">
          JamMaster Tuning · Mobile Wireframe · 390 × 844
        </div>

        {/* Phone shell */}
        <div
          className="relative bg-background rounded-[44px] overflow-hidden shadow-2xl"
          style={{
            width: 390,
            height: 844,
            border: "10px solid #222",
            boxShadow: "0 0 0 2px #444, 0 32px 64px rgba(0,0,0,0.45)",
            background: "linear-gradient(to bottom, #FFE8A3 5%, #ffffff 95%)",
          }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 border-b border-border shrink-0" style={{ background: "rgba(255,232,163,0.85)" }}>
            <span className="text-[11px] font-mono text-muted-foreground">9:41</span>
            {/* Notch pill */}
            <div className="w-24 h-5 rounded-full bg-[#222] absolute left-1/2 -translate-x-1/2 top-2" />
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-mono text-muted-foreground">●●●</span>
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border" style={{ background: "hex(#ffffff)" }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded border border-border bg-muted flex items-center justify-center text-sm">🎸</div>
              <span className="font-mono font-bold text-sm text-foreground tracking-tight">JamMaster Tuning</span>
            </div>
            <button
              type="button"
              aria-label="Open menu"
              title="Open menu"
              className="w-7 h-7 rounded border border-border bg-muted flex items-center justify-center"
            >
              <Menu size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Scrollable screen content */}
          <div
            className="overflow-y-auto"
            style={{ height: "calc(844px - 20px - 44px - 52px - 64px)", background: "transparent" }}
          >
            {screen === "instrument" && <WireframeInstrument onNavigateToTuner={handleNavigateToTuner} />}
            {screen === "tuner" && <WireframeTuner />}
            {screen === "songs" && <WireframeSongs />}
            {screen === "tools" && <WireframeTools />}
          </div>

          {/* Bottom nav */}
          <div
            className="absolute bottom-0 left-0 right-0 border-t border-border flex items-stretch"
            style={{ height: 64, background: "#ffffff" }}
          >
            {NAV.map(n => {
              const active = screen === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setScreen(n.id)}
                  className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${active ? "bg-foreground/5" : "hover:bg-muted/50"
                    }`}
                >
                  <span className="text-lg leading-none">{n.icon}</span>
                  <span
                    className={`text-[10px] font-mono ${active ? "text-foreground font-bold" : "text-muted-foreground"}`}
                  >
                    {n.label}
                  </span>
                  {active && (
                    <div className="absolute bottom-1 w-4 h-0.5 rounded-full bg-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Screen label below phone */}
        <div className="text-xs font-mono text-[#888]">
          Active: <span className="text-[#333] font-bold">{NAV.find(n => n.id === screen)?.label}</span>
          {" · "}tap nav to switch screens
        </div>
      </div>
    </div>
  );
}
