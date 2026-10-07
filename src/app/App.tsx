import { useState } from "react";
import { AuthLayout } from "./auth/Layout";
import { AppLayout, Screen } from "./components/AppLayout";
import { Instrument } from "./components/Instrument";
import { WireframeTuner } from "./components/WireframeTuner";
import { Songs } from "./components/Songs";
import { Tools } from "./components/Tools";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ForgotPassword } from "./components/Forgotpassword";
import { WireframeTunerSettings, Instrument as InstrumentType } from "./components/WireframeTunerSettings";
import Privacy from "./components/Privacy";

export type Flow = "landing" | "login" | "signup" | "app" | "privacy" | "forgot" | "tunings";

export interface NavState {
  flow: Flow;
  screen?: Screen;
}

export default function App() {
  const [history, setHistory] = useState<NavState[]>([
    { flow: "landing", screen: "instrument" },
  ]);
  const [activePresetId, setActivePresetId] = useState<string>("g6");

  // Global Tuner Settings State
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>("guitar");
  const [selectedTuning, setSelectedTuning] = useState<string>("Standard (E-A-D-G-B-E)");
  const [soundDisabled, setSoundDisabled] = useState<boolean>(false);

  const currentState = history[history.length - 1];
  const flow = currentState.flow;
  const screen = currentState.screen || "instrument";

  const navigateTo = (newFlow: Flow, newScreen?: Screen) => {
    setHistory((prev) => [
      ...prev,
      { flow: newFlow, screen: newScreen ?? prev[prev.length - 1]?.screen ?? "instrument" },
    ]);
  };

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
    <div className="min-h-screen flex flex-col items-center gap-3 w-full min-h-[800px]">
      <div
        className="relative bg-background overflow-auto flex flex-col w-full max-w-[800px] min-h-[800px]"
        //className="relative bg-background rounded-[44px] overflow-auto flex flex-col w-full max-w-[800px] min-h-[800px]"
        style={{
          //border: "10px solid #222",
          background: "linear-gradient(to bottom, #FFE8A3 5%, #ffffff 95%)",
        }}
      >
        {/* Auth Flow Screens */}
        {flow === "landing" && (
          <AuthLayout>
            <Landing
              onGetStarted={() => navigateTo("signup")}
              onLogin={() => navigateTo("login")}
              onPrivacy={() => navigateTo("privacy")}
            />
          </AuthLayout>
        )}

        {flow === "login" && (
          <AuthLayout>
            <Login
              onSignIn={() => navigateTo("app", "instrument")}
              onSignUp={() => navigateTo("signup")}
              onForgot={() => navigateTo("forgot")}
            />
          </AuthLayout>
        )}

        {flow === "signup" && (
          <AuthLayout>
            <Signup
              onSignIn={() => navigateTo("app", "instrument")}
              onSignUp={() => navigateTo("login")}
            />
          </AuthLayout>
        )}

        {flow === "forgot" && (
          <AuthLayout>
            <ForgotPassword
              onSignIn={() => navigateTo("login")}
              onSignUp={() => navigateTo("signup")}
              onBack={handleBack}
              canGoBack={history.length > 1}
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
            <Privacy />
          </AuthLayout>
        )}

        {/* Main App & Settings Screens */}
        {(flow === "app" || flow === "tunings") && (
          <AppLayout
            activeScreen={screen}
            onSelectScreen={(nextScreen) => navigateTo("app", nextScreen)}
            onBack={handleBack}
            onForgot={() => navigateTo("forgot")}
            canGoBack={history.length > 1}
            onSignOut={() => setHistory([{ flow: "landing", screen: "instrument" }])}
            onPrivacy={() => navigateTo("privacy")}
            onTunerSettings={() => navigateTo("tunings")}
          >
            {flow === "tunings" ? (
              <WireframeTunerSettings
                onBack={handleBack}
                instrument={selectedInstrument}
                tuning={selectedTuning}
                soundDisabled={soundDisabled}
                onInstrumentChange={setSelectedInstrument}
                onTuningChange={setSelectedTuning}
                onSoundToggle={() => setSoundDisabled((prev) => !prev)}
              />
            ) : (
              <>
                {screen === "instrument" && (
                  <Instrument onNavigateToTuner={handleNavigateToTuner} />
                )}
                {screen === "tune" && (
                  <WireframeTuner selectedPresetId={activePresetId} />
                )}
                {screen === "music" && <Songs />}
                {screen === "tools" && <Tools />}
              </>
            )}
          </AppLayout>
        )}
      </div>
    </div>
  );
}