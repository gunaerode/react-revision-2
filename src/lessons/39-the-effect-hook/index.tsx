import { useCallback, useEffect, useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("39-the-effect-hook");

function Stopwatch({ onEvent }: { onEvent: (message: string) => void }) {
  const [seconds, setSeconds] = useState(0);

  // Empty dependency array: this effect synchronizes with setInterval exactly
  // once, when the component mounts. The cleanup function it returns runs when
  // the component unmounts (never on a re-render, since the array never changes) -
  // without it, every mount would start a new interval that outlives the component.
  useEffect(() => {
    onEvent("mounted - interval started");
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(id);
      onEvent("unmounted - interval cleared");
    };
  }, [onEvent]);

  // [seconds] dependency: this effect re-runs after every render where seconds
  // changed - once on mount, then again each time the interval above ticks. The
  // eslint-plugin-react-hooks exhaustive-deps rule would flag this array if
  // `seconds` were used inside but left out of it.
  useEffect(() => {
    document.title = `${seconds}s elapsed`;
    onEvent(`title -> "${seconds}s elapsed"`);
  }, [seconds, onEvent]);

  return <p>seconds: {seconds}</p>;
}

export default function TheEffectHook() {
  const [show, setShow] = useState(true);
  const [log, setLog] = useState<string[]>([]);

  // useCallback (previewed here, covered properly in its own lesson later) keeps
  // this function's identity stable across renders. Without it, a new logEvent
  // would be created on every render, onEvent's identity in Stopwatch's dependency
  // array would change on every log entry, and the mount Effect would tear down
  // and re-run forever instead of running once.
  const logEvent = useCallback((message: string) => {
    setLog((prev) => [...prev, message]);
  }, []);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "An Effect runs AFTER React commits its changes to the screen, to synchronize the component with something outside React - here, a browser timer (setInterval) and the document's title. It never runs during render.",
        "The dependency array controls how often: [] means 'run once, on mount' (paired with a cleanup that undoes it on unmount); [seconds] means 'run on mount, then again whenever seconds changes'. Leaving the array off entirely would mean 'run after every single render' - rarely what you want.",
        "The function an Effect returns is its cleanup. React calls it before the Effect re-runs and when the component unmounts. Click 'Unmount Stopwatch' below and watch clearInterval actually fire in the log - without it, the interval would keep ticking in memory forever.",
      ]}
      docsNote="Matches react.dev's useEffect reference and the You Might Not Need an Effect guide."
    >
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Unmount Stopwatch" : "Mount Stopwatch"}
      </button>
      {show && <Stopwatch onEvent={logEvent} />}
      <p>event log:</p>
      <ul>
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </LessonLayout>
  );
}
