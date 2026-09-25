import { useRef, useState } from "react";

// A ref is a box ({ current }) that survives re-renders, like state,
// but changing it does NOT trigger a re-render. Perfect for an interval id.

export default function App() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [laps, setLaps] = useState<number[]>([]);

  function start() {
    setStartTime(Date.now());
    setNow(Date.now());
    setLaps([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setNow(Date.now()), 10);
  }

  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current); // the ref remembers the id
    intervalRef.current = null;
  }

  const seconds = startTime && now ? (now - startTime) / 1000 : 0;

  return (
    <div style={{ fontFamily: "system-ui", textAlign: "center", maxWidth: 280 }}>
      <div style={{ fontSize: 52, fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
        {seconds.toFixed(2)}s
      </div>
      <button onClick={start}>▶ Start</button>{" "}
      <button onClick={stop}>⏸ Stop</button>{" "}
      <button onClick={() => setLaps([...laps, seconds])} disabled={!startTime}>🏁 Lap</button>
      <ol style={{ textAlign: "left" }}>
        {laps.map((lap, i) => <li key={i}>{lap.toFixed(2)}s</li>)}
      </ol>
    </div>
  );
}
