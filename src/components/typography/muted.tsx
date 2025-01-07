import { cn } from '@lib/utils';

type MutedType = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function Muted({ children, ...props }: Readonly<MutedType>) {
  return (
    <p {...props} className={cn('text-sm text-muted-foreground', props.className)}>
      {children}
    </p>
  );
}
