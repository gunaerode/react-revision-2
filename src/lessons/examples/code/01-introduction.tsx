import { useState } from "react";

// React's big idea: UI = f(state).
// You describe what the screen should look like for the current data,
// and React updates the real page for you whenever that data changes.

export default function App() {
  const [name, setName] = useState("Guna");
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 360 }}>
      <h2 style={{ margin: "0 0 8px" }}>Hello, {name || "stranger"} 👋</h2>
      <p style={{ color: "#667" }}>
        Type below - React re-renders this card on every keystroke.
      </p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        style={{ padding: 8, width: "100%", marginBottom: 12 }}
      />

      <button onClick={() => setLikes(likes + 1)} style={{ fontSize: 16 }}>
        ❤️ {likes} {likes === 1 ? "like" : "likes"}
      </button>

      {likes >= 5 && <p>🎉 You found the heart of React: state drives the UI!</p>}
    </div>
  );
}
