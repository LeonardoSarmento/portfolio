## Portfolio.

A portfolio for showing various tecnologies i've learned to apply through my work projects.

### Techs

- Language : `TypeScript` (^5.3.3)
- Web Application framework : `Vite` (^5.0.8)
- State management : `@reduxjs/toolkit` (^2.1.0)
- State management : `@tanstack/react-query` (^5.18.1)
- Router : `@tanstack/react-router` (^1.15.17)
- HTTP Request : `axios` (^1.6.7)
- Form : `react-hook-form` (^7.50.0)
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
