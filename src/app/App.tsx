import { useState } from "react";
import { AuthLayout } from "./auth/Layout";
import { AppLayout, Screen } from "./components/AppLayout";
import { WireframeInstrument } from "./components/WireframeInstrument";
import { WireframeTuner } from "./components/WireframeTuner";
import { WireframeSongs } from "./components/WireframeSongs";
import { WireframeTools } from "./components/WireframeTools";
import { WireframeLanding } from "./components/WireframeLanding";
import { WireframeLogin } from "./components/WireframeLogin";
import { WireframeSignup } from "./components/WireframeSignup";
import Privacy from "./components/Privacy";

type Flow = "landing" | "login" | "signup" | "app" | "privacy";

export default function App() {
  const [flow, setFlow] = useState<Flow>("landing");
  const [screen, setScreen] = useState<Screen>("instrument");
  const [activePresetId, setActivePresetId] = useState<string>("g6");

  const handleNavigateToTuner = (preset: { id: string }) => {
    setActivePresetId(preset.id);
    setScreen("tune");
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-3 w-full min-h-[640px]">
      {/* Phone / Main Container Frame */}
      <div
        className="relative overflow-hidden shadow-2xl flex flex-col w-full max-w-[800px] min-h-[640px]"
        style={{
          background: "linear-gradient(to bottom, #FFE8A3 5%, #ffffff 95%)",
        }}
      >
        {/* Auth Flow Screens */}
        {flow === "landing" && (
          <AuthLayout>
            <WireframeLanding
              onGetStarted={() => setFlow("signup")}
              onLogin={() => setFlow("login")}
              onPrivacy={() => setFlow("privacy")}
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
            <WireframeSignup
              onSignIn={() => setFlow("app")}
              onSignUp={() => setFlow("login")}
            />
          </AuthLayout>
        )}

        {flow === "privacy" && (
          <AuthLayout>
            {/* Added top navigation header bar inside Privacy flow */}
            <div className="w-full flex justify-between items-center px-6 py-4 border-b border-black/10 bg-white/40 backdrop-blur-sm">
              <button
                onClick={() => setFlow("landing")}
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                ← Back
              </button>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setFlow("login")}
                  className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setFlow("signup")}
                  className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

            <Privacy onPrivacy={() => setFlow("landing")} />
          </AuthLayout>
        )}

        {/* Main App Screens */}
        {flow === "app" && (
          <AppLayout
            activeScreen={screen}
            onSelectScreen={setScreen}
            onSignOut={() => setFlow("landing")}
            onPrivacy={() => setFlow("privacy")}
          >
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
    </div>
  );
}