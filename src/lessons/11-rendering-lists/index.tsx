import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import ShoppingList from "../../components/Product";

const meta = metaFor("11-rendering-lists");

export default function RenderingLists() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "There's no built-in {#each} loop in JSX - you build a list by mapping an array of data to an array of JSX elements with the ordinary .map() method.",
        "components/Product.tsx does exactly that: it filters the products constant down to even ids, then .map()s each surviving product to an <li>.",
        "React can render an array of elements directly as a child - {listItems} below is a plain JS array of <li> elements, and React just renders each one in order.",
      ]}
      docsNote="This is the ShoppingList component already in src/components/Product.tsx - see lesson 12 for why each <li> also needs a key."
    >
      <ShoppingList />
    </LessonLayout>
  );
}
