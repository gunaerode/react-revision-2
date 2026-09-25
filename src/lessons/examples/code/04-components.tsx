// A component is a function that starts with a capital letter and returns JSX.
// Small components compose into bigger ones - like LEGO bricks.

function Avatar({ emoji }: { emoji: string }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: "50%", display: "grid",
      placeItems: "center", fontSize: 30, background: "#e6f4f9",
    }}>
      {emoji}
    </div>
  );
}

function Skill({ label }: { label: string }) {
  return (
    <span style={{
      background: "#eef0ff", color: "#4b4fc4", borderRadius: 999,
      padding: "2px 10px", fontSize: 12, marginRight: 6,
    }}>
      {label}
    </span>
  );
}

function ProfileCard() {
  return (
    <div style={{
      display: "flex", gap: 14, alignItems: "center", padding: 16,
      border: "1px solid #e3e6ec", borderRadius: 12, maxWidth: 360,
    }}>
      <Avatar emoji="🧑‍💻" />
      <div>
        <h3 style={{ margin: 0 }}>React Learner</h3>
        <p style={{ margin: "4px 0 8px", color: "#667" }}>Building UIs one component at a time</p>
        <Skill label="JSX" />
        <Skill label="Props" />
        <Skill label="Hooks" />
      </div>
    </div>
  );
}

export default function App() {
  // Reuse is free: render the same component as many times as you like.
  return (
    <div style={{ display: "grid", gap: 12, fontFamily: "system-ui" }}>
      <ProfileCard />
      <ProfileCard />
    </div>
  );
}
