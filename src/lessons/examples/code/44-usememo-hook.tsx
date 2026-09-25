import { useMemo, useState } from "react";

// useMemo caches the RESULT of a calculation between renders and only
// recalculates when its dependencies change.

const PRODUCTS = Array.from({ length: 20000 }, (_, i) => ({
  id: i,
  name: `Product ${i}`,
  price: Math.round(Math.random() * 10000),
}));

function slowFilter(query: string, maxPrice: number) {
  console.log(`🐢 filtering 20,000 products for "${query}" under ₹${maxPrice}`);
  const start = performance.now();
  while (performance.now() - start < 60) {
    // simulate a slow calculation (~60ms)
  }
  return PRODUCTS.filter((p) => p.name.includes(query) && p.price <= maxPrice);
}

export default function App() {
  const [query, setQuery] = useState("99");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [dark, setDark] = useState(false);

  // ✅ Only re-runs when query or maxPrice change - NOT when `dark` changes.
  const results = useMemo(() => slowFilter(query, maxPrice), [query, maxPrice]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 12, borderRadius: 10,
      background: dark ? "#1b1f27" : "white", color: dark ? "white" : "black" }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search" />{" "}
      <label>
        max ₹{maxPrice}{" "}
        <input type="range" min={0} max={10000} step={500} value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))} />
      </label>
      <p>
        <button onClick={() => setDark(!dark)}>Toggle theme - feels instant thanks to useMemo</button>
      </p>
      <p>{results.length} matches</p>
      <ul>
        {results.slice(0, 5).map((p) => <li key={p.id}>{p.name} - ₹{p.price}</li>)}
      </ul>
    </div>
  );
}
