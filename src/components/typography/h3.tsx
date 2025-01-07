import { cn } from '@lib/utils';

type H3Type = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H3({ children, ...props }: Readonly<H3Type>) {
  return (
    <h3 {...props} className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', props.className)}>
      {children}
    </h3>
  );
}
