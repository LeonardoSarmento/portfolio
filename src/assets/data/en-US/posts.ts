import DevelopingThePortfolio from '@assets/data/en-US/posts/developingThePortfolio.md';
import MultipleSSHPost from '@assets/data/en-US/posts/multipleSSH.md';
import I18nPost from '@assets/data/en-US/posts/i18n.md';
import { TagType } from '@services/types/Tag';
import { PublicationType } from '@services/types/Publication';
import { TAGS_OPTIONS_POSTS } from '@constants/tags';
import { PORTFOLIO_TN } from '../thumbnails/links';

export type PostMenuNavigation = {
  id: string;
  thumbnail: string;
  date: Date;
  title: string;
  description: string;
  body: string;
  tags?: TagType[];
};

export const posts_en_us: PublicationType[] = [
  {
    id: 'developing-the-portfolio',
    thumbnail: PORTFOLIO_TN,
    date: new Date('August 29, 2024 11:13:00'),
    title: 'Welcome to my portfolio',
    description: `A conversation about what's here on this site`,
    body: DevelopingThePortfolio,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3]],
    file: null,
  },
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK2oSg0yJi5UptCnS36zQO49TwhEXgeIqNAYoB',
    date: new Date('August 30, 2024 19:35:00'),
    title: 'Two SSH github account configuration.',
    description: `I'll show you how I manage my personal and work profiles with SSH keys.`,
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[2], TAGS_OPTIONS_POSTS[4]],
    file: null,
  },
  {
    id: 'configuring-i18n',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKXEL6P8zHc0gvrkVfbGUZM5Fd98KeauQCP3zA',
    date: new Date('August 31, 2024 21:54:00'),
    title: 'I18n and its configurations',
    description: 'How to configure i18n in your React project with type safety and its applications.',
    body: I18nPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[1], TAGS_OPTIONS_POSTS[5]],
    file: null,
  },
];
