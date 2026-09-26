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

export type Flow = "landing" | "login" | "signup" | "app" | "privacy";

export interface NavState {
  flow: Flow;
  screen?: Screen;
}

export default function App() {
  // Navigation stack keeping track of full user journey
  const [history, setHistory] = useState<NavState[]>([
    { flow: "landing", screen: "instrument" },
  ]);
  const [activePresetId, setActivePresetId] = useState<string>("g6");

  // Current active view state is always the last item in history
  const currentState = history[history.length - 1];
  const flow = currentState.flow;
  const screen = currentState.screen || "instrument";

  // Helper to push a new view onto the stack
  const navigateTo = (newFlow: Flow, newScreen?: Screen) => {
    setHistory((prev) => [
      ...prev,
      { flow: newFlow, screen: newScreen ?? prev[prev.length - 1]?.screen ?? "instrument" },
    ]);
  };

  // Handler for going back one step
  const handleBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleNavigateToTuner = (preset: { id: string }) => {
    setActivePresetId(preset.id);
    navigateTo("app", "tune");
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-3 w-full min-h-[640px]">
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
              onGetStarted={() => navigateTo("signup")}
              onLogin={() => navigateTo("login")}
              onPrivacy={() => navigateTo("privacy")}
            />
          </AuthLayout>
        )}

        {flow === "login" && (
          <AuthLayout>
            <WireframeLogin
              onSignIn={() => navigateTo("app", "instrument")}
              onSignUp={() => navigateTo("signup")}
            />
          </AuthLayout>
        )}

        {flow === "signup" && (
          <AuthLayout>
            <WireframeSignup
              onSignIn={() => navigateTo("app", "instrument")}
              onSignUp={() => navigateTo("login")}
            />
          </AuthLayout>
        )}

        {flow === "privacy" && (
          <AuthLayout>
            <div className="w-full flex justify-between items-center px-6 py-4 border-b border-black/10 bg-white/40 backdrop-blur-sm">
              <button
                onClick={handleBack}
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                ← Back
              </button>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => navigateTo("login")}
                  className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo("signup")}
                  className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

            <Privacy onPrivacy={handleBack} />
          </AuthLayout>
        )}

        {/* Main App Screens */}
        {flow === "app" && (
          <AppLayout
            activeScreen={screen}
            onSelectScreen={(nextScreen) => navigateTo("app", nextScreen)}
            onBack={handleBack}
            canGoBack={history.length > 1}
            onSignOut={() => setHistory([{ flow: "landing", screen: "instrument" }])}
            onPrivacy={() => navigateTo("privacy")}
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