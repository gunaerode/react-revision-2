import { useState } from "react";

// Two inputs must always agree. Neither input owns the temperature -
// the state is "lifted up" to their closest common parent, which passes
// the value down as a prop and a handler to change it.

function TemperatureInput({ label, value, onChange }: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      {label}{" "}
      <input
        type="number"
        value={Number.isFinite(value) ? Math.round(value * 10) / 10 : ""}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: 90 }}
      />
    </label>
  );
}

function Verdict({ celsius }: { celsius: number }) {
  const text = celsius >= 100 ? "💨 Water boils" : celsius <= 0 ? "🧊 Water freezes" : "💧 Liquid water";
  return <p style={{ fontSize: 18 }}>{text}</p>;
}

export default function App() {
  const [celsius, setCelsius] = useState(25); // single source of truth

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <TemperatureInput label="Celsius °C" value={celsius} onChange={setCelsius} />
      <TemperatureInput
        label="Fahrenheit °F"
        value={(celsius * 9) / 5 + 32}
        onChange={(f) => setCelsius(((f - 32) * 5) / 9)}
      />
      <Verdict celsius={celsius} />
    </div>
  );
}
