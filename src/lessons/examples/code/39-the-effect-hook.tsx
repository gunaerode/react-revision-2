import { useEffect, useState } from "react";

// Effects synchronize a component with something OUTSIDE React.
// Here: the browser window size and the online/offline status.
// Toggle the widget off to see the cleanup run (Console panel).

function WindowWatcher() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    console.log("✅ effect: subscribed to resize/online events");
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      // cleanup: runs on unmount (and before the effect re-runs)
      console.log("🧹 cleanup: removed listeners");
      window.removeEventListener("resize", onResize);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []); // [] = subscribe once, on mount

  return (
    <div style={{ padding: 14, borderRadius: 10, background: "#e6f4f9" }}>
      <p style={{ margin: 0 }}>📐 Window: {size.w} × {size.h} - resize your browser!</p>
      <p style={{ margin: "6px 0 0" }}>{online ? "🟢 Online" : "🔴 Offline"}</p>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(true);
  const [clicks, setClicks] = useState(0);

  // This effect re-runs whenever `clicks` changes.
  useEffect(() => {
    console.log(`🔁 clicks changed to ${clicks}`);
  }, [clicks]);

  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 10, maxWidth: 380 }}>
      <div>
        <button onClick={() => setShow(!show)}>{show ? "Unmount" : "Mount"} watcher</button>{" "}
        <button onClick={() => setClicks(clicks + 1)}>Clicks: {clicks}</button>
      </div>
      {show && <WindowWatcher />}
    </div>
  );
}
