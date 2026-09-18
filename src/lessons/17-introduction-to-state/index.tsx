import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import PlainVariableCounter from "./PlainVariableCounter";

const meta = metaFor("17-introduction-to-state");

export default function IntroductionToState() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A component function re-runs from scratch on every render, so any plain `let`/`const` declared inside it is thrown away and recreated each time - it can't remember anything across renders.",
        "Reassigning a plain variable also doesn't tell React \"something changed, please re-render\" - React only re-renders in response to a state update.",
        "State (the useState hook, next lesson) solves both problems at once: React keeps the value alive between renders, and calling its setter schedules a re-render automatically.",
      ]}
      docsNote="react.dev's State: A Component's Memory page opens with this exact broken-counter example."
    >
      <PlainVariableCounter />
    </LessonLayout>
  );
}
