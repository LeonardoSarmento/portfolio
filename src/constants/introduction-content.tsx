import { TIntroductionContent } from '@services/types/constants/introduction';
import { LEO_BARZINHO } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export const INTRODUCTIONCONTENT: () => TIntroductionContent = () => {
  const { t } = useTranslation();
  return {
    header: {
      initial: t('header.initial', { ns: 'introduction', returnObjects: true }),
      punchline: t('header.punchline', { ns: 'introduction', returnObjects: true }),
    },
    image: { src: LEO_BARZINHO, alt: t('image.alt', { ns: 'introduction', returnObjects: true }) },
    introduction: {
      h1: t('introduction.h1', { ns: 'introduction', returnObjects: true }),
      code: t('introduction.code', { ns: 'introduction', returnObjects: true }),
    },
  };
};
