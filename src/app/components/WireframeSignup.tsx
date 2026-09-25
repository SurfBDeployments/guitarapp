import { useState } from "react";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";


interface Props {
  onSignIn: () => void;
  onSignUp: () => void;
}

// Ensure interface definitions match the library's return shapes
interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
}

interface State {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

export function WireframeSignup({ onSignIn, onSignUp }: Props) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipCode] = useState("");

  const [country, setCountry] = useState<Country | null>(null);
  const [currentState, setCurrentState] = useState<State | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  return (
    <div className="flex flex-col px-6" style={{ minHeight: "100%", paddingBottom: 40 }}>
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="font-bold text-foreground leading-tight" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
          Let's Get Started
        </h1>
        <p className="text-sm font-semibold text-foreground mt-3" style={{ fontSize: "16px" }}>
          JamMaster Tuning
        </p>
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl px-5 py-5 justify-center flex flex-col gap-4 margin"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(0,0,0,0.08)",
          maxWidth: "450px",
          width: "100%",
          textAlign: "center",
          margin: "20px auto",
        }}
      >
        <div className="flex gap-4">
          {/* 1st name */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
            />
          </div>
          {/* lastname */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Phone Number</label>
          <input
            type="tel"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
          />
        </div>

        {/* Country & State */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">Select Country</label>
            <CountrySelect
              containerClassName="form-group"
              inputClassName=""
              onChange={(val) => {
                const c = val as Country;
                setCountry(c);
                setCurrentState(null);
                setCurrentCity(null);
              }}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select Country"
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">State</label>
            <StateSelect
              countryid={country ? country.id : 0}
              containerClassName="form-group"
              inputClassName=""
              onChange={(val) => {
                const s = val as State;
                setCurrentState(s);
                setCurrentCity(null);
              }}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select State"
            />
          </div>
        </div>

        {/* City & Zip Code */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-2">
            <label className="text-sm text-foreground text-left">City</label>
            <CitySelect
              countryid={country ? country.id : 0}
              stateid={currentState ? currentState.id : 0}
              onChange={(val) => {
                const c = val as City;
                setCurrentCity(c);
              }}
              placeHolder="Select City"
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">Zip Code</label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
            />
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onSignIn}
          className="w-full py-3.5 rounded-xl shadow-md bg-muted text-foreground font-medium text-sm border border-border"
          id="continue"
        >
          Continue
        </button>

        {/* Forgot password */}
        <p className="text-sm text-foreground underline text-center">
          Forgot password?
        </p>
      </div>

      {/* Home indicator */}
      <div className="w-28 h-1 rounded-full bg-foreground/20 mt-8 mx-auto" />
    </div>
  );
}