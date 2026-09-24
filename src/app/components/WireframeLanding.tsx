import landingbassImg from "../../imports/landingbass.png";

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function WireframeLanding({ onGetStarted, onLogin }: Props) {
  return (
    <div className="flex flex-col items-center px-6" style={{ minHeight: "100%", paddingBottom: 40 }}>

      {/* Title block */}
      <div className="text-center mt-8 mb-6">
        <h1 className="font-bold text-foreground leading-tight" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
          JamMaster Tuning
        </h1>
        <p className="text-foreground mt-1 font-semibold" style={{ fontSize: 16 }}>
          Get Tuned, Jam Hard!
        </p>
      </div>

      {/* Guitar image */}
      <div
        className="flex items-center justify-center flex-1 w-full"
        style={{ minHeight: 300, maxHeight: 360 }}
      >
        <img
          src={landingbassImg}
          alt="Red sunburst electric bass guitar"
          className="object-contain drop-shadow-2xl"
          style={{ maxHeight: 340, maxWidth: 280 }}
        />
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-3 mt-6" style={{ maxWidth: "325px", margin: "20 auto", width: "100%" }}>
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 rounded-xl shadow-md bg-muted text-foreground font-medium text-sm border border-border" id="getstarted"
        >
          Get Started
        </button>
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-xl shadow-md bg-muted text-foreground font-medium text-sm border border-border" id="login"
        >
          Log in
        </button>
      </div>

      {/* Privacy */}
      <p className="text-sm text-muted-foreground mt-4 underline underline-offset-2">
        Privacy Policy
      </p>

      {/* Home indicator */}
      <div className="w-28 h-1 rounded-full bg-foreground/20 mt-8 mx-auto" />
    </div>
  );
}
