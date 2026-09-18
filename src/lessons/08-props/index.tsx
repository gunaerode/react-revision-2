import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import RecipeCard from "./RecipeCard";
import { RECIPES } from "./constants";

const meta = metaFor("08-props");

export default function Props() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Props are the arguments a component is called with - RecipeCard receives { title, minutes, servings } the same way a function receives its parameters.",
        "Props flow one direction only: parent to child. RecipeCard has no way to change the data it was given, and no reason to - the parent decides what to render by choosing what props to pass.",
        "Two RecipeCards below run the exact same component code with different data, which is the whole point of props: one definition, many instances.",
      ]}
      docsNote="components/Profile.tsx already does this for a single user object - see lesson 9 for the default-value and children patterns built on top of props."
    >
      <div className="side-by-side">
        {RECIPES.map((recipe) => (
          <RecipeCard key={recipe.title} {...recipe} />
        ))}
      </div>
    </LessonLayout>
  );
}
