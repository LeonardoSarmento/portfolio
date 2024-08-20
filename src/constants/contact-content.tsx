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
      content: {
        ...t('contact-content.sideContent.content', { ns: 'contact', returnObjects: true }),
        typewriter: words(),
      },
      src: LEO_DIA_D,
    },
  };
};

type TWords = { text: string; className?: string };

const words: () => TWords[] = () => {
  const { t } = useTranslation();
  const words: TWords[] = [];
  const message = t('contact-content.sideContent.content.typewriter', { ns: 'contact', returnObjects: true });
  message.map((word) =>
    words.push({
      text: word.text,
      className: word.className === 'punchline' ? 'text-green-500 dark:text-green-500' : undefined,
    }),
  );
  return words;
};
