import { LEO_DIA_D, THUMBSUP } from '@services/utils/Images';
import { SocialMediaItems } from './home';
import { TContactPage } from '@services/types/constants/contact';
import { useTranslation } from 'react-i18next';

export const CONTACTCONTENT: () => TContactPage = () => {
  const { t } = useTranslation();

  return {
    ...t('contact-content', { ns: 'contact', returnObjects: true }),
    socialMedia: {
      ...t('contact-content.socialMedia', { ns: 'contact', returnObjects: true }),
      content: SocialMediaItems,
    },
    content: {
      ...t('contact-content.content', { ns: 'contact', returnObjects: true }),
      src: THUMBSUP,
    },
    sideContent: {
      ...t('contact-content.sideContent', { ns: 'contact', returnObjects: true }),
      src: LEO_DIA_D,
    },
  };
};
