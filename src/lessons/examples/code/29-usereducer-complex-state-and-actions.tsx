import { useReducer, useState } from "react";

// Complex state (a list + a filter) and actions that carry a payload.
// A discriminated union makes TypeScript check every action's shape.

type Category = "Food" | "Travel" | "Bills";
interface Expense { id: number; title: string; amount: number; category: Category; }
interface State { expenses: Expense[]; filter: Category | "All"; }

type Action =
  | { type: "added"; payload: Omit<Expense, "id"> }
  | { type: "deleted"; payload: { id: number } }
  | { type: "filtered"; payload: { filter: State["filter"] } };

let nextId = 3;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "added":
      return { ...state, expenses: [...state.expenses, { id: nextId++, ...action.payload }] };
    case "deleted":
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload.id) };
    case "filtered":
      return { ...state, filter: action.payload.filter };
  }
}

const initialState: State = {
  expenses: [
    { id: 1, title: "Lunch", amount: 250, category: "Food" },
    { id: 2, title: "Bus pass", amount: 1000, category: "Travel" },
  ],
  filter: "All",
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(100);
  const [category, setCategory] = useState<Category>("Food");

  const shown = state.expenses.filter((e) => state.filter === "All" || e.category === state.filter);
  const total = shown.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 420 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title) return;
          dispatch({ type: "added", payload: { title, amount, category } });
          setTitle("");
        }}
        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
      >
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: 80 }} />
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option>Food</option><option>Travel</option><option>Bills</option>
        </select>
        <button>Add</button>
      </form>

      <p>
        {(["All", "Food", "Travel", "Bills"] as const).map((f) => (
          <button key={f} onClick={() => dispatch({ type: "filtered", payload: { filter: f } })}
            style={{ fontWeight: state.filter === f ? 700 : 400, marginRight: 4 }}>{f}</button>
        ))}
      </p>
      <ul>
        {shown.map((e) => (
          <li key={e.id}>
            {e.title} - ₹{e.amount} <small>({e.category})</small>{" "}
            <button onClick={() => dispatch({ type: "deleted", payload: { id: e.id } })}>✕</button>
          </li>
        ))}
      </ul>
      <strong>Total: ₹{total}</strong>
    </div>
  );
}
