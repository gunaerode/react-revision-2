// In a real project, main.tsx does this once:
//
//   createRoot(document.getElementById("root")!).render(<App />);
//
// Everything you see is the tree of components that <App /> returns.
// This playground plays the part of main.tsx and renders App for you.

function Header() {
  return (
    <header style={{ background: "#087ea4", color: "white", padding: 12, borderRadius: 8 }}>
      <strong>⚛️ My First React App</strong>
    </header>
  );
}

function Main() {
  const today = new Date().toLocaleDateString(undefined, { weekday: "long" });
  return (
    <main style={{ padding: "16px 4px" }}>
      <p>Happy {today}! This text comes from the Main component.</p>
    </main>
  );
}

function Footer() {
  return <footer style={{ fontSize: 12, color: "#888" }}>Built with React 19</footer>;
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
