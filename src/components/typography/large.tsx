import { cn } from '@lib/utils';

type LargeType = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Large({ children, ...props }: Readonly<LargeType>) {
  return (
    <div {...props} className={cn('text-lg font-semibold', props.className)}>
      {children}
    </div>
  );
}
