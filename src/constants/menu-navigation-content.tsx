import { posts_en_us } from '@assets/data/en-US/posts';
import { posts_pt_br } from '@assets/data/pt-BR/posts';
import { PAGE_SIZE_OPTIONS } from '@components/FilterMenuComponent';
import { TMenuContent } from '@services/types/constants/menu-navigation';
import { PENDING_PHOTO } from '@services/utils/Images';
import { Contact, FolderGit2, GraduationCap, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MENUCONTENT: () => TMenuContent = () => {
  const { t, i18n } = useTranslation();
  const posts = i18n.language === 'pt-BR' ? posts_pt_br : posts_en_us;
  return {
    about: {
      title: t('about.title', { ns: 'menuNavigation', returnObjects: true }),
      image: { src: PENDING_PHOTO, alt: t('about.image.alt', { ns: 'menuNavigation', returnObjects: true }) },
      subtitle: t('about.subtitle', { ns: 'menuNavigation', returnObjects: true }),
      description: t('about.description', { ns: 'menuNavigation', returnObjects: true }),
      path: { to: '/' },
    },
    options: [
      {
        title: t('options', { ns: 'menuNavigation', returnObjects: true })[0].title,
        to: '/introduction',
        icon: <Handshake size={16} />,
        children: t('options', { ns: 'menuNavigation', returnObjects: true })[0].children,
      },
      {
        title: t('options', { ns: 'menuNavigation', returnObjects: true })[1].title,
        to: '/experience',
        icon: <GraduationCap size={16} />,
        children: t('options', { ns: 'menuNavigation', returnObjects: true })[1].children,
      },
      {
        title: t('options', { ns: 'menuNavigation', returnObjects: true })[2].title,
        to: '/projects',
        search: { page: '1', pageSize: PAGE_SIZE_OPTIONS[0].value },
        icon: <FolderGit2 size={16} />,
        children: t('options', { ns: 'menuNavigation', returnObjects: true })[2].children,
      },
      {
        title: t('options', { ns: 'menuNavigation', returnObjects: true })[3].title,
        to: '/contact',
        icon: <Contact size={16} />,
      },
    ],
    posts: {
      title: t('posts.title', { ns: 'menuNavigation', returnObjects: true }),
      contents: posts,
      path: { to: '/posts/$postId' },
      items: [
        {
          title: t('posts.items', { ns: 'menuNavigation', returnObjects: true })[0].title,
          to: '/posts',
          search: { page: '1', pageSize: PAGE_SIZE_OPTIONS[0].value },
          children: t('posts.items', { ns: 'menuNavigation', returnObjects: true })[0].children,
        },
        {
          title: t('posts.items', { ns: 'menuNavigation', returnObjects: true })[1].title,
          to: '/posts/create',
          children: t('posts.items', { ns: 'menuNavigation', returnObjects: true })[1].children,
        },
      ],
    },
  };
};
