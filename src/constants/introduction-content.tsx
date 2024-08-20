import { TIntroductionContent } from '@services/types/constants/introduction';
import { LEO_BARZINHO } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export const INTRODUCTIONCONTENT: () => TIntroductionContent = () => {
  const { t } = useTranslation();
  return {
    ...t('intro', { ns: 'introduction', returnObjects: true }),
    image: { ...t('intro.image', { ns: 'introduction', returnObjects: true }), src: LEO_BARZINHO },
  };
};
