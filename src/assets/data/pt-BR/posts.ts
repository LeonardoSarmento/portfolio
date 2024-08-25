import BlogPost from '@assets/data/pt-BR/markdown.md';
import MultipleSSHPost from '@assets/data/pt-BR/multipleSSH.md';
import ReadMe from '../../../../README.md';
import { TagType } from '@services/types/Tag';
import { PublicationType } from '@services/types/Publication';
import { TAGS_OPTIONS_POSTS } from '@constants/tags';

export type PostMenuNavigation = {
  id: string;
  thumbnail: string;
  date: Date;
  title: string;
  description: string;
  body: string;
  tags?: TagType[];
};

export const posts_pt_br: PublicationType[] = [
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://devconnected.com/wp-content/uploads/2019/10/featured-12.png',
    date: new Date(),
    title: 'Two SSH github account configuration.',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    body: BlogPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3], TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'hover-card',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Shadcn/ui',
    description: 'For sighted users to preview content available behind a link.',
    body: ReadMe,
    file: null,
  },
  {
    id: 'multiple-ssh-keys',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Using multiple ssh keys',
    description: 'For those that got 2 accounts in github.',
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[2]],
    file: null,
  },
  {
    id: 'multiple-ssh-keys-test',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Using multiple ssh keys test',
    description: 'For those that got 2 accounts in github.',
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3], TAGS_OPTIONS_POSTS[4], TAGS_OPTIONS_POSTS[7]],
    file: null,
  },
  {
    id: 'multiple-ssh-keys-carrousel',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Using multiple ssh keys carrousel',
    description: 'For those that got 2 accounts in github.',
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3]],
    file: null,
  },
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://devconnected.com/wp-content/uploads/2019/10/featured-12.png',
    date: new Date(),
    title: 'Two SSH github account configuration.',
    description:
      'A modal dialog that interrupts the user with important content and expects a response. A modal dialog that interrupts the user with important content and expects a response',
    body: BlogPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3], TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  
];
