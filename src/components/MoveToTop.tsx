import { ChevronUpIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@lib/utils';

export function MovetoTopButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn('fixed bottom-5 right-5 xl:right-16 z-50 h-14 w-14 rounded-full p-2', className)}
      onClick={() => window.scrollTo(0, 0)}
    >
      <ChevronUpIcon className="h-16 w-16" />
    </Button>
  );
}
