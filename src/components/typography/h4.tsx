import { cn } from '@lib/utils';

type H4Type = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H4({ children, ...props }: Readonly<H4Type>) {
  return (
    <h4 {...props} className={cn('scroll-m-20 text-xl font-semibold tracking-tight', props.className)}>
      {children}
    </h4>
  );
}
