import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

const CHORD_TYPES: Record<string, number[]> = {
  "Major":       [0,4,7],
  "Minor":       [0,3,7],
  "Dom 7":       [0,4,7,10],
  "Maj 7":       [0,4,7,11],
  "Min 7":       [0,3,7,10],
  "Sus2":        [0,2,7],
  "Sus4":        [0,5,7],
  "Dim":         [0,3,6],
  "Aug":         [0,4,8],
  "Power (5th)": [0,7],
};

const SCALE_TYPES: Record<string, number[]> = {
  "Major":            [0,2,4,5,7,9,11],
  "Natural Minor":    [0,2,3,5,7,8,10],
  "Minor Pentatonic": [0,3,5,7,10],
  "Major Pentatonic": [0,2,4,7,9],
  "Blues":            [0,3,5,6,7,10],
  "Dorian":           [0,2,3,5,7,9,10],
  "Mixolydian":       [0,2,4,5,7,9,10],
  "Harmonic Minor":   [0,2,3,5,7,8,11],
};

const GUITAR_TUNING = ["E2","A2","D3","G3","B3","E4"];
const FRET_COUNT    = 8;
const FRET_MARKERS  = [3,5,7];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getNoteIdx(n: string) {
  return NOTES.indexOf(n.replace(/b/g,"#").replace("Db","C#").replace("Eb","D#").replace("Gb","F#").replace("Ab","G#").replace("Bb","A#"));
}
function getNoteName(idx: number) { return NOTES[((idx%12)+12)%12]; }
function getChordNotes(root: string, ivs: number[]) {
  const ri = getNoteIdx(root); return ivs.map(iv => getNoteName(ri+iv));
}
function getScaleNotes(root: string, ivs: number[]) {
  const ri = getNoteIdx(root); return ivs.map(iv => getNoteName(ri+iv));
}
function noteAtFret(open: string, fret: number) {
  const idx = NOTES.indexOf(open.replace(/[0-9]/g,""));
  return NOTES[(idx+fret)%12];
}

// ── Shared ────────────────────────────────────────────────────────────────────

function Box({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-border bg-card rounded ${className}`}>{children}</div>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-sans text-muted-foreground uppercase tracking-widest mb-1">{children}</p>;
}
function NoteSelect({ value, onChange }: { value: string; onChange: (v:string)=>void }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      className="bg-muted border border-border rounded px-2 py-1.5 text-sm font-sans text-foreground focus:outline-none">
      {NOTES.map(n=><option key={n}>{n}</option>)}
    </select>
  );
}

// ── Mobile Fretboard ──────────────────────────────────────────────────────────

function MobileFretboard({ highlight, label }: { highlight: string[]; label: string }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 270 }}>
        {/* Fret numbers */}
        <div className="flex ml-7 mb-0.5">
          <div className="w-4" />
          {Array.from({ length: FRET_COUNT }, (_,i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-xs font-sans text-muted-foreground">{i+1}</span>
            </div>
          ))}
        </div>
        {GUITAR_TUNING.map((open, si) => {
          const openLetter = open.replace(/[0-9]/g,"");
          const openHL = highlight.includes(openLetter);
          return (
            <div key={si} className="flex items-center mb-0.5">
              <div className="w-7 shrink-0 flex justify-end pr-1">
                <span className={`text-xs font-sans px-1 py-0.5 rounded border ${
                  openHL ? "bg-foreground text-primary-foreground border-foreground" : "bg-muted border-border text-muted-foreground"
                }`}>{openLetter}</span>
              </div>
              <div className="w-0.5 self-stretch bg-foreground/50 shrink-0" />
              {Array.from({ length: FRET_COUNT }, (_,fi) => {
                const note = noteAtFret(open, fi+1);
                const hl   = highlight.includes(note);
                const dot  = FRET_MARKERS.includes(fi+1);
                return (
                  <div key={fi} className="flex-1 flex items-center justify-center relative"
                    style={{ height:20, borderRight:"1px solid rgba(0,0,0,0.08)" }}>
                    <div className="absolute left-0 right-0 bg-foreground/20" style={{ height:1 }} />
                    {hl ? (
                      <div className="relative z-10 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                        <span className="text-xs font-sans font-bold text-primary-foreground">{note}</span>
                      </div>
                    ) : dot ? (
                      <div className="relative z-10 w-2.5 h-2.5 rounded-full border border-border bg-card" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
        <p className="text-xs font-sans text-muted-foreground mt-1 ml-7">
          ● = {label} · frets 1–{FRET_COUNT}
        </p>
      </div>
    </div>
  );
}

// ── Chord Finder ──────────────────────────────────────────────────────────────

function ChordFinder() {
  const [root, setRoot] = useState("A");
  const [type, setType] = useState("Minor");
  const ivs    = CHORD_TYPES[type] || [0,3,7];
  const notes  = getChordNotes(root, ivs);
  const labels = ["Root","3rd","5th","7th"];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        <div className="font-semibold flex flex-col gap-0.5">
          <SectionLabel>Root</SectionLabel>
          <NoteSelect value={root} onChange={setRoot} />
        </div>
        <div className="font-semibold flex flex-col gap-0.5 flex-1">
          <SectionLabel>Chord Type</SectionLabel>
          <select value={type} onChange={e=>setType(e.target.value)}
            className="bg-muted border border-border rounded px-2 py-1.5 text-sm font-semibold font-sans text-foreground focus:outline-none w-full">
            {Object.keys(CHORD_TYPES).map(k=><option key={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* Result badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded">
        <span className="text-sm font-sans font-bold text-foreground">{root} {type}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-sm font-sans text-muted-foreground">{notes.join(" – ")}</span>
      </div>

      {/* Note circles */}
      <div className="flex gap-2">
        {notes.map((n,i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-sans text-muted-foreground">{labels[i]}</span>
            <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-sans font-bold ${
              i===0 ? "bg-foreground border-foreground text-primary-foreground" : "bg-muted border-border text-foreground"
            }`}>{n}</div>
          </div>
        ))}
      </div>

      {/* Fretboard */}
      <Box className="p-3 font-semibold">
        <SectionLabel>Fretboard — {root} {type}</SectionLabel>
        <MobileFretboard highlight={notes} label={`${root} ${type}`} />
      </Box>
    </div>
  );
}

