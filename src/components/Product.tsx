import { products } from "../constants/common.constants";

export default function ShoppingList() {
  const listItems = products
    .filter((product) => product.id % 2 === 0)
    .map((product) => (
      <li
        key={product.id}
        style={{
          color: product.isFruit ? "magenta" : "darkgreen",
        }}
      >
        {product.title}
      </li>
    ));

  return <ul>{listItems}</ul>;
}