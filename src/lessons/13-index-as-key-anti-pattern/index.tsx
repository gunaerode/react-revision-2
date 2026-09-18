import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import TaskInputList from "./TaskInputList";

const meta = metaFor("13-index-as-key-anti-pattern");

export default function IndexAsKeyAntiPattern() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Using the array index as key seems harmless because it's always unique - but it isn't stable. When an item is removed from the front, every remaining item shifts to a new index, so React thinks the item AT that position changed, not that an item was removed.",
        "Try it: type something into the very first box in BOTH lists below, then click 'Remove first item' on each. The index-keyed list shows stale/wrong text (it kept the old DOM node and just re-labelled it). The id-keyed list correctly removes the exact node for the deleted task and leaves the others untouched.",
        "Rule of thumb: index is only safe as a key for a list that is never reordered, filtered, or has items inserted/removed - i.e. almost never in a real app. Reach for a stable id instead.",
      ]}
    >
      <div className="side-by-side">
        <TaskInputList useIndexAsKey />
        <TaskInputList useIndexAsKey={false} />
      </div>
    </LessonLayout>
  );
}
