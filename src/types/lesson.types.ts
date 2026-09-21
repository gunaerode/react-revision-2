import type { ComponentType } from "react";

export interface LessonMeta {
  /** Matches the video number in the Codevolution "React 19 Tutorial" playlist. */
  number: number;
  /** URL-safe id, also used as the lesson's folder name under src/lessons. */
  id: string;
  title: string;
  section: string;
  /** Omitted for lessons added outside the Codevolution playlist (e.g. submenu extras). */
  videoUrl?: string;
  /**
   * Overrides the "Video {number}" label when videoUrl points somewhere other than
   * position `number` in the main React 19 Tutorial playlist (e.g. a video from a
   * different Codevolution playlist entirely).
   */
  videoLabel?: string;
  /** Where this concept is implemented in gopinav/React-19-Tutorials, if published there. */
  referenceRepo?: string;
  /** Matching docs page, when this topic overlaps with docs already studied. */
  docsUrl?: string;
  /** One line describing what the interactive demo below shows. */
  summary: string;
  /**
   * Id of the lesson this one is a submenu item under. A lesson with a parentId is
   * rendered nested beneath its parent in the sidebar instead of at the top level.
   */
  parentId?: string;
}

export interface Lesson extends LessonMeta {
  Component: ComponentType;
}

export interface LessonSection {
  name: string;
  lessons: Lesson[];
}
