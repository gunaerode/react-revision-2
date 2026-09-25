import type { ComponentProps, ReactNode } from "react";

// Pattern 1: default values while destructuring.
// Pattern 2: the special `children` prop - whatever you put between the tags.
// Pattern 3: spreading the rest of the props onto an element.

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "danger";
}

const COLORS = { primary: "#087ea4", secondary: "#6b7280", danger: "#c62f2f" };

function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      style={{
        background: COLORS[variant], color: "white", border: 0,
        padding: "8px 14px", borderRadius: 8, marginRight: 8,
      }}
    >
      {children}
    </button>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ border: "1px solid #e3e6ec", borderRadius: 12, padding: 16, maxWidth: 380 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <Card title="Delete this photo?">
        <p>This cannot be undone. Everything between the Card tags is its children.</p>
        <Button variant="danger" onClick={() => console.log("deleted!")}>Delete</Button>
        <Button variant="secondary" title="Spread props land on the <button>">Cancel</Button>
        <Button disabled>Default variant</Button>
      </Card>
    </div>
  );
}
