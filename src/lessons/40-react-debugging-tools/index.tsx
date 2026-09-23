import { memo, Profiler, useCallback, useState, type ProfilerOnRenderCallback } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("40-react-debugging-tools");

// memo means this only re-renders when its own props actually change - the
// Profiler wrapped around it below relies on that to prove the point.
const Counter = memo(function Counter({
  count,
  onIncrement,
}: {
  count: number;
  onIncrement: () => void;
}) {
  return <button onClick={onIncrement}>count: {count}</button>;
});

function StaticSibling() {
  return <p>I don't depend on count - open React DevTools' Components tab, turn on "Highlight updates when components render", and click the button. Only Counter should flash.</p>;
}

export default function ReactDebuggingTools() {
  const [count, setCount] = useState(0);
  const [renderLog, setRenderLog] = useState<string[]>([]);

  // useCallback keeps this function's identity stable, so memo's shallow prop
  // comparison actually sees "nothing changed" on renders that don't touch count.
  const increment = useCallback(() => setCount((c) => c + 1), []);

  // React's own Profiler API - the same measurement React DevTools' Profiler tab
  // is built on - reports every commit of the tree it wraps. onRender only fires
  // when that tree actually re-renders, so this log growing by exactly one entry
  // per click (not looping forever) is itself proof that memo + useCallback above
  // are working: the log update's own re-render doesn't touch Counter's props.
  const handleRender: ProfilerOnRenderCallback = useCallback((id, phase, actualDuration) => {
    setRenderLog((prev) =>
      [`${id} ${phase} in ${actualDuration.toFixed(2)}ms`, ...prev].slice(0, 6),
    );
  }, []);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "React DevTools (the browser extension) adds two panels to your browser's own DevTools: Components, for inspecting any component's props/state/hooks live in the tree, and Profiler, for recording a render and seeing which components updated and why.",
        "Below is React's own Profiler API (react.dev/reference/react/Profiler) - the same measurement the extension's Profiler tab is built on, wired up directly in this lesson so it works even without the extension installed. Click the counter and watch the log grow by exactly one entry per click.",
        "That 'exactly one' is the actual debugging payoff: Counter is wrapped in memo and increment in useCallback, so when the render log's own state update re-renders this page, Counter's props haven't changed and it skips re-rendering - which means the Profiler doesn't fire for it either. Remove memo and the log would grow forever, one entry re-triggering the next.",
        "If you do have the React DevTools extension installed, open its Components tab now, select Counter, and watch its props update live as you click - and try the 'Highlight updates when components render' checkbox in its settings to see StaticSibling below correctly never flash.",
      ]}
      docsNote="react.dev calls this page 'React Developer Tools' - install links for Chrome, Firefox, and Edge are there."
    >
      <Profiler id="Counter" onRender={handleRender}>
        <Counter count={count} onIncrement={increment} />
      </Profiler>
      <StaticSibling />
      <p>Profiler log (newest first):</p>
      <ul>
        {renderLog.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </LessonLayout>
  );
}
