import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import Markdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import { Card } from './ui/card';
import { CustomPre } from './CodeCopyButton';
import remarkDirective from 'remark-directive';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';

type TMarkdownRenderer = {
  markdown: string;
  clasName?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export default function MarkdownRenderer({ markdown, ...props }: TMarkdownRenderer) {
  return (
    <Card className="m-10 mb-0 p-10 max-sm:m-3 max-sm:p-3" {...props}>
      <Markdown
        className="markdown-body rounded p-6 max-sm:p-1"
        remarkPlugins={[remarkDirective, remarkGfm, remarkGemoji, remarkMath, remarkGithubAdmonitionsToDirectives]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSanitize,
          rehypeSlug,
          [rehypeExternalLinks, { rel: ['nofollow'], target: '_blank' }],
          rehypeAutoLinkHeadings,
          rehypeKatex,
          rehypeHighlight,
        ]}
        components={{
          pre: CustomPre,
          // code: ({ node, className, children, ...props }) => {
          //   const match = /language-(\w+)/.exec(className || '');
          //   const id = (Math.floor(Math.random() * 100) + 1).toString();
          //   if (match?.length) {
          //     let Icon = PiTerminalThin;
          //     const isMatch = icons.hasOwnProperty(match[1]);
          //     if (isMatch) {
          //       Icon = icons[match[1] as keyof typeof icons];
          //     }

          //     return (
          //       <div className=" bg-graident-dark rounded-md border-[0.5px] border-zinc-500 text-gray-300">
          //         <div className="flex items-center justify-between border-b-[0.5px] border-zinc-500 px-5 py-2">
          //           <div className="flex items-center gap-2">
          //             <Icon />
          //             <p className="text-sm text-gray-400">
          //               {/* @ts-ignore  */}
          //               {node?.data?.meta}
          //             </p>
          //           </div>
          //         </div>
          //         <div className="w-full overflow-x-auto">
          //           <div className="p-5" id={id}>
          //             {children}
          //           </div>
          //         </div>
          //       </div>
          //     );
          //   } else {
          //     return (
          //       // TODO: convert to code block
          //       <code className="break-words rounded-sm bg-zinc-700 px-1 text-lg" {...props}>
          //         {children}
          //       </code>
          //     );
          //   }
          // },
        }}
      >
        {markdown}
      </Markdown>
    </Card>
  );
}
