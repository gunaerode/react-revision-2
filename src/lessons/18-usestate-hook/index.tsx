import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("18-usestate-hook");

export default function UseStateHook() {
  // useState(0) does two things: keeps 0 (or whatever it's updated to) alive across
  // renders, and returns [currentValue, setterFunction] as a two-element array.
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "useState(initialValue) returns a pair: the current value, and a setter function. The array-destructuring syntax `const [count, setCount] = useState(0)` is just naming both parts.",
        "Calling setCount(next) does two things: it stores `next` for the next render, and it tells React to schedule a re-render of this component.",
        "This is the same counter that used to live directly in App.tsx - it's moved here now that App.tsx is just the lesson navigator.",
      ]}
    >
      <p>Clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </LessonLayout>
  );
}
