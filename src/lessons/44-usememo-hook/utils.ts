import type { CallStats, Product } from "./types";

// Deliberately slow: busy-waits SLOW_MS before filtering, so the cost of
// re-running it is something you can actually feel in the demo.
const SLOW_MS = 40;

const stats = new Map<string, CallStats>();

export function slowFilter(owner: string, products: Product[], query: string): Product[] {
  const start = performance.now();
  while (performance.now() - start < SLOW_MS) {
    // simulate an expensive calculation
  }
  const q = query.trim().toLowerCase();
  const result = products.filter((p) => p.name.toLowerCase().includes(q));

  const prev = stats.get(owner) ?? { calls: 0, lastMs: 0 };
  stats.set(owner, { calls: prev.calls + 1, lastMs: performance.now() - start });
  return result;
}

export function statsFor(owner: string): CallStats {
  return stats.get(owner) ?? { calls: 0, lastMs: 0 };
}

export function makeProducts(count: number): Product[] {
  const words = ["Apple", "Banana", "Cherry", "Mango", "Orange", "Papaya", "Guava", "Lemon"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `${words[i % words.length]} ${i}`,
  }));
}
