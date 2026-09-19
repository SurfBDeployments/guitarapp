import { useState, useEffect } from "react";
import { Mic, MicOff, Save, ChevronDown, Plus, X } from "lucide-react";

const PRESETS = [
  { id: "std-guitar", label: "Standard 6-String Guitar", strings: ["E", "A", "D", "G", "B", "e"], hz: [82, 110, 147, 196, 247, 330] },
  { id: "std-7-guitar", label: "Standard 7‑String Guitar", strings: ["B", "E", "A", "D", "G", "B", "e"], hz: [62, 82, 110, 147, 196, 247, 330] },
  { id: "std-12-guitar", label: "Standard 12‑String Guitar", strings: ["E", "E", "A", "A", "D", "D", "G", "G", "B", "B", "e", "e"], hz: [82, 164, 110, 220, 147, 294, 196, 392, 247, 247, 330, 330] },
  { id: "drop-d", label: "Drop D", strings: ["D", "A", "D", "G", "B", "e"], hz: [73, 110, 147, 196, 247, 330] },
  { id: "open-g", label: "Open G", strings: ["D", "G", "D", "G", "B", "d"], hz: [73, 98, 147, 196, 247, 294] },
  { id: "std-bass", label: "4-String Bass (EADG)", strings: ["E", "A", "D", "G"], hz: [41, 55, 73, 98] },
  { id: "std-5-bass", label: "5-String Bass (BEADG)", strings: ["B", "E", "A", "D", "G"], hz: [31, 41, 55, 73, 98] },
  { id: "std-6-bass", label: "6-String Bass (BEADGC)", strings: ["B", "E", "A", "D", "G", "C"], hz: [31, 41, 55, 73, 98, 130] },
  { id: "drop-d-bass", label: "Drop D Bass", strings: ["D", "A", "D", "G"], hz: [37, 55, 73, 98] },
  { id: "standard-ukulele", label: "Standard Ukulele (GCEA)", strings: ["G", "C", "E", "A"], hz: [392, 261, 329, 440] },
  { id: "ukulele-adfb", label: "Ukulele (ADF#B)", strings: ["A", "D", "F#", "B"], hz: [440, 293, 370, 493] },
];

// Helper to translate Instrument page IDs to Tuner Preset IDs
const INSTRUMENT_TO_TUNER_MAP: Record<string, string> = {
  g6: "std-guitar",
  g7: "std-7-guitar",
  g12: "std-12-guitar",
  b4: "std-bass",
  b5: "std-5-bass",
  b6: "std-6-bass",
  u4: "standard-ukulele",
};

type TuneStatus = "in-tune" | "sharp" | "flat" | "idle";

function Box({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-border bg-card rounded ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-sans font-semibold text-muted-foreground uppercase tracking-widest mb-1">{children}</p>;
}

function NeedleMeter({ status, cents }: { status: TuneStatus; cents: number }) {
  const clamped = Math.max(-50, Math.min(50, cents));
  const pct = ((clamped + 50) / 100) * 100;

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="relative h-7 bg-muted border border-border rounded flex items-center overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/40 z-10" />
        {status === "flat" && (
          <div className="absolute top-1 bottom-1  border-r bg-accent/100 border-foreground/30 rounded-l"
            style={{ left: `${pct}%`, right: "50%" }} />
        )}
        {status === "sharp" && (
          <div className="absolute top-1 bottom-1 bg-accent/100 border-l border-foreground/30 rounded-r"
            style={{ left: "50%", right: `${100 - pct}%` }} />
        )}
        <div className="absolute top-0 bottom-0 bg-foreground z-20 transition-all duration-300"
          style={{ left: `${pct}%` }} />
        <span className="absolute left-2 text-sm font-medium text-foreground">Flat</span>
        <span className="absolute right-2  text-sm font-medium text-foreground">Sharp</span>
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-sans text-foreground/50">0ct</span>
      </div>
      <div className="text-center h-5">
        {status === "idle" && <span className="text-sm font-sans text-muted-foreground">[ Pluck a string ]</span>}
        {status === "in-tune" && <span className="text-sm font-sans font-bold intunetext">✓ In Tune</span>}
        {status === "sharp" && <span className="text-sm font-sans text-foreground">▲ {Math.abs(cents)} ct Sharp</span>}
        {status === "flat" && <span className="text-sm font-sans text-foreground">▼ {Math.abs(cents)} ct Flat</span>}
      </div>
    </div>
  );
}

