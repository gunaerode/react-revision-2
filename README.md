# react-revision-2

React + TypeScript + Vite project for revising React fundamentals - components, JSX, hooks, event handling, and rendering behavior.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Learning Log

Following along with [react.dev/learn](https://react.dev/learn), redoing each example/exercise in TypeScript.

- [x] [Learn React](https://react.dev/learn) - components, JSX, props, state, event handling
- [x] [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) - components, props, state, immutability, lifting state up, time travel
- [x] [Thinking in React](https://react.dev/learn/thinking-in-react) - breaking a UI into a component hierarchy, building a static version, identifying minimal state, and wiring up data flow (see `FilterableProductTable`)
- [ ] [API Reference](https://react.dev/reference/react) - pending, will start after revising react.dev/learn
- [ ] [React Compiler Debugging](https://react.dev/learn/react-compiler/debugging) - pending, refer to this after revising react.dev/learn

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

If you run into a compiler bug, see the [debugging guide](https://react.dev/learn/react-compiler/debugging) and file a report using the [compiler bug report template](https://github.com/react/react/issues/new?template=compiler_bug_report.yml).

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
