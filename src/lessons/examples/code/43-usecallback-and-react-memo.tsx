import { memo, useCallback, useRef, useState } from "react";

// memo() skips re-rendering a child when its props are the same (by ===).
// A function created during render is a NEW function every time, so the
// memo'd child re-renders anyway... unless useCallback keeps it the same.
//
// Note: this playground does NOT run the React Compiler, so you see the raw
// behaviour. (The rest of this site does use the compiler.)

const Child = memo(function Child({ label, onClick }: { label: string; onClick: () => void }) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#f3f4f8", marginBottom: 8 }}>
      <button onClick={onClick}>{label}</button> <small>child renders: {renders.current}</small>
    </div>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState(false);

  // ❌ new function on every render -> memo can't help
  const increment = () => setCount((c) => c + 1);

  // ✅ same function across renders -> memo skips the child
  const stableIncrement = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 12, borderRadius: 10,
      background: theme ? "#1b1f27" : "white", color: theme ? "white" : "black" }}>
      <p>count = {count}</p>
      <button onClick={() => setTheme(!theme)} style={{ marginBottom: 10 }}>
        Toggle theme (re-renders the parent)
      </button>
      <Child label="❌ Inline function" onClick={increment} />
      <Child label="✅ useCallback" onClick={stableIncrement} />
    </div>
  );
}
