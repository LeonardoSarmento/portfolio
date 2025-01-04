import { InteracitvesPageContentType } from '@services/types/constants/games-content';
import { useTranslation } from 'react-i18next';

export const COMPONENTSCONTENT: () => InteracitvesPageContentType = () => {
  const { t } = useTranslation();
  return {
    content: t('content', { ns: 'components', returnObjects: true }),
  };
};
