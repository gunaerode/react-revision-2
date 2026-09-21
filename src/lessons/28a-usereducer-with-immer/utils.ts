import type { ProfileState, ProfileAction } from "./types";

// useImmerReducer calls this with a "draft" - a mutable-looking proxy around the
// current state. Assigning into it (draft.address.city = ...) or calling array
// methods on it (draft.skills.push(...)) does NOT mutate the real state; Immer
// records those operations and produces a brand new, structurally-shared state
// object from them. That's why this reducer returns nothing at all.
export function profileReducer(draft: ProfileState, action: ProfileAction): void {
  switch (action.type) {
    case "setName":
      draft.name = action.name;
      break;
    case "setCity":
      draft.address.city = action.city;
      break;
    case "setZip":
      draft.address.zip = action.zip;
      break;
    case "addSkill":
      draft.skills.push(action.skill);
      break;
    case "removeSkill":
      draft.skills.splice(action.index, 1);
      break;
  }
}
