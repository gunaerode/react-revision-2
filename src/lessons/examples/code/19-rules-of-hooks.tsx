import { useState } from "react";

// Rule 1: only call hooks at the TOP LEVEL of a component (never inside if/for/after return).
// Rule 2: only call hooks from components or from custom hooks (functions named useXxx).
//
// React matches hooks by their ORDER on every render. If a hook is skipped
// on one render, every hook after it gets the wrong state.

// ✅ A custom hook - just a function that calls other hooks.
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle] as const;
}

export default function App() {
  const [showDetails, toggleDetails] = useToggle();
  const [liked, toggleLiked] = useToggle(true);

  // ✅ Put the CONDITION inside the JSX (or inside the hook), not around the hook.
  // ❌ if (showDetails) { const [x, setX] = useState(0); }  <- breaks the order

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 340 }}>
      <h3 style={{ margin: "0 0 8px" }}>🏔️ Ooty Weekend Trip</h3>
      <button onClick={toggleLiked}>{liked ? "💙 Saved" : "🤍 Save"}</button>{" "}
      <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} details</button>
      {showDetails && (
        <ul>
          <li>2 nights, hill-view cottage</li>
          <li>Toy train ride included</li>
          <li>Botanical garden tour</li>
        </ul>
      )}
    </div>
  );
}
