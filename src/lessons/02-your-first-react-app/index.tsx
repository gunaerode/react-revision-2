import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("02-your-first-react-app");

const PIPELINE_STEPS = [
  { file: "index.html", detail: 'Ships one empty <div id="root"></div> - the only real HTML in the page.' },
  { file: "main.tsx", detail: "createRoot(document.getElementById('root')!) finds that div and hands it to React." },
  { file: ".render(<App />)", detail: "React renders the App component tree and injects the resulting DOM into #root." },
  { file: "App.tsx", detail: "Everything you see on screen from here on is components, not hand-written HTML." },
];

export default function YourFirstReactApp() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A React app doesn't replace HTML - it mounts onto one HTML element and takes over rendering everything inside it.",
        "createRoot(domNode) creates a React root attached to a real DOM node; root.render(<App />) tells React what to draw inside it.",
        "This project's actual index.html and src/main.tsx already do exactly this - open them alongside this page to see the real thing, not a re-creation of it.",
      ]}
    >
      <ol className="pipeline">
        {PIPELINE_STEPS.map((step) => (
          <li key={step.file}>
            <code>{step.file}</code>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </LessonLayout>
  );
}
