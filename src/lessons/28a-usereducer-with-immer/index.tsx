import { useState } from "react";
import { useImmerReducer } from "use-immer";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { profileReducer } from "./utils";

const meta = metaFor("28a-usereducer-with-immer");

export default function UseReducerWithImmer() {
  const [profile, dispatch] = useImmerReducer(profileReducer, {
    name: "Ada",
    address: { city: "London", zip: "" },
    skills: ["React"],
  });
  const [skillInput, setSkillInput] = useState("");

  function addSkill() {
    if (!skillInput.trim()) return;
    dispatch({ type: "addSkill", skill: skillInput });
    setSkillInput("");
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "useImmerReducer (from the use-immer package) wraps useReducer so the reducer gets a mutable-looking 'draft' instead of the old state - draft.address.city = action.city reads like a mutation, but Immer turns it into a brand new immutable state behind the scenes.",
        "Compare profileReducer.ts here to lesson 29's tasksReducer: updating one nested field the plain useReducer way would need { ...state, address: { ...state.address, city: action.city } } - as state nests deeper, that spread pyramid gets harder to read and easier to get wrong. draft.skills.push(...) here replaces state.skills.concat(...) or [...state.skills, ...] too.",
        "Rule of thumb: simple state (lesson 28's counter) stays on plain useReducer - reaching for useImmerReducer there would just add a dependency to avoid one spread. Reach for it once state is genuinely nested/complex enough, like this profile object, that the spreads start hurting readability.",
      ]}
    >
      <div className="side-by-side">
        <input
          value={profile.name}
          onChange={(e) => dispatch({ type: "setName", name: e.target.value })}
          placeholder="Name"
        />
        <input
          value={profile.address.city}
          onChange={(e) => dispatch({ type: "setCity", city: e.target.value })}
          placeholder="City"
        />
        <input
          value={profile.address.zip}
          onChange={(e) => dispatch({ type: "setZip", zip: e.target.value })}
          placeholder="Zip"
        />
      </div>
      <div className="side-by-side">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="New skill"
        />
        <button onClick={addSkill}>dispatch(addSkill)</button>
      </div>
      <ul>
        {profile.skills.map((skill, index) => (
          <li key={skill}>
            {skill}{" "}
            <button onClick={() => dispatch({ type: "removeSkill", index })}>✕</button>
          </li>
        ))}
      </ul>
      <p>
        state: {profile.name}, {profile.address.city} {profile.address.zip}, [
        {profile.skills.join(", ")}]
      </p>
    </LessonLayout>
  );
}
