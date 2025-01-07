import { cn } from '@lib/utils';

type ListType = {
  children?: React.ReactNode[];
  LiClassName?: string;
} & React.HTMLAttributes<HTMLUListElement>;

export function List({ children, ...props }: Readonly<ListType>) {
  return (
    <ul {...props} className={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.className)}>
      {children ? (
        children.map((child, i) => (
          <li key={i} className={props.LiClassName}>
            {child}
          </li>
        ))
      ) : (
        <li>Nenhum item foi listado ainda</li>
      )}
    </ul>
  );
}
