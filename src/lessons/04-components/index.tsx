import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import StatusPill from "./StatusPill";

const meta = metaFor("04-components");

// ServiceRow is a second component built out of the first one - components compose.
function ServiceRow({ name, tone }: { name: string; tone: "ok" | "warn" | "down" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <StatusPill label={tone} tone={tone} />
      <span>{name}</span>
    </div>
  );
}

export default function Components() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A component is a JavaScript function whose name starts with a capital letter and which returns JSX describing some UI.",
        "StatusPill below takes props (label, tone) and returns a small styled <span> - that's the entire definition of a component.",
        "Components compose: ServiceRow renders three StatusPills, and the page renders three ServiceRows. Complex UIs are built by nesting small components, not by writing one giant function.",
      ]}
    >
      <div>
        <ServiceRow name="API" tone="ok" />
        <ServiceRow name="Background jobs" tone="warn" />
        <ServiceRow name="Search index" tone="down" />
      </div>
    </LessonLayout>
  );
}
