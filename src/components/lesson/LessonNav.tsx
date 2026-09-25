import type { LessonMeta } from "../../types/lesson.types";
import { lessonLabel } from "../../lessons/navigation";

interface LessonNavProps {
  prev?: LessonMeta;
  next?: LessonMeta;
  isComplete: boolean;
  onToggleComplete: () => void;
  onSelect: (id: string) => void;
}

export default function LessonNav({ prev, next, isComplete, onToggleComplete, onSelect }: LessonNavProps) {
  return (
    <div className="lesson-nav">
      <button
        className={`btn complete-btn${isComplete ? " is-complete" : ""}`}
        onClick={onToggleComplete}
        aria-pressed={isComplete}
      >
        {isComplete ? "✓ Completed - nice work!" : "Mark lesson as complete"}
      </button>

      <div className="lesson-nav-cards">
        {prev ? (
          <button className="nav-card" onClick={() => onSelect(prev.id)}>
            <span className="nav-card-dir">← Previous</span>
            <span className="nav-card-title">
              {lessonLabel(prev)}. {prev.title}
            </span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button className="nav-card nav-card-next" onClick={() => onSelect(next.id)}>
            <span className="nav-card-dir">Next →</span>
            <span className="nav-card-title">
              {lessonLabel(next)}. {next.title}
            </span>
          </button>
        )}
      </div>
      <p className="lesson-nav-hint">
        Tip: use <kbd>←</kbd> <kbd>→</kbd> to move between lessons, <kbd>/</kbd> to search.
      </p>
    </div>
  );
}
