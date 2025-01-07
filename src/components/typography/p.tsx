import { cn } from '@lib/utils';

type PType = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function P({ children, ...props }: Readonly<PType>) {
  return (
    <p {...props} className={cn('leading-7 [&:not(:first-child)]:mt-6', props.className)}>
      {children}
    </p>
  );
}
