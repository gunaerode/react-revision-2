import { memo, useEffect, useRef } from "react";

interface RenderCountChildProps {
  onClick: () => void;
}

// The count is written straight into the DOM from an effect instead of into
// state: setting state here would re-render the parent, which would re-render
// this child again (when it isn't skipped) - an endless loop, the same trap
// lesson 40's Profiler demo points out.
const RenderCountChild = memo(function RenderCountChild({ onClick }: RenderCountChildProps) {
  const renders = useRef(0);
  const output = useRef<HTMLSpanElement>(null);

  // No dependency array: runs after every render of *this* component, and
  // never when memo skips it.
  useEffect(() => {
    renders.current += 1;
    if (output.current) output.current.textContent = String(renders.current);
  });

  return (
    <button onClick={onClick}>
      memo(Child) rendered <span ref={output}>0</span> times
    </button>
  );
});

export default RenderCountChild;
