# A demo of `react-markdown`

`react-markdown` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

- Follows [CommonMark](https://commonmark.org)
- Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Renders actual React elements instead of using `dangerouslySetInnerHTML`
- Lets you define your own components (to render `MyHeading` instead of `'h1'`)
- Has a lot of plugins

1. List Item 1
2. List Item 2
3. List Item 3

- List Item 1
- List Item 2
- List Item 3

  1. OL item 1
  - UL item 1.1
  - UL item 1.2
  - UL item 1.3

  2. OL item 2
    - UL item 2.1
    - UL item 2.2
    - UL item 2.3

1. First list item
   - First nested list item
     - Second nested list item

:::note
This is a note
:::

:::warning
This is a warning
:::


<!-- This content will not appear in the rendered Markdown -->

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.


Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.

## Contents

Here is an example of a plugin in action
([`remark-toc`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[`rehype-highlight`](https://github.com/rehypejs/rehype-highlight).

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const markdown = `
# Your markdown here
`;

ReactDOM.render(<Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>, document.querySelector('#content'));
```

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can _also_ use a plugin:
[`remark-gfm`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.


|    Feature | Support              |Support              |            
| ---------: | :------------------: |:------------------- |
| CommonMark | 100%                 |100%                 |
|        GFM | 100% w/ `remark-gfm` |100% w/ `remark-gfm` |


| column 1 | column 2 |
|------------|----------|
| value | <ul><li>value 1</li><li>value 2</li></ul> |
| value | <ul><li>value 1</li><li>value 2</li></ul> |

| column 1 | column 2 |
|:----------:|----------|
| value | <p>value 1<br>value 2</p> |
| value | <p>value 1<br>value 2</p> |

1. Action A
1. Action B
   ```
   // involves some code block
   ```
1. Action C — autonumbered 3
1. Action D — autonumbered 4


A list of items:
- list item foo
  ```
  # fence-block must indent 2–5 spaces
  # to appear under list item
  ```
- list item bar <!-- the next empty line is mandatory! -->

      # 4-space block must indent 2+4 spaces (or more)
      # and have an empty line preceding it
      # to appear under list item
- list item buzz

For contrast, code outside of list:

    # Notice the appearance of paragraph-level (not in-list) code block

- [ ] タスクリスト
- [x] タスクリスト
    - [ ] タスクリスト
    - [x] タスクリスト


| Collumns |||
| --- | --- | --- |
| First | Second | Third |
| First 1 | <p> Second 2 <p> Second 2 | <p> Third 1 <p> Third 2 <p> Third 3 |
| * List 1 element | <p>* List 2 elements (1) <p>* List 2 elements (2) | <p>* List 3 elements (1) <p>* List 3 elements (2) <p>* List 3 elements (3) |

~~strikethrough~~

- [ ] task list
- [x] checked item



https://example.com

```
# code block
print '3 backticks or'
print 'indent 4 spaces'
```

## Image in markdown

`![alt](link)` will result in:

![One Piece](https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/12/one-piece-remake.png?w=682)

## Image in the center

`![alt](link#center)` will result in:

![One Piece](https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/12/one-piece-remake.png?w=682#center)

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [`rehype-raw`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[`rehype-sanitize`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import MyFancyRule from './components/my-fancy-rule.js';

const markdown = `
# Your markdown here
`;

ReactDOM.render(
  <Markdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr(props) {
        const { node, ...rest } = props;
        return <MyFancyRule {...rest} />;
      },
    }}
  >
    {markdown}
  </Markdown>,
  document.querySelector('#content'),
);
```

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

---
Much more info is available in the
[Shadcn blog post](https://jidefr.medium.com/shadcn-ui-add-components-and-resources-0846b0f57596)!

---

A component by [Espen Hovlandsdal](https://espen.codes/)
