import { useCallback, useEffect, useRef, useState } from "react";
import RenderCountChild from "../43-usecallback-and-react-memo/RenderCountChild";
import { eventBus } from "./utils";

// No "use no memo" here: this is exactly lesson 43's first demo, compiled.
export function CompiledPlainHandler() {
  const [count, setCount] = useState(0);
  const handleClick = () => console.log("child clicked");

  return (
    <div className="card">
      <p className="demo-label">compiled - memo + plain function, no useCallback</p>
      <button onClick={() => setCount(count + 1)}>Parent count: {count}</button>
      <p>
        <RenderCountChild onClick={handleClick} />
      </p>
      <p>Stays at 1: the compiler cached handleClick for you.</p>
    </div>
  );
}

function useSubscribeCountDisplay(owner: string, listener: (message: string) => void) {
  const output = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    eventBus.subscribe(owner, listener);
    if (output.current) output.current.textContent = String(eventBus.subscribeCount(owner));
    return () => eventBus.unsubscribe(listener);
  }, [owner, listener]);
  return output;
}

export function UncompiledSubscription() {
  "use no memo";
  const [count, setCount] = useState(0);
  const handleMessage = (message: string) => console.log(message);
  const output = useSubscribeCountDisplay("uncompiled", handleMessage);

  return (
    <div className="card">
      <p className="demo-label">not compiled - plain handler as an effect dependency</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
      <p>
        eventBus.subscribe called <strong ref={output}>0</strong> times
      </p>
      <p>Every render: new handleMessage → effect cleanup → unsubscribe → subscribe again.</p>
    </div>
  );
}

export function StableSubscription() {
  "use no memo";
  const [count, setCount] = useState(0);
  const handleMessage = useCallback((message: string) => console.log(message), []);
  const output = useSubscribeCountDisplay("stable", handleMessage);

  return (
    <div className="card">
      <p className="demo-label">not compiled - useCallback</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
      <p>
        eventBus.subscribe called <strong ref={output}>0</strong> times
      </p>
      <p>Subscribed once: the identity the external API depends on is now guaranteed.</p>
    </div>
  );
}
