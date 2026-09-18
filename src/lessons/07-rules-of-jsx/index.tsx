import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("07-rules-of-jsx");

function ContactCard() {
  // Rule 1: return exactly one root node - a <> Fragment </> here, so two <p> tags
  // aren't sitting side by side at the top level (that would be a compile error).
  // Rule 2: every tag is closed, even ones with no children (<hr /> not <hr>).
  // Rule 3: DOM attributes are camelCase (className, onClick) because they're really
  // JavaScript property names, not HTML attribute strings.
  return (
    <>
      <p className="demo-label">Ada Lovelace</p>
      <hr />
      <p onClick={() => alert("camelCase onClick, not onclick")}>Click this line</p>
    </>
  );
}

export default function RulesOfJsx() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A component can only return one root element. Two sibling tags at the top level is a compile error - wrap them in a single <div> or an empty <>...</> Fragment when you don't want an extra DOM node.",
        "Every tag must be explicitly closed, including void elements HTML normally leaves open: <img /> and <hr /> need the trailing slash in JSX, unlike plain .html files.",
        "Attribute names are camelCase because JSX attributes become JavaScript object properties: class becomes className, onclick becomes onClick, tabindex becomes tabIndex.",
      ]}
    >
      <ContactCard />
    </LessonLayout>
  );
}
