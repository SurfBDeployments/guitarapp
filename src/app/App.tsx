import { useState } from "react";
import { AuthLayout } from "./auth/Layout";
import { AppLayout, Screen } from "./components/AppLayout";
import { WireframeInstrument } from "./components/WireframeInstrument";
import { WireframeTuner } from "./components/WireframeTuner";
import { WireframeSongs } from "./components/WireframeSongs";
import { WireframeTools } from "./components/WireframeTools";
import { WireframeLanding } from "./components/WireframeLanding";
import { WireframeLogin } from "./components/WireframeLogin";

type Flow = "landing" | "login" | "signup" | "app";

export default function App() {
  // Default to landing page on startup
  const [flow, setFlow] = useState<Flow>("landing");
  const [screen, setScreen] = useState<Screen>("instrument");
  const [activePresetId, setActivePresetId] = useState<string>("g6");

  const handleNavigateToTuner = (preset: { id: string }) => {
    setActivePresetId(preset.id);
    setScreen("tune");
  };

  return (

    <div className="flex flex-col items-center gap-3 w-full max-w-[1024px] min-h-[640px]">
      {/* Phone Frame */}
      <div
        className="relative bg-background  overflow-scroll shadow-2xl flex flex-col"
        style={{
          width: "100%",
          maxWidth: 800,
          height: "100%",

          /* border: "10px solid #222",
          boxShadow: "0 0 0 2px #444, 0 32px 64px rgba(0,0,0,0.45)", */
          background: "linear-gradient(to bottom, #FFE8A3 5%, #ffffff 95%)",
        }}
      >
        {/* Auth Flow Screens (Landing, Login, Signup) - No Top Nav */}
        {flow === "landing" && (
          <AuthLayout>
            <WireframeLanding
              onGetStarted={() => setFlow("signup")}
              onLogin={() => setFlow("login")}
            />
          </AuthLayout>
        )}

        {flow === "login" && (
          <AuthLayout>
            <WireframeLogin
              onSignIn={() => setFlow("app")}
              onSignUp={() => setFlow("signup")}
            />
          </AuthLayout>
        )}

        {flow === "signup" && (
          <AuthLayout>
            <WireframeLogin
              onSignIn={() => setFlow("app")}
              onSignUp={() => setFlow("login")}
            />
          </AuthLayout>
        )}

        {/* Main App Screens - With Top Nav & Bottom Nav */}
        {flow === "app" && (
          <AppLayout activeScreen={screen} onSelectScreen={setScreen}>
            {screen === "instrument" && (
              <WireframeInstrument onNavigateToTuner={handleNavigateToTuner} />
            )}
            {screen === "tune" && (
              <WireframeTuner selectedPresetId={activePresetId} />
            )}
            {screen === "music" && <WireframeSongs />}
            {screen === "tools" && <WireframeTools />}
          </AppLayout>
        )}
      </div>

      {/* Debug Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#666]">
        {(["landing", "login", "signup", "app"] as Flow[]).map((f, i) => (
          <span key={f} className="flex items-center gap-2">
            {i > 0 && <span className="text-[#999]">→</span>}
            <button
              onClick={() => setFlow(f)}
              className={`underline-offset-2 ${flow === f
                ? "text-[#333] font-bold underline"
                : "text-[#888] hover:text-[#555]"
                }`}
            >
              {f === "app"
                ? "App"
                : f === "landing"
                  ? "Landing"
                  : f === "login"
                    ? "Log In"
                    : "Sign Up"}
            </button>
          </span>
        ))}
      </div>
    </div>

  );
}