import { Toggle } from './ui/toggle';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { ToggleProps } from '@radix-ui/react-toggle';
import { useTranslation } from 'react-i18next';
import { Flag, getCountrCode } from './SelectLanguage';
export const RESUME_EN_US = new URL('/public/assets/Curriculo-Leonardo-Araujo-Sarmento-english.pdf', import.meta.url)
  .href;
export const RESUME_PT_BR = new URL('/public/assets/Curriculo-Leonardo-Araujo-Sarmento.pdf', import.meta.url).href;

type ResumeDialogBtn = ToggleProps & React.RefAttributes<HTMLButtonElement>;

type TResumeOptions = { code: string; link: string };
export function ResumeDialog({ ...props }: ResumeDialogBtn) {
  const { t } = useTranslation('menuNavigation');
  const [open, setOpen] = useState<boolean>(false);

  const RESUME_OPTIONS: TResumeOptions[] = [
    { code: 'en-US', link: RESUME_EN_US },
    { code: 'pt-BR', link: RESUME_PT_BR },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toggle {...props} asChild aria-label="Toggle italic">
        <DialogTrigger className="transition-all duration-300 hover:scale-125">
          <Download size={20} />
        </DialogTrigger>
      </Toggle>
      <DialogContent className="w-80 rounded-md sm:max-w-md md:w-full">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>{t('resume.title')}</DialogTitle>
          <DialogDescription>{t('resume.description')}</DialogDescription>
        </DialogHeader>
        <div className="my-2 flex justify-around">
          {RESUME_OPTIONS.map((option) => (
            <a key={option.code} aria-label={option.code} className="gap-3" href={option.link} target="_blank" rel="noopener noreferrer">
              <Button type="button">
                <Flag countryCode={getCountrCode(option.code)} className="w-8 rounded-sm" />
              </Button>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
