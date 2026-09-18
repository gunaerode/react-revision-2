import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import Profile from "../../components/Profile";
import { MyButton } from "../../components/MyButton";
import { user } from "../../constants/common.constants";

const meta = metaFor("09-props-patterns");

export default function PropsPatterns() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Default values: Profile destructures `{ user, isProfilePage = false }` - callers can omit isProfilePage entirely and it falls back to false, as the first card below does.",
        "Optional + computed props: Profile.tsx also defaults `height = 100` from inside the user object, and derives a computed value (`Profile of ${user.name}`) from a prop instead of storing it separately.",
        "The children prop: MyButton doesn't hard-code its label. Whatever JSX you put between <MyButton> and </MyButton> arrives as the special `children` prop, which is why the same button can say 'Save', 'Cancel', or contain an icon.",
      ]}
    >
      <div className="side-by-side">
        <div>
          <p className="demo-label">Profile without isProfilePage (uses the default)</p>
          <Profile user={user} />
        </div>
        <div>
          <p className="demo-label">Profile with isProfilePage=true</p>
          <Profile user={user} isProfilePage />
        </div>
      </div>
      <p className="demo-label">children prop, three different contents</p>
      <div className="side-by-side">
        <MyButton handleButtonClick={() => {}}>Save</MyButton>
        <MyButton handleButtonClick={() => {}} buttonClassName="my-button">
          Cancel
        </MyButton>
        <MyButton handleButtonClick={() => {}}>
          <span>★</span> Favorite
        </MyButton>
      </div>
    </LessonLayout>
  );
}
