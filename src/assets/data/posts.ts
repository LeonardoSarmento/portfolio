import BlogPost from '@assets/data/markdown.md';
import MultipleSSHPost from '@assets/data/multipleSSH.md';
import ReadMe from '../../../README.md';
import { TagType } from '@services/types/User';

export type PostMenuNavigation = {
  id: string;
  thumbnail: string;
  date: Date;
  title: string;
  description: string;
  body: string;
  tags?: TagType[];
};

export const TAGS: TagType[] = [
  { label: 'nextjs', value: 'Nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember', disable: true },
  { label: 'Gatsby', value: 'gatsby', disable: true },
  { label: 'Astro', value: 'astro' },
];

export const posts: PostMenuNavigation[] = [
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://devconnected.com/wp-content/uploads/2019/10/featured-12.png',
    date: new Date(),
    title: 'Two SSH github account configuration.',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
    body: BlogPost,
    tags: [TAGS[0], TAGS[3], TAGS[6]],
  },
  {
    id: 'hover-card',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Shadcn/ui',
    description: 'For sighted users to preview content available behind a link.',
    body: ReadMe,
  },
  {
    id: 'multiple-ssh-keys',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Using multiple ssh keys',
    description: 'For those that got 2 accounts in github.',
    body: MultipleSSHPost,
    tags: [TAGS[0], TAGS[3]],
  },
];
