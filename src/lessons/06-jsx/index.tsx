import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import Greeting from "../../components/Greeting";

const meta = metaFor("06-jsx");

function JsxExpressions() {
  const price = 24.5;
  const quantity = 3;
  const inStock = true;
  return (
    <ul>
      <li>Plain JS in braces: 2 + 2 = {2 + 2}</li>
      <li>A variable: {price} per unit</li>
      <li>An expression: total = {(price * quantity).toFixed(2)}</li>
      <li>A ternary (JSX has no if/else, only expressions): {inStock ? "in stock" : "sold out"}</li>
    </ul>
  );
}

export default function Jsx() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "JSX looks like HTML but it is syntax sugar for function calls: <h1>Hi</h1> compiles to React.createElement('h1', null, 'Hi').",
        "Anything inside curly braces {} in JSX is a plain JavaScript expression - a variable, a calculation, a function call, a ternary. Statements like if/for don't fit there because they aren't expressions.",
        "components/Greeting.tsx writes the exact same UI three ways in its comments: JSX, the React.createElement calls JSX compiles to, and the vanilla DOM API calls React itself would run under the hood - open the file to see all three side by side.",
      ]}
      docsNote="Matches react.dev's Writing Markup with JSX page - the createElement comparison below is this repo's own addition, going one level deeper than the docs."
    >
      <div className="side-by-side">
        <div>
          <p className="demo-label">Embedding expressions</p>
          <JsxExpressions />
        </div>
        <div>
          <p className="demo-label">JSX vs createElement (see Greeting.tsx)</p>
          <Greeting name="Ada" />
        </div>
      </div>
    </LessonLayout>
  );
}
