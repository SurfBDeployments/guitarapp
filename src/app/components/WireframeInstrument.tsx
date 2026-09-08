import { useState } from "react";

type InstrumentFamily = "guitar" | "bass" | "ukulele";

const GUITAR_PRESETS = [
  { id: "g6", label: "6-String Guitar", strings: 6, tuning: ["E", "A", "D", "G", "B", "e"] },
  { id: "g7", label: "7-String Guitar", strings: 7, tuning: ["B", "E", "A", "D", "G", "B", "e"] },
  { id: "g12", label: "12-String Guitar", strings: 12, tuning: ["E", "e", "A", "a", "D", "d", "G", "g", "B", "B", "e", "e"] },
];

const BASS_PRESETS = [
  { id: "b4", label: "4-String Bass", strings: 4, tuning: ["E", "A", "D", "G"] },
  { id: "b5", label: "5-String Bass", strings: 5, tuning: ["B", "E", "A", "D", "G"] },
  { id: "b6", label: "6-String Bass", strings: 6, tuning: ["B", "E", "A", "D", "G", "C"] },
];

const UKULELE_PRESETS = [
  { id: "u4", label: "4-String Ukulele", strings: 4, tuning: ["G", "C", "E", "A"] },
];

const FRET_MARKERS = [3, 5, 7, 9, 12];
const FRET_COUNT = 7; // trimmed for mobile

function Box({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-border bg-card rounded ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">{children}</p>;
}

interface FretboardProps { tuning: string[]; family: InstrumentFamily }

function MobileFretboard({ tuning, family }: FretboardProps) {
  const rows = tuning.slice(0, Math.min(tuning.length, 6));
  const thick = family === "bass" ? [3, 2.5, 2, 1.5, 1, 1] : [1, 1, 1.5, 1.5, 2, 2];

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 280 }}>
        {/* Fret numbers */}
        <div className="flex ml-8 mb-0.5">
          <div className="w-4 shrink-0" />
          {Array.from({ length: FRET_COUNT }, (_, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[9px] font-mono text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>

        {rows.map((note, si) => (
          <div key={si} className="flex items-center mb-0.5">
            <div className="w-8 shrink-0 flex justify-end pr-1">
              <span className="text-[10px] font-mono font-bold px-1 py-0.5 bg-muted border border-border rounded">
                {note}
              </span>
            </div>
            {/* Nut */}
            <div className="w-0.5 self-stretch bg-foreground/50 shrink-0" />
            {Array.from({ length: FRET_COUNT }, (_, fi) => {
              const hasDot = FRET_MARKERS.includes(fi + 1);
              return (
                <div
                  key={fi}
                  className="flex-1 flex items-center justify-center relative"
                  style={{ height: 22, borderRight: "1px solid rgba(0,0,0,0.1)" }}
                >
                  <div
                    className="absolute left-0 right-0 bg-foreground/25"
                    style={{ height: thick[si] || 1 }}
                  />
                  {hasDot && (
                    <div className="relative z-10 w-3 h-3 rounded-full border border-border bg-card flex items-center justify-center">
                      <span className="text-[7px] font-mono text-muted-foreground">{fi + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {tuning.length > 6 && (
          <p className="text-[9px] font-mono text-muted-foreground mt-1 ml-8">
            +{tuning.length - 6} more strings
          </p>
        )}

        {/* Dot row */}
        <div className="flex ml-8 mt-0.5">
          <div className="w-4 shrink-0" />
          {Array.from({ length: FRET_COUNT }, (_, fi) => (
            <div key={fi} className="flex-1 flex justify-center">
              {FRET_MARKERS.includes(fi + 1) && (
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  onNavigateToTuner: (p: { id: string; label: string; tuning: string[]; family: InstrumentFamily }) => void;
}

export function WireframeInstrument({ onNavigateToTuner }: Props) {
  const [family, setFamily] = useState<InstrumentFamily>("guitar");
  const [selectedId, setSelectedId] = useState("g6");

  // Lookup map for presets by family
  const PRESET_MAP = {
    guitar: GUITAR_PRESETS,
    bass: BASS_PRESETS,
    ukulele: UKULELE_PRESETS,
  };

  const DEFAULT_ID_MAP = {
    guitar: "g6",
    bass: "b4",
    ukulele: "u4",
  };

  const presets = PRESET_MAP[family];
  const all = [...GUITAR_PRESETS, ...BASS_PRESETS, ...UKULELE_PRESETS];
  const active = all.find((p) => p.id === selectedId) || presets[0];

  const handleFamilyChange = (f: InstrumentFamily) => {
    setFamily(f);
    setSelectedId(DEFAULT_ID_MAP[f]);
  };

  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-foreground mt-0.5">Pick Your Instrument</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Choose type and string configuration to begin.</p>
      </div>

      {/* Family toggle */}
      <div className="flex gap-1 p-1 bg-card border border-border rounded w-full">
        {(["guitar", "bass", "ukulele"] as InstrumentFamily[]).map((f) => (
          <button
            key={f}
            onClick={() => handleFamilyChange(f)}
            className={`flex-1 py-2 rounded text-sm font-mono capitalize transition-colors ${
              family === f ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {f === "guitar" ? "🎸" : "🎵"} {f}
          </button>
        ))}
      </div>

      {/* Preset list */}
      <div>
        <SectionLabel>Presets</SectionLabel>
        <div className="flex flex-col gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded border text-left transition-colors ${
                selectedId === p.id
                  ? "border-foreground bg-foreground/5"
                  : "border-border bg-card"
              }`}
            >
              <span className="font-mono text-2xl text-muted-foreground w-7 text-center shrink-0">
                {p.strings}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{p.label}</div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {p.tuning.slice(0, Math.min(p.strings, 6)).map((n, i) => (
                    <span key={i} className="text-[10px] font-mono px-1 py-0.5 bg-muted border border-border rounded">
                      {n}
                    </span>
                  ))}
                  {p.strings > 6 && (
                    <span className="text-[10px] font-mono px-1 py-0.5 bg-muted border border-border rounded text-muted-foreground">
                      +{p.strings - 6}
                    </span>
                  )}
                </div>
              </div>
              {selectedId === p.id && (
                <span className="text-xs font-mono text-foreground shrink-0">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fretboard preview */}
      <Box className="p-3">
        <div className="flex items-center justify-between mb-2">
          <SectionLabel>Fretboard Preview</SectionLabel>
          <span className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-muted">
            {active.label}
          </span>
        </div>
        <MobileFretboard tuning={active.tuning} family={family} />
        <p className="text-[9px] font-mono text-muted-foreground mt-2">
          [Toggles between bass, guitar & ukulele · notes update per tuning]
        </p>
      </Box>

      {/* CTA */}
      <button
        onClick={() => onNavigateToTuner({ id: active.id, label: active.label, tuning: active.tuning, family })}
        className="w-full py-3.5 rounded border border-foreground bg-primary text-primary-foreground font-mono text-sm font-bold"
      >
        → Tune {active.label}
      </button>
    </div>
  );
}