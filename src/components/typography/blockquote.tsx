import { cn } from '@lib/utils';

type BlockquoteType = {
  children?: React.ReactNode;
} & React.BlockquoteHTMLAttributes<HTMLQuoteElement>;

export function Blockquote({ children, ...props }: Readonly<BlockquoteType>) {
  return (
    <blockquote {...props} className={cn('mt-6 border-l-2 pl-6 italic', props.className)}>
      {children}
    </blockquote>
  );
}
