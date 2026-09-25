import { useReducer } from "react";

// useState is basically a useReducer whose "action" is either the next value
// or an updater function. Here is a working copy, built from scratch.

type SetStateAction<T> = T | ((prev: T) => T);

function useMyState<T>(initial: T) {
  function reducer(state: T, action: SetStateAction<T>): T {
    return typeof action === "function" ? (action as (prev: T) => T)(state) : action;
  }
  return useReducer(reducer, initial);
}

export default function App() {
  const [count, setCount] = useMyState(0);
  const [name, setName] = useMyState("React");

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(count + 1)}>set(value)</button>{" "}
      <button onClick={() => { setCount((c) => c + 1); setCount((c) => c + 1); }}>
        set(updater) ×2
      </button>
      <p style={{ marginTop: 16 }}>
        Hello, <input value={name} onChange={(e) => setName(e.target.value)} />
      </p>
      <p>👋 Hello, {name}!</p>
    </div>
  );
}
