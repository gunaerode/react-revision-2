import { useState } from "react";

// A tip calculator: three independent pieces of state,
// and everything else is calculated from them during render.

export default function App() {
  const [bill, setBill] = useState(1200);
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState(2);

  const tip = (bill * tipPercent) / 100;
  const total = bill + tip;
  const perPerson = total / Math.max(people, 1);

  const row = { display: "flex", justifyContent: "space-between", margin: "6px 0" };

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 320 }}>
      <label>
        Bill (₹)
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          style={{ width: "100%", padding: 6 }}
        />
      </label>

      <p>Tip: {tipPercent}%</p>
      <input
        type="range" min={0} max={30} value={tipPercent}
        onChange={(e) => setTipPercent(Number(e.target.value))}
        style={{ width: "100%" }}
      />

      <p>
        People:{" "}
        <button onClick={() => setPeople(people - 1)} disabled={people <= 1}>−</button>{" "}
        <strong>{people}</strong>{" "}
        <button onClick={() => setPeople(people + 1)}>+</button>
      </p>

      <div style={{ background: "#087ea4", color: "white", padding: 14, borderRadius: 10 }}>
        <div style={row}><span>Tip</span><span>₹{tip.toFixed(2)}</span></div>
        <div style={row}><span>Total</span><span>₹{total.toFixed(2)}</span></div>
        <div style={{ ...row, fontSize: 20 }}>
          <strong>Each pays</strong><strong>₹{perPerson.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}
