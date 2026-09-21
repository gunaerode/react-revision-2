export interface ProfileState {
  name: string;
  address: {
    city: string;
    zip: string;
  };
  skills: string[];
}

export type ProfileAction =
  | { type: "setName"; name: string }
  | { type: "setCity"; city: string }
  | { type: "setZip"; zip: string }
  | { type: "addSkill"; skill: string }
  | { type: "removeSkill"; index: number };
