import { createContext, Suspense, use, useState } from "react";

// React 19's use() reads a context like useContext... but unlike a hook it
// may be called inside if statements and loops. It can also read a Promise,
// suspending until it resolves (show a fallback with <Suspense>).

const ThemeContext = createContext<"light" | "dark">("light");

function Panel({ show }: { show: boolean }) {
  if (!show) return <p>Panel hidden.</p>;
  const theme = use(ThemeContext); // ✅ allowed after an early return - not with useContext!
  return (
    <div style={{
      padding: 14, borderRadius: 10,
      background: theme === "dark" ? "#1b1f27" : "#f3f4f8",
      color: theme === "dark" ? "white" : "black",
    }}>
      Current theme: {theme}
    </div>
  );
}

// Promises passed to use() must be created OUTSIDE render (or cached),
// otherwise every render would create a new one and suspend forever.
function fetchQuote(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("“Simplicity is prerequisite for reliability.” - Dijkstra"), 1200),
  );
}

function Quote({ quotePromise }: { quotePromise: Promise<string> }) {
  const quote = use(quotePromise);
  return <blockquote style={{ fontStyle: "italic" }}>{quote}</blockquote>;
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [show, setShow] = useState(true);
  const [quotePromise, setQuotePromise] = useState(fetchQuote);

  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 10, maxWidth: 380 }}>
      <div>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle theme</button>{" "}
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"} panel</button>{" "}
        <button onClick={() => setQuotePromise(fetchQuote())}>New quote</button>
      </div>
      <ThemeContext value={theme}>
        <Panel show={show} />
      </ThemeContext>
      <Suspense fallback={<p>⏳ Loading quote…</p>}>
        <Quote quotePromise={quotePromise} />
      </Suspense>
    </div>
  );
}
