import { useState } from "react";
import { ChevronRight, Guitar, Music2 } from "lucide-react";

type InstrumentType = "guitar" | "bass";

const GUITAR_PRESETS = [
  { id: "guitar-6", label: "6-String Guitar", strings: 6, tuning: ["E2", "A2", "D3", "G3", "B3", "E4"] },
  { id: "guitar-7", label: "7-String Guitar", strings: 7, tuning: ["B1", "E2", "A2", "D3", "G3", "B3", "E4"] },
  { id: "guitar-12", label: "12-String Guitar", strings: 12, tuning: ["E2", "E3", "A2", "A3", "D3", "D4", "G3", "G4", "B3", "B3", "E4", "E4"] },
];

const BASS_PRESETS = [
  { id: "bass-4", label: "4-String Bass", strings: 4, tuning: ["E1", "A1", "D2", "G2"] },
  { id: "bass-5", label: "5-String Bass", strings: 5, tuning: ["B0", "E1", "A1", "D2", "G2"] },
  { id: "bass-6", label: "6-String Bass", strings: 6, tuning: ["B0", "E1", "A1", "D2", "G2", "C3"] },
];

const NOTE_COLORS: Record<string, string> = {
  E: "#e8a020", A: "#60a5fa", D: "#4ade80", G: "#f472b6",
  B: "#a78bfa", C: "#f97316", F: "#34d399", B0: "#c084fc",
};

function getNoteColor(note: string) {
  const letter = note.replace(/[0-9]/g, "");
  return NOTE_COLORS[letter] || "#7a7a8c";
}

interface FretboardProps {
  tuning: string[];
  strings: number;
  instrumentType: InstrumentType;
}

function Fretboard({ tuning, strings, instrumentType }: FretboardProps) {
  const frets = 12;
  const displayTuning = tuning.slice(0, Math.min(strings, 6));

  const SEMITONES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  function getNoteAtFret(openNote: string, fret: number): string {
    const letter = openNote.replace(/[0-9]/g, "");
    const octave = parseInt(openNote.replace(/[A-Z#]/g, "")) || 2;
    const baseIdx = SEMITONES.indexOf(letter);
    if (baseIdx === -1) return openNote;
    const newIdx = (baseIdx + fret) % 12;
    const newOctave = octave + Math.floor((baseIdx + fret) / 12);
    return SEMITONES[newIdx] + newOctave;
  }

  const dotFrets = [3, 5, 7, 9, 12];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="flex items-center mb-2">
          <div className="w-10 text-center text-sm text-primary font-sans">Open</div>
          {Array.from({ length: frets }, (_, i) => (
            <div key={i} className="flex-1 text-center text-sm text-primary font-sans relative">
              {i + 1}
              {dotFrets.includes(i + 1) && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>

        {displayTuning.map((openNote, stringIdx) => (
          <div key={stringIdx} className="flex items-center mb-1">
            <div
              className="w-10 h-7 rounded flex items-center justify-center text-sm font-sans font-bold border"
              style={{ color: getNoteColor(openNote), borderColor: getNoteColor(openNote) + "44", background: getNoteColor(openNote) + "18" }}
            >
              {openNote.replace(/[0-9]/g, "")}
            </div>
            <div className="flex-1 relative flex items-center">
              <div
                className="absolute left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(to right, ${getNoteColor(openNote)}88, ${getNoteColor(openNote)}22)`,
                  height: instrumentType === "bass" ? "2px" : "1px",
                  marginTop: instrumentType === "bass" ? `${(stringIdx * 0.3)}px` : "0",
                }}
              />
              {Array.from({ length: frets }, (_, fretIdx) => {
                const note = getNoteAtFret(openNote, fretIdx + 1);
                const noteLetter = note.replace(/[0-9]/g, "");
                const color = getNoteColor(openNote);
                const isMarkerFret = dotFrets.includes(fretIdx + 1);
                return (
                  <div
                    key={fretIdx}
                    className="flex-1 h-7 flex items-center justify-center relative"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {isMarkerFret && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-sans font-bold cursor-pointer hover:opacity-100 opacity-60 transition-opacity"
                        style={{ background: color + "22", color, border: `1px solid ${color}44` }}
                        title={`${noteLetter} (fret ${fretIdx + 1})`}
                      >
                        {noteLetter}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {strings > 6 && (
          <p className="text-sm text-primary mt-2 text-center">
            Showing 6 of {strings} strings · Full view available in Tuner
          </p>
        )}
      </div>
    </div>
  );
}

interface InstrumentPickerProps {
  onSelect: (preset: { id: string; label: string; strings: number; tuning: string[]; type: InstrumentType }) => void;
}

export function InstrumentPicker({ onSelect }: InstrumentPickerProps) {
  const [tab, setTab] = useState<InstrumentType>("guitar");
  const [selected, setSelected] = useState<string>("guitar-6");

  const presets = tab === "guitar" ? GUITAR_PRESETS : BASS_PRESETS;
  const activePreset = [...GUITAR_PRESETS, ...BASS_PRESETS].find(p => p.id === selected) || GUITAR_PRESETS[0];

  function handleSelect(preset: typeof GUITAR_PRESETS[0]) {
    setSelected(preset.id);
    onSelect({ ...preset, type: tab });
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-foreground tracking-tight">Pick Your Instrument</h1>
        <p className="text-muted-foreground mt-1">Choose your instrument type and string configuration to begin tuning.</p>
      </div>

      {/* Toggle */}
      <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
        {(["guitar", "bass"] as InstrumentType[]).map(t => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setSelected(t === "guitar" ? "guitar-6" : "bass-4");
            }}
            className={`px-6 py-2 rounded-md transition-all flex items-center gap-2 ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "guitar" ? <Guitar size={16} /> : <Music2 size={16} />}
            <span className="capitalize">{t}</span>
          </button>
        ))}
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {presets.map(preset => {
          const isActive = selected === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelect(preset)}
              className={`relative p-4 rounded-xl border text-left transition-all hover:border-primary/50 ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {isActive && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
              )}
              <div className={`font-sans text-2xl mb-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {preset.strings}
              </div>
              <div className="text-foreground">{preset.label}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {preset.tuning.slice(0, preset.strings > 6 ? 6 : preset.strings).map((note, i) => (
                  <span
                    key={i}
                    className="text-sm font-sans px-1.5 py-0.5 rounded"
                    style={{
                      color: getNoteColor(note),
                      background: getNoteColor(note) + "18",
                      border: `1px solid ${getNoteColor(note)}33`,
                    }}
                  >
                    {note.replace(/[0-9]/g, "")}
                  </span>
                ))}
                {preset.strings > 6 && (
                  <span className="text-sm font-sans px-1.5 py-0.5 rounded text-muted-foreground bg-muted">
                    +{preset.strings - 6}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Fretboard Preview */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Fretboard Preview</h3>
          <span className="text-sm text-primary font-sans uppercase tracking-widest">
            {activePreset.label}
          </span>
        </div>
        <Fretboard
          tuning={activePreset.tuning}
          strings={activePreset.strings}
          instrumentType={tab}
        />
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect({ ...activePreset, type: tab })}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
      >
        Tune {activePreset.label}
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
