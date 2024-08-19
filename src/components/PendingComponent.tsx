import { ReloadIcon } from '@radix-ui/react-icons';
import { CardContent, CardTitle } from './ui/card';
import { MY_PHOTO } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export function PendingComponent() {
  const { t } = useTranslation('home');
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <CardContent className="flex flex-col items-center justify-center">
        <img className="h-80 rounded-md" src={MY_PHOTO} alt={t('aboutMe.header.alt')} />
        <p className="mt-6 text-center text-xs leading-tight text-muted-foreground">
          {t('aboutMe.header.description')}
        </p>
        <CardTitle className="mb-2 mt-4">{t('aboutMe.header.title')}</CardTitle>
      </CardContent>
      <CardTitle className="mt-2">{t('aboutMe.header.loading')}</CardTitle>
      <ReloadIcon className="mr-2 h-10 w-6 animate-spin" />
    </div>
  );
}
