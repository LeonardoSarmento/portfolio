import { cn } from '@lib/utils';

type LeadType = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function Lead({ children, ...props }: Readonly<LeadType>) {
  return (
    <p {...props} className={cn('text-xl text-muted-foreground', props.className)}>
      {children}
    </p>
  );
}
