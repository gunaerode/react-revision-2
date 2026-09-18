import type { Recipe } from "./types";

// props (Recipe here) is read-only. RecipeCard never reassigns title/minutes/servings -
// it only ever reads them. If a recipe needs to change, that happens in whoever owns
// the data (the parent), which then passes new props down.
export default function RecipeCard({ title, minutes, servings }: Recipe) {
  return (
    <div className="card">
      <strong>{title}</strong>
      <p>
        {minutes} min · serves {servings}
      </p>
    </div>
  );
}
