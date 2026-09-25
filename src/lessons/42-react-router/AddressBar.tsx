import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./RouterDemo.css";

// A fake browser address bar for demos running inside a memory router - must be
// rendered inside the router, since it reads and drives that router's history.
export default function AddressBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<string | null>(null);
  const url = location.pathname + location.search + location.hash;

  return (
    <div className="router-demo-address">
      <button onClick={() => navigate(-1)} aria-label="Back">←</button>
      <button onClick={() => navigate(1)} aria-label="Forward">→</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (draft !== null) navigate(draft.startsWith("/") ? draft : `/${draft}`);
          setDraft(null);
        }}
      >
        {/* Showing the live URL until the user starts typing their own. */}
        <input
          aria-label="Demo URL"
          value={draft ?? url}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => setDraft(null)}
        />
      </form>
    </div>
  );
}
