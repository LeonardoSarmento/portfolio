## Portfolio.

A portfolio for showing various tecnologies i've learned to apply through my work projects.

### Techs

- Language : `TypeScript` (^5.3.3)
- Web Application framework : `Vite` (^5.0.8)
- State management : `@reduxjs/toolkit` (^2.1.0)
- State management : `@tanstack/react-query` (^5.20.1)
- Router : `@tanstack/react-router` (^1.46.4)
- HTTP Request : `axios` (^1.6.7)
- Form : `react-hook-form` (^7.50.1)
- Validation : `zod` (^3.22.4)
- Styling : `tailwindcss` (^3.4.1)

- Lint : `eslint` (^8.55.0)
- Formatting : `prettier` (3.2.5)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Generating CSS for `markdown`

## Libraries used to obtain `markdown` CSS

 - Github Markdown: [`github-markdown-css`](https://github.com/sindresorhus/github-markdown-css): (^5.5.1)
 - Generate CSS: [`generate-github-markdown-css`](https://github.com/sindresorhus/generate-github-markdown-css): (^6.2.1)

Setup the file to generate based on the markdown file you want.

```js
import * as fs from 'fs';
import githubMarkdownCss from 'generate-github-markdown-css';

githubMarkdownCss({
  // The theme to use for light theme.
  light: 'light',
  // The theme to use for dark theme.
  dark: 'dark',
  // If `true`, will return a list of available themes instead of the CSS.
  list: false,
  // If `true`, will preserve the block of variables for a given theme even if
  // only exporting one theme. By default, variables are applied to the rules
  // themselves and the resulting CSS will not contain any `var(--variable)`.
  preserveVariables: false,
  // Only output the color variables part of the CSS. Forces
  // `preserveVariables` to be `true`.
  onlyVariables: false,
  // Only output the style part of the CSS without any variables. Forces
  // `preserveVariables` to be `true` and ignores the theme values.
  // Useful to get the base styles to use multiple themes.
  onlyStyles: false,
  // Set the root selector of the rendered Markdown body as it should appear
  // in the output CSS. Defaults to `.markdown-body`.
  rootSelector: '.markdown-body',
}).then((css: string | NodeJS.ArrayBufferView) => {
  fs.writeFileSync('src/github-markdown.css', css);
});

```

Use terminal to run the code.

```bash
npx tsx src/lib/generate-markdown-css.ts
```

---

Generate sha256 hash in terminal

```bash

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

```