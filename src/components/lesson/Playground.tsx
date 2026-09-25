import { useState } from "react";
import LiveRunner from "../runner/LiveRunner";
import type { LessonExample } from "../../types/example.types";
import { withCode } from "../../utils/withCode";

interface PlaygroundProps {
  lessonId: string;
  example: LessonExample;
}

export default function Playground({ lessonId, example }: PlaygroundProps) {
  const [done, setDone] = useState<boolean[]>(() => example.challenges.map(() => false));

  return (
    <section className="lesson-section playground" aria-labelledby={`${lessonId}-playground`}>
      <div className="section-heading">
        <span className="section-icon" aria-hidden="true">
          ⚡
        </span>
        <div>
          <h3 id={`${lessonId}-playground`}>Try it yourself: {example.title}</h3>
          <p className="section-sub">{withCode(example.description)}</p>
        </div>
      </div>

      <LiveRunner id={lessonId} code={example.code} />

      {example.challenges.length > 0 && (
        <div className="challenges">
          <p className="challenges-title">🎯 Challenges - edit the code above to:</p>
          <ol>
            {example.challenges.map((challenge, i) => (
              <li key={i} className={done[i] ? "done" : undefined}>
                <label>
                  <input
                    type="checkbox"
                    checked={done[i]}
                    onChange={() => setDone((prev) => prev.map((d, j) => (j === i ? !d : d)))}
                  />
                  <span>{withCode(challenge)}</span>
                </label>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
