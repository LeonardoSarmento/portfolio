import BlogPost from '@assets/data/markdown.md';
import gfmFlavorMarkdown from '@assets/data//gfmFlavorMarkdown.md';
import { TagType } from '@services/types/User';
import { TAGS } from './posts';

export type ProjectMenuNavigation = {
  id: string;
  thumbnail: string;
  date: Date;
  title: string;
  description: string;
  body: string;
  tags?: TagType[];
};

export const projects: ProjectMenuNavigation[] = [
  {
    id: 'project-number-42',
    thumbnail:
      'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/3/1296745175678/-The-Hitchhiker-s-Guide-t-008.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMTEucG5n&enable=upscale&s=8f410dd0450b88bde569c9a5bc4fdc34',
    date: new Date(),
    title: 'Big project forty two trust it.',
    description: 'Description as response.',
    body: gfmFlavorMarkdown,
    tags: [TAGS[0], TAGS[3], TAGS[6], TAGS[0], TAGS[3], TAGS[6]],
  },
  {
    id: 'project-based-tanstack-router',
    thumbnail: 'https://repository-images.githubusercontent.com/165670309/c761731e-94c8-4ff0-a92d-3ef988d1a490',
    date: new Date(),
    title: 'Tanstack Router based project',
    description: 'Got no ideia.',
    body: BlogPost,
  },
  // {
  //   id: 'two-ssh-github-account-configuration',
  //   thumbnail: 'https://devconnected.com/wp-content/uploads/2019/10/featured-12.png',
  //   date: new Date(),
  //   title: 'Two SSH github account configuration.',
  //   description: 'A modal dialog that interrupts the user with important content and expects a response.',
  //   body: BlogPost,
  //   tags: [TAGS[0], TAGS[3], TAGS[6]],
  // },
];
