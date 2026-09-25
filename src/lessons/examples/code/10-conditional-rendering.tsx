import { useState } from "react";

type Status = "loading" | "error" | "empty" | "ready";

// Technique 1: early return with if
function Inbox({ status, count }: { status: Status; count: number }) {
  if (status === "loading") return <p>⏳ Loading messages…</p>;
  if (status === "error") return <p style={{ color: "crimson" }}>⚠️ Could not load inbox.</p>;

  return (
    <div>
      {/* Technique 2: ternary for either/or */}
      {status === "empty" ? <p>📭 Inbox zero - enjoy your day!</p> : <p>📬 You have mail.</p>}

      {/* Technique 3: && for "show or nothing".
          Careful: {count && ...} would print "0" when count is 0! */}
      {count > 0 && (
        <span style={{ background: "crimson", color: "white", borderRadius: 999, padding: "2px 10px" }}>
          {count} unread
        </span>
      )}
    </div>
  );
}

export default function App() {
  const [status, setStatus] = useState<Status>("ready");
  const [count, setCount] = useState(3);

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {(["loading", "error", "empty", "ready"] as Status[]).map((s) => (
          <button key={s} onClick={() => setStatus(s)} style={{ fontWeight: s === status ? 700 : 400 }}>
            {s}
          </button>
        ))}
        <button onClick={() => setCount((c) => (c > 0 ? 0 : 3))}>toggle unread</button>
      </div>
      <Inbox status={status} count={count} />
    </div>
  );
}
