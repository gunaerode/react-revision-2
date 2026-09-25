import { memo, useEffect, useRef } from "react";
import type { ChartOptions } from "./types";

// Same render-counting trick as lesson 43's RenderCountChild: the count is
// written to the DOM from an effect, so counting never causes a re-render itself.
const OptionsChild = memo(function OptionsChild({ options }: { options: ChartOptions }) {
  const renders = useRef(0);
  const output = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    renders.current += 1;
    if (output.current) output.current.textContent = String(renders.current);
  });

  return (
    <p style={{ color: options.color }}>
      memo(Chart) rendered <span ref={output}>0</span> times (grid: {options.showGrid ? "on" : "off"})
    </p>
  );
});

export default OptionsChild;
