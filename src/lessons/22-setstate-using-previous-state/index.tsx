import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("22-setstate-using-previous-state");

export default function SetStateUsingPreviousState() {
  const [broken, setBroken] = useState(0);
  const [fixed, setFixed] = useState(0);

  function incrementBrokenByThree() {
    // All three calls read the SAME snapshot value of `broken` from this render,
    // so this computes broken+1 three times - net change is +1, not +3.
    setBroken(broken + 1);
    setBroken(broken + 1);
    setBroken(broken + 1);
  }

  function incrementFixedByThree() {
    // Passing a function tells React "give me whatever the latest value turns out
    // to be right before this update runs" - each call sees the previous call's
    // result, so three calls really do add three.
    setFixed((prev) => prev + 1);
    setFixed((prev) => prev + 1);
    setFixed((prev) => prev + 1);
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "setCount(count + 1) computes the new value from the snapshot count captured this render - calling it multiple times in one handler reuses that same stale snapshot every time.",
        "setCount(prev => prev + 1) instead hands React a function. React queues these updater functions and runs each one against the result of the previous one, so they compose correctly even when called several times in a row.",
        "Click each button once and compare: the 'broken' counter jumps by 1 despite three calls, the 'fixed' one jumps by 3, exactly as called.",
      ]}
      docsNote="react.dev's Queueing a Series of State Updates page walks through this exact +1-vs-+3 comparison."
    >
      <div className="side-by-side">
        <div>
          <p>broken: {broken}</p>
          <button onClick={incrementBrokenByThree}>setCount(count + 1) × 3</button>
        </div>
        <div>
          <p>fixed: {fixed}</p>
          <button onClick={incrementFixedByThree}>setCount(prev =&gt; prev + 1) × 3</button>
        </div>
      </div>
    </LessonLayout>
  );
}
