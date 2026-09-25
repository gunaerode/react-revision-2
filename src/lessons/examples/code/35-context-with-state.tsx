import { createContext, useContext, useState, type ReactNode } from "react";

// Put state AND the functions that change it into context, wrapped in a
// Provider component. Now any component can read the cart or add to it.

interface CartContextValue {
  items: string[];
  add: (item: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const value = {
    items,
    add: (item: string) => setItems((prev) => [...prev, item]),
    clear: () => setItems([]),
  };
  return <CartContext value={value}>{children}</CartContext>;
}

// A custom hook gives a nice error if someone forgets the Provider.
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

function CartBadge() {
  const { items, clear } = useCart();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 10, background: "#087ea4", color: "white", borderRadius: 10 }}>
      <strong>🛍️ Shop</strong>
      <span>
        🛒 {items.length} <button onClick={clear} style={{ marginLeft: 6 }}>clear</button>
      </span>
    </div>
  );
}

function ProductList() {
  const { add } = useCart();
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      {["👟 Shoes", "🎒 Bag", "⌚ Watch"].map((p) => (
        <button key={p} onClick={() => add(p)}>{p}</button>
      ))}
    </div>
  );
}

function CartSummary() {
  const { items } = useCart();
  return <p style={{ color: "#667" }}>In cart: {items.join(", ") || "nothing yet"}</p>;
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 380 }}>
      <CartProvider>
        <CartBadge />
        <ProductList />
        <CartSummary />
      </CartProvider>
    </div>
  );
}
