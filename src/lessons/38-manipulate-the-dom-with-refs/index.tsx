import { useRef } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("38-manipulate-the-dom-with-refs");

export default function ManipulateTheDomWithRefs() {
  // ref={inputRef} on a JSX element hands React's ref object the real DOM node once
  // it exists. inputRef.current is null before mount and an HTMLInputElement after.
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    // .focus() is a real DOM method - useRef is the escape hatch out of React's
    // declarative model, for the handful of things only the DOM API itself can do
    // (focus, text selection, scrolling, measuring size).
    inputRef.current?.focus();
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Passing ref={someRef} to a built-in JSX element (input, div, ...) makes React store the actual DOM node in someRef.current after it mounts - not a virtual representation, the real element.",
        "This is normally the only reason to reach for a ref: imperative actions React has no declarative prop for, like calling .focus(), .scrollIntoView(), or reading .getBoundingClientRect().",
        "The optional chaining in inputRef.current?.focus() matters: current starts out null before the first render commits, and TypeScript needs that checked, not just React.",
      ]}
      docsNote="Matches react.dev's Manipulating the DOM with Refs page, which uses this same focus() example."
    >
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={focusInput}>Focus the input</button>
    </LessonLayout>
  );
}
