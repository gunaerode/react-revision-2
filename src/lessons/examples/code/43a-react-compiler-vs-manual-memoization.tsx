import { memo, useRef, useState } from "react";

// This playground compiles code WITHOUT the React Compiler - so this is what
// React does "by default". Every re-render of App creates a new `options`
// object and a new `onSelect` function, so <Chart> re-renders every time.
//
// With the React Compiler (used by the rest of this site) those values would
// be memoized automatically and <Chart> would skip the unrelated renders.
// Your job: fix it by hand (see the challenges).

interface Options { color: string; showGrid: boolean; }

const Chart = memo(function Chart({ options, onSelect }: { options: Options; onSelect: (n: number) => void }) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <div style={{ padding: 10, border: `2px solid ${options.color}`, borderRadius: 10 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 60 }}>
        {[30, 55, 20, 45, 60].map((h, i) => (
          <div key={i} onClick={() => onSelect(i)} title="click me"
            style={{ width: 24, height: h, background: options.color, cursor: "pointer" }} />
        ))}
      </div>
      <small>Chart renders: {renders.current}</small>
    </div>
  );
});

export default function App() {
  const [color, setColor] = useState("#087ea4");
  const [note, setNote] = useState("");

  const options = { color, showGrid: true };          // new object each render
  const onSelect = (i: number) => console.log("bar", i); // new function each render

  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 8, maxWidth: 320 }}>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type here (unrelated state)" />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <Chart options={options} onSelect={onSelect} />
    </div>
  );
}
