import type { ReactNode } from "react";
import type { LessonMeta } from "../../types/lesson.types";

interface LessonLayoutProps {
  meta: LessonMeta;
  /** Short bullet points explaining the concept in plain language, before the demo. */
  concept: ReactNode[];
  /** Optional callout when this topic overlaps with something already covered on react.dev. */
  docsNote?: ReactNode;
  children: ReactNode;
}

export default function LessonLayout({
  meta,
  concept,
  docsNote,
  children,
}: LessonLayoutProps) {
  return (
    <article className="lesson">
      <header className="lesson-header">
        <p className="lesson-eyebrow">
          Video {meta.number} · {meta.section}
        </p>
        <h2>{meta.title}</h2>
        <p className="lesson-summary">{meta.summary}</p>
      </header>

      <ul className="lesson-concept">
        {concept.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      {docsNote && <p className="lesson-docs-note">📘 {docsNote}</p>}

      <div className="lesson-demo">{children}</div>

      <footer className="lesson-links">
        <a href={meta.videoUrl} target="_blank" rel="noreferrer">
          ▶ Watch video {meta.number}
        </a>
        {meta.referenceRepo && (
          <a href={meta.referenceRepo} target="_blank" rel="noreferrer">
            Course reference repo
          </a>
        )}
        {meta.docsUrl && (
          <a href={meta.docsUrl} target="_blank" rel="noreferrer">
            react.dev docs
          </a>
        )}
      </footer>
    </article>
  );
}
