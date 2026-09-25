import { useState } from "react";

// setState does NOT change the variable right away.
// It asks React for a new render; the new value arrives in THAT render.
// Click and compare the Console with the screen.

export default function App() {
  const [score, setScore] = useState(0);
  console.log("🎨 render - score is", score);

  function addPoint() {
    setScore(score + 1);
    console.log("👉 right after setScore, score is still", score);
  }

  function addThree() {
    // All three read the SAME score from this render, so this adds 1, not 3!
    setScore(score + 1);
    setScore(score + 1);
    setScore(score + 1);
  }

  return (
    <div style={{ fontFamily: "system-ui", textAlign: "center", maxWidth: 280 }}>
      <div style={{ fontSize: 64, fontWeight: 800, color: "#087ea4" }}>{score}</div>
      <button onClick={addPoint}>+1</button>{" "}
      <button onClick={addThree}>+3 (?)</button>{" "}
      <button onClick={() => setScore(0)}>Reset</button>
    </div>
  );
}
