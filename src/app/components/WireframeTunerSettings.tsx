
import { ChevronRight } from "lucide-react";
import highendbassImg from "../../imports/highendbass.png";
import electricGuitarImg from "../../imports/ibanez.png";
import ukuleleImg from "../../imports/uke_sm.png";

type Instrument = "guitar" | "bass" | "ukulele";





const INSTRUMENTS: { id: Instrument; label: string; image: string }[] = [
  { id: "guitar", label: "Electric Guitar", image: electricGuitarImg },
  { id: "bass", label: "Bass Guitar", image: highendbassImg },
  { id: "ukulele", label: "Ukulele", image: ukuleleImg },
];


const TUNINGS: Record<Instrument, string[]> = {
  guitar: [
    "Standard (E-A-D-G-B-E)",
    "Half-Step Down (Eb-Ab-Db-Gb-Bb-Eb)",
    "Drop D (D-A-D-G-B-E)",
    "Open G (D-G-D-G-B-D)",
    "Open E (E-B-E-G#-B-E)",
    "DADGAD",
  ],
  bass: [
    "Standard (E-A-D-G)",
    "Half-Step Down (Eb-Ab-Db-Gb)",
    "Whole-Step Down / D Standard (DGCF)",
    "Drop D (D-A-D-G)",
    "Drop C tuning (CGCF)",
    "5 String Standard BEADG",
  ],

  ukulele: [
    "Standard (G-C-E-A)",
    "Low G (G-C-E-A)",
    "D Tuning (A-D-F#-B)",
    "Slack Key (G-C-E-G)",
  ],
};

interface Props {
  onBack: () => void;
  instrument: Instrument;
  tuning: string;
  soundDisabled: boolean;
  onInstrumentChange: (i: Instrument) => void;
  onTuningChange: (t: string) => void;
  onSoundToggle: () => void;
}

export type { Instrument };


export function WireframeTunerSettings({

  instrument,
  tuning,
  soundDisabled,
  onInstrumentChange,
  onTuningChange,
  onSoundToggle,
}: Props) {
  const tunings = TUNINGS[instrument];

  return (
    <div className="flex flex-col min-h-full">


      {/* Scrollable content */}
      <div className="px-5 py-4 flex flex-col gap-5">

        {/* Disable Sound */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-base text-foreground">Disable Sound</span>
          <button
            onClick={onSoundToggle}
            aria-label="Toggle sound"
            className={`relative inline-flex items-center w-12 h-6 rounded-full border-2 transition-colors ${soundDisabled
              ? "border-foreground"
              : "border-border"
              }`}
            style={{
              background: soundDisabled ? "#2c2c2c" : "#ccc",
            }}
          >
            <span
              className="inline-block w-4 h-4 rounded-full bg-white transition-colors"
              style={{
                transform: soundDisabled ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </button>
        </div>

        {/* Instrument */}
        {/* Instrument Section */}
        <div>
          <p className="font-bold text-base text-foreground mb-1">Instrument</p>
          <div className="flex flex-col">
            {INSTRUMENTS.map((ins) => (
              <button
                key={ins.id}
                onClick={() => {
                  onInstrumentChange(ins.id);
                  onTuningChange(TUNINGS[ins.id][0]);
                }}
                className="flex items-center justify-between py-3 border-border last:border-b-0 w-full"
              >
                {/* Left side: Image + Label */}
                <div className="flex items-center gap-3">
                  <img
                    src={ins.image}
                    alt={ins.label}
                    className="object-contain drop-shadow-md"
                    style={{ width: 30, height: 30 }}
                  />
                  <span className="text-sm font-medium text-foreground">{ins.label}</span>
                </div>

                {/* Right side: Custom Radio Circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${instrument === ins.id
                    ? "border-foreground"
                    : "border-muted-foreground"
                    }`}
                >
                  {instrument === ins.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tuning Pitch */}
        <button className="flex items-center justify-between py-1 w-full text-left">
          <div>
            <p className="font-bold text-base text-foreground">Tuning Pitch</p>
            <p className="text-sm text-foreground mt-0.5">A: 440 Hz</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>

        {/* Tunings */}
        <div>
          <p className="font-bold text-base text-foreground mb-1">Tunings</p>
          <div className="flex flex-col">
            {tunings.map(t => (
              <button
                key={t}
                onClick={() => onTuningChange(t)}
                className="flex items-center justify-between py-3.5 w-full text-left"
              >
                <span className="text-sm text-foreground w-full">{t}</span>
                {tuning === t && (
                  <span className="text-foreground text-base font-medium">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
