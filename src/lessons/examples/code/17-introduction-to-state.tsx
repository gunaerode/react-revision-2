import { useState } from "react";

// Click both buttons and watch the Console panel.
// The plain variable DOES change... but React never re-renders, and on the next
// render it starts again from 0. State survives renders AND triggers them.

function PlainCounter() {
  let count = 0;
  return (
    <button
      onClick={() => {
        count = count + 1;
        console.log("plain variable is now", count, "- but the screen won't update");
      }}
    >
      Plain variable: {count}
    </button>
  );
}

function StateCounter() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => {
        setCount(count + 1);
        console.log("state updated - React will re-render");
      }}
    >
      useState: {count}
    </button>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", gap: 12, fontFamily: "system-ui", flexWrap: "wrap" }}>
      <div style={{ padding: 16, borderRadius: 10, background: "#fdecec" }}>
        <p>❌ Forgets & never re-renders</p>
        <PlainCounter />
      </div>
      <div style={{ padding: 16, borderRadius: 10, background: "#e5f6ec" }}>
        <p>✅ Remembers & re-renders</p>
        <StateCounter />
      </div>
    </div>
  );
}
