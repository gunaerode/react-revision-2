import type { ComponentType } from "react";

export interface LessonMeta {
  /** Matches the video number in the Codevolution "React 19 Tutorial" playlist. */
  number: number;
  /** URL-safe id, also used as the lesson's folder name under src/lessons. */
  id: string;
  title: string;
  section: string;
  videoUrl: string;
  /** Where this concept is implemented in gopinav/React-19-Tutorials, if published there. */
  referenceRepo?: string;
  /** Matching react.dev page, when this topic overlaps with docs already studied. */
  docsUrl?: string;
  /** One line describing what the interactive demo below shows. */
  summary: string;
}

export interface Lesson extends LessonMeta {
  Component: ComponentType;
}

export interface LessonSection {
  name: string;
  lessons: Lesson[];
}
