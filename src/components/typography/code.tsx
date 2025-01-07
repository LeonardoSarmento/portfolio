import { cn } from '@lib/utils';

type CodeType = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function P({ children, ...props }: Readonly<CodeType>) {
  return (
    <code
      {...props}
      className={cn(
        '"relative font-semibold" rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        props.className,
      )}
    >
      {children}
    </code>
  );
}
