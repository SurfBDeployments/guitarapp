import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Top Status Bar Only */}
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

      {/* Screen Content (Landing / Login / Signup) */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}