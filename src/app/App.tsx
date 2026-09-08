import { useState } from "react";
import { WireframeInstrument } from "./components/WireframeInstrument";
import { WireframeTuner } from "./components/WireframeTuner";
import { WireframeSongs } from "./components/WireframeSongs";
import { WireframeTools } from "./components/WireframeTools";
import { Guitar, SlidersVertical, Music4, SlidersHorizontal, LucideIcon, ArrowLeft, Menu } from "lucide-react";

type Screen = "instrument" | "tune" | "music" | "tools";

const NAV: { id: Screen; label: string; icon: LucideIcon }[] = [
  { id: "instrument", label: "Instrument", icon: Guitar },
  { id: "tune", label: "Tune", icon: SlidersVertical },
  { id: "music", label: "Music", icon: Music4 },
  { id: "tools", label: "Tools", icon: SlidersHorizontal },
];

export function BottomNav({ activeScreen, onSelect }: { activeScreen: Screen; onSelect: (id: Screen) => void }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 border-t border-border flex items-stretch"
      style={{ height: 64, background: "#ffffff" }}
    >
      {NAV.map((n) => {
        const Icon = n.icon;
        const active = activeScreen === n.id;
        return (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              active ? "bg-foreground/5 text-amber-600" : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Icon size={18} />
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
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("instrument");

  function handleNavigateToTuner() {
    setScreen("tune");
  }

  function handleGoBack() {
    window.history.back();
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

          {/* App header - Fixed hex syntax */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border" style={{ background: "#ffffff" }}>
            <div className="flex items-center gap-2">
            
              <span className="font-mono font-bold text-md text-foreground tracking-wide">JamMaster Tuning</span>
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
            {screen === "tune" && <WireframeTuner />}
            {screen === "music" && <WireframeSongs />}
            {screen === "tools" && <WireframeTools />}
          </div>

          {/* Replaced broken duplicate menu with BottomNav component */}
          <BottomNav activeScreen={screen} onSelect={setScreen} />
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