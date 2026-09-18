import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { MyButton } from "../../components/MyButton";

const meta = metaFor("15-event-handling");

export default function EventHandling() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "You attach a handler with an on-prefixed camelCase prop - onClick, onChange, onSubmit - and pass it a function, not a function call: onClick={handleClick}, never onClick={handleClick()}.",
        "React wraps the browser's native event in a SyntheticEvent with the same interface, so handlers behave consistently across browsers.",
        "Events bubble up the tree by default, same as plain DOM events: clicking a button inside a div also fires the div's own onClick, unless something stops it.",
      ]}
      docsNote="This is the propagation example originally in App.tsx, moved here where it belongs."
    >
      <div
        onClick={() => alert("Parent div's onClick fired (the click bubbled up)")}
        style={{ padding: 20, background: "#f0f0f0", display: "inline-block" }}
      >
        <MyButton handleButtonClick={() => alert("Button clicked - then it bubbles to the div")}>
          Click me (bubbles)
        </MyButton>
        <MyButton
          handleButtonClick={(e) => {
            e.stopPropagation();
            alert("stopPropagation() called - the div never sees this click");
          }}
        >
          Click me (stops here)
        </MyButton>
      </div>
    </LessonLayout>
  );
}
