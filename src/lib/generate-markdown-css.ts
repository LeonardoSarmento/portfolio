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
