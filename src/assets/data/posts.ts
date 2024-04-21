import BlogPost from '@assets/data/markdown.md';
import ReadMe from '../../../README.md';

export type PostMenuNavigation = {
  id: string;
  image: string;
  date: Date;
  title: string;
  description: string;
  body: string;
};

export const posts: PostMenuNavigation[] = [
  {
    id: 'two-ssh-github-account-configuration',
    image: 'https://devconnected.com/wp-content/uploads/2019/10/featured-12.png',
    date: new Date(),
    title: 'Two SSH github account configuration.',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
    body: BlogPost,
  },
  {
    id: 'hover-card',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kDcMLGuxtHh4k6Q1WQ-vx4FyktGt27jyOxlcLD8F_Q&s',
    date: new Date(),
    title: 'Shadcn/ui',
    description: 'For sighted users to preview content available behind a link.',
    body: ReadMe,
  },
];
