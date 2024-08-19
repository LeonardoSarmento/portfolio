import { Moon, Sun  } from 'lucide-react';

import { Button, ButtonProps } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { useTheme } from '@components/Theme-provider';

type ModeToggleBtn = ButtonProps & React.RefAttributes<HTMLButtonElement>;

export function ModeToggle({ ...props }: ModeToggleBtn) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props} variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="relative left-2 w-6 min-w-[3rem]">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
