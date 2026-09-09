import { useState, useEffect, useRef } from "react";
import { Search, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const SONGS = [
  {
    id: 1, title: "Wonderwall", artist: "Oasis", key: "F#m",
    tempo: "87 BPM", difficulty: "Beginner", tuning: "Standard",
    sections: [
      {
        name: "Verse",
        lines: [
          { chords: ["Em7","G","Dsus4","A7sus4"], lyric: "Today is gonna be the day they're gonna throw it back to you" },
          { chords: ["Em7","G","Dsus4","A7sus4"], lyric: "By now you should've somehow realized what you gotta do" },
        ],
      },
      {
        name: "Chorus",
        lines: [
          { chords: ["C","D","Em",""], lyric: "And all the roads we have to walk are winding" },
          { chords: ["C","D","Em",""], lyric: "And all the lights that lead us there are blinding" },
          { chords: ["C","Em7","G","C"], lyric: "Because maybe, you're gonna be the one that saves me" },
        ],
      },
    ],
  },
  {
    id: 2, title: "Blackbird", artist: "The Beatles", key: "G",
    tempo: "96 BPM", difficulty: "Intermediate", tuning: "Standard",
    sections: [
      {
        name: "Verse",
        lines: [
          { chords: ["G","Am7","G/B","G"], lyric: "Blackbird singing in the dead of night" },
          { chords: ["C","C#","D","Em"], lyric: "Take these broken wings and learn to fly" },
          { chords: ["Am","C/G","F#m","F"], lyric: "All your life" },
        ],
      },
    ],
  },
  {
    id: 3, title: "Nothing Else Matters", artist: "Metallica", key: "Em",
    tempo: "69 BPM", difficulty: "Intermediate", tuning: "Standard",
    sections: [
      {
        name: "Verse",
        lines: [
          { chords: ["Em","","Em",""], lyric: "So close, no matter how far" },
          { chords: ["Em","","Em",""], lyric: "Couldn't be much more from the heart" },
          { chords: ["D","C","Am","Em"], lyric: "Forever trusting who we are — nothing else matters" },
        ],
      },
    ],
  },
  {
    id: 4, title: "Sweet Home Chicago", artist: "Robert Johnson", key: "E",
    tempo: "120 BPM", difficulty: "Advanced", tuning: "Open G",
    sections: [
      {
        name: "Verse",
        lines: [
          { chords: ["E7","","E7",""], lyric: "Oh baby don't you want to go" },
          { chords: ["A7","","E7","B7"], lyric: "Back to the land of California, to my sweet home Chicago" },
        ],
      },
    ],
  },
  {
    id: 5, title: "Smoke on the Water", artist: "Deep Purple", key: "Gm",
    tempo: "112 BPM", difficulty: "Beginner", tuning: "Standard",
    sections: [
      {
        name: "Riff",
        lines: [
          { chords: ["Gm","Bb","C#",""], lyric: "We all came out to Montreux" },
          { chords: ["Gm","Bb","Eb C#",""], lyric: "On the Lake Geneva shoreline" },
        ],
      },
    ],
  },
];

const DIFFICULTIES = ["All","Beginner","Intermediate","Advanced"];

function Box({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-border bg-card rounded ${className}`}>{children}</div>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-sans text-muted-foreground uppercase tracking-widest mb-1">{children}</p>;
}

function ChordToken({ chord }: { chord: string }) {
  if (!chord.trim()) return <span className="inline-block w-12" />;
  return (
    <span className="inline-block text-sm font-sans font-bold text-foreground bg-muted border border-border rounded px-1 py-0.5 mr-1 min-w-[40px] text-center">
      {chord}
    </span>
  );
}

export function WireframeSongs() {
  const [query,      setQuery]      = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [selected,   setSelected]   = useState<number|null>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [speed,      setSpeed]      = useState(2);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const interval    = useRef<ReturnType<typeof setInterval>|null>(null);

  const filtered = SONGS.filter(s => {
    const q = query.toLowerCase();
    return (
      (!q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)) &&
      (difficulty === "All" || s.difficulty === difficulty)
    );
  });

  const activeSong = SONGS.find(s => s.id === selected);

  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    if (autoScroll && scrollRef.current) {
      interval.current = setInterval(() => scrollRef.current?.scrollBy({ top: speed }), 50);
    }
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [autoScroll, speed]);

  // Song viewer (full-screen when open)
  if (activeSong) {
    return (
      <div className="flex flex-col h-full">
        {/* Song header bar */}
        <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3">
          <button
            onClick={() => { setSelected(null); setAutoScroll(false); }}
            className="w-7 h-7 rounded border border-border bg-muted flex items-center justify-center shrink-0"
          >
            <ChevronLeft size={14} className="text-muted-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{activeSong.title}</p>
            <p className="text-sm font-sans font-normal text-muted-foreground">{activeSong.artist}</p>
          </div>
          <button
            onClick={() => setAutoScroll(a => !a)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded border text-sm font-sans shrink-0 ${
              autoScroll ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-foreground"
            }`}
          >
            {autoScroll ? <Pause size={10} /> : <Play size={10} />}
            Auto
          </button>
        </div>

        {/* Meta tags */}
        <div className="px-4 py-2 bg-card border-b border-border flex flex-wrap gap-1.5">
          {[activeSong.key, activeSong.tempo, activeSong.tuning, activeSong.difficulty].map((tag, i) => (
            <span key={i} className="text-sm font-sans px-1.5 py-0.5 bg-muted border border-border rounded">{tag}</span>
          ))}
          {autoScroll && (
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-sm font-sans text-muted-foreground">Speed</span>
              <input
                type="range" min={1} max={6} value={speed}
                onChange={e => setSpeed(Number(e.target.value))}
                className="w-16 accent-foreground"
              />
              <span className="text-sm font-sans text-muted-foreground">{speed}x</span>
            </div>
          )}
        </div>

        {/* Chord + lyric sheet */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
          {activeSong.sections.map((sec, si) => (
            <div key={si} className="mb-6">
              <p className="text-sm font-sans text-muted-foreground uppercase tracking-widest border-b border-border pb-1 mb-3">
                {sec.name}
              </p>
              {sec.lines.map((line, li) => (
                <div key={li} className="mb-4">
                  <div className="flex flex-wrap mb-0.5">
                    {line.chords.map((ch, ci) => <ChordToken key={ci} chord={ch} />)}
                  </div>
                  <p className="text-sm font-sans text-foreground leading-relaxed">{line.lyric}</p>
                </div>
              ))}
            </div>
          ))}
          <div className="py-6 text-center text-sm font-sans text-muted-foreground border-t border-border">
            [ End of song ]
          </div>
        </div>
      </div>
    );
  }

  // Song list
  return (
    <div className="px-4 py-4 flex flex-col gap-4">

      {/* Header */}
      <div>
       
        <h2 className="text-base font-bold text-foreground mt-0.5">Songs</h2>
        <p className="text-sm text-primary">Search lyrics & chords — auto-scroll while you play.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search songs or artists…"
          className="w-full pl-8 pr-4 py-2 bg-card border border-border rounded text-sm font-sans text-foreground focus:outline-none focus:border-foreground/60 placeholder:text-muted-foreground"
        />
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-1 p-0.5 bg-card border border-border rounded">
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={`flex-1 py-1 rounded text-sm font-sans transition-colors ${
              difficulty === d ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {d === "All" ? "All" : d === "Beginner" ? "Beg" : d === "Intermediate" ? "Int" : "Adv"}
          </button>
        ))}
      </div>

      {/* Song list */}
      <Box>
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-sm font-sans text-muted-foreground">No songs found</p>
        )}
        {filtered.map((song, i) => (
          <button
            key={song.id}
            onClick={() => setSelected(song.id)}
            className="w-full flex items-start gap-3 px-4 py-3 text-left border-b border-border last:border-0 active:bg-muted/50"
          >
            <span className="text-sm font-sans text-muted-foreground w-4 shrink-0 mt-0.5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{song.title}</p>
              <p className="text-sm font-sans text-muted-foreground">{song.artist}</p>
              <div className="flex gap-1 mt-1 flex-wrap">
                <span className="text-xs font-sans px-1 py-0.5 bg-muted border border-border rounded">{song.tuning}</span>
                <span className="text-xs font-sans px-1 py-0.5 bg-muted border border-border rounded">{song.key}</span>
                <span className="text-xs font-sans px-1 py-0.5 bg-muted border border-border rounded">{song.difficulty}</span>
              </div>
            </div>
            <ChevronRight size={13} className="text-muted-foreground shrink-0 mt-1" />
          </button>
        ))}
      </Box>

      <p className="text-xs font-sans text-muted-foreground">
        [Tap a song to open chord+lyric view with auto-scroll]
      </p>
    </div>
  );
}
