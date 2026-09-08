import { useState } from "react";
import { Mic, MicOff, Save, ChevronDown, Plus, X } from "lucide-react";

const PRESETS = [
  { id: "std-guitar",   label: "Standard Guitar",       strings: ["E","A","D","G","B","e"],  hz: [82,110,147,196,247,330] },
  { id: "drop-d",       label: "Drop D",                strings: ["D","A","D","G","B","e"],  hz: [73,110,147,196,247,330] },
  { id: "open-g",       label: "Open G",                strings: ["D","G","D","G","B","d"],  hz: [73,98,147,196,247,294]  },
  { id: "std-bass",     label: "Standard Bass (EADG)",  strings: ["E","A","D","G"],          hz: [41,55,73,98]            },
  { id: "drop-d-bass",  label: "Drop D Bass",           strings: ["D","A","D","G"],          hz: [37,55,73,98]            },
];

type TuneStatus = "in-tune" | "sharp" | "flat" | "idle";

function Box({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-border bg-card rounded ${className}`}>{children}</div>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{children}</p>;
}

function NeedleMeter({ status, cents }: { status: TuneStatus; cents: number }) {
  const clamped = Math.max(-50, Math.min(50, cents));
  const pct     = ((clamped + 50) / 100) * 100;

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="relative h-7 bg-muted border border-border rounded flex items-center overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/40 z-10" />
        {status === "flat" && (
          <div className="absolute top-1 bottom-1 bg-foreground/15 border-r border-foreground/30 rounded-l"
            style={{ left: `${pct}%`, right: "50%" }} />
        )}
        {status === "sharp" && (
          <div className="absolute top-1 bottom-1 bg-foreground/15 border-l border-foreground/30 rounded-r"
            style={{ left: "50%", right: `${100 - pct}%` }} />
        )}
        <div className="absolute top-0 bottom-0 w-0.5 bg-foreground z-20 transition-all duration-300"
          style={{ left: `${pct}%` }} />
        <span className="absolute left-2 text-[9px] font-mono text-muted-foreground">Flat</span>
        <span className="absolute right-2 text-[9px] font-mono text-muted-foreground">Sharp</span>
        <span className="absolute left-1/2 -translate-x-1/2 text-[9px] font-mono text-foreground/50">0¢</span>
      </div>
      <div className="text-center h-5">
        {status === "idle"     && <span className="text-xs font-mono text-muted-foreground">[ Pluck a string ]</span>}
        {status === "in-tune"  && <span className="text-xs font-mono text-foreground font-bold">✓ In Tune</span>}
        {status === "sharp"    && <span className="text-xs font-mono text-foreground">▲ {Math.abs(cents)}¢ Sharp</span>}
        {status === "flat"     && <span className="text-xs font-mono text-foreground">▼ {Math.abs(cents)}¢ Flat</span>}
      </div>
    </div>
  );
}

export function WireframeTuner() {
  const [mic,          setMic]          = useState(false);
  const [tab,          setTab]          = useState<"presets"|"custom">("presets");
  const [presetId,     setPresetId]     = useState("std-guitar");
  const [showDrop,     setShowDrop]     = useState(false);
  const [activeStr,    setActiveStr]    = useState<number|null>(null);
  const [status,       setStatus]       = useState<TuneStatus>("idle");
  const [cents,        setCents]        = useState(0);
  const [detected,     setDetected]     = useState<string|null>(null);
  const [customStrs,   setCustomStrs]   = useState(["E2","A2","D3","G3","B3","E4"]);
  const [saveName,     setSaveName]     = useState("");
  const [showSave,     setShowSave]     = useState(false);
  const [savedPresets, setSavedPresets] = useState<{label:string;strings:string[]}[]>([]);

  const activePreset = PRESETS.find(p => p.id === presetId) || PRESETS[0];
  const strings      = tab === "custom" ? customStrs : activePreset.strings;

  function pluck(i: number) {
    if (!mic) return;
    setActiveStr(i);
    setDetected(strings[i].replace(/[0-9]/g,"").toUpperCase());
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
          <p className="text-xs text-muted-foreground">Auto-detect sharp / flat per string.</p>
        </div>
        <button
          onClick={() => { setMic(m => !m); if (mic) { setStatus("idle"); setDetected(null); setActiveStr(null); } }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded border text-xs font-mono whitespace-nowrap shrink-0 mt-1 ${
            mic ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"
          }`}
        >
          {mic ? <Mic size={12} /> : <MicOff size={12} />}
          {mic ? "Mic ON" : "Enable Mic"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-card border border-border rounded">
        {(["presets","custom"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded text-xs font-mono capitalize transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
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
            className="w-full flex items-center justify-between px-3 py-2 bg-muted border border-border rounded text-sm font-mono"
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left border-b border-border last:border-0 text-xs font-mono ${
                    p.id === presetId ? "bg-foreground/5 text-foreground" : "text-muted-foreground"
                  }`}
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
                <span className="text-[9px] font-mono text-muted-foreground">{activePreset.hz[i]}Hz</span>
                <span className="text-xs font-mono px-2 py-1 bg-muted border border-border rounded font-bold">{n}</span>
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
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono border border-border rounded bg-muted"
            >
              <Save size={10} /> Save
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {customStrs.map((val, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-muted-foreground">Str {i + 1}</span>
                <input
                  value={val}
                  onChange={e => setCustomStrs(prev => { const n = [...prev]; n[i] = e.target.value; return n; })}
                  className="w-full bg-muted border border-border rounded px-2 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-foreground/60"
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
                className="flex-1 bg-muted border border-border rounded px-2 py-1.5 text-xs font-mono text-foreground focus:outline-none"
              />
              <button onClick={saveCustom} className="flex items-center gap-1 px-3 py-1.5 rounded border border-foreground bg-primary text-primary-foreground text-xs font-mono">
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
                <div key={i} className="flex items-center justify-between text-[10px] font-mono bg-muted border border-border rounded px-2 py-1.5">
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
        <div className="w-16 h-16 rounded border-2 border-border bg-muted flex items-center justify-center">
          <span className="font-mono text-3xl font-bold text-foreground">{detected ?? "—"}</span>
        </div>

        <div className="w-full">
          <NeedleMeter status={status} cents={cents} />
        </div>

        {/* String grid */}
        <div className="w-full">
          <p className="text-[9px] font-mono text-muted-foreground text-center mb-2">
            {mic ? "[ Tap string or pluck to auto-detect ]" : "[ Enable mic to tune ]"}
          </p>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(strings.length, 6)}, 1fr)` }}>
            {strings.map((note, i) => (
              <button
                key={i}
                onClick={() => pluck(i)}
                disabled={!mic}
                className={`flex flex-col items-center py-2 rounded border text-xs font-mono transition-colors disabled:opacity-40 ${
                  activeStr === i && mic
                    ? "border-foreground bg-foreground/10 text-foreground"
                    : "border-border bg-muted text-muted-foreground"
                }`}
              >
                <span className="text-[9px] opacity-50">{i + 1}</span>
                <span className="font-bold">{note.replace(/[0-9]/g,"").toUpperCase()}</span>
                {activeStr === i && status === "in-tune" && mic && <span className="text-[9px]">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </Box>

      {/* Info */}
      <Box className="p-3 flex gap-2.5 items-start">
        <div className="w-7 h-7 rounded border border-border bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <Mic size={12} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">Auto Mode</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-mono leading-relaxed">
      
            The microphone automatically recognize which string the user is plucking and show them visually if it is sharp or flat.
          </p>
        </div>
      </Box>
    </div>
  );
}
