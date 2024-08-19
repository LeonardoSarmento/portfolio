import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Footer } from './Footer';
import { ERROR_GIF } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';
import { NavigationMenuGroup } from './NavigationMenu';

export function ErrorComponent() {
  const router = useRouter();
  const { t } = useTranslation('errorComponent');
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavigationMenuGroup />
      <div className="flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <img className="h-80 rounded-md" src={ERROR_GIF} alt={t('imageAlt')} />
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
            {t('buttons.home', { returnObjects: true })}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault(), router.history.back();
            }}
            type="button"
          >
            {t('buttons.goBack', { returnObjects: true })}
          </Button>
        </div>
      </div>
      <div className="row-span-1 row-start-3">
        <Footer />
      </div>
    </div>
  );
}
