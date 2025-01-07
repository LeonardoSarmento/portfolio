import { cn } from '@lib/utils';

type H1Type = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H1({ children, ...props }: Readonly<H1Type>) {
  return (
    <h1 {...props} className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', props.className)}>
      {children}
    </h1>
  );
}
