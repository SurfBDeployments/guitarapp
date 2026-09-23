import React, { useState } from "react";
import {
    Guitar,
    Menu,
    Music4,
    SlidersHorizontal,
    LucideIcon,
    Share2,
    HelpCircle,
    Lock,
    X,
    Radio,
    ClefTreble,
    ListMusic,
    ChevronRight,
} from "lucide-react";

import Guitars from "../../imports/10guitarpdpherocropbw.png";

export type Screen = "instrument" | "tune" | "music" | "tools";

const NAV: { id: Screen; label: string; icon: LucideIcon }[] = [
    { id: "instrument", label: "Instrument", icon: Guitar },
    { id: "tune", label: "Tune", icon: Radio },
    { id: "music", label: "Music", icon: Music4 },
    { id: "tools", label: "Tools", icon: SlidersHorizontal },
];

interface ProfileOverlayProps {
    onClose: () => void;
    onSignOut: () => void;
}

function ProfileOverlay({ onClose, onSignOut }: ProfileOverlayProps) {
    return (
        <div className="absolute inset-0 z-40 flex" onClick={onClose}>
            <div
                className="relative flex flex-col overflow-y-auto"
                style={{ width: "80%", background: "#ffffff", flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative flex items-end px-5 pb-5"
                    style={{
                        height: 175,
                        background: "#000000",
                        backgroundImage: `url(${Guitars})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <p
                        className="relative z-10 font-bold italic font-sans"
                        style={{
                            fontSize: 26,
                            color: "#ffffff",
                            letterSpacing: "-0.02em",
                            marginBottom: "40px",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        JamMaster Tuning
                    </p>
                </div>

                <div className="px-5 py-5 border-b border-border">
                    <p className="text-sm font-bold text-foreground mb-3">My Profile</p>
                    <p className="text-sm font-medium text-foreground">Brian M</p>
                    <p className="text-sm text-foreground mt-0.5 underline cursor-pointer">
                        jamMaster@gmail.com
                    </p>
                    <button
                        className="mt-3 text-sm font-medium text-[#c0392b]"
                        onClick={onSignOut}
                    >
                        Sign Out
                    </button>
                </div>

                <div className="px-5 py-5 border-b border-border">
                    <p className="text-sm font-bold text-foreground mb-4">Tool Settings</p>
                    <div className="flex flex-col gap-3.5">
                        {[
                            { label: "Tuner", Icon: Radio },
                            { label: "Scales", Icon: ClefTreble },
                            { label: "Chords", Icon: ListMusic },
                        ].map(({ label, Icon }) => (
                            <div key={label} className="flex items-center justify-start gap-4">
                                <Icon size={18} className="text-muted-foreground" />
                                <span className="text-sm text-foreground">{label}</span>
                                <ChevronRight size={15} className="text-muted-foreground ml-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-5 py-5">
                    <p className="text-sm font-bold text-foreground mb-4">Tuner Support</p>
                    <div className="flex flex-col gap-3.5">
                        {[
                            { label: "App Share", Icon: Share2 },
                            { label: "Help?", Icon: HelpCircle },
                            { label: "Privacy", Icon: Lock },
                        ].map(({ Icon, label }) => (
                            <div key={label} className="flex items-center justify-start gap-4">
                                <Icon size={18} className="text-muted-foreground" />
                                <span className="text-sm text-foreground">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto px-5 py-4 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center font-mono">
                        JamMaster Tuning
                    </p>
                </div>
            </div>

            <div
                className="flex-1 flex flex-col items-center pt-3"
                style={{ background: "linear-gradient(to bottom, #FFE8A3 95%, #ffffff 100%)" }}
            >
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

function BottomNav({
    activeScreen,
    onSelect,
}: {
    activeScreen: Screen;
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

export function AppLayout({
    children,
    activeScreen,
    onSelectScreen,
    onSignOut,
}: {
    children: React.ReactNode;
    activeScreen: Screen;
    onSelectScreen: (id: Screen) => void;
    onSignOut: () => void;
}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Drawer Overlay */}
            {menuOpen && (
                <ProfileOverlay
                    onClose={() => setMenuOpen(false)}
                    onSignOut={() => {
                        setMenuOpen(false);
                        onSignOut();
                    }}
                />
            )}

            {/* Status Bar */}
            <div
                className="flex items-center justify-between px-6 pt-3 pb-1 border-b border-border shrink-0"
                style={{ background: "rgba(255,232,163,0.85)", height: 44 }}
            >
                <span className="text-sm font-sans text-primary">9:41</span>
                <div className="w-24 h-5 rounded-full bg-[#222] absolute left-1/2 -translate-x-1/2 top-2" />
                <div className="flex items-center gap-1">
                    <span className="text-sm font-sans text-primary">●●●</span>
                </div>
            </div>

            {/* Top Header with Hamburger */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
                <span className="font-sans font-bold text-lg text-foreground tracking-wide">
                    JamMaster Tuning
                </span>
                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                    className="w-7 h-7 rounded border border-border flex items-center justify-center"
                >
                    <Menu size={14} className="text-foreground" />
                </button>
            </div>

            {/* Active Screen View */}
            <div className="flex-1 overflow-y-auto">{children}</div>

            {/* Bottom Nav Bar */}
            <BottomNav activeScreen={activeScreen} onSelect={onSelectScreen} />
        </div>
    );
}