import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import "./Badge.css";

const meta = metaFor("14-styling-react-components");

export default function StylingReactComponents() {
  const [solid, setSolid] = useState(false);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Inline styles: the style prop takes a JS object with camelCase keys (backgroundColor, not background-color). Good for one-off, dynamic values computed from props/state.",
        "className + a CSS file: this lesson imports ./Badge.css and applies .badge via className, same as any HTML page - best for styles that don't change and can be reused.",
        "Conditional className: template-literal-joining class names based on state (`badge ${solid ? 'badge-solid' : 'badge-outline'}`) is the standard way to toggle a style without writing two components.",
      ]}
    >
      <p className="demo-label">Inline style (color computed from state)</p>
      <span style={{ padding: "4px 12px", color: solid ? "crimson" : "seagreen" }}>
        inline styled text
      </span>

      <p className="demo-label">className + conditional class name</p>
      <span className={`badge ${solid ? "badge-solid" : "badge-outline"}`}>
        {solid ? "solid" : "outline"}
      </span>
      <button onClick={() => setSolid((s) => !s)}>Toggle style</button>
    </LessonLayout>
  );
}
