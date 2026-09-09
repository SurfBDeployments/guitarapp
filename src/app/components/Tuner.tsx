import { useState, useEffect } from "react";
import { Mic, MicOff, Save, Plus, ChevronDown } from "lucide-react";

type TuningPreset = {
  id: string;
  label: string;
  strings: string[];
  type: "guitar" | "bass" | "ukulele";
};

const TUNING_PRESETS: TuningPreset[] = [
  { id: "standard-guitar", label: "Standard (EADGBe)", strings: ["E2", "A2", "D3", "G3", "B3", "E4"], type: "guitar" },
  { id: "drop-d", label: "Drop D", strings: ["D2", "A2", "D3", "G3", "B3", "E4"], type: "guitar" },
  { id: "open-g", label: "Open G", strings: ["D2", "G2", "D3", "G3", "B3", "D4"], type: "guitar" },
  { id: "standard-bass", label: "Standard Bass (EADG)", strings: ["E1", "A1", "D2", "G2"], type: "bass" },
  { id: "drop-d-bass", label: "Drop D Bass", strings: ["D1", "A1", "D2", "G2"], type: "bass" },
  { id: "standard-ukulele", label: "Standard Ukulele (GCEA)", strings: ["G4", "C4", "E4", "A4"], type: "ukulele" },
  { id: "ukulele-adfb", label: "Ukulele (aDF#B)", strings: ["A4", "D4", "F4", "B4"], type: "ukulele" },
];

const CUSTOM_PRESETS: TuningPreset[] = [
  { id: "custom-1", label: "My Open A", strings: ["E2", "A2", "E3", "A3", "C#4", "E4"], type: "guitar" },
];

const NOTE_COLORS: Record<string, string> = {
  E: "#e8a020", A: "#60a5fa", D: "#4ade80", G: "#f472b6",
  B: "#a78bfa", C: "#f97316", F: "#34d399", B0: "#c084fc",
};

