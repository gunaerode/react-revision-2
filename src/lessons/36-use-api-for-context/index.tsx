import { use, useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { ThemeContext, type Theme } from "./ThemeContext";

const meta = metaFor("36-use-api-for-context");

function ThemedLabel({ showLabel }: { showLabel: boolean }) {
  // Not allowed with useContext: a hook can never follow an early return, because
  // hooks must run in the exact same order on every render (lesson 19).
  if (!showLabel) return null;

  // Allowed with use(): it's a regular function, not a hook, so React lets it
  // appear after conditionals and early returns - it still reads the nearest
  // ThemeContext.Provider above it, exactly like useContext(ThemeContext) would.
  const theme = use(ThemeContext);
  return <p>Current theme via use(): {theme}</p>;
}

export default function UseApiForContext() {
  const [theme, setTheme] = useState<Theme>("light");
  const [showLabel, setShowLabel] = useState(true);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "use(SomeContext) reads context the same way useContext(SomeContext) does - same Provider, same value - but use() is a plain function call, not a hook.",
        "Because it isn't a hook, use() is allowed after an early return or inside an if statement, a for loop, etc. - the exact places lesson 19 said useContext/useState can never go.",
        "This doesn't mean throw away useContext - use() also does more than context (it can read Promises too), but for plain context reads in conditional code, it removes a real restriction.",
      ]}
      docsNote="Matches react.dev's use reference page and its note on calling use() conditionally."
    >
      <div className="side-by-side">
        <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
          Toggle theme ({theme})
        </button>
        <button onClick={() => setShowLabel((s) => !s)}>
          {showLabel ? "Hide" : "Show"} label
        </button>
      </div>
      <ThemeContext.Provider value={theme}>
        <ThemedLabel showLabel={showLabel} />
      </ThemeContext.Provider>
    </LessonLayout>
  );
}
