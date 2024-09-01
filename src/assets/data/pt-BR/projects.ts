import gfmFlavorMarkdown from '@assets/data/pt-BR/posts/developingThePortfolio.md';
import { TagType } from '@services/types/Tag';
import { PublicationType } from '@services/types/Publication';
import { TAGS_OPTIONS_PROJECTS } from '@constants/tags';

export type ProjectMenuNavigation = {
  id: string;
  thumbnail: string;
  date: Date;
  title: string;
  description: string;
  body: string;
  tags?: TagType[];
};

export const projects_pt_br: PublicationType[] = [
  {
    id: 'applying-i18n-to-projects',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:713/1*4X5bbUcRJQaJ5ofXmg_YcQ.png',
    date: new Date('August 30, 2024 09:54:00'),
    title: 'Aplicando i18n na prática',
    description: 'Te mostrar como você pode internacionalizar o seu projeto.',
    body: gfmFlavorMarkdown,
    tags: [TAGS_OPTIONS_PROJECTS[0], TAGS_OPTIONS_PROJECTS[1]],
    file: null,
  },
];
