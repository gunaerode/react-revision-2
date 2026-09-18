import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import type { ProfileForm } from "./types";

const meta = metaFor("24-usestate-with-objects");

export default function UseStateWithObjects() {
  // "use no memo": mutateDirectly below deliberately breaks the immutability rule
  // the compiler otherwise enforces, to show what real, un-compiled React does
  // with mutated state - the compiler's own optimizations depend on this rule
  // holding, so compiling this component could mask or change the bug.
  // eslint.config.js also turns off react-hooks/immutability for this one file.
  "use no memo";

  const [profile, setProfile] = useState<ProfileForm>({
    name: "Ada",
    email: "ada@example.com",
  });

  function mutateDirectly() {
    // BROKEN: this mutates the existing object, then calls setProfile with that
    // SAME object reference. React compares old vs new state with Object.is - since
    // it's literally the same object, React sees "no change" and skips the re-render
    // entirely, even though profile.name did change in memory.
    profile.name = profile.name + "!";
    setProfile(profile);
  }

  function updateWithSpread() {
    // CORRECT: spread the previous object into a brand new one, only overriding the
    // field that changed. A new object reference means React knows to re-render.
    setProfile((prev) => ({ ...prev, name: prev.name + "!" }));
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "State holding an object must be treated as read-only, same as props - React decides whether to re-render by checking if the new state is a different object reference than the old one, not by deep-comparing fields.",
        "Mutating a field in place (profile.name = ...) and then passing the same object back to setProfile doesn't change the reference, so React thinks nothing changed and skips the re-render - try the broken button and watch the name NOT update.",
        "The fix is always to spread the previous object into a new one: { ...prev, name: newName } keeps every other field and creates a fresh reference React will actually notice.",
      ]}
      docsNote="Matches react.dev's Updating Objects in State page."
    >
      <p>name: {profile.name}</p>
      <p>email: {profile.email}</p>
      <div className="side-by-side">
        <button onClick={mutateDirectly}>Append "!" (mutate directly - broken)</button>
        <button onClick={updateWithSpread}>Append "!" (spread - correct)</button>
      </div>
    </LessonLayout>
  );
}
