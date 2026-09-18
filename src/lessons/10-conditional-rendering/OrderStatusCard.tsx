import type { OrderStatus } from "./types";

export default function OrderStatusCard({ status }: { status: OrderStatus }) {
  // Pattern 1: an early return per branch (closest to plain if/else, works well
  // when branches return completely different markup).
  if (status === "loading") {
    return <p>Loading your order…</p>;
  }
  if (status === "error") {
    return <p style={{ color: "crimson" }}>Something went wrong. Try again.</p>;
  }

  // Pattern 2: ternary inside JSX (good for two short alternatives in one place).
  return (
    <div>
      {status === "empty" ? (
        <p>Your cart is empty.</p>
      ) : (
        <p>3 items ready for checkout.</p>
      )}
      {/* Pattern 3: && - render something, or render nothing at all. */}
      {status === "ready" && <button>Checkout now</button>}
    </div>
  );
}
