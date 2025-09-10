import js from '@eslint/js';
import globals from 'globals';   // installing module
import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,          // basic rules ESLint
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,      // browser globals: window, document, console …
        ...globals.node,         // node: process, Buffer, console …
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules, // recommended rules Next.js
      ...tsPlugin.configs.recommended.rules,   // recommended rules TS
      //! further rules can be here...
    },
  },
  {
    //! ignoring paths which are not required to be linted...
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'next-env.d.ts',
      '.vscode/**',
      'docs/**',
      'scripts/**',
      '*.config.{js,mjs,ts}',
    ],
  },
];