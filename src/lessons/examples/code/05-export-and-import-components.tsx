// Named import: the name must match what the module exports (in { }).
import { useState } from "react";
// Rename a named import with "as":
import { Fragment as Group } from "react";

// Named export - imported elsewhere as:  import { Button } from "./Button";
export function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "6px 14px", marginRight: 6 }}>
      {label}
    </button>
  );
}

// Another named export - one file can have many of these.
export const APP_NAME = "Import / Export Lab";

// Default export - imported elsewhere with ANY name:  import Whatever from "./App";
// A file can have only ONE default export.
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <Group>
      <h3 style={{ fontFamily: "system-ui" }}>{APP_NAME}</h3>
      <p style={{ fontFamily: "system-ui" }}>Count: {count}</p>
      <Button label="+1" onClick={() => setCount(count + 1)} />
      <Button label="Reset" onClick={() => setCount(0)} />
    </Group>
  );
}
