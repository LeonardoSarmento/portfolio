import { TSocialMediaCard } from '@services/types/SocialMediaCard';
import { MY_PHOTO } from '@services/utils/Images';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { TCardContent, TCarrouselComponent } from '@services/types/constants/index-content';
import { useTranslation } from 'react-i18next';

export const SocialMediaItems: TSocialMediaCard[] = [
  { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/leonardo.a.sarmento' },
  { name: 'Linkedin', icon: Linkedin, link: 'https://linkedin.com/in/leonardo-araujo-sarmento' },
  { name: 'Github', icon: Github, link: 'https://github.com/LeonardoSarmento' },
  { name: 'Gmail', icon: Mail, link: 'mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!' },
];

export const ABOUTMECONTENT: () => TCardContent['about'] = () => {
  const { t } = useTranslation();
  return {
    header: {
      alt: t('aboutMe.header.alt', { ns: 'home', returnObjects: true }),
      src: MY_PHOTO,
      title: t('aboutMe.header.title', { ns: 'home', returnObjects: true }),
      description: t('aboutMe.header.description', { ns: 'home', returnObjects: true }),
    },
    content: {
      description: [
        t('aboutMe.content.description', { ns: 'home', returnObjects: true })[0],
        t('aboutMe.content.description', { ns: 'home', returnObjects: true })[1],
        t('aboutMe.content.description', { ns: 'home', returnObjects: true })[2],
        t('aboutMe.content.description', { ns: 'home', returnObjects: true })[3],
      ],
    },
  };
};
export const CARROUSELPARTIALOPTIONS: () => TCarrouselComponent[] = () => {
  const { t } = useTranslation();
  return [
    {
      buttonPath: { to: '/posts', search: { page: '1', pageSize: '100' } },
      buttonTitle: t('carrouselOptions', { ns: 'home', returnObjects: true })[0].buttonTitle,
      title: t('carrouselOptions', { ns: 'home', returnObjects: true })[0].title,
      path: { to: '/posts/$postId' },
    },
    {
      buttonPath: { to: '/projects', search: { page: '1', pageSize: '100' } },
      buttonTitle: t('carrouselOptions', { ns: 'home', returnObjects: true })[1].buttonTitle,
      title: t('carrouselOptions', { ns: 'home', returnObjects: true })[1].title,
      path: { to: '/projects/$projectId' },
    },
  ];
};
