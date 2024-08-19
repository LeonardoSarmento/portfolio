import { LEO_DIA_D, THUMBSUP } from '@services/utils/Images';
import { SocialMediaItems } from './home';
import { TContactPage } from '@services/types/constants/contact';
import { useTranslation } from 'react-i18next';

type TWords = { text: string; className?: string };

const words: () => TWords[] = () => {
  const { t } = useTranslation();
  const words: TWords[] = [];
  t('words-content', { ns: 'contact', returnObjects: true }).map((word) => words.push({ ...word }));
  return words;
};

export const CONTACTCONTENT: () => TContactPage = () => {
  const { t } = useTranslation();
  const descriptions: string[] = [];
  t('contact-content.description', { ns: 'contact', returnObjects: true }).map((desc) => descriptions.push(desc));
  
  return {
    title: t('contact-content.title', { ns: 'contact' }),
    description: descriptions,
    socialMedia: { title: t('contact-content.socialMedia.title', { ns: 'contact' }), content: SocialMediaItems },
    content: {
      alt: t('contact-content.content.alt', { ns: 'contact' }),
      src: THUMBSUP,
      title: t('contact-content.content.title', { ns: 'contact' }),
    },
    sideContent: {
      src: LEO_DIA_D,
      alt: t('contact-content.sideContent.alt', { ns: 'contact' }),
      content: { typewriter: words(), title: t('contact-content.sideContent.content.title', { ns: 'contact' }) },
    },
  };
};
