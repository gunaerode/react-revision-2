import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // These lessons exist specifically to demonstrate what breaks when you violate
    // a Rule of React (mutating state/locals during render, reading globals during
    // render) - the violation is the whole point, not an oversight, so the matching
    // React Compiler purity rule is turned off for just these files.
    files: [
      'src/lessons/17-introduction-to-state/PlainVariableCounter.tsx',
      'src/lessons/23-how-react-batches-updates/index.tsx',
      'src/lessons/24-usestate-with-objects/index.tsx',
    ],
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/globals': 'off',
    },
  },
])
