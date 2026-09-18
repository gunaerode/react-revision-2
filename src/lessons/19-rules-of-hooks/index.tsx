import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("19-rules-of-hooks");

export default function RulesOfHooks() {
  // Correct: useState is called unconditionally, at the top level of the component,
  // in the same order on every single render.
  const [expanded, setExpanded] = useState(false);

  // Why the rule exists: React doesn't track hooks by name, it tracks them by CALL
  // ORDER within a component. If a hook call were skipped on some renders, every
  // hook after it would shift into the wrong slot and read/write the wrong state.
  //
  // Broken (do not do this) - calling a hook conditionally:
  //   if (expanded) {
  //     const [detail] = useState(""); // sometimes called, sometimes not - order shifts
  //   }
  //
  // Also broken - calling a hook inside a loop or a nested regular function:
  //   for (let i = 0; i < 3; i++) { useState(i); }
  //   function helper() { useState(0); }  // not a component, not a hook

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Only call hooks at the top level of a component (or another hook), never inside if/for/while, and never after an early return.",
        "Only call hooks from React function components or from custom hooks (a function whose own name starts with use...) - never from a plain helper function or an event handler.",
        "This project's eslint.config.js already includes eslint-plugin-react-hooks' recommended rules, so violating either rule shows a red squiggly in the editor before you even run the app.",
      ]}
      docsNote="Matches the rule react.dev documents on its Invalid Hook Call warning page."
    >
      <button onClick={() => setExpanded((e) => !e)}>
        {expanded ? "Hide" : "Show"} details
      </button>
      {expanded && <p>The hook above ran on every render, in the same position, so its state stayed correctly matched to this component instance.</p>}
    </LessonLayout>
  );
}
