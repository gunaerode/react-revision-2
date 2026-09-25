import { useState, type FormEvent, type MouseEvent } from "react";

// Handlers receive a React event object. Open the Console panel to see the logs.

export default function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("");

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    setPos({ x: Math.round(e.clientX - box.left), y: Math.round(e.clientY - box.top) });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault(); // stop the browser from reloading the page
    console.log("submitted:", text);
    setText("");
  }

  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 14 }}>
      <div
        onMouseMove={handleMove}
        style={{ height: 90, borderRadius: 10, background: "#eef0ff", padding: 10 }}
      >
        🖱️ Move your mouse here: x={pos.x}, y={pos.y}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 6 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setText("")}
          placeholder="Type, then Enter (Esc clears)"
        />
        <button type="submit">Send</button>
      </form>

      <div onClick={() => console.log("🟦 outer div clicked")} style={{ padding: 12, background: "#e6f4f9" }}>
        <button onClick={() => console.log("🟨 button clicked (bubbles up)")}>Bubbles</button>{" "}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("🟥 stopPropagation - the div never hears it");
          }}
        >
          Stops
        </button>
      </div>
    </div>
  );
}
