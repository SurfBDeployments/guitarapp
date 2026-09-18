import { useState } from "react";
import { WireframeInstrument } from "./components/WireframeInstrument";
import { WireframeTuner } from "./components/WireframeTuner";
import { WireframeSongs } from "./components/WireframeSongs";
import { WireframeTools } from "./components/WireframeTools";
import { Guitar, Menu, Music4, SlidersHorizontal, LucideIcon, Share2, HelpCircle, Lock, X, Radio, ClefTreble, ListMusic, ChevronRight } from 'lucide-react';





import Guitars from "../imports/10guitarpdpherocropbw.png";
type Screen = "instrument" | "tune" | "music" | "tools";

const NAV: { id: Screen; label: string; icon: LucideIcon }[] = [
  { id: "instrument", label: "Instrument", icon: Guitar },
  { id: "tune", label: "Tune", icon: Radio },
  { id: "music", label: "Music", icon: Music4 },
  { id: "tools", label: "Tools", icon: SlidersHorizontal },
];
function ProfileOverlay({ onClose }: { onClose: () => void }) {
  return (
    /* Full phone overlay — click the right strip to close */
    <div className="absolute inset-0 z-40 flex" onClick={onClose}>

      {/* Drawer panel — ~82% width, stops clicks from closing */}
      <div
        className="relative flex flex-col overflow-y-auto"
        style={{ width: "80%", background: "#ffffff", flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero banner */}

        <div
          className="relative flex items-end px-5 pb-5"
          style={{
            height: 175,
            background: " #000000",
            //background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 80%, #2c2c2c 100%)",
            backgroundImage: `url(${Guitars})`,
            backgroundSize: "Cover",
            backgroundPosition: "center",
            backgroundColor: "#000000",

          }}
        >

          {/* Faint guitar silhouettes*/}

          <p
            className="relative z-10 font-bold italic font-sans"
            style={{ fontSize: 26, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "40px", marginLeft: "auto", marginRight: "auto" }}
          >
            JamMaster Tuning
          </p>

        </div>

        {/* My Profile */}
        < div className="px-5 py-5 border-b border-border">
          <p className="text-sm font-bold text-foreground mb-3">My Profile</p>
          <p className="text-sm font-medium text-foreground">Brian M</p>
          <p className="text-sm text-foreground mt-0.5 " style={{ textDecoration: "underline", cursor: "pointer" }}>jamMaster@gmail.com</p>
          <button className="mt-3 text-sm font-medium" style={{ color: "#c0392b" }}>
            Sign Out
          </button>
        </div>

        {/* Tool Settings */}
        <div className="px-5 py-5 border-b border-border">
          <p className="text-sm font-bold text-foreground mb-4">Tool Settings</p>
          <div className="flex flex-col gap-3.5">
            {[
              { label: "Tuner", Icon: Radio, alt: "Tuner" },
              { label: "Scales", Icon: ClefTreble, alt: "Scales" },
              { label: "Chords", Icon: ListMusic, alt: "Chords" },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex items-center justify-start gap-4">
                <Icon size={18} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{label}</span>
                <ChevronRight size={15} className="text-muted-foreground ml-auto" />

              </div>
            ))}
          </div>
        </div>

        {/* Tuner Support */}
        <div className="px-5 py-5">
          <p className="text-sm font-bold text-foreground mb-4 ">Tuner Support</p>
          <div className="flex flex-col gap-3.5">
            {[
              { label: "App Share", Icon: Share2, alt: "App Share" },
              { label: "Help?", Icon: HelpCircle, alt: "Help" },
              { label: "Privacy", Icon: Lock, alt: "Lock" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center justify-start gap-4">
                <Icon size={18} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{label}</span>

              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-5 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center font-mono">JamMaster Tuning</p>
        </div>
      </div>

      {/* Right strip — gradient shows through, tap here to close */}
      <div
        className="flex-1 flex flex-col items-center pt-3"
        style={{ background: "linear-gradient(to bottom, #FFE8A3 95%, #ffffff 100%)" }}
      >
        {/* Hamburger in the strip */}
        <button
          className="w-8 h-8 flex items-center justify-center mt-1"
          onClick={onClose}
        >
          <X size={18} className="text-foreground" />
        </button>
      </div>
    </div>
  );
}
export function BottomNav({ activeScreen, onSelect }: { activeScreen: Screen; onSelect: (id: Screen) => void }) {
  return (
    <div
      className="border-t border-border flex items-stretch"
      style={{ height: 75, background: "#ffffff", padding: "10px" }}
    >
      {NAV.map((n) => {
        const Icon = n.icon;
        const active = activeScreen === n.id;
        return (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            className={`relative flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${active
              ? "text-orange-700"
              : "text-primary hover:bg-muted/50"
              }`}
          >
            <Icon size={18} />
            <span className={`text-sm font-sans ${active ? "font-semibold" : "font-normal"}`}>
              {n.label}
            </span>
            {active && (
              <div className="absolute bottom-1 w-4 h-0.5 rounded-full bg-orange-700" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  // Use `screen` consistently across the component
  const [screen, setScreen] = useState<Screen>("instrument");
  const [activePresetId, setActivePresetId] = useState<string>("g6");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigateToTuner = (preset: { id: string; label: string; tuning: string[]; family: string }) => {
    setActivePresetId(preset.id); // Captures 'u4', 'b5', 'g12', etc.
    setScreen("tune");             // Switches screen tab to Tune
  };

  return (
    /* Outer page — neutral desktop mat */
    <div className="min-h-screen bg-[#d0d0d0] flex items-start justify-center py-10 px-4">
      <div className="flex flex-col items-center gap-3 w-full max-w-[1024px]">


        {/* Phone shell */}
        <div
          className="relative bg-background rounded-[44px] overflow-hidden shadow-2xl"
          style={{
            width: '100%',
            maxWidth: 1024,
            border: "10px solid #222",
            boxShadow: "0 0 0 2px #444, 0 32px 64px rgba(0,0,0,0.45)",
            background: "linear-gradient(to bottom, #FFE8A3 5%, #ffffff 95%)",
          }}
        >
          {/* Profile overlay */}
          {menuOpen && <ProfileOverlay onClose={() => setMenuOpen(false)} />}
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 border-b border-border shrink-0" style={{ background: "rgba(255,232,163,0.85)" }}>
            <span className="text-sm font-sans text-primary">9:41</span>
            {/* Notch pill */}
            <div className="w-24 h-5 rounded-full bg-[#222] absolute left-1/2 -translate-x-1/2 top-2" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-sans text-primary">●●●</span>
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-4">
              <span className="font-sans font-bold text-lg text-foreground tracking-wide">JamMaster Tuning</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              title="Open menu"
              className="w-7 h-7 rounded border border-border bg-muted flex items-center justify-center"
            >
              <Menu size={14} className="text-foreground" />
            </button>
          </div>

          {/* Scrollable screen content */}
          <div
            className="overflow-y-auto"
            style={{ height: "calc(844px - 20px - 44px - 52px - 75px)", background: "transparent" }}
          >
            {screen === "instrument" && <WireframeInstrument onNavigateToTuner={handleNavigateToTuner} />}
            {screen === "tune" && <WireframeTuner selectedPresetId={activePresetId} />}
            {screen === "music" && <WireframeSongs />}
            {screen === "tools" && <WireframeTools />}
          </div>

          {/* BottomNav component */}
          <BottomNav activeScreen={screen} onSelect={setScreen} />
        </div>

        {/* Screen label below phone */}
        <div className="text-sm font-sans text-[#888]">
          Active: <span className="text-[#333] font-bold">{NAV.find(n => n.id === screen)?.label}</span>
          {" · "}tap nav to switch screens
        </div>

      </div>
    </div>
  );
}