import { useImmerReducer } from "use-immer";

// With Immer you write updates as if you were mutating a "draft".
// Immer records those changes and produces a brand-new immutable state for React.

interface Card { id: number; title: string; }
interface Board { columns: { name: string; cards: Card[] }[]; }

type Action =
  | { type: "move"; from: number; to: number; cardId: number }
  | { type: "add"; column: number; title: string };

let nextId = 5;

function boardReducer(draft: Board, action: Action) {
  switch (action.type) {
    case "move": {
      const fromCards = draft.columns[action.from].cards;
      const index = fromCards.findIndex((c) => c.id === action.cardId);
      const [card] = fromCards.splice(index, 1);   // "mutate" freely…
      draft.columns[action.to].cards.push(card);    // …Immer makes it immutable
      break;
    }
    case "add":
      draft.columns[action.column].cards.push({ id: nextId++, title: action.title });
      break;
  }
}

const initial: Board = {
  columns: [
    { name: "📝 To do", cards: [{ id: 1, title: "Read Immer docs" }, { id: 2, title: "Refactor reducer" }] },
    { name: "🚧 Doing", cards: [{ id: 3, title: "Build kanban" }] },
    { name: "✅ Done", cards: [{ id: 4, title: "Learn useReducer" }] },
  ],
};

export default function App() {
  const [board, dispatch] = useImmerReducer(boardReducer, initial);

  return (
    <div style={{ display: "flex", gap: 10, fontFamily: "system-ui", flexWrap: "wrap" }}>
      {board.columns.map((col, ci) => (
        <div key={col.name} style={{ flex: 1, minWidth: 150, background: "#f3f4f8", padding: 10, borderRadius: 10 }}>
          <strong>{col.name}</strong>
          {col.cards.map((card) => (
            <div key={card.id} style={{ background: "white", margin: "8px 0", padding: 8, borderRadius: 8, boxShadow: "0 1px 2px #0002" }}>
              {card.title}
              <div style={{ marginTop: 4 }}>
                {ci > 0 && <button onClick={() => dispatch({ type: "move", from: ci, to: ci - 1, cardId: card.id })}>←</button>}
                {ci < board.columns.length - 1 && <button onClick={() => dispatch({ type: "move", from: ci, to: ci + 1, cardId: card.id })}>→</button>}
              </div>
            </div>
          ))}
          {ci === 0 && <button onClick={() => dispatch({ type: "add", column: 0, title: `Task #${nextId}` })}>+ Add</button>}
        </div>
      ))}
    </div>
  );
}
