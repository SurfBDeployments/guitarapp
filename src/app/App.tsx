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

type Flow = "landing" | "login" | "signup" | "app";

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

      {/* Phone Frame */}
      <div
        className="relative overflow-hidden shadow-2xl flex flex-col"
        style={{
          width: "100%",
          maxWidth: 800,
          height: "100%",
          background: "linear-gradient(to bottom, #FFE8A3 5%, #ffffff 95%)",
        }}
      >
        {/* Auth Flow Screens */}
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
            <WireframeSignup
              onSignIn={() => setFlow("app")}
              onSignUp={() => setFlow("login")}
            />
          </AuthLayout>
        )}

        {/* Main App Screens */}
        {flow === "app" && (
          <AppLayout
            activeScreen={screen}
            onSelectScreen={setScreen}
            onSignOut={() => setFlow("landing")}
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