import { useState } from "react";

export default function PlainVariableCounter() {
  // "use no memo" opts this component out of the React Compiler: the whole point
  // here is to show plain, un-compiled React's actual behavior when you break the
  // rule the compiler otherwise enforces for you. eslint.config.js also turns off
  // react-hooks/immutability for this one file, since this whole component IS the
  // anti-pattern lesson 17 exists to demonstrate.
  "use no memo";

  // A local variable: React has no idea it exists. It resets to 0 on every render,
  // and mutating it never causes a render in the first place.
  let clicks = 0;
  const [, forceRerender] = useState(0);

  return (
    <div className="card">
      <p>clicks (plain variable): {clicks}</p>
      <button
        onClick={() => {
          clicks = clicks + 1;
          console.log("plain variable is now", clicks, "- but the screen won't change");
        }}
      >
        Click (does nothing visible)
      </button>
      <button onClick={() => forceRerender((n) => n + 1)}>
        Force a re-render anyway
      </button>
      <p className="demo-label">
        Even forcing a re-render shows 0 again - the variable never survived between renders.
      </p>
    </div>
  );
}
