import { MemoryRouter, useSearchParams } from "react-router";

// v7+: everything is imported from "react-router" (react-router-dom is gone in v8).
// URL search params are state that lives in the URL - shareable and bookmarkable.
// useSearchParams works like useState, but for ?query=strings.

const LAPTOPS = [
  { name: "Air 13", brand: "Apple", price: 99000 },
  { name: "ThinkPad X1", brand: "Lenovo", price: 125000 },
  { name: "IdeaPad Slim", brand: "Lenovo", price: 55000 },
  { name: "XPS 14", brand: "Dell", price: 140000 },
  { name: "Inspiron 15", brand: "Dell", price: 48000 },
];

function Shop() {
  const [params, setParams] = useSearchParams();
  const brand = params.get("brand") ?? "All";
  const sort = params.get("sort") ?? "asc";

  function update(key: string, value: string) {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, value);
      return next;
    });
  }

  const list = LAPTOPS
    .filter((l) => brand === "All" || l.brand === brand)
    .toSorted((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div>
      <code style={{ display: "block", marginBottom: 8 }}>
        URL: /laptops?{params.toString() || "(empty)"}
      </code>
      <select value={brand} onChange={(e) => update("brand", e.target.value)}>
        {["All", "Apple", "Lenovo", "Dell"].map((b) => <option key={b}>{b}</option>)}
      </select>{" "}
      <button onClick={() => update("sort", sort === "asc" ? "desc" : "asc")}>
        Price {sort === "asc" ? "↑" : "↓"}
      </button>
      <ul>
        {list.map((l) => <li key={l.name}>{l.name} - ₹{l.price.toLocaleString("en-IN")}</li>)}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <MemoryRouter initialEntries={["/laptops?sort=asc"]}>
        <Shop />
      </MemoryRouter>
    </div>
  );
}
