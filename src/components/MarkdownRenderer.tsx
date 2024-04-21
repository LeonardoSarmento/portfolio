import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import Markdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import { Card } from './ui/card';

type TMarkdownRenderer = {
  markdown: string;
};

export function MarkdownRenderer({ markdown }: TMarkdownRenderer) {
  return (
    <Card className="col-span-12  row-start-5 m-10 grid h-fit p-10">
      <Markdown
        className="markdown-body rounded p-6"
        remarkPlugins={[remarkGfm, remarkGemoji, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeSlug, rehypeKatex, rehypeAutoLinkHeadings, rehypeHighlight]}
      >
        {markdown}
      </Markdown>
    </Card>
  );
}
