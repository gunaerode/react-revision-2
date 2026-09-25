import { useState } from "react";

// Every render has its own snapshot of state. A handler (or timeout) created in
// a render keeps seeing THAT render's values - even after state changes.
//
// Try: type "Hi", press Send, then quickly change the text or recipient.
// 2 seconds later the Console shows what was on screen when you clicked.

export default function App() {
  const [to, setTo] = useState("Asha");
  const [message, setMessage] = useState("Hi");
  const [sending, setSending] = useState(false);

  function handleSend() {
    setSending(true);
    setTimeout(() => {
      console.log(`📨 Sent "${message}" to ${to}`); // values from the click's snapshot
      setSending(false);
    }, 2000);
  }

  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 8, maxWidth: 300 }}>
      <label>
        To:{" "}
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option>Asha</option>
          <option>Bala</option>
          <option>Chitra</option>
        </select>
      </label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      <button onClick={handleSend} disabled={sending}>
        {sending ? "Sending in 2s…" : "Send"}
      </button>
      <small>On screen right now: "{message}" to {to}</small>
    </div>
  );
}
