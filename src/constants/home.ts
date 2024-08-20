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
    ...t('aboutMe', { ns: 'home', returnObjects: true }),
    header: {
      ...t('aboutMe.header', { ns: 'home', returnObjects: true }),
      src: MY_PHOTO,
    },
  };
};
export const CARROUSELPARTIALOPTIONS: () => TCarrouselComponent[] = () => {
  const { t } = useTranslation();
  return [
    {
      ...t('carrouselOptions', { ns: 'home', returnObjects: true })[0],
      buttonPath: { to: '/posts', search: { page: '1', pageSize: '100' } },
      path: { to: '/posts/$postId' },
    },
    {
      ...t('carrouselOptions', { ns: 'home', returnObjects: true })[1],
      buttonPath: { to: '/projects', search: { page: '1', pageSize: '100' } },
      path: { to: '/projects/$projectId' },
    },
  ];
};
