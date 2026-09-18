import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("23-how-react-batches-updates");

// A plain module-level variable, not state - it's only here to count renders for
// the demo below, so incrementing it must never itself be what triggers a render.
let renderCount = 0;

export default function HowReactBatchesUpdates() {
  // "use no memo": keep this component un-compiled so the render count below
  // reflects React's own batching decisions, not the compiler's memoization.
  // eslint.config.js also turns off react-hooks/globals for this one file - the
  // module-level counter below is a debug-only render counter for this lesson,
  // not real render output.
  "use no memo";

  renderCount += 1;
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // Two separate state updates, same handler. If each one re-rendered on its own,
    // this component would render twice per click. It only renders once.
    setCount((c) => c + 1);
    setFlag((f) => !f);
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "React doesn't re-render the instant you call a setter - it collects every state update made inside one event handler and applies them together, then renders once.",
        "This is 'batching': setCount and setFlag below both run in the same click handler, yet the component renders once per click, not twice.",
        "Batching is why lesson 22's fix mattered - React needed to know each update depended on the previous one, because it wasn't going to re-render (and recompute the snapshot) between them.",
      ]}
      docsNote="react.dev covers this under Queueing a Series of State Updates, in the 'React batches state updates' section."
    >
      <p>count: {count} · flag: {String(flag)}</p>
      <p>this component has rendered {renderCount} time(s)</p>
      <button onClick={handleClick}>Update count AND flag (one click)</button>
    </LessonLayout>
  );
}
