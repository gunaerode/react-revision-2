import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import LikeButton from "./LikeButton";

const meta = metaFor("16-event-handlers-as-props");

export default function EventHandlersAsProps() {
  const [likes, setLikes] = useState(0);
  const [logged, setLogged] = useState<string[]>([]);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A function is a value in JavaScript, so it can be passed as a prop just like a string or a number - that's what 'event handlers as props' means.",
        "LikeButton only knows how to call onLike() on click. It doesn't know or care whether that increments a counter, pushes to a log, or does both - the parent decides.",
        "This is how MyButton's handleButtonClick prop works too (see lesson 15/9) - the pattern is the same everywhere: keep the reusable component dumb, let the parent supply the behavior.",
      ]}
      docsNote="react.dev's Responding to Events page calls this 'passing event handlers as props'."
    >
      <div className="side-by-side">
        <LikeButton label={`❤️ ${likes}`} onLike={() => setLikes((n) => n + 1)} />
        <LikeButton
          label="Log a like"
          onLike={() => setLogged((l) => [...l, `liked at ${new Date().toLocaleTimeString()}`])}
        />
      </div>
      <ul>
        {logged.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </LessonLayout>
  );
}
