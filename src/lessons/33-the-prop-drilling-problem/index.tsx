import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("33-the-prop-drilling-problem");

// Toolbar has no use for `theme` itself - it only exists to render ThemedButton.
// It still has to accept and forward the prop, or ThemedButton can't get it.
function Toolbar({ theme }: { theme: "light" | "dark" }) {
  return (
    <div style={{ padding: 12, border: "1px dashed #999" }}>
      <p className="demo-label">Toolbar (doesn't use theme, only forwards it)</p>
      <ThemedButton theme={theme} />
    </div>
  );
}

function ThemedButton({ theme }: { theme: "light" | "dark" }) {
  return (
    <button
      style={{
        background: theme === "dark" ? "#222" : "#eee",
        color: theme === "dark" ? "#eee" : "#222",
      }}
    >
      Themed button ({theme})
    </button>
  );
}

export default function ThePropDrillingProblem() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Page holds the theme state, but only ThemedButton (two levels down) actually needs it. Toolbar sits in between and has to accept + re-pass a prop it never reads.",
        "This is 'prop drilling': every intermediate component in the path becomes coupled to data it doesn't care about, purely to relay it further down. Add a third layer and the problem compounds.",
        "It's not wrong, exactly - it works fine here with two levels. It gets painful as the tree gets deeper or as more values need drilling, which is the motivation for Context in the next lesson.",
      ]}
      docsNote="react.dev's Passing Data Deeply with Context page opens with this exact pain point."
    >
      <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
        Toggle theme (currently {theme})
      </button>
      <Toolbar theme={theme} />
    </LessonLayout>
  );
}
