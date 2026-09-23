import type { Lesson, LessonSection } from "../types/lesson.types";
import { lessonMeta } from "./meta";

import Lesson01 from "./01-introduction";
import Lesson02 from "./02-your-first-react-app";
import Lesson03 from "./03-project-structure";
import Lesson04 from "./04-components";
import Lesson05 from "./05-export-and-import-components";
import Lesson06 from "./06-jsx";
import Lesson07 from "./07-rules-of-jsx";
import Lesson08 from "./08-props";
import Lesson09 from "./09-props-patterns";
import Lesson10 from "./10-conditional-rendering";
import Lesson11 from "./11-rendering-lists";
import Lesson12 from "./12-lists-and-keys";
import Lesson13 from "./13-index-as-key-anti-pattern";
import Lesson14 from "./14-styling-react-components";
import Lesson15 from "./15-event-handling";
import Lesson16 from "./16-event-handlers-as-props";
import Lesson17 from "./17-introduction-to-state";
import Lesson18 from "./18-usestate-hook";
import Lesson19 from "./19-rules-of-hooks";
import Lesson20 from "./20-how-state-updates-work";
import Lesson21 from "./21-state-as-a-snapshot";
import Lesson22 from "./22-setstate-using-previous-state";
import Lesson23 from "./23-how-react-batches-updates";
import Lesson24 from "./24-usestate-with-objects";
import Lesson25 from "./25-usestate-with-arrays";
import Lesson26 from "./26-sharing-state-between-components";
import Lesson27 from "./27-usereducer-hook";
import Lesson28 from "./28-usereducer-simple-state-and-action";
import Lesson28a from "./28a-usereducer-with-immer";
import Lesson29 from "./29-usereducer-complex-state-and-actions";
import Lesson30 from "./30-usereducer-lazy-initialization";
import Lesson31 from "./31-implementing-usestate-with-usereducer";
import Lesson32 from "./32-usestate-vs-usereducer";
import Lesson33 from "./33-the-prop-drilling-problem";
import Lesson34 from "./34-context-and-usecontext-hook";
import Lesson35 from "./35-context-with-state";
import Lesson36 from "./36-use-api-for-context";
import Lesson37 from "./37-refs-and-useref-hook";
import Lesson38 from "./38-manipulate-the-dom-with-refs";
import Lesson39 from "./39-the-effect-hook";
import Lesson40 from "./40-react-debugging-tools";
import Lesson40a from "./40a-axios-vs-fetch";

const components = [
  Lesson01, Lesson02, Lesson03, Lesson04, Lesson05, Lesson06, Lesson07, Lesson08,
  Lesson09, Lesson10, Lesson11, Lesson12, Lesson13, Lesson14, Lesson15, Lesson16,
  Lesson17, Lesson18, Lesson19, Lesson20, Lesson21, Lesson22, Lesson23, Lesson24,
  Lesson25, Lesson26, Lesson27, Lesson28, Lesson28a, Lesson29, Lesson30, Lesson31, Lesson32,
  Lesson33, Lesson34, Lesson35, Lesson36, Lesson37, Lesson38, Lesson39, Lesson40,
  Lesson40a,
];

export const lessons: Lesson[] = lessonMeta.map((meta, i) => ({
  ...meta,
  Component: components[i],
}));

// Submenu lessons (those with a parentId) are nested under their parent in the
// Sidebar instead of appearing as their own top-level entry in a section.
const topLevelLessons = lessons.filter((l) => !l.parentId);

export const sections: LessonSection[] = Array.from(
  new Set(topLevelLessons.map((l) => l.section)),
).map((name) => ({
  name,
  lessons: topLevelLessons.filter((l) => l.section === name),
}));
