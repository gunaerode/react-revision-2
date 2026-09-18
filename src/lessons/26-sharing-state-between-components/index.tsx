import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import FilterableProductTable from "../../components/FilterableProductTable";

const meta = metaFor("26-sharing-state-between-components");

export default function SharingStateBetweenComponents() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "SearchBar and ProductTable are siblings - neither can hold the filterText/inStockOnly state itself, because the other one needs to read it too, and siblings can't read each other's state directly.",
        "The fix is 'lifting state up': move the state to their closest common parent (FilterableProductTable), then pass the values down as props and pass the setter functions down as callback props.",
        "SearchBar calls onFilterTextChange/onInStockOnlyChange (props, see lesson 16) when the user types or checks the box; the parent updates its state; React re-renders both children with the new values - that's the whole synchronization mechanism.",
      ]}
      docsNote="This is the FilterableProductTable built for the react.dev Thinking in React tutorial, already in src/components/FilterableProductTable.tsx."
    >
      <FilterableProductTable />
    </LessonLayout>
  );
}
