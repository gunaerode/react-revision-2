// Props are the inputs of a component - like function arguments.
// The parent decides the values; the child only reads them (props are read-only).

interface ProductCardProps {
  name: string;
  emoji: string;
  price: number;
  inStock: boolean;
}

function ProductCard({ name, emoji, price, inStock }: ProductCardProps) {
  return (
    <div style={{
      width: 140, padding: 14, borderRadius: 12, textAlign: "center",
      border: "1px solid #e3e6ec", opacity: inStock ? 1 : 0.5,
    }}>
      <div style={{ fontSize: 42 }}>{emoji}</div>
      <strong>{name}</strong>
      <p style={{ margin: "4px 0", color: "#087ea4" }}>₹{price.toFixed(2)}</p>
      <small>{inStock ? "In stock" : "Sold out"}</small>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontFamily: "system-ui" }}>
      <ProductCard name="Mango" emoji="🥭" price={60} inStock={true} />
      <ProductCard name="Coconut" emoji="🥥" price={35} inStock={true} />
      <ProductCard name="Grapes" emoji="🍇" price={90} inStock={false} />
    </div>
  );
}
