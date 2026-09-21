import type { LessonMeta } from "../types/lesson.types";

// Pure metadata - no component imports here on purpose. Lesson components import
// their own entry from this file, and registry.ts (which DOES import every lesson
// component) reads this file too. If component imports lived here, registry.ts and
// the lesson files would import each other and the metadata could evaluate empty.

const PLAYLIST =
  "https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3";
const REPO_ROOT = "https://github.com/gopinav/React-19-Tutorials/tree/main/react-essentials";
const HELLO_WORLD = `${REPO_ROOT}/hello-world`;
const CORE_CONCEPTS = `${REPO_ROOT}/core-concepts/src`;
const STATE_DEMO = `${REPO_ROOT}/state-demo/src`;
const CONTEXT_DEMO = `${REPO_ROOT}/context-demo/src`;

function video(n: number): string {
  // The playlist auto-selects a video by index when opened with &index=; simplest
  // reliable link is the playlist itself, so every lesson opens it from the right context.
  return `${PLAYLIST}&index=${n}`;
}

// Lesson 39 (useEffect) isn't part of the React 19 Tutorial playlist above - it's
// covered in Codevolution's dedicated "React Hooks Tutorial" playlist instead, as
// video 6, "useEffect Hook".
const EFFECT_HOOK_VIDEO =
  "https://www.youtube.com/watch?v=06Y6aJzTmXY&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A&index=6";

