import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import FilterableProductTable from "../../components/FilterableProductTable";

const meta = metaFor("12-lists-and-keys");

export default function ListsAndKeys() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "key is a special prop React reads (not passed to your component) to tell list items apart across re-renders, so it can match old DOM nodes to new data instead of rebuilding everything.",
        "A key must be stable (the same value for the same logical item every render) and unique among siblings - components/Product.tsx uses product.id, which satisfies both.",
        "components/FilterableProductTable.tsx keys ProductRow by product.name and ProductCategoryRow by category - both are unique and stable for this dataset, which is what actually matters, not that they happen to be strings instead of numbers.",
      ]}
      docsNote="react.dev's Rendering Lists page covers the same rule - this lesson points at the FilterableProductTable already built for the Thinking in React tutorial."
    >
      <FilterableProductTable />
    </LessonLayout>
  );
}
