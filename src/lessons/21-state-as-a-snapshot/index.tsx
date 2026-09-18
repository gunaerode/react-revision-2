import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("21-state-as-a-snapshot");

export default function StateAsASnapshot() {
  const [count, setCount] = useState(0);

  function handleClick() {
    const clickedAt = count;
    setCount(count + 1);
    // This function closes over `count` as it was during THIS render - a snapshot.
    // Even three seconds from now, after count has moved on and re-rendered several
    // times, this alert still reports the value from the click that scheduled it.
    setTimeout(() => {
      alert(`This click happened when count was ${clickedAt}. It is now ${count} in this closure (same snapshot) - check the live count on screen for the real current value.`);
    }, 3000);
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Rendering takes a 'snapshot': every variable, prop, and piece of state read during a render keeps that render's value for the lifetime of everything created during it - including event handlers and timers.",
        "That's why the setTimeout callback below reports the count from when you clicked, not whatever count has become three seconds later, even though the on-screen count keeps changing in the meantime.",
        "This isn't a bug to work around - it's what makes each render self-consistent. Lesson 22 shows the tool (the updater-function form of setState) for the specific case where you want the LATEST value instead of the snapshot.",
      ]}
      docsNote="react.dev's State as a Snapshot page uses the same delayed-alert example to make this concrete."
    >
      <p>count: {count}</p>
      <button onClick={handleClick}>+1, then alert in 3s</button>
      <p className="demo-label">Click twice quickly before the first alert fires to see both alerts report different snapshots.</p>
    </LessonLayout>
  );
}
