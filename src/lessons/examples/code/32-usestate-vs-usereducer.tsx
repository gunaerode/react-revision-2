import { useReducer, useState } from "react";

// The same login form, twice. Both work - pick by how much the state logic grows.
// useState: great for a few independent values.
// useReducer: great when many values change together, or updates follow rules.

function FormWithState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reset = () => { setEmail(""); setPassword(""); setSubmitted(false); };

  return (
    <fieldset>
      <legend>useState</legend>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => setSubmitted(true)} disabled={!email || password.length < 4}>Log in</button>
      <button onClick={reset}>Reset</button>
      {submitted && <p>✅ Welcome {email}</p>}
    </fieldset>
  );
}

interface State { email: string; password: string; submitted: boolean; }
type Action =
  | { type: "changed"; field: "email" | "password"; value: string }
  | { type: "submitted" }
  | { type: "reset" };

const empty: State = { email: "", password: "", submitted: false };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "changed": return { ...state, [action.field]: action.value, submitted: false };
    case "submitted": return { ...state, submitted: true };
    case "reset": return empty;
  }
}

function FormWithReducer() {
  const [state, dispatch] = useReducer(formReducer, empty);
  return (
    <fieldset>
      <legend>useReducer</legend>
      <input placeholder="email" value={state.email}
        onChange={(e) => dispatch({ type: "changed", field: "email", value: e.target.value })} />
      <input placeholder="password" type="password" value={state.password}
        onChange={(e) => dispatch({ type: "changed", field: "password", value: e.target.value })} />
      <button onClick={() => dispatch({ type: "submitted" })}
        disabled={!state.email || state.password.length < 4}>Log in</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      {state.submitted && <p>✅ Welcome {state.email}</p>}
    </fieldset>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 12 }}>
      <FormWithState />
      <FormWithReducer />
    </div>
  );
}
