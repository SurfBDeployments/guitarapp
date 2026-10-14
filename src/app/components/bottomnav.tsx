
import {
    Guitar,
    Music4,
    SlidersHorizontal,
    LucideIcon,
    Radio,
} from "lucide-react";


export type Screen = "instrument" | "tune" | "music" | "tools";
const NAV: { id: Screen; label: string; icon: LucideIcon }[] = [
    { id: "instrument", label: "Instrument", icon: Guitar },
    { id: "tune", label: "Tune", icon: Radio },
    { id: "music", label: "Music", icon: Music4 },
    { id: "tools", label: "Tools", icon: SlidersHorizontal },
];



export function BottomNav({
    activeScreen,
    onSelect,
}: {
    activeScreen?: Screen | null; // Make it optional
    onSelect: (id: Screen) => void;
}) {
    return (
        <div
            className="border-t border-border flex items-stretch shrink-0"
            style={{ height: 75, background: "#ffffff", padding: "10px" }}
        >
            {NAV.map((n) => {
                const Icon = n.icon;
                const active = activeScreen === n.id;
                return (
                    <button
                        key={n.id}
                        onClick={() => onSelect(n.id)}
                        className={`relative flex-1 flex flex-col items-center justify-center gap-1 ${active
                            ? "text-accent-foreground"
                            : "accent-foreground hover:bg-muted/50"
                            }`}
                    >
                        <Icon size={18} />
                        <span
                            className={`text-sm font-sans ${active ? "font-semibold" : "font-normal"
                                }`}
                        >
                            {n.label}
                        </span>
                        {active && (
                            <div className="absolute bottom-1 w-4 h-0.5 rounded-full accent-foreground" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}