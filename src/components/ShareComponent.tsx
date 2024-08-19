import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { TOASTMESSAGESCONTENT } from '@constants/by-id-content';
import { TByIdComponent } from '@services/types/constants/by-id';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { CopyIcon, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PopoverShareComponent({
  url,
  shareComponent,
}: {
  url: string;
  shareComponent: TByIdComponent['shareComponent'];
}) {
  const toastMessages = TOASTMESSAGESCONTENT();
  const { t } = useTranslation('byIdContent');
  toastMessages.share.success.description = t('toastMessage.share.success.description', {
    url: url,
    interpolation: { escapeValue: false },
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="col-span-1 col-start-12 flex justify-center gap-2">
          <p>{shareComponent.button.title}</p>
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="z-5 w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">{shareComponent.card.title}</h3>
          <p className="text-sm text-muted-foreground">{shareComponent.card.description}</p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              {shareComponent.card.label}
            </Label>
            <Input id="link" defaultValue={url} readOnly className="h-9" />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={() => CopyToClipboardRoute({ url, messages: toastMessages.share })}
          >
            <span className="sr-only">{shareComponent.card.buttonAlt}</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
