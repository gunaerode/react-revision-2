import { useReducer, useState } from "react";

// useReducer(reducer, initialArg, init) calls init(initialArg) ONCE, on mount.
// Writing useReducer(reducer, createInitialState(arg)) instead would run the
// (possibly slow) function on EVERY render, then throw the result away.
// Type in the box and watch the Console: the lazy init never runs again.

interface State { notes: string[]; }
type Action = { type: "added"; text: string } | { type: "cleared" };

function createInitialState(username: string): State {
  console.log(`🐢 createInitialState("${username}") ran`);
  // Imagine an expensive calculation or reading localStorage here.
  const saved = localStorage.getItem("playground-notes");
  return { notes: saved ? JSON.parse(saved) : [`Welcome, ${username}!`] };
}

function reducer(state: State, action: Action): State {
  const notes = action.type === "added" ? [...state.notes, action.text] : [];
  localStorage.setItem("playground-notes", JSON.stringify(notes));
  return { notes };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, "Guna", createInitialState);
  const [text, setText] = useState("");

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 320 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New note" />{" "}
      <button onClick={() => { if (text) dispatch({ type: "added", text }); setText(""); }}>Add</button>{" "}
      <button onClick={() => dispatch({ type: "cleared" })}>Clear</button>
      <ul>
        {state.notes.map((note, i) => <li key={i}>📝 {note}</li>)}
      </ul>
      <small>Notes are saved in localStorage - press ▶ Run to remount and reload them.</small>
    </div>
  );
}
