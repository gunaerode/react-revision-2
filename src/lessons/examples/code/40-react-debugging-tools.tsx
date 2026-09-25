import { Profiler, useDebugValue, useState, type ProfilerOnRenderCallback } from "react";

// Two built-in debugging helpers you can use without installing anything:
// 1. <Profiler> measures how long a subtree takes to render.
// 2. useDebugValue labels a custom hook in React DevTools' Components tab.
// Install the React DevTools browser extension to see both in action.

function useCounter(label: string) {
  const [count, setCount] = useState(0);
  useDebugValue(`${label}: ${count}`); // shows next to the hook in DevTools
  return [count, () => setCount((c) => c + 1)] as const;
}

function SlowList({ count }: { count: number }) {
  const start = performance.now();
  while (performance.now() - start < 8) {
    // pretend each render does ~8ms of work
  }
  return <p>Rendered a "slow" list for count = {count}</p>;
}

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  console.log(`⏱️ <${id}> ${phase} in ${actualDuration.toFixed(1)}ms`);
};

export default function App() {
  const [count, increment] = useCounter("clicks");
  const [text, setText] = useState("");

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <button onClick={increment}>Clicks: {count}</button>{" "}
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="type to re-render" />
      <Profiler id="SlowList" onRender={onRender}>
        <SlowList count={count} />
      </Profiler>
      <small style={{ color: "#667" }}>Open the Console panel to read the render timings.</small>
    </div>
  );
}