function getNoteColor(note: string) {
  const letter = note.replace(/[0-9#b]/g, "");
  return NOTE_COLORS[letter] || "#7a7a8c";
}

type TuneStatus = "sharp" | "flat" | "in-tune" | "idle";

function TunerNeedle({ status, cent }: { status: TuneStatus; cent: number }) {
  const clampedcent = Math.max(-50, Math.min(50, cent));
  const rotation = (clampedcent / 50) * 45;

  const statusColor =
    status === "in-tune" ? "#48dd48" :
      status === "sharp" ? "#f472b6" :
        status === "flat" ? "#60a5fa" : "#7a7a8c";

  return (
    <div className="flex flex-col items-center gap-4 my-4">
      {/* Meter arc */}
      <div className="relative w-56 h-28 overflow-hidden">
        <svg viewBox="0 0 224 112" className="w-full h-full">
          <path d="M 16 112 A 96 96 0 0 1 208 112" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 16 112 A 96 96 0 0 1 112 16" fill="none" stroke="#60a5fa44" strokeWidth="4" strokeLinecap="round" />
          <path d="M 112 16 A 96 96 0 0 1 208 112" fill="none" stroke="#f472b644" strokeWidth="4" strokeLinecap="round" />
          <line x1="112" y1="20" x2="112" y2="36" stroke="#4ade8066" strokeWidth="2" />
          <text x="20" y="105" fill="#60a5fa88" fontSize="10" fontFamily="monospace">-50</text>
          <text x="98" y="14" fill="#4ade8088" fontSize="10" fontFamily="monospace">0</text>
          <text x="194" y="105" fill="#f472b688" fontSize="10" fontFamily="monospace">+50</text>
          <g transform={`rotate(${rotation}, 112, 112)`}>
            <line x1="112" y1="112" x2="112" y2="22" stroke={statusColor} strokeWidth="2" strokeLinecap="round" />
            <circle cx="112" cy="112" r="5" fill={statusColor} />
          </g>
        </svg>
      </div>

      {/* Status readout */}
      <div className="text-center">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-sans"
          style={{ background: statusColor + "22", color: statusColor, border: `1px solid ${statusColor}44` }}
        >
          {status === "in-tune" ? "✓ In Tune" :
            status === "sharp" ? `+ ${Math.abs(cent)} Sharp` :
              status === "flat" ? `- ${Math.abs(cent)} Flat` : "Pluck a string..."}
        </div>
      </div>
    </div>
  );
}

interface TunerProps {
  selectedPreset?: { id: string; label: string; strings: number; tuning: string[]; family?: "guitar" | "bass" | "ukulele" };
}

export function Tuner({ selectedPreset }: TunerProps) {
  const [listening, setListening] = useState(false);
  const [activeString, setActiveString] = useState(0);
  const [tuneStatus, setTuneStatus] = useState<TuneStatus>("idle");
  const [cent, setcent] = useState(0);
  const [detectedNote, setDetectedNote] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState("standard-guitar");
  const [showPresets, setShowPresets] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customFreqs, setCustomFreqs] = useState<string[]>(["E2", "A2", "D3", "G3", "B3", "E4"]);
  const [tab, setTab] = useState<"presets" | "custom">("presets");

  // Sync state if selectedPreset prop is passed down from main screen navigation
  useEffect(() => {
    if (selectedPreset) {
      const match = TUNING_PRESETS.find(p => p.type === selectedPreset.family);
      if (match) {
        setActivePresetId(match.id);
      }
    }
  }, [selectedPreset]);

  const familyFilter = selectedPreset?.family;
  const allPresets = [...TUNING_PRESETS, ...CUSTOM_PRESETS];

  // Filter preset dropdown list by family if selected
  const filteredPresets = familyFilter
    ? allPresets.filter(p => p.type === familyFilter)
    : allPresets;

  const currentPreset = allPresets.find(p => p.id === activePresetId) || filteredPresets[0] || TUNING_PRESETS[0];
  const strings = currentPreset.strings;

  function simulatePluck(stringIdx: number) {
    if (!listening) return;
    setActiveString(stringIdx);
    const note = strings[stringIdx];
    setDetectedNote(note.replace(/[0-9]/g, ""));
    const randcent = Math.round((Math.random() - 0.5) * 40);
    setcent(randcent);
    setTuneStatus(
      Math.abs(randcent) < 5 ? "in-tune" :
        randcent > 0 ? "sharp" : "flat"
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-foreground tracking-tight">Tuner</h1>
          <p className="text-muted-foreground mt-1">Pluck a string to detect and tune it automatically.</p>
        </div>
        <button
          onClick={() => setListening(l => !l)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${listening
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground border border-border"
            }`}
        >
          {listening ? <Mic size={16} /> : <MicOff size={16} />}
          {listening ? "Listening…" : "Start Mic"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
        {(["presets", "custom"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-1.5 rounded-md transition-all capitalize ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "presets" ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className=" text-muted-foreground">Tuning Preset</span>
            <button
              onClick={() => setShowPresets(!showPresets)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:border-primary/50 border border-border transition-all"
            >
              <span className="font-sans text-sm">{currentPreset.label}</span>
              <ChevronDown size={14} className={`transition-transform ${showPresets ? "rotate-180" : ""}`} />
            </button>
          </div>
          {showPresets && (
            <div className="rounded-lg border border-border bg-secondary overflow-hidden mt-2">
              {filteredPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => { setActivePresetId(preset.id); setShowPresets(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-0 ${preset.id === activePresetId ? "text-primary" : "text-foreground"
                    }`}
                >
                  <span className="font-sans text-sm">{preset.label}</span>
                  <div className="flex gap-1">
                    {preset.strings.map((n, i) => (
                      <span key={i} className="text-sm font-sans" style={{ color: getNoteColor(n) }}>
                        {n.replace(/[0-9]/g, "")}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Custom Frequencies</span>
            <button
              onClick={() => setShowSaveDialog(!showSaveDialog)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm"
            >
              <Save size={14} /> Save Preset
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {customFreqs.map((freq, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-sm text-primary font-sans">String {i + 1}</label>
                <input
                  value={freq}
                  onChange={e => {
                    const next = [...customFreqs];
                    next[i] = e.target.value;
                    setCustomFreqs(next);
                  }}
                  className="w-full bg-secondary border border-border rounded px-2 py-1.5 text-sm font-sans text-foreground focus:border-primary focus:outline-none"
                  placeholder="E2"
                />
              </div>
            ))}
          </div>
          {showSaveDialog && (
            <div className="mt-3 flex gap-2">
              <input
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder="Preset name…"
                className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm flex items-center gap-1">
                <Plus size={14} /> Add
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tuner Display */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center">
        {/* Detected note */}
        <div className="text-center mb-2">
          <div className="font-sans" style={{ fontSize: "4rem", lineHeight: 1, color: detectedNote ? getNoteColor(detectedNote) : "#7a7a8c" }}>
            {detectedNote || "—"}
          </div>
          {detectedNote && (
            <div className="text-muted-foreground text-sm font-sans mt-1">
              {cent > 0 ? `+${cent}` : `${cent}`}
            </div>
          )}
        </div>

        <TunerNeedle status={tuneStatus} cent={cent} />

        {/* String buttons */}
        <div className="w-full mt-4">
          <p className="text-sm text-primary mb-2 text-center font-sans uppercase tracking-widest">
            {listening ? "Tap a string or pluck to auto-detect" : "Enable microphone to begin"}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {strings.map((note, i) => {
              const color = getNoteColor(note);
              const isActive = activeString === i && listening;
              return (
                <button
                  key={i}
                  onClick={() => simulatePluck(i)}
                  disabled={!listening}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all disabled:opacity-40"
                  style={{
                    borderColor: isActive ? color : "rgba(255,255,255,0.08)",
                    background: isActive ? color + "22" : "transparent",
                    color: isActive ? color : "#7a7a8c",
                  }}
                >
                  <span className="font-sans text-xs">{i + 1}</span>
                  <span className="font-sans font-bold">{note.replace(/[0-9]/g, "")}</span>
                  {isActive && tuneStatus === "in-tune" && <span className="text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Auto-detect info */}
      <div className="rounded-xl border border-border bg-card p-4 flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Mic size={14} className="text-primary" />
        </div>
        <div>
          <div className="text-foreground">Auto-Detect Mode</div>
          <div className="text-muted-foreground text-sm mt-1">
            The microphone listens continuously and automatically identifies which string you're plucking based on pitch frequency. Tap "Start Mic" to activate.
          </div>
        </div>
      </div>
    </div>
  );
}