import { useRef, useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("37-refs-and-useref-hook");

export default function RefsAndUseRefHook() {
  const stateClicks = useState(0);
  const [clicksViaState, setClicksViaState] = stateClicks;

  // useRef(0) also persists a value across renders, same as state - but changing
  // ref.current does NOT schedule a re-render. React just doesn't look at it.
  const clicksViaRef = useRef(0);
  // Reading ref.current directly in JSX is itself against the rules (React never
  // sees it as a reason to re-render, and the compiler can't safely reason about
  // it) - so "revealing" it means explicitly copying it into state from an event
  // handler, which is the only place a ref should ever be read.
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "useRef(initialValue) returns a mutable object shaped like { current: initialValue }, and that same object survives across every re-render - so far, identical to state.",
        "The difference: writing to ref.current is a silent mutation. It does not trigger a re-render, and React never expects you to read ref.current during render - only from event handlers or effects.",
        "Click 'increment via ref' several times: nothing on screen changes, because nothing re-rendered and nothing read the ref. Click 'reveal current value' and the handler reads ref.current itself, copies it into state, and only THAT state read appears in the JSX below.",
      ]}
      docsNote="Matches react.dev's Referencing Values with Refs page."
    >
      <div className="side-by-side">
        <div>
          <p>via useState: {clicksViaState}</p>
          <button onClick={() => setClicksViaState((c) => c + 1)}>
            increment via state
          </button>
        </div>
        <div>
          <p>via useRef: {revealed === null ? "? (not revealed yet)" : revealed}</p>
          <button onClick={() => { clicksViaRef.current += 1; }}>
            increment via ref
          </button>
          <button onClick={() => setRevealed(clicksViaRef.current)}>
            reveal current value
          </button>
        </div>
      </div>
    </LessonLayout>
  );
}
