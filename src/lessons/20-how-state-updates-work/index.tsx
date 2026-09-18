import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("20-how-state-updates-work");

export default function HowStateUpdatesWork() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  function handleClick() {
    setCount(count + 1);
    // count here is STILL the value from this render, because setCount doesn't
    // update the variable in place - it schedules a re-render where count will be
    // the new value. Logging count on the very next line proves that.
    setLog((l) => [...l, `called setCount(${count + 1}), but count here still reads ${count}`]);
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Calling a state setter does not mutate the variable immediately - `count` keeps its current-render value for the rest of that render's code, including the rest of the same event handler.",
        "What setCount(count + 1) actually does is queue a new value for count to use starting on the NEXT render, and ask React to perform that re-render.",
        "Click the button below a few times and watch the log: every line reports the pre-click value of count, proving the variable didn't change out from under the running handler.",
      ]}
    >
      <p>count: {count}</p>
      <button onClick={handleClick}>setCount(count + 1)</button>
      <ul>
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </LessonLayout>
  );
}
