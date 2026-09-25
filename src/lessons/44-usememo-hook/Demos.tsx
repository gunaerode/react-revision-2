import { useEffect, useMemo, useRef, useState } from "react";
import OptionsChild from "./OptionsChild";
import type { ChartOptions } from "./types";
import { makeProducts, slowFilter, statsFor } from "./utils";

// Like lesson 43, every demo opts out of this project's React Compiler with
// "use no memo" - otherwise the compiler would cache these values itself and
// the "without useMemo" cards would look fixed too.

const PRODUCTS = makeProducts(5000);

// Shows how many times slowFilter has run for this owner, updated after every
// commit without triggering another render.
function useStatsDisplay(owner: string) {
  const output = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const { calls, lastMs } = statsFor(owner);
    if (output.current) output.current.textContent = `${calls} times (last run ${lastMs.toFixed(0)}ms)`;
  });
  return output;
}

export function FilterWithoutMemo() {
  "use no memo";
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(0);
  const visible = slowFilter("without", PRODUCTS, query);
  const output = useStatsDisplay("without");

  return (
    <div className="card">
      <p className="demo-label">slowFilter(...) - no useMemo</p>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter products" aria-label="Filter without useMemo" />{" "}
      <button onClick={() => setClicks(clicks + 1)}>Unrelated state: {clicks}</button>
      <p>{visible.length} matches</p>
      <p>
        slowFilter ran <strong ref={output}>0 times</strong>
      </p>
      <p>The unrelated button re-runs the filter too - every render pays ~40ms.</p>
    </div>
  );
}

export function FilterWithMemo() {
  "use no memo";
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(0);
  const visible = useMemo(() => slowFilter("with", PRODUCTS, query), [query]);
  const output = useStatsDisplay("with");

  return (
    <div className="card">
      <p className="demo-label">useMemo(() =&gt; slowFilter(...), [query])</p>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter products" aria-label="Filter with useMemo" />{" "}
      <button onClick={() => setClicks(clicks + 1)}>Unrelated state: {clicks}</button>
      <p>{visible.length} matches</p>
      <p>
        slowFilter ran <strong ref={output}>0 times</strong>
      </p>
      <p>Only typing (a change to query) re-runs it. The unrelated button reuses the cached array.</p>
    </div>
  );
}

export function ObjectPropWithoutMemo() {
  "use no memo";
  const [clicks, setClicks] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const options: ChartOptions = { color: "teal", showGrid };

  return (
    <div className="card">
      <p className="demo-label">object prop - no useMemo</p>
      <button onClick={() => setClicks(clicks + 1)}>Unrelated state: {clicks}</button>{" "}
      <button onClick={() => setShowGrid(!showGrid)}>Toggle grid</button>
      <OptionsChild options={options} />
      <p>A new object literal every render, so memo always sees a changed prop.</p>
    </div>
  );
}

export function ObjectPropWithMemo() {
  "use no memo";
  const [clicks, setClicks] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const options = useMemo<ChartOptions>(() => ({ color: "teal", showGrid }), [showGrid]);

  return (
    <div className="card">
      <p className="demo-label">useMemo(() =&gt; (&#123; ... &#125;), [showGrid])</p>
      <button onClick={() => setClicks(clicks + 1)}>Unrelated state: {clicks}</button>{" "}
      <button onClick={() => setShowGrid(!showGrid)}>Toggle grid</button>
      <OptionsChild options={options} />
      <p>Same object until showGrid changes - only "Toggle grid" re-renders the chart.</p>
    </div>
  );
}
