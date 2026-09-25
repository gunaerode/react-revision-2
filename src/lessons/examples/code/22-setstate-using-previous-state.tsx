import { useState } from "react";

// setCount(count + 1)      -> "set it to (snapshot value) + 1"
// setCount(c => c + 1)     -> "take whatever the latest value is, add 1"
// Updater functions are queued and each receives the result of the previous one.

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function plusThreeSnapshot() {
    setA(a + 1);
    setA(a + 1);
    setA(a + 1);
  }

  function plusThreeUpdater() {
    setB((prev) => prev + 1);
    setB((prev) => prev + 1);
    setB((prev) => prev + 1);
  }

  const card = { padding: 16, borderRadius: 12, minWidth: 200, textAlign: "center" as const };

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontFamily: "system-ui" }}>
      <div style={{ ...card, background: "#fdecec" }}>
        <code>setA(a + 1) ×3</code>
        <div style={{ fontSize: 48, fontWeight: 800 }}>{a}</div>
        <button onClick={plusThreeSnapshot}>+3?</button>
      </div>
      <div style={{ ...card, background: "#e5f6ec" }}>
        <code>setB(prev =&gt; prev + 1) ×3</code>
        <div style={{ fontSize: 48, fontWeight: 800 }}>{b}</div>
        <button onClick={plusThreeUpdater}>+3</button>
      </div>
    </div>
  );
}
