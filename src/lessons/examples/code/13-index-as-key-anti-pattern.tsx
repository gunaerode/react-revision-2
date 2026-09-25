import { useState } from "react";

// Both lists render the same data. The only difference is the key.
// Type something in each input, then click "Add to top" and compare.

interface Item { id: number; label: string; }

let nextId = 3;

function List({ items, useIndex }: { items: Item[]; useIndex: boolean }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={useIndex ? index : item.id} style={{ marginBottom: 6 }}>
          <label>
            {item.label}: <input placeholder="type here" style={{ width: 110 }} />
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, label: "Milk" },
    { id: 2, label: "Eggs" },
  ]);

  function addToTop() {
    const label = ["Bread", "Rice", "Tea", "Dal"][nextId % 4];
    setItems([{ id: nextId++, label }, ...items]);
  }

  const box = { flex: 1, minWidth: 200, padding: 12, borderRadius: 10 };

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <button onClick={addToTop}>⬆️ Add to top</button>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <div style={{ ...box, background: "#fdecec" }}>
          <strong>❌ key=&#123;index&#125;</strong>
          <List items={items} useIndex />
        </div>
        <div style={{ ...box, background: "#e5f6ec" }}>
          <strong>✅ key=&#123;item.id&#125;</strong>
          <List items={items} useIndex={false} />
        </div>
      </div>
    </div>
  );
}
