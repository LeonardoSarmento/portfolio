import { TIntroductionContent } from '@services/types/constants/introduction';
import { LEO_BARZINHO } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export const INTRODUCTIONCONTENT: () => TIntroductionContent = () => {
  const { t } = useTranslation();
  return {
    ...t('intro', { ns: 'introduction', returnObjects: true }),
    image: { ...t('intro.image', { ns: 'introduction', returnObjects: true }), src: LEO_BARZINHO },
    introimage: {
      ...t('intro.introimage', { ns: 'introduction', returnObjects: true }),
      src: 'https://utfs.io/f/7UcJCClPcgLK0Au4mmNC5B20jYShq8QzmTFkfeoMtDgZirnL',
    },
    aboutmeimage: {
      ...t('intro.aboutmeimage', { ns: 'introduction', returnObjects: true }),
      src: 'https://utfs.io/f/7UcJCClPcgLK8yv0OaJi3Yqj6fR1l0crt2npeVkxsTUN45am',
    },
  };
};
