import { useReducer } from "react";

// useReducer moves "how state changes" out of the component into one pure
// function: (currentState, action) => nextState. Components just dispatch
// actions that describe WHAT happened.

interface CartItem { id: string; name: string; price: number; qty: number; }

type Action =
  | { type: "added"; item: Omit<CartItem, "qty"> }
  | { type: "removed"; id: string }
  | { type: "cleared" };

function cartReducer(cart: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "added": {
      const existing = cart.find((i) => i.id === action.item.id);
      if (existing) {
        return cart.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...cart, { ...action.item, qty: 1 }];
    }
    case "removed":
      return cart.filter((i) => i.id !== action.id);
    case "cleared":
      return [];
  }
}

const MENU = [
  { id: "dosa", name: "🥞 Masala Dosa", price: 80 },
  { id: "idli", name: "🍚 Idli (2)", price: 40 },
  { id: "coffee", name: "☕ Filter Coffee", price: 30 },
];

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ fontFamily: "system-ui", display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Menu</h4>
        {MENU.map((item) => (
          <div key={item.id} style={{ marginBottom: 6 }}>
            <button onClick={() => dispatch({ type: "added", item })}>+</button> {item.name} - ₹{item.price}
          </div>
        ))}
      </div>
      <div style={{ minWidth: 200 }}>
        <h4 style={{ marginTop: 0 }}>🛒 Cart</h4>
        {cart.length === 0 && <p style={{ color: "#888" }}>Empty</p>}
        {cart.map((i) => (
          <div key={i.id}>
            {i.qty} × {i.name}{" "}
            <button onClick={() => dispatch({ type: "removed", id: i.id })}>✕</button>
          </div>
        ))}
        <p><strong>Total: ₹{total}</strong></p>
        <button onClick={() => dispatch({ type: "cleared" })} disabled={!cart.length}>Clear</button>
      </div>
    </div>
  );
}
