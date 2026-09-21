import { useState } from "react";
import google from "../../imports/gsignin.png";
import facebook from "../../imports/fbsignin.png";

interface Props {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function WireframeLogin({ onSignIn, onSignUp }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col px-6" style={{ minHeight: "100%", paddingBottom: 40 }}>

      {/* Sign Up link top-right */}
      <div className="flex justify-end pt-2 pb-4">
        <button onClick={onSignUp} className="text-sm text-foreground underline underline-offset-2">
          Sign Up
        </button>
      </div>

      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="font-bold text-foreground leading-tight" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
          Welcome Back to < br />{"\n"}JamMaster Tuning
        </h1>
        <p className="text-sm font-semibold text-foreground mt-3" style={{ fontSize: "16px" }}>
          Getting you ready to Jam!
        </p>
        <p className="text-sm text-foreground mt-1.5">
          Continue with
        </p>
      </div>

      {/* Social buttons */}

      <div className="flex items-center gap-3 mb-6 justify-center" style={{ maxWidth: "400px", margin: "20px auto", width: "100%" }}>



        <button

          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://w3.org">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          Google
        </button>
        <span className="text-sm text-muted-foreground font-medium shrink-0">or</span>


        <button

          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166FE5] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-1 transition-colors"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl px-5 py-5 justify-center flex flex-col gap-4 margin"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", maxWidth: "400px", width: "100%", textAlign: "center", margin: "20px auto" }}
      >
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
            placeholder=""
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
            placeholder=""
          />
        </div>

        {/* Sign In button */}
        <button
          onClick={onSignIn}
          className="w-full py-3 rounded-lg text-sm rounded-xl shadow-md font-medium text-foreground"
          style={{ background: "#d0d0d0" }}
        >
          Sign In
        </button>

        {/* Forgot password */}
        <p className="text-xs text-foreground underline underline-offset-2 text-center">
          Forgot password?
        </p>
      </div>

      {/* Home indicator */}
      <div className="w-28 h-1 rounded-full bg-foreground/20 mt-8 mx-auto" />
    </div>
  );
}
