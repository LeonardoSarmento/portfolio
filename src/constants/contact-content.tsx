import { LEO_DIA_D, THUMBSUP } from '@services/utils/Images';
import { SocialMediaItems } from '.';
import { TContactPage } from '@services/types/constants/contact';
import { useTranslation } from 'react-i18next';

type TWords = { text: string; className?: string };

const words: () => TWords[] = () => {
  const { t } = useTranslation();
  return [
    {
      text: t('words-content', { ns: 'contact', returnObjects: true })[0].text,
    },
    {
      text: t('words-content', { ns: 'contact', returnObjects: true })[1].text,
    },
    {
      text: t('words-content', { ns: 'contact', returnObjects: true })[2].text,
    },
    {
      text: t('words-content', { ns: 'contact', returnObjects: true })[3].text,
    },
    {
      text: t('words-content', { ns: 'contact', returnObjects: true })[4].text,
      className: 'text-green-500 dark:text-green-500',
    },
    {
      text: t('words-content', { ns: 'contact', returnObjects: true })[5].text,
    },
  ];
};

export const CONTACTCONTENT: () => TContactPage = () => {
  const { t } = useTranslation();
  return {
    title: t('contact-content.title', { ns: 'contact' }),
    description: [
      t('contact-content.description', { ns: 'contact', returnObjects: true })[0],
      t('contact-content.description', { ns: 'contact', returnObjects: true })[1],
    ],
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
