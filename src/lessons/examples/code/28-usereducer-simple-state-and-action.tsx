import { useReducer } from "react";

// The simplest reducer: state is a number, an action is just a string.

type Action = "up" | "down" | "mute";

function volumeReducer(volume: number, action: Action): number {
  switch (action) {
    case "up":
      return Math.min(volume + 10, 100);
    case "down":
      return Math.max(volume - 10, 0);
    case "mute":
      return 0;
  }
}

export default function App() {
  const [volume, dispatch] = useReducer(volumeReducer, 50);
  const icon = volume === 0 ? "🔇" : volume < 40 ? "🔈" : volume < 80 ? "🔉" : "🔊";

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 300 }}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <div style={{ height: 12, background: "#eee", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          width: `${volume}%`, height: "100%", transition: "width .2s",
          background: "linear-gradient(90deg, #087ea4, #8b5cf6)",
        }} />
      </div>
      <p>Volume: {volume}</p>
      <button onClick={() => dispatch("down")}>− 10</button>{" "}
      <button onClick={() => dispatch("up")}>+ 10</button>{" "}
      <button onClick={() => dispatch("mute")}>Mute</button>
    </div>
  );
}
