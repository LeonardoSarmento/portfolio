import { Toggle } from './ui/toggle';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { ToggleProps } from '@radix-ui/react-toggle';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Flag, getCountrCode } from './SelectLanguage';
export const RESUME_EN_US = new URL('/', import.meta.url).href;
export const RESUME_PT_BR = new URL('/public/assets/leo-barzinho.jpg', import.meta.url).href;

type ResumeDialogBtn = ToggleProps & React.RefAttributes<HTMLButtonElement>;

export function ResumeDialog({ ...props }: ResumeDialogBtn) {
  const { t } = useTranslation('login');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toggle {...props} asChild aria-label="Toggle italic">
        <DialogTrigger className="transition-all duration-300 hover:scale-125">
          <Download size={20} />
        </DialogTrigger>
      </Toggle>
      <DialogContent className="w-80 rounded-md sm:max-w-md md:w-full">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>Curriculo</DialogTitle>
          <DialogDescription>Escolha em qual lingua ver quer ler ele</DialogDescription>
        </DialogHeader>
        <div className="my-2 flex justify-around">
          {[
            { code: 'en-US', link: '' },
            { code: 'pt-BR', link: '' },
          ].map((option) => (
            <Link key={option.code} className="gap-3" href={option.link}>
              <Button type="button">
                <Flag countryCode={getCountrCode(option.code)} className="w-8 rounded-sm" />
              </Button>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
