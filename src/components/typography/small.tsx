import { cn } from '@lib/utils';

type SmallType = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function Small({ children, ...props }: Readonly<SmallType>) {
  return (
    <small {...props} className={cn('text-sm font-medium leading-none', props.className)}>
      {children}
    </small>
  );
}
