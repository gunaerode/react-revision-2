import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("03-project-structure");

const FOLDERS = [
  { path: "src/lessons/NN-topic/", role: "One folder per playlist video. Each has an index.tsx, and its own constants.ts / types.ts / utils.ts only when the topic actually needs data, types, or helpers." },
  { path: "src/components/", role: "Reusable UI shared across lessons (Profile, MyButton, the lesson layout/sidebar chrome)." },
  { path: "src/constants/", role: "Static data that isn't tied to one lesson, e.g. the sample user/product data from the react.dev walkthrough." },
  { path: "src/types/", role: "Shared TypeScript interfaces/types, so a component file is never the only place a shape is defined." },
  { path: "src/utils/", role: "Pure, framework-free helper functions (formatting, reducers) that components import instead of defining inline." },
];

export default function ProjectStructure() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A React project's file layout is a convention, not a rule enforced by the framework - but a consistent one makes a codebase predictable to navigate.",
        "This repo picks one rule and applies it everywhere: markup/JSX lives in component files, but data shapes (types), sample data (constants), and non-UI logic (utils) get their own files.",
        "The benefit shows up as the project grows - e.g. lesson 29's cart reducer lives in its own utils.ts, so the component file is only ever about rendering, not about how state transitions work.",
      ]}
    >
      <table className="structure-table">
        <thead>
          <tr>
            <th>Folder</th>
            <th>What goes there</th>
          </tr>
        </thead>
        <tbody>
          {FOLDERS.map((f) => (
            <tr key={f.path}>
              <td><code>{f.path}</code></td>
              <td>{f.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LessonLayout>
  );
}
