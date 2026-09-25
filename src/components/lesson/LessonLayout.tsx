import type { MouseEvent, ReactNode } from "react";
import type { LessonMeta } from "../../types/lesson.types";
import { examples } from "../../lessons/examples";
import { lessonLabel } from "../../lessons/navigation";
import { withCode } from "../../utils/withCode";
import Playground from "./Playground";

interface LessonLayoutProps {
  meta: LessonMeta;
  /** Short bullet points explaining the concept in plain language, before the demo. */
  concept: ReactNode[];
  /** Optional callout when this topic overlaps with something already covered on react.dev. */
  docsNote?: ReactNode;
  children: ReactNode;
}

export default function LessonLayout({ meta, concept, docsNote, children }: LessonLayoutProps) {
  const example = examples[meta.id];

  return (
    <article className="lesson">
      <header className="lesson-hero">
        <div className="lesson-hero-top">
          <span className="chip chip-accent">Lesson {lessonLabel(meta)}</span>
          <span className="chip">{meta.section}</span>
        </div>
        <h1 className="lesson-title">{meta.title}</h1>
        <p className="lesson-summary">{meta.summary}</p>
        <div className="lesson-links">
          {meta.videoUrl && (
            <a className="link-pill" href={meta.videoUrl} target="_blank" rel="noreferrer">
              <span aria-hidden="true">▶</span> Watch {meta.videoLabel ?? `video ${meta.number}`}
            </a>
          )}
          {meta.docsUrl && (
            <a className="link-pill" href={meta.docsUrl} target="_blank" rel="noreferrer">
              <span aria-hidden="true">📘</span> react.dev docs
            </a>
          )}
          {meta.referenceRepo && (
            <a className="link-pill" href={meta.referenceRepo} target="_blank" rel="noreferrer">
              <span aria-hidden="true">{"</>"}</span> Reference code
            </a>
          )}
          {example && (
            <a
              className="link-pill link-pill-accent"
              href={`#${meta.id}-playground`}
              onClick={jumpToPlayground(meta.id)}
            >
              <span aria-hidden="true">⚡</span> Jump to playground
            </a>
          )}
        </div>
      </header>

      <section className="lesson-section" aria-label="Key ideas">
        <div className="section-heading">
          <span className="section-icon" aria-hidden="true">
            💡
          </span>
          <h3>Key ideas</h3>
        </div>
        <ol className="lesson-concept">
          {concept.map((point, i) => (
            <li key={i}>{typeof point === "string" ? withCode(point) : point}</li>
          ))}
        </ol>
        {docsNote && (
          <p className="lesson-docs-note">
            <span aria-hidden="true">📘</span> <span>{docsNote}</span>
          </p>
        )}
      </section>

      <section className="lesson-section" aria-label="Live demo">
        <div className="section-heading">
          <span className="section-icon" aria-hidden="true">
            🖥️
          </span>
          <h3>Live demo</h3>
        </div>
        <div className="lesson-demo">{children}</div>
      </section>

      {example && <Playground lessonId={meta.id} example={example} />}
    </article>
  );
}

// The page uses the URL hash for routing (#/lesson-id), so an in-page anchor
// link would change the lesson. Scroll to the playground by hand instead.
function jumpToPlayground(id: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById(`${id}-playground`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}
