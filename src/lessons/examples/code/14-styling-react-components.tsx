import { useState } from "react";

// Three ways to style: a <style> sheet with className, inline style objects,
// and conditional class names built from props/state.

const css = `
  .alert { padding: 12px 16px; border-radius: 10px; margin-bottom: 10px;
           border-left: 5px solid; font-family: system-ui; transition: all .2s; }
  .alert-info    { background: #e6f4f9; border-color: #087ea4; }
  .alert-success { background: #e5f6ec; border-color: #1a8a4a; }
  .alert-danger  { background: #fdecec; border-color: #c62f2f; }
  .alert.dismissed { opacity: .35; text-decoration: line-through; }
`;

type Variant = "info" | "success" | "danger";

function Alert({ variant, children }: { variant: Variant; children: string }) {
  const [dismissed, setDismissed] = useState(false);
  // Build the className from pieces - the `clsx` package does this for you in real apps.
  const className = ["alert", `alert-${variant}`, dismissed && "dismissed"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {children}
      <button
        onClick={() => setDismissed(!dismissed)}
        style={{ float: "right", fontSize: 12, cursor: "pointer" }}
      >
        {dismissed ? "undo" : "dismiss"}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{css}</style>
      <Alert variant="info">A new lesson is available.</Alert>
      <Alert variant="success">Your progress was saved.</Alert>
      <Alert variant="danger">Something went wrong.</Alert>
    </>
  );
}
