import { useRef, useState } from "react";

// Attach a ref to a JSX element with ref={myRef}; after render,
// myRef.current is the real DOM node. Use it for focus, scrolling, measuring…

export default function App() {
  const [messages, setMessages] = useState(["Hey! 👋", "Did you try refs yet?"]);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function send() {
    if (!text.trim()) {
      inputRef.current?.focus(); // DOM method on the real <input>
      return;
    }
    setMessages([...messages, text]);
    setText("");
    // Wait for React to add the new message, then scroll the real <div>.
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 320 }}>
      <div ref={listRef} style={{ height: 150, overflowY: "auto", background: "#f3f4f8", borderRadius: 10, padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ background: i % 2 ? "#087ea4" : "white", color: i % 2 ? "white" : "black",
            padding: "6px 10px", borderRadius: 12, margin: "6px 0", width: "fit-content",
            marginLeft: i % 2 ? "auto" : 0 }}>
            {m}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message" style={{ flex: 1 }} />
        <button onClick={send}>Send</button>
      </div>
      <button onClick={() => inputRef.current?.focus()} style={{ marginTop: 8 }}>🎯 Focus input</button>
    </div>
  );
}
