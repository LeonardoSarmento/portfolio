import { cn } from '@lib/utils';

type H2Type = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H2({ children, ...props }: Readonly<H2Type>) {
  return (
    <h2
      {...props}
      className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', props.className)}
    >
      {children}
    </h2>
  );
}
