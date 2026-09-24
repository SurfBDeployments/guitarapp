import { useState } from "react";

import {
  CitySelect,
  CountrySelect,
  StateSelect,

} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
interface Props {
  onSignIn: () => void;
  onSignUp: () => void;

}

export function WireframeSignup({ onSignIn, onSignUp }: Props) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [currentCity, setCurrentCity] = useState<{ id: number } | null>(null);
  const [zipcode, setZipCode] = useState("");
  const [country, setCountry] = useState<{ id: number } | null>(null);
  const [currentState, setCurrentState] = useState<{ id: number } | null>(null);

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
        <p className="text-sm text-foreground mt-1.5">

        </p>
      </div>



      {/* Form card */}
      <div
        className="rounded-2xl px-5 py-5 justify-center flex flex-col gap-4 margin"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", maxWidth: "450px", width: "100%", textAlign: "center", margin: "20px auto" }}
      >
        <div className="flex gap-4">
          {/* 1st name */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className=" text-sm text-foreground text-left">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={e => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
              placeholder=""
            />
          </div>
          {/* lastname */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={e => setLastName(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
              placeholder=""
            />
          </div>
        </div>

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

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Phone Number</label>
          <input
            type="phonenumber"
            value={phonenumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
            placeholder=""
          />
        </div>
        {/* address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-foreground text-left">Address</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
            style={{ background: "rgba(255,255,255,0.9)" }}
            placeholder=""
          />
        </div>

        {/* Country */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">Select Country</label>
            <CountrySelect
              containerClassName="form-group"
              inputClassName=""
              onChange={(_country) => setCountry(_country)}
              onTextChange={(_txt) => console.log(_txt)}
              placeHolder="Select Country"
            />
          </div>

          {/* State */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">State</label>
            <StateSelect
              countryid={country?.id}
              containerClassName="form-group"
              inputClassName=""
              onChange={(_state) => setCurrentState(_state)}
              onTextChange={(_txt) => console.log(_txt)}

              placeHolder="Select State"
            />

          </div>
        </div>

        {/* City */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-2">
            <label className="text-sm text-foreground text-left">City</label>
            <CitySelect
              countryid={country?.id}
              stateid={currentState?.id}
              onChange={(_city) => setCurrentCity(_city)}
              defaultValue={currentCity}
              placeHolder="Select City"
            />
          </div>

          {/* Zip code */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm text-foreground text-left">Zip Code</label>
            <input
              type="text"
              value={zipcode}
              onChange={e => setZipCode(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-foreground/50"
              style={{ background: "rgba(255,255,255,0.9)" }}
              placeholder=""
            />
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onSignIn}
          className="w-full py-3.5 rounded-xl shadow-md bg-muted text-foreground font-medium text-sm border border-border" id="continue"
        >
          Continue
        </button>

        {/* Forgot password */}
        <p className="text-sm text-foreground underline underline-offset-2 text-center">
          Forgot password?
        </p>
      </div>

      {/* Home indicator */}
      <div className="w-28 h-1 rounded-full bg-foreground/20 mt-8 mx-auto" />
    </div >
  );
}
