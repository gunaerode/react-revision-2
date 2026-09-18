import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("01-introduction");

export default function Introduction() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "React is a JavaScript library for building user interfaces out of components: small, reusable pieces of UI that manage their own markup, logic, and (optionally) state.",
        "Instead of imperatively pushing DOM updates (\"find this element, change its text\"), you describe what the UI should look like for a given state, and React figures out the minimal DOM changes - this is called declarative UI.",
        "This repo is a hands-on companion to Codevolution's React 19 Tutorial playlist: every video from here on gets its own lesson folder under src/lessons with an original example, not a copy of the course's code.",
        "Shared building blocks live in dedicated folders - src/components for reusable UI, src/constants for static data, src/types for TypeScript types, and src/utils for pure helper functions - so no lesson mixes data, types, and rendering logic in one file.",
      ]}
    >
      <div className="info-card">
        <p>
          <strong>How to use this project:</strong> use the sidebar to jump between
          the 38 topics in playlist order. Each lesson page has a short explanation
          followed by a small interactive example you can actually click around in -
          reading the example is useful, but poking at it in the browser is where the
          concept actually sinks in.
        </p>
      </div>
    </LessonLayout>
  );
}