interface WireframeTunerProps {
  selectedPresetId?: string;
}

export function WireframeTuner({ selectedPresetId = "g6" }: WireframeTunerProps) {
  const [mic, setMic] = useState(false);
  const [tab, setTab] = useState<"presets" | "custom">("presets");
  const [presetId, setPresetId] = useState(() => INSTRUMENT_TO_TUNER_MAP[selectedPresetId] || "std-guitar");
  const [showDrop, setShowDrop] = useState(false);
  const [activeStr, setActiveStr] = useState<number | null>(null);
  const [status, setStatus] = useState<TuneStatus>("idle");
  const [cents, setCents] = useState(0);
  const [detected, setDetected] = useState<string | null>(null);
  const [customStrs, setCustomStrs] = useState(["E2", "A2", "D3", "G3", "B3", "E4"]);
  const [saveName, setSaveName] = useState("");
  const [showSave, setShowSave] = useState(false);
  const [savedPresets, setSavedPresets] = useState<{ label: string; strings: string[] }[]>([]);

  // Update tuner preset whenever selectedPresetId changes from Instrument screen
  useEffect(() => {
    const mappedId = INSTRUMENT_TO_TUNER_MAP[selectedPresetId] || selectedPresetId;
    if (PRESETS.some(p => p.id === mappedId)) {
      setPresetId(mappedId);
    }
  }, [selectedPresetId]);

  const activePreset = PRESETS.find(p => p.id === presetId) || PRESETS[0];
  const strings = tab === "custom" ? customStrs : activePreset.strings;

  function pluck(i: number) {
    if (!mic) return;
    setActiveStr(i);
    setDetected(strings[i].replace(/[0-9]/g, "").toUpperCase());
    const c = Math.round((Math.random() - 0.5) * 60);
    setCents(c);
    setStatus(Math.abs(c) < 5 ? "in-tune" : c > 0 ? "sharp" : "flat");
  }

  function saveCustom() {
    if (!saveName.trim()) return;
    setSavedPresets(p => [...p, { label: saveName, strings: customStrs }]);
    setSaveName("");
    setShowSave(false);
  }

  return (
    <div className="px-4 py-4 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-foreground mt-0.5">Tuner</h2>
          <p className="text-xs text-primary">Auto-detect sharp / flat per string.</p>
        </div>
        <button
          onClick={() => { setMic(m => !m); if (mic) { setStatus("idle"); setDetected(null); setActiveStr(null); } }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded border text-sm font-sans whitespace-nowrap shrink-0 mt-1 ${mic ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"}`}
        >
          {mic ? <Mic size={12} /> : <MicOff size={12} />}
          {mic ? "Mic ON" : "Enable Mic"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-card border border-border rounded">
        {(["presets", "custom"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded text-sm font-sans capitalize transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Preset selector */}
      {tab === "presets" && (
        <Box className="p-3">
          <SectionLabel>Tuning Preset</SectionLabel>
          <button
            onClick={() => setShowDrop(d => !d)}
            className="w-full flex font-semibold items-center justify-between px-3 py-2 bg-muted border border-border rounded text-sm font-sans"
          >
            <span>{activePreset.label}</span>
            <ChevronDown size={13} className={`transition-transform ${showDrop ? "rotate-180" : ""}`} />
          </button>
          {showDrop && (
            <div className="border border-border rounded bg-card overflow-hidden mt-1">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setPresetId(p.id); setShowDrop(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left border-b border-border last:border-0 text-sm font-sans ${p.id === presetId ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span>{p.label}</span>
                  <span className="text-muted-foreground">{p.strings.join(" ")}</span>
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {activePreset.strings.map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-xs font-sans text-muted-foreground">{activePreset.hz[i]}Hz</span>
                <span className="text-sm font-sans px-2 py-1 bg-muted border border-border rounded font-bold">{n}</span>
              </div>
            ))}
          </div>
        </Box>
      )}

      {/* Custom tuning */}
      {tab === "custom" && (
        <Box className="p-3">
          <div className="flex items-center justify-between mb-2">
            <SectionLabel>Custom Frequencies</SectionLabel>
            <button
              onClick={() => setShowSave(s => !s)}
              className="flex items-center gap-1 px-2 py-1 text-sm font-sans border border-border rounded bg-muted"
            >
              <Save size={10} /> Save
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {customStrs.map((val, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-xs font-sans text-muted-foreground">Str {i + 1}</span>
                <input
                  value={val}
                  onChange={e => setCustomStrs(prev => { const n = [...prev]; n[i] = e.target.value; return n; })}
                  className="w-full bg-muted border border-border rounded px-2 py-1 text-sm font-sans text-foreground focus:outline-none focus:border-foreground/60"
                  placeholder="E2"
                />
              </div>
            ))}
          </div>
          {showSave && (
            <div className="flex gap-2 mt-2">
              <input
                value={saveName}
                onChange={e => setSaveName(e.target.value)}
                placeholder="Preset name…"
                className="flex-1 bg-muted border border-border rounded px-2 py-1.5 text-sm font-sans text-foreground focus:outline-none"
              />
              <button onClick={saveCustom} className="flex items-center gap-1 px-3 py-1.5 rounded border border-foreground bg-primary text-primary-foreground text-sm font-sans">
                <Plus size={11} /> Add
              </button>
              <button onClick={() => setShowSave(false)} className="px-2 py-1.5 rounded border border-border text-muted-foreground">
                <X size={11} />
              </button>
            </div>
          )}
          {savedPresets.length > 0 && (
            <div className="mt-2 border-t border-border pt-2 flex flex-col gap-1">
              {savedPresets.map((cp, i) => (
                <div key={i} className="flex items-center justify-between text-sm font-sans bg-accent border border-border rounded px-2 py-1.5">
                  <span className="text-foreground">{cp.label}</span>
                  <span className="text-muted-foreground">{cp.strings.join(" ")}</span>
                </div>
              ))}
            </div>
          )}
        </Box>
      )}

      {/* Tuner display */}
      <Box className="p-4 flex flex-col items-center gap-3">
        {/* Big detected note */}
        <div
          className={`w-16 h-16 rounded border-2 flex items-center justify-center transition-colors ${status === "in-tune"
            ? "intune border-emerald-600 text-white"
            : "bg-accent border-border text-white"
            }`}
        >
          <span className="font-sans text-3xl font-bold">
            {detected ?? "—"}
          </span>
        </div>

        <div className="w-full">
          <NeedleMeter status={status} cents={cents} />
        </div>

        {/* String grid */}
        <div className="w-full">
          <p className="text-xs font-sans text-muted-foreground text-center mb-2">
            {mic ? "[ Tap string or pluck to auto-detect ]" : "[ Enable mic to tune ]"}
          </p>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(strings.length, 6)}, 1fr)` }}>
            {strings.map((note, i) => {
              const isActive = activeStr === i && mic;

              const isInTune = isActive && status === "flat" || status === "sharp" ? false : isActive && status === "in-tune";

              return (
                <button
                  key={i}
                  onClick={() => pluck(i)}
                  disabled={!mic}
                  className={`flex flex-col items-center py-2 rounded border text-sm font-sans transition-colors disabled:opacity-50 ${isInTune
                    ? "border-emerald-600 intune text-white"
                    : isActive
                      ? "border-foreground bg-accent text-primary-foreground"
                      : "border-border bg-muted text-muted-foreground"
                    }`}
                >
                  <span className="text-xs opacity-50">{i + 1}</span>
                  <span className="font-bold">{note.replace(/[0-9]/g, "").toUpperCase()}</span>
                  {isInTune && <span className="text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </Box>

      {/* Info */}
      <Box className="p-3 flex gap-2.5 items-start">
        <div className="w-7 h-7 rounded border border-border bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <Mic size={12} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-md font-semibold text-foreground">Auto Mode</p>
          <p className="text-sm text-primary font-sans leading-relaxed">
            The microphone automatically recognizes which string the user is plucking and shows them visually if it is sharp or flat.
          </p>
        </div>
      </Box>
    </div>
  );
}
