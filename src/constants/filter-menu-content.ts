import { TFilterMenuContent } from '@services/types/constants/filter-menu';
import { NOT_FOUND } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export const FILTERMENUCONTENT: () => TFilterMenuContent = () => {
  const { t } = useTranslation();
  return {
    ...t('menu', { ns: 'filterMenu', returnObjects: true }),
    noContent: {
      ...t('menu.noContent', { ns: 'filterMenu', returnObjects: true }),
      image: {
        ...t('menu.noContent.image', { ns: 'filterMenu', returnObjects: true }),
        src: NOT_FOUND,
      },
    },
  };
};
