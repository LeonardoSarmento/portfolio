import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { NOT_FOUND_GIF } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export function NotFoundComponent() {
  const router = useRouter();
  const { t } = useTranslation('notFoundComponent');
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <CardContent className="flex flex-col items-center justify-center gap-3">
        <img className="h-80 rounded-md" src={NOT_FOUND_GIF} alt={t('imageAlt')} />
        <CardTitle className="mt-4">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardContent>
      <div className="flex gap-3">
        <Button
          onClick={(e) => {
            e.preventDefault(), router.navigate({ to: '/' });
          }}
          type="button"
        >
          {t('buttons.home')}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault(), router.history.back();
          }}
          type="button"
        >
          {t('buttons.goBack')}
        </Button>
      </div>
    </div>
  );
}
