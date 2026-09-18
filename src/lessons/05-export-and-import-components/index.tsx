import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
// Default export: any local name is allowed on import. This file could just as
// easily write `import Welcome from "../../components/Greeting"`.
import Greeting from "../../components/Greeting";
// Named export: the import must use the exact exported name, in braces.
import { MyButton } from "../../components/MyButton";

const meta = metaFor("05-export-and-import-components");

export default function ExportAndImportComponents() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A file can have at most one default export, imported with any name you choose: components/Greeting.tsx does `export default function Greeting(...)`.",
        "A file can have any number of named exports, imported with their exact name in braces: components/MyButton.tsx does `export function MyButton(...)`.",
        "Neither is 'more correct' - a common convention is default export for the one main component a file is about, named exports for small supporting pieces a file offers alongside it.",
      ]}
      docsNote="This is the same distinction react.dev covers on the Importing and Exporting Components page - this lesson just points at two files already living in this repo instead of a new example."
    >
      <div className="side-by-side">
        <div>
          <p className="demo-label"><code>import Greeting from "./Greeting"</code></p>
          <Greeting name="default export" />
        </div>
        <div>
          <p className="demo-label"><code>{'import { MyButton } from "./MyButton"'}</code></p>
          <MyButton handleButtonClick={() => alert("named export works the same way")}>
            named export
          </MyButton>
        </div>
      </div>
    </LessonLayout>
  );
}
