import { useCallback, useState } from "react";
import RenderCountChild from "./RenderCountChild";

// Every component in this file opts out of this project's React Compiler with
// "use no memo" - otherwise the compiler would memoize the plain handlers on
// its own and all three demos would behave the same (see the 43a submenu).

export function WithoutUseCallback() {
  "use no memo";
  const [count, setCount] = useState(0);

  // A brand-new function object on every render of this component.
  const handleClick = () => console.log("child clicked");

  return (
    <div className="card">
      <p className="demo-label">memo + plain function</p>
      <button onClick={() => setCount(count + 1)}>Parent count: {count}</button>
      <p>
        <RenderCountChild onClick={handleClick} />
      </p>
      <p>Child re-renders on every parent click: Function A !== Function B, so memo sees a changed prop.</p>
    </div>
  );
}

export function WithUseCallback() {
  "use no memo";
  const [count, setCount] = useState(0);

  // Same function object on every render, because [] never changes.
  const handleClick = useCallback(() => console.log("child clicked"), []);

  return (
    <div className="card">
      <p className="demo-label">memo + useCallback(fn, [])</p>
      <button onClick={() => setCount(count + 1)}>Parent count: {count}</button>
      <p>
        <RenderCountChild onClick={handleClick} />
      </p>
      <p>Child stays at 1: same reference every render, so memo skips it.</p>
    </div>
  );
}

export function WithDependency() {
  "use no memo";
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Reads count, so it must list count - a new function whenever count changes.
  const handleClick = useCallback(() => console.log("count is", count), [count]);

  return (
    <div className="card">
      <p className="demo-label">useCallback(fn, [count])</p>
      <button onClick={() => setCount(count + 1)}>count: {count}</button>{" "}
      <button onClick={() => setOther(other + 1)}>other: {other}</button>
      <p>
        <RenderCountChild onClick={handleClick} />
      </p>
      <p>
        "count" re-renders the child (the callback really changed). "other" doesn't (it isn't a
        dependency).
      </p>
    </div>
  );
}