// ── Scale Finder ──────────────────────────────────────────────────────────────

function ScaleFinder() {
  const [root,  setRoot]  = useState("A");
  const [scale, setScale] = useState("Minor Pentatonic");
  const ivs   = SCALE_TYPES[scale] || [0,2,4,5,7,9,11];
  const notes = getScaleNotes(root, ivs);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        <div className="font-semibold flex flex-col gap-0.5">
          <SectionLabel>Root</SectionLabel>
          <NoteSelect value={root} onChange={setRoot} />
        </div>
        <div className="font-semibold flex flex-col gap-0.5 flex-1">
          <SectionLabel>Scale Type</SectionLabel>
          <select value={scale} onChange={e=>setScale(e.target.value)}
            className="bg-muted border border-border rounded px-2 py-1.5 text-sm font-sans text-foreground focus:outline-none w-full">
            {Object.keys(SCALE_TYPES).map(k=><option key={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-wrap gap-1">
        {notes.map((n,i) => (
          <span key={i} className={`px-2 py-1 rounded border text-sm font-sans font-bold ${
            i===0 ? "bg-foreground text-primary-foreground border-foreground" : "bg-muted text-foreground border-border"
          }`}>
            {i===0 ? `R:${n}` : n}
          </span>
        ))}
      </div>

      {/* Fretboard */}
      <Box className="p-3 font-semibold">
        <SectionLabel>Fretboard — {root} {scale}</SectionLabel>
        <MobileFretboard highlight={notes} label={`${root} ${scale}`} />
      </Box>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function WireframeTools() {
  const [tool, setTool] = useState<"chord"|"scale">("chord");

  return (
    <div className="px-4 py-4 flex flex-col gap-4">

      {/* Header */}
      <div>
    
        <h2 className="text-base font-bold text-foreground mt-0.5">Tools</h2>
        <p className="text-sm font-semibold text-primary">Chord Finder · Scale Finder</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-0.5 bg-card border border-border rounded">
        {([
          { id: "chord", label: "Chord Finder" },
          { id: "scale", label: "Scale Finder" },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`flex-1 py-1.5 rounded text-sm font-sans transition-colors ${
              tool===t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tool==="chord" && <ChordFinder />}
      {tool==="scale" && <ScaleFinder />}
    </div>
  );
}
