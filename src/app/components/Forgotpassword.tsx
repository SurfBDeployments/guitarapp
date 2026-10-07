import { useState } from "react";

import { ShieldLock, ArrowLeft } from 'lucide-react';

interface Props {
  onSignIn: () => void;
  onSignUp: () => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export function ForgotPassword({ onSignIn, onSignUp, onBack, canGoBack }: Props) {
  const [email, setEmail] = useState("");

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="flex flex-col px-6" style={{ minHeight: "100%", paddingBottom: 100 }}>


      {/* Heading */}
      < div className="w-full justify-between items-center px-6 py-4 border-black/10 bg-white/40 backdrop-blur-sm shrink-0" >
        {
          canGoBack ? (
            <button
              onClick={handleBackClick}
              className="items-center text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              <ArrowLeft size={18} style={{ display: "inline" }} /> Back
            </button>
          ) : (
            <div className="w-12" />
          )
        }


        <div className="mb-6 text-center">
          <span className="flex justify-center font-sans font-bold text-2xl text-foreground tracking-wide">
            JamMaster Tuning
          </span>
          <ShieldLock style={{ height: "100px", width: "100px", marginTop: "20px", display: "inline", textAlign: "center" }} />
          <h1 className="font-bold text-foreground leading-tight" style={{ letterSpacing: "-0.02em" }}>
            Forgot Password? No worries!
          </h1>
          <p className="text-sm  text-foreground mt-3">
            Please enter your email address to reset your password.</p>

        </div>


        {/* Form card */}
        <div
          className="rounded-2xl px-5 py-5 justify-center flex flex-col gap-4 margin"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", maxWidth: "400px", width: "100%", textAlign: "center", margin: "20px auto" }}
        >

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-md text-foreground text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-md text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
              placeholder=""
            />

            {/* Buttons */}

            <button
              className="w-full py-3.5 rounded-xl shadow-md bg-muted mt-4 text-foreground font-medium text-md border border-border" id="login"
            >
              Reset Password
            </button>

          </div>

        </div>


      </div>
    </div>
  );
}
