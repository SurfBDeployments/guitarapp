import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full relative" style={{
      minHeight: "800px"
    }}>


      {/* Screen Content (Landing / Login / Signup) */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}