import { useRef, useState } from "react";

// React waits until your event handler finishes, then applies ALL the state
// updates in ONE re-render. Since React 18 this also happens inside
// setTimeout, promises and native event listeners (automatic batching).

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const renders = useRef(0);
  renders.current += 1;
  console.log(`render #${renders.current}`);

  function fillForm() {
    setName("Priya");
    setAge(27);
    setCity("Madurai");
    // three updates -> one render (check the Console)
  }

  function fillLater() {
    setTimeout(() => {
      setName("Karthik");
      setAge(31);
      setCity("Coimbatore");
    }, 500);
  }

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <p>
        👤 {name || "-"} · {age || "-"} · {city || "-"}
      </p>
      <button onClick={fillForm}>Fill (3 updates)</button>{" "}
      <button onClick={fillLater}>Fill in setTimeout</button>{" "}
      <button onClick={() => { setName(""); setAge(0); setCity(""); }}>Clear</button>
      <p style={{ color: "#667" }}>Total renders: {renders.current}</p>
    </div>
  );
}
