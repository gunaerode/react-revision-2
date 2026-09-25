import type { LessonExample } from "../../types/example.types";

// Every lesson's playground code lives in ./code/<lesson-id>.tsx as a real
// TSX file - so it is type-checked and linted with the rest of the project -
// and is imported here as a plain string (Vite's ?raw) to seed the editor.
const sources = import.meta.glob<string>("./code/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

function codeFor(id: string): string {
  const code = sources[`./code/${id}.tsx`];
  if (code === undefined) throw new Error(`Missing playground code for lesson "${id}"`);
  return code;
}

type ExampleInfo = Omit<LessonExample, "code">;

const info: Record<string, ExampleInfo> = {
  "01-introduction": {
    title: "Your first interactive component",
    description: "A greeting card that updates as you type. You never touch the DOM - you change state and React redraws the UI.",
    challenges: [
      "Change the starting name to your own.",
      "Show how many characters the name has under the heading.",
      "Add a 👎 button with its own counter.",
    ],
  },
  "02-your-first-react-app": {
    title: "The App component tree",
    description: "`App` is the root component that `createRoot(...).render(<App />)` mounts. Everything else is nested inside it.",
    challenges: [
      "Add a `Sidebar` component and render it between `Header` and `Main`.",
      "Change the header color.",
      "Show the current time in the footer with `new Date().toLocaleTimeString()`.",
    ],
  },
  "03-project-structure": {
    title: "Types, constants, utils and components",
    description: "One file split into the same folders this project uses: types, constants, utils, components and App.",
    challenges: [
      "Add a fourth course to `COURSES`.",
      "Add a `duration` field to the `Course` type and show it on each card.",
      "Write a `utils` function that counts courses per level and show the result.",
    ],
  },
  "04-components": {
    title: "Profile card built from small components",
    description: "`Avatar` and `Skill` are tiny components; `ProfileCard` composes them; `App` reuses `ProfileCard`.",
    challenges: [
      "Add a `FollowButton` component to the card.",
      "Render a third `ProfileCard`.",
      "Rename `Skill` to `skill` (lowercase) and read the error - why does React need capital letters?",
    ],
  },
  "05-export-and-import-components": {
    title: "Named vs default exports",
    description: "`Button` and `APP_NAME` are named exports; `App` is the default export. Imports from `react` show named imports and `as` renaming.",
    challenges: [
      "Remove `export default` from `App` - what does the preview say?",
      "Import `useState` with a different name using `as` and update the code.",
      "Add a named export `Badge` component and use it in `App`.",
    ],
  },
  "06-jsx": {
    title: "Weather widget with JSX expressions",
    description: "Curly braces put JavaScript inside JSX: variables, function calls, ternaries and even a computed background.",
    challenges: [
      "Change `temperatureC` to 22 and watch the whole card change.",
      "Show the day's maximum temperature from a new array using `Math.max(...)`.",
      "Use a template string to add a `title` attribute to the card.",
    ],
  },
  "07-rules-of-jsx": {
    title: "A sign-up form following every JSX rule",
    description: "One root (a fragment), closed tags, camelCase attributes like `className`/`htmlFor`, and a `style` object.",
    challenges: [
      "Remove the `<>` fragment and read the error.",
      "Change `<br />` to `<br>` - what happens?",
      "Replace `htmlFor` with `for` and check the Console.",
    ],
  },
  "08-props": {
    title: "Product cards with props",
    description: "`ProductCard` gets `name`, `emoji`, `price` and `inStock` from its parent. Same component, different data.",
    challenges: [
      "Add a `discount` prop and show the discounted price.",
      "Render the cards from an array with `.map()` instead of by hand.",
      "Try assigning to a prop inside `ProductCard` - TypeScript and React will both push back.",
    ],
  },
  "09-props-patterns": {
    title: "Defaults, children and spread props",
    description: "`variant` has a default, `Card` renders whatever you pass as `children`, and `...rest` forwards every other prop to `<button>`.",
    challenges: [
      "Add a `success` variant.",
      "Add a `footer` prop to `Card` that renders below the children.",
      "Pass `onClick` to the Cancel button - notice you did not have to declare it.",
    ],
  },
  "10-conditional-rendering": {
    title: "Inbox with four states",
    description: "Early `return`, a ternary and `&&` - each used where it reads best. Click the buttons to switch states.",
    challenges: [
      "Change `count > 0 &&` to `count &&`, set unread to 0 and spot the stray 0.",
      "Add a new `offline` status with its own message.",
      "Show \"99+\" when count is above 99.",
    ],
  },
  "11-rendering-lists": {
    title: "Filterable movie list",
    description: "`.filter()`, `.toSorted()` and `.map()` turn an array into JSX. The visible list is derived, not stored in state.",
    challenges: [
      "Add a button to sort by year instead of rating.",
      "Add a search input that filters by title.",
      "Show \"No movies\" when the filtered list is empty.",
    ],
  },
  "12-lists-and-keys": {
    title: "Contacts that keep their notes",
    description: "Each row has its own state. Stable `key`s let React move that state with the row when the list is shuffled.",
    challenges: [
      "Change `key={c.id}` to `key={c.name}` and add two contacts with the same name.",
      "Add a delete button to each row.",
      "Sort the contacts alphabetically with a button.",
    ],
  },
  "13-index-as-key-anti-pattern": {
    title: "Index keys vs stable keys, side by side",
    description: "Type into both lists, then add an item to the top. The index-keyed list attaches your text to the wrong rows.",
    challenges: [
      "Add a \"Remove first\" button - which list breaks now?",
      "Add items to the bottom instead: why do index keys look fine then?",
      "Swap `useIndex` on the two lists and confirm the bug follows the key.",
    ],
  },
  "14-styling-react-components": {
    title: "Alert component with variants",
    description: "A `<style>` sheet plus `className`, classes joined from props and state, and inline `style` for one-off tweaks.",
    challenges: [
      "Add a `warning` variant with a yellow color.",
      "Add an icon per variant (ℹ️ ✅ ⛔).",
      "Make the dismiss button fully hide the alert instead of fading it.",
    ],
  },
  "15-event-handling": {
    title: "Mouse, keyboard and form events",
    description: "Handlers get an event object: read the mouse position, react to keys, `preventDefault()` a form and `stopPropagation()` a click.",
    challenges: [
      "Log `e.key` for every key typed in the input.",
      "Change the box color while the mouse is pressed (`onMouseDown`/`onMouseUp`).",
      "Remove `e.preventDefault()` and see what submitting does.",
    ],
  },
  "16-event-handlers-as-props": {
    title: "Reusable star rating",
    description: "`StarRating` does not decide what a click means - the parent passes `onRate`, so one component serves two different uses.",
    challenges: [
      "Add a third rating for \"Ambience\".",
      "Add an `onHover` prop and show a label like \"Excellent\" for 5 stars.",
      "Disable rating once the average reaches 5.",
    ],
  },
  "17-introduction-to-state": {
    title: "Plain variable vs state",
    description: "Both counters change a value on click. Only `useState` keeps it across renders and tells React to update the screen.",
    challenges: [
      "Click the plain counter a few times, then the state counter. Why does the plain one still show 0?",
      "Move `let count = 0` outside the component. Does it work now? What if you render two counters?",
      "Add a Reset button to the state counter.",
    ],
  },
  "18-usestate-hook": {
    title: "Tip calculator",
    description: "Three `useState` values; tip, total and per-person amounts are plain calculations during render.",
    challenges: [
      "Add quick-pick buttons for 5%, 10% and 15%.",
      "Round the per-person amount up to the next rupee.",
      "Add a \"Reset\" button that restores all three values.",
    ],
  },
  "19-rules-of-hooks": {
    title: "A custom useToggle hook",
    description: "Hooks run in the same order on every render. The custom `useToggle` hook is just a function that calls `useState`.",
    challenges: [
      "Wrap one `useToggle()` call in `if (Math.random() > 0.5)` and read the error when it breaks.",
      "Make `useToggle` also return `setOn` so callers can force a value.",
      "Write a `useCounter(start)` hook and use it twice.",
    ],
  },
  "20-how-state-updates-work": {
    title: "Why +3 only adds 1",
    description: "`setScore` asks for a re-render; it does not change `score` right away. The Console shows the value seen in each render.",
    challenges: [
      "Fix `addThree` so it really adds 3 (hint: the next lesson).",
      "Log `score` inside a `setTimeout` after `setScore` - is it newer?",
      "Add a -1 button that never goes below 0.",
    ],
  },
  "21-state-as-a-snapshot": {
    title: "Delayed message sender",
    description: "The timeout reads `message` and `to` from the render where you clicked, not the latest values.",
    challenges: [
      "Change the text right after pressing Send and compare the Console with the screen.",
      "Show a \"Sent!\" toast for 2 seconds after sending.",
      "Add a character counter to the textarea.",
    ],
  },
  "22-setstate-using-previous-state": {
    title: "Snapshot vs updater function",
    description: "Three `setA(a + 1)` calls share one snapshot; three `setB(prev => prev + 1)` calls chain correctly.",
    challenges: [
      "Mix them: `setB(b + 5)` then `setB(prev => prev + 1)` - predict the result first.",
      "Add a \"double\" button using an updater function.",
      "Add a button that adds 3 after a 1-second delay, clicked several times quickly.",
    ],
  },
  "23-how-react-batches-updates": {
    title: "Three updates, one render",
    description: "The render counter and Console prove React batches all state updates from one event - even inside `setTimeout`.",
    challenges: [
      "Add a fourth piece of state and set it in `fillForm` - still one render?",
      "Wrap one update in `flushSync` from \"react-dom\" and count renders again.",
      "Log in the handler before and after the updates to see the order.",
    ],
  },
  "24-usestate-with-objects": {
    title: "Profile editor",
    description: "Update objects by copying with `...spread`. The nested `address` needs its own spread. The mutation button shows what goes wrong.",
    challenges: [
      "Add an input for the PIN code.",
      "Add a nested `social: { github }` field and edit it.",
      "Click the mutation button, then type in a field - where did \"Mutated!\" come from?",
    ],
  },
  "25-usestate-with-arrays": {
    title: "Todo list without mutation",
    description: "Add with spread, remove with `filter`, update with `map` - every change returns a new array.",
    challenges: [
      "Add \"Clear completed\".",
      "Double-click a todo to edit its text.",
      "Add filter buttons: All / Active / Done.",
    ],
  },
  "26-sharing-state-between-components": {
    title: "Celsius ⇄ Fahrenheit converter",
    description: "The temperature lives in the parent; both inputs and the verdict read it. Lifting state up keeps them in sync.",
    challenges: [
      "Add a Kelvin input.",
      "Add a slider that controls the same temperature.",
      "Move the state into one `TemperatureInput` - what breaks?",
    ],
  },
  "27-usereducer-hook": {
    title: "Food order cart",
    description: "All cart logic lives in `cartReducer`. The component only dispatches actions like `added` and `removed`.",
    challenges: [
      "Add a `decremented` action that lowers qty (and removes at 0).",
      "Add a 5% GST line to the total.",
      "Log every action in the reducer to watch them arrive.",
    ],
  },
  "28-usereducer-simple-state-and-action": {
    title: "Volume control",
    description: "State is a number and each action is a plain string: `up`, `down`, `mute`.",
    challenges: [
      "Add a `max` action.",
      "Make `mute` remember the old volume and add `unmute` (hint: state becomes an object).",
      "Disable − at 0 and + at 100.",
    ],
  },
  "28a-usereducer-with-immer": {
    title: "Kanban board with Immer",
    description: "`useImmerReducer` lets you `push` and `splice` on a draft; Immer turns it into a new immutable state.",
    challenges: [
      "Add a `delete` action for cards.",
      "Add a `rename` action that sets `card.title` on the draft.",
      "Rewrite `move` without Immer to feel the difference.",
    ],
  },
  "29-usereducer-complex-state-and-actions": {
    title: "Expense tracker",
    description: "State holds a list and a filter. Each action carries a typed `payload`.",
    challenges: [
      "Add an `edited` action to change an expense amount.",
      "Show totals per category.",
      "Prevent negative amounts inside the reducer.",
    ],
  },
  "30-usereducer-lazy-initialization": {
    title: "Notes loaded once from localStorage",
    description: "`useReducer(reducer, arg, init)` runs `init` only on mount. The Console shows it does not run while you type.",
    challenges: [
      "Change it to `useReducer(reducer, createInitialState(\"Guna\"))` and type - count the logs.",
      "Add a delete button for each note.",
      "Store a timestamp with each note.",
    ],
  },
  "31-implementing-usestate-with-usereducer": {
    title: "Build your own useState",
    description: "`useMyState` is a few lines of `useReducer` and behaves like `useState`, updater functions included.",
    challenges: [
      "Add a third `useMyState` for a boolean toggle.",
      "Make `useMyState` accept a lazy initializer function too.",
      "Log every action the reducer receives.",
    ],
  },
  "32-usestate-vs-usereducer": {
    title: "Same form, two styles",
    description: "Compare how a login form reads with separate `useState` calls and with one reducer.",
    challenges: [
      "Add a \"remember me\" checkbox to both - which change was easier?",
      "Add validation that shows an error for an email without @.",
      "Count how many places change when you rename a field in each version.",
    ],
  },
  "33-the-prop-drilling-problem": {
    title: "Following a prop down the tree",
    description: "`user` is only used by `UserMenu`, yet three red components must accept and pass it on.",
    challenges: [
      "Add a `theme` value that `UserMenu` also needs - count the edits.",
      "Add another level (`Toolbar`) between `Navbar` and `UserMenu`.",
      "Fix it with context (next lesson).",
    ],
  },
  "34-context-and-usecontext-hook": {
    title: "Language switcher with context",
    description: "`Page` never receives the language, yet `Greeting` and `Tagline` read it with `useContext`.",
    challenges: [
      "Add a fourth language.",
      "Remove the provider - which default language shows?",
      "Nest a second provider with a fixed language around `Tagline` only.",
    ],
  },
  "35-context-with-state": {
    title: "Shared shopping cart",
    description: "`CartProvider` holds state and actions in context; the badge, product list and summary all use `useCart()`.",
    challenges: [
      "Add a `remove(item)` action.",
      "Show a count per product in `CartSummary`.",
      "Render `CartBadge` outside the provider and read the error.",
    ],
  },
  "36-use-api-for-context": {
    title: "use() for context and promises",
    description: "`use(ThemeContext)` runs after an early return (not allowed for hooks). `use(promise)` suspends until the quote arrives.",
    challenges: [
      "Change the fallback to a spinner.",
      "Make `fetchQuote` reject sometimes and add an error boundary.",
      "Replace `use(ThemeContext)` with `useContext` - what does React say?",
    ],
  },
  "37-refs-and-useref-hook": {
    title: "Stopwatch with laps",
    description: "The interval id lives in a ref: it survives re-renders and changing it does not cause a render.",
    challenges: [
      "Add a Reset button.",
      "Keep the time when you stop and continue on Start.",
      "Store the id in state instead of a ref - what goes wrong?",
    ],
  },
  "38-manipulate-the-dom-with-refs": {
    title: "Chat box with auto-scroll and focus",
    description: "Refs to the real `<input>` and `<div>` let you call DOM methods like `focus()` and `scrollTo()`.",
    challenges: [
      "Focus the input automatically after sending.",
      "Add a \"scroll to top\" button.",
      "Show the chat box height using `getBoundingClientRect()`.",
    ],
  },
  "39-the-effect-hook": {
    title: "Window size and online status",
    description: "An effect subscribes to browser events and its cleanup unsubscribes. The second effect re-runs when `clicks` changes.",
    challenges: [
      "Update `document.title` with the window width.",
      "Remove the cleanup, mount/unmount a few times, then resize - check the Console.",
      "Add a `scroll` listener that shows the scroll position.",
    ],
  },
  "40-react-debugging-tools": {
    title: "Profiler and useDebugValue",
    description: "`<Profiler>` reports render timings to the Console; `useDebugValue` labels the custom hook in React DevTools.",
    challenges: [
      "Wrap the button in a second Profiler with a different id.",
      "Make `SlowList` slower and watch the timings.",
      "Open React DevTools and find the \"clicks: n\" label.",
    ],
  },
  "41-axios-vs-fetch": {
    title: "User loader: fetch vs axios",
    description: "Loads a real user from JSONPlaceholder. Try id 999 with both clients to see how each handles a 404.",
    challenges: [
      "Remove the `res.ok` check and load id 999 with fetch.",
      "Show a list of all users instead of one.",
      "Add a 3-second timeout (fetch: `AbortSignal.timeout`, axios: `{ timeout }`).",
    ],
  },
  "42-react-router": {
    title: "Mini blog with nested routes",
    description: "A layout route with `<Outlet />`, an index route, a `:slug` param and a catch-all - running in a `MemoryRouter`.",
    challenges: [
      "Add an About page and nav link.",
      "Show \"Post x of 3\" with next/previous links.",
      "Start on a post with `initialEntries={[\"/posts/hooks\"]}`.",
    ],
  },
  "42a-react-router-data-apis": {
    title: "Todos with loader, action and errorElement",
    description: "The loader fetches before rendering, `<Form>` posts to the action, loaders re-run, and \"boom\" shows the error page.",
    challenges: [
      "Add a delete action using a second `<Form>` with a hidden input.",
      "Return a validation error from the action and show it with `useActionData()`.",
      "Show a pending state on the Add button with `useNavigation()`.",
    ],
  },
  "42b-react-router-v7-and-v8": {
    title: "Filters stored in the URL",
    description: "`useSearchParams` keeps brand and sort in the query string - state you can share as a link.",
    challenges: [
      "Add a max-price filter stored as `?max=`.",
      "Add a \"Clear filters\" button.",
      "Start with `?brand=Dell&sort=desc` using `initialEntries`.",
    ],
  },
  "43-usecallback-and-react-memo": {
    title: "memo and useCallback render counts",
    description: "Toggle the theme: the child with an inline function re-renders, the `useCallback` one does not.",
    challenges: [
      "Remove `memo()` - do both children re-render now?",
      "Pass `count` into the `useCallback` dependency list - what changes?",
      "Pass a `style` object to `Child` and keep it stable with `useMemo`.",
    ],
  },
  "43a-react-compiler-vs-manual-memoization": {
    title: "What the compiler saves you from",
    description: "Without the React Compiler, a new object and function every render make `<Chart>` re-render as you type.",
    challenges: [
      "Wrap `options` in `useMemo` and `onSelect` in `useCallback` - does typing still re-render the chart?",
      "Move `onSelect` outside the component instead - why does that also work?",
      "Change the color - the chart should re-render then.",
    ],
  },
  "44-usememo-hook": {
    title: "Fast theme toggle over a slow filter",
    description: "The slow filter is wrapped in `useMemo`, so toggling the theme does not recalculate it.",
    challenges: [
      "Remove `useMemo` and toggle the theme - feel the lag and check the Console.",
      "Add a sort option to the dependency list.",
      "Show how long the filter took using `performance.now()`.",
    ],
  },
};

export const examples: Record<string, LessonExample> = Object.fromEntries(
  Object.entries(info).map(([id, meta]) => [id, { ...meta, code: codeFor(id) }]),
);
