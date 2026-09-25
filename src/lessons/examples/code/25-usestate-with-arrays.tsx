import { useState } from "react";

// Arrays in state are immutable too. Instead of push / splice / arr[i] = x:
//   add:    [...list, item]
//   remove: list.filter(...)
//   update: list.map(...)

interface Todo { id: number; text: string; done: boolean; }

let nextId = 4;

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn useState", done: true },
    { id: 2, text: "Practice arrays", done: false },
    { id: 3, text: "Build a project", done: false },
  ]);
  const [text, setText] = useState("");

  function add() {
    if (!text.trim()) return;
    setTodos([...todos, { id: nextId++, text, done: false }]);
    setText("");
  }
  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  const left = todos.filter((t) => !t.done).length;

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 340 }}>
      <div style={{ display: "flex", gap: 6 }}>
        <input value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()} placeholder="What next?" style={{ flex: 1 }} />
        <button onClick={add}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ flex: 1, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
            <button onClick={() => remove(t.id)} aria-label="delete">🗑️</button>
          </li>
        ))}
      </ul>
      <small>{left} left · {todos.length - left} done</small>
    </div>
  );
}
