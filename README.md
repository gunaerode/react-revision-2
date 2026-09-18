# react-revision-2

React + TypeScript + Vite project for revising React fundamentals - components, JSX, hooks, event handling, state, `useReducer`, and Context.

This started as a minimal Vite template and grew into a hands-on companion to Codevolution's **React 19 Tutorial** playlist: every video gets its own lesson under [`src/lessons`](src/lessons), with an original example (not a copy of the course's code) plus a plain-language explanation of the concept.

## How this repo is organized

Run it with `npm run dev`, then use the sidebar to jump between the 38 topics. Each lesson page has a short "what this is" explanation and a small interactive demo you can click around in.

| Folder | What goes there |
| --- | --- |
| [`src/lessons/NN-topic/`](src/lessons) | One folder per playlist video. Each has an `index.tsx`, and its own `constants.ts` / `types.ts` / `utils.ts` only when the topic needs data, types, or helper functions. |
| [`src/components/`](src/components) | Reusable UI shared across lessons (`Profile`, `MyButton`, the lesson layout/sidebar chrome). |
| [`src/constants/`](src/constants) | Static data not tied to one lesson (the react.dev walkthrough's sample user/product data). |
| [`src/types/`](src/types) | Shared TypeScript types/interfaces. |
| [`src/utils/`](src/utils) | Pure, framework-free helper functions. |

## Resources

- Video course: [React 19 Tutorial playlist](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3) by [Codevolution](https://www.youtube.com/@Codevolution)
- Course reference repo: [gopinav/React-19-Tutorials](https://github.com/gopinav/React-19-Tutorials/tree/main/react-essentials) (used for cross-checking, not copied from)
- Docs: [react.dev/learn](https://react.dev/learn)
- This repo: [gunaerode/react-revision-2](https://github.com/gunaerode/react-revision-2)

## Learning log

Every row's **Lesson** link opens this repo's own implementation of that topic - not the course's code.

| # | Topic | Video | Lesson (this repo) | react.dev |
| - | --- | --- | --- | --- |
| 1 | Introduction | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=1) | [lesson](src/lessons/01-introduction/index.tsx) | - |
| 2 | Your First React App | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=2) | [lesson](src/lessons/02-your-first-react-app/index.tsx) | - |
| 3 | Project Structure | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=3) | [lesson](src/lessons/03-project-structure/index.tsx) | - |
| 4 | Components | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=4) | [lesson](src/lessons/04-components/index.tsx) | [docs](https://react.dev/learn/your-first-component) |
| 5 | Export and Import Components | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=5) | [lesson](src/lessons/05-export-and-import-components/index.tsx) | [docs](https://react.dev/learn/importing-and-exporting-components) |
| 6 | JSX | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=6) | [lesson](src/lessons/06-jsx/index.tsx) | [docs](https://react.dev/learn/writing-markup-with-jsx) |
| 7 | Rules of JSX | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=7) | [lesson](src/lessons/07-rules-of-jsx/index.tsx) | [docs](https://react.dev/learn/writing-markup-with-jsx) |
| 8 | Props | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=8) | [lesson](src/lessons/08-props/index.tsx) | [docs](https://react.dev/learn/passing-props-to-a-component) |
| 9 | Props Patterns | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=9) | [lesson](src/lessons/09-props-patterns/index.tsx) | [docs](https://react.dev/learn/passing-props-to-a-component) |
| 10 | Conditional Rendering | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=10) | [lesson](src/lessons/10-conditional-rendering/index.tsx) | [docs](https://react.dev/learn/conditional-rendering) |
| 11 | Rendering Lists | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=11) | [lesson](src/lessons/11-rendering-lists/index.tsx) | [docs](https://react.dev/learn/rendering-lists) |
| 12 | Lists and Keys | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=12) | [lesson](src/lessons/12-lists-and-keys/index.tsx) | [docs](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) |
| 13 | Index as Key Anti-Pattern | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=13) | [lesson](src/lessons/13-index-as-key-anti-pattern/index.tsx) | [docs](https://react.dev/learn/rendering-lists#why-does-react-need-keys) |
| 14 | Styling React Components | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=14) | [lesson](src/lessons/14-styling-react-components/index.tsx) | - |
| 15 | Event Handling | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=15) | [lesson](src/lessons/15-event-handling/index.tsx) | [docs](https://react.dev/learn/responding-to-events) |
| 16 | Event Handlers as Props | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=16) | [lesson](src/lessons/16-event-handlers-as-props/index.tsx) | [docs](https://react.dev/learn/responding-to-events#passing-event-handlers-as-props) |
| 17 | Introduction to State | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=17) | [lesson](src/lessons/17-introduction-to-state/index.tsx) | [docs](https://react.dev/learn/state-a-components-memory) |
| 18 | useState Hook | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=18) | [lesson](src/lessons/18-usestate-hook/index.tsx) | [docs](https://react.dev/reference/react/useState) |
| 19 | Rules of Hooks | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=19) | [lesson](src/lessons/19-rules-of-hooks/index.tsx) | [docs](https://react.dev/warnings/invalid-hook-call-warning) |
| 20 | How State Updates Work | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=20) | [lesson](src/lessons/20-how-state-updates-work/index.tsx) | [docs](https://react.dev/learn/state-as-a-snapshot) |
| 21 | State as a Snapshot | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=21) | [lesson](src/lessons/21-state-as-a-snapshot/index.tsx) | [docs](https://react.dev/learn/state-as-a-snapshot) |
| 22 | setState using Previous State | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=22) | [lesson](src/lessons/22-setstate-using-previous-state/index.tsx) | [docs](https://react.dev/learn/queueing-a-series-of-state-updates) |
| 23 | How React Batches Updates | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=23) | [lesson](src/lessons/23-how-react-batches-updates/index.tsx) | [docs](https://react.dev/learn/queueing-a-series-of-state-updates) |
| 24 | useState with Objects | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=24) | [lesson](src/lessons/24-usestate-with-objects/index.tsx) | [docs](https://react.dev/learn/updating-objects-in-state) |
| 25 | useState with Arrays | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=25) | [lesson](src/lessons/25-usestate-with-arrays/index.tsx) | [docs](https://react.dev/learn/updating-arrays-in-state) |
| 26 | Sharing State Between Components | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=26) | [lesson](src/lessons/26-sharing-state-between-components/index.tsx) | [docs](https://react.dev/learn/sharing-state-between-components) |
| 27 | useReducer Hook | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=27) | [lesson](src/lessons/27-usereducer-hook/index.tsx) | [docs](https://react.dev/reference/react/useReducer) |
| 28 | useReducer (simple state and action) | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=28) | [lesson](src/lessons/28-usereducer-simple-state-and-action/index.tsx) | - |
| 29 | useReducer (complex state and actions) | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=29) | [lesson](src/lessons/29-usereducer-complex-state-and-actions/index.tsx) | - |
| 30 | useReducer Lazy Initialization | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=30) | [lesson](src/lessons/30-usereducer-lazy-initialization/index.tsx) | [docs](https://react.dev/reference/react/useReducer#avoiding-recreating-the-initial-state) |
| 31 | Implementing useState with useReducer | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=31) | [lesson](src/lessons/31-implementing-usestate-with-usereducer/index.tsx) | - |
| 32 | useState vs useReducer | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=32) | [lesson](src/lessons/32-usestate-vs-usereducer/index.tsx) | [docs](https://react.dev/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer) |
| 33 | The Prop Drilling Problem | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=33) | [lesson](src/lessons/33-the-prop-drilling-problem/index.tsx) | [docs](https://react.dev/learn/passing-data-deeply-with-context) |
| 34 | Context and useContext Hook | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=34) | [lesson](src/lessons/34-context-and-usecontext-hook/index.tsx) | [docs](https://react.dev/reference/react/useContext) |
| 35 | Context with State | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=35) | [lesson](src/lessons/35-context-with-state/index.tsx) | [docs](https://react.dev/learn/scaling-up-with-reducer-and-context) |
| 36 | use API for Context | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=36) | [lesson](src/lessons/36-use-api-for-context/index.tsx) | [docs](https://react.dev/reference/react/use) |
| 37 | Refs and useRef Hook | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=37) | [lesson](src/lessons/37-refs-and-useref-hook/index.tsx) | [docs](https://react.dev/learn/referencing-values-with-refs) |
| 38 | Manipulate the DOM with Refs | [▶](https://www.youtube.com/playlist?list=PLC3y8-rFHvwg9D7EOSEBabuutIdKZN5V3&index=38) | [lesson](src/lessons/38-manipulate-the-dom-with-refs/index.tsx) | [docs](https://react.dev/learn/manipulating-the-dom-with-refs) |

### Also completed directly on react.dev (outside this playlist)

- [x] [Learn React](https://react.dev/learn) - components, JSX, props, state, event handling
- [x] [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) - components, props, state, immutability, lifting state up, time travel
- [x] [Thinking in React](https://react.dev/learn/thinking-in-react) - breaking a UI into a component hierarchy, minimal state, and data flow (see [`FilterableProductTable`](src/components/FilterableProductTable.tsx), used again in [lesson 12](src/lessons/12-lists-and-keys/index.tsx) and [lesson 26](src/lessons/26-sharing-state-between-components/index.tsx))
- [ ] [API Reference](https://react.dev/reference/react) - pending, next after this playlist
- [ ] [React Compiler Debugging](https://react.dev/learn/react-compiler/debugging) - pending, refer to this once Effects/API Reference are covered

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

If you run into a compiler bug, see the [debugging guide](https://react.dev/learn/react-compiler/debugging) and file a report using the [compiler bug report template](https://github.com/react/react/issues/new?template=compiler_bug_report.yml).

A few lessons (17, 23, 24) intentionally demonstrate what breaks when a component violates the Rules of React - mutating a local variable or state directly during render. Those specific components opt out of the compiler with a `"use no memo"` directive and have their matching `eslint-plugin-react-hooks` purity rule turned off in [`eslint.config.js`](eslint.config.js), so the anti-pattern behaves like real, un-compiled React instead of being silently optimized away.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