export const lessonMeta: LessonMeta[] = [
  {
    number: 1, id: "01-introduction", title: "Introduction", section: "Getting Started",
    videoUrl: video(1), referenceRepo: REPO_ROOT,
    summary: "What React is, why it exists, and what this repo is for.",
  },
  {
    number: 2, id: "02-your-first-react-app", title: "Your First React App", section: "Getting Started",
    videoUrl: video(2), referenceRepo: `${HELLO_WORLD}/src/main.jsx`,
    summary: "How createRoot mounts a component tree onto a real DOM node.",
  },
  {
    number: 3, id: "03-project-structure", title: "Project Structure", section: "Getting Started",
    videoUrl: video(3), referenceRepo: HELLO_WORLD,
    summary: "Why this repo separates lessons, components, constants, types, and utils.",
  },
  {
    number: 4, id: "04-components", title: "Components", section: "Components & JSX",
    videoUrl: video(4), referenceRepo: `${CORE_CONCEPTS}/Hello.jsx`,
    docsUrl: "https://react.dev/learn/your-first-component",
    summary: "A component is just a function that returns markup - built with a StatusPill.",
  },
  {
    number: 5, id: "05-export-and-import-components", title: "Export and Import Components", section: "Components & JSX",
    videoUrl: video(5), referenceRepo: `${CORE_CONCEPTS}/Welcome.jsx`,
    docsUrl: "https://react.dev/learn/importing-and-exporting-components",
    summary: "Default vs named exports, shown with components already in this codebase.",
  },
  {
    number: 6, id: "06-jsx", title: "JSX", section: "Components & JSX",
    videoUrl: video(6), referenceRepo: `${CORE_CONCEPTS}/Greeting.jsx`,
    docsUrl: "https://react.dev/learn/writing-markup-with-jsx",
    summary: "JSX compiles to React.createElement calls - Greeting.tsx proves it.",
  },
  {
    number: 7, id: "07-rules-of-jsx", title: "Rules of JSX", section: "Components & JSX",
    videoUrl: video(7), referenceRepo: `${CORE_CONCEPTS}/Hello.jsx`,
    docsUrl: "https://react.dev/learn/writing-markup-with-jsx",
    summary: "One root element, every tag closed, camelCase attributes.",
  },
  {
    number: 8, id: "08-props", title: "Props", section: "Props",
    videoUrl: video(8), referenceRepo: `${CORE_CONCEPTS}/UserCard.jsx`,
    docsUrl: "https://react.dev/learn/passing-props-to-a-component",
    summary: "Passing read-only data into a component with a RecipeCard.",
  },
  {
    number: 9, id: "09-props-patterns", title: "Props Patterns", section: "Props",
    videoUrl: video(9), referenceRepo: `${CORE_CONCEPTS}/CandidateProfile.jsx`,
    docsUrl: "https://react.dev/learn/passing-props-to-a-component",
    summary: "Default values, the children prop, and destructuring - via Profile and MyButton.",
  },
  {
    number: 10, id: "10-conditional-rendering", title: "Conditional Rendering", section: "Rendering",
    videoUrl: video(10), referenceRepo: `${CORE_CONCEPTS}/Alert.jsx`,
    docsUrl: "https://react.dev/learn/conditional-rendering",
    summary: "if/else, ternaries, and && for a status badge with four states.",
  },
  {
    number: 11, id: "11-rendering-lists", title: "Rendering Lists", section: "Rendering",
    videoUrl: video(11), referenceRepo: `${CORE_CONCEPTS}/ProductList.jsx`,
    docsUrl: "https://react.dev/learn/rendering-lists",
    summary: "Turning an array into JSX with .map(), reusing the ShoppingList component.",
  },
  {
    number: 12, id: "12-lists-and-keys", title: "Lists and Keys", section: "Rendering",
    videoUrl: video(12), referenceRepo: `${CORE_CONCEPTS}/ProductList.jsx`,
    docsUrl: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
    summary: "Why key must be stable and unique, using the FilterableProductTable rows.",
  },
  {
    number: 13, id: "13-index-as-key-anti-pattern", title: "Index as Key Anti-Pattern", section: "Rendering",
    videoUrl: video(13), referenceRepo: `${CORE_CONCEPTS}/TodoList.jsx`,
    docsUrl: "https://react.dev/learn/rendering-lists#why-does-react-need-keys",
    summary: "A deletable input list that visibly breaks with index keys, side by side with the fix.",
  },
  {
    number: 14, id: "14-styling-react-components", title: "Styling React Components", section: "Styling & Events",
    videoUrl: video(14), referenceRepo: `${CORE_CONCEPTS}/Alert.module.css`,
    summary: "Inline styles vs className vs conditionally-joined class names on one badge.",
  },
  {
    number: 15, id: "15-event-handling", title: "Event Handling", section: "Styling & Events",
    videoUrl: video(15), referenceRepo: `${CORE_CONCEPTS}/NewButton.jsx`,
    docsUrl: "https://react.dev/learn/responding-to-events",
    summary: "Click handlers and event propagation/stopPropagation with nested buttons.",
  },
  {
    number: 16, id: "16-event-handlers-as-props", title: "Event Handlers as Props", section: "Styling & Events",
    videoUrl: video(16), referenceRepo: `${CORE_CONCEPTS}/CustomButton.jsx`,
    docsUrl: "https://react.dev/learn/responding-to-events#passing-event-handlers-as-props",
    summary: "A reusable LikeButton that lets its parent decide what a click means.",
  },
  {
    number: 17, id: "17-introduction-to-state", title: "Introduction to State", section: "State",
    videoUrl: video(17), referenceRepo: `${STATE_DEMO}/SimpleCounter.jsx`,
    docsUrl: "https://react.dev/learn/state-a-components-memory",
    summary: "Why a plain variable can't survive a re-render, and what state fixes.",
  },
  {
    number: 18, id: "18-usestate-hook", title: "useState Hook", section: "State",
    videoUrl: video(18), referenceRepo: `${STATE_DEMO}/Counter.jsx`,
    docsUrl: "https://react.dev/reference/react/useState",
    summary: "The click counter from App.tsx, now with an explanation of the [value, setter] pair.",
  },
  {
    number: 19, id: "19-rules-of-hooks", title: "Rules of Hooks", section: "State",
    videoUrl: video(19), referenceRepo: STATE_DEMO,
    docsUrl: "https://react.dev/warnings/invalid-hook-call-warning",
    summary: "Only call hooks at the top level, and why this project's eslint config catches violations.",
  },
  {
    number: 20, id: "20-how-state-updates-work", title: "How State Updates Work", section: "State",
    videoUrl: video(20), referenceRepo: `${STATE_DEMO}/Counter.jsx`,
    docsUrl: "https://react.dev/learn/state-as-a-snapshot",
    summary: "setState schedules a re-render, it does not mutate the variable immediately.",
  },
  {
    number: 21, id: "21-state-as-a-snapshot", title: "State as a Snapshot", section: "State",
    videoUrl: video(21), referenceRepo: `${STATE_DEMO}/Counter.jsx`,
    docsUrl: "https://react.dev/learn/state-as-a-snapshot",
    summary: "An alert() that proves every handler closes over the state from its own render.",
  },
  {
    number: 22, id: "22-setstate-using-previous-state", title: "setState using Previous State", section: "State",
    videoUrl: video(22), referenceRepo: `${STATE_DEMO}/PrevStateCounter.jsx`,
    docsUrl: "https://react.dev/learn/queueing-a-series-of-state-updates",
    summary: "Fixing lesson 21's stale-value bug with the updater-function form of setState.",
  },
  {
    number: 23, id: "23-how-react-batches-updates", title: "How React Batches Updates", section: "State",
    videoUrl: video(23), referenceRepo: `${STATE_DEMO}/BatchingCounter.jsx`,
    docsUrl: "https://react.dev/learn/queueing-a-series-of-state-updates",
    summary: "Two setState calls in one handler still trigger a single re-render.",
  },
  {
    number: 24, id: "24-usestate-with-objects", title: "useState with Objects", section: "State",
    videoUrl: video(24), referenceRepo: `${STATE_DEMO}/UserProfile.jsx`,
    docsUrl: "https://react.dev/learn/updating-objects-in-state",
    summary: "Spreading the previous object instead of mutating a field on it directly.",
  },
  {
    number: 25, id: "25-usestate-with-arrays", title: "useState with Arrays", section: "State",
    videoUrl: video(25), referenceRepo: `${STATE_DEMO}/UserDashboard.jsx`,
    docsUrl: "https://react.dev/learn/updating-arrays-in-state",
    summary: "Adding, toggling, and removing tasks without push/splice/mutation.",
  },
  {
    number: 26, id: "26-sharing-state-between-components", title: "Sharing State Between Components", section: "State",
    videoUrl: video(26), referenceRepo: `${STATE_DEMO}/LoginCard.jsx`,
    docsUrl: "https://react.dev/learn/sharing-state-between-components",
    summary: "Lifting state up so sibling SearchBar and ProductTable stay in sync (FilterableProductTable).",
  },
  {
    number: 27, id: "27-usereducer-hook", title: "useReducer Hook", section: "useReducer",
    videoUrl: video(27), referenceRepo: `${STATE_DEMO}/CounterWithReducer.jsx`,
    docsUrl: "https://react.dev/reference/react/useReducer",
    summary: "Moving update logic out of the component and into a reducer function.",
  },
  {
    number: 28, id: "28-usereducer-simple-state-and-action", title: "useReducer (simple state and action)", section: "useReducer",
    videoUrl: video(28), referenceRepo: `${STATE_DEMO}/CounterWithReducer.jsx`,
    summary: "A number state with string actions: increment, decrement, reset.",
  },
  {
    number: 28, id: "28a-usereducer-with-immer", title: "useReducer with Immer (useImmerReducer)", section: "useReducer",
    parentId: "28-usereducer-simple-state-and-action",
    docsUrl: "https://www.npmjs.com/package/use-immer",
    summary: "Nested object + array state updated by 'mutating' a draft, via the use-immer package.",
  },
  {
    number: 29, id: "29-usereducer-complex-state-and-actions", title: "useReducer (complex state and actions)", section: "useReducer",
    videoUrl: video(29), referenceRepo: `${STATE_DEMO}/ShoppingCartWithReducer.jsx`,
    summary: "An array of tasks driven by actions that carry a payload.",
  },
  {
    number: 30, id: "30-usereducer-lazy-initialization", title: "useReducer Lazy Initialization", section: "useReducer",
    videoUrl: video(30), referenceRepo: `${STATE_DEMO}/CounterWithInit.jsx`,
    docsUrl: "https://react.dev/reference/react/useReducer#avoiding-recreating-the-initial-state",
    summary: "Passing an init function so the expensive initial state is computed once, not every render.",
  },
  {
    number: 31, id: "31-implementing-usestate-with-usereducer", title: "Implementing useState with useReducer", section: "useReducer",
    videoUrl: video(31), referenceRepo: `${STATE_DEMO}/CustomCounter.jsx`,
    summary: "A hand-rolled useMyState hook, to show useState is really a thin reducer.",
  },
  {
    number: 32, id: "32-usestate-vs-usereducer", title: "useState vs useReducer", section: "useReducer",
    videoUrl: video(32), referenceRepo: STATE_DEMO,
    docsUrl: "https://react.dev/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer",
    summary: "A decision guide, pointing back at lessons 18 and 28-29 as worked examples.",
  },
  {
    number: 33, id: "33-the-prop-drilling-problem", title: "The Prop Drilling Problem", section: "Context",
    videoUrl: video(33), referenceRepo: `${CONTEXT_DEMO}/NavigationBar.jsx`,
    docsUrl: "https://react.dev/learn/passing-data-deeply-with-context",
    summary: "A theme value threaded through a component that never uses it, just to reach a grandchild.",
  },
  {
    number: 34, id: "34-context-and-usecontext-hook", title: "Context and useContext Hook", section: "Context",
    videoUrl: video(34), referenceRepo: `${CONTEXT_DEMO}/UserContext.jsx`,
    docsUrl: "https://react.dev/reference/react/useContext",
    summary: "Fixing lesson 33's drilling with createContext and useContext.",
  },
  {
    number: 35, id: "35-context-with-state", title: "Context with State", section: "Context",
    videoUrl: video(35), referenceRepo: `${CONTEXT_DEMO}/UserContextProvider.jsx`,
    docsUrl: "https://react.dev/learn/scaling-up-with-reducer-and-context",
    summary: "A provider that shares both a value and its setter, so any descendant can update it.",
  },
  {
    number: 36, id: "36-use-api-for-context", title: "use API for Context", section: "Context",
    videoUrl: video(36), referenceRepo: `${CONTEXT_DEMO}/UserMenu.jsx`,
    docsUrl: "https://react.dev/reference/react/use",
    summary: "Reading the same context with React 19's use() instead of useContext.",
  },
  {
    number: 37, id: "37-refs-and-useref-hook", title: "Refs and useRef Hook", section: "Refs",
    videoUrl: video(37),
    docsUrl: "https://react.dev/learn/referencing-values-with-refs",
    summary: "A render counter that proves a ref mutation does not trigger a re-render.",
  },
  {
    number: 38, id: "38-manipulate-the-dom-with-refs", title: "Manipulate the DOM with Refs", section: "Refs",
    videoUrl: video(38),
    docsUrl: "https://react.dev/learn/manipulating-the-dom-with-refs",
    summary: "Focusing a real input element on click with useRef attached to the DOM node.",
  },
  {
    number: 39, id: "39-the-effect-hook", title: "The Effect Hook (useEffect)", section: "Effects",
    videoUrl: EFFECT_HOOK_VIDEO,
    videoLabel: "React Hooks Tutorial video 6",
    docsUrl: "https://react.dev/reference/react/useEffect",
    summary: "Synchronizing a component with setInterval and document.title, and why cleanup matters.",
  },
];

export function metaFor(id: string): LessonMeta {
  const found = lessonMeta.find((m) => m.id === id);
  if (!found) throw new Error(`No lesson metadata for id "${id}"`);
  return found;
}
