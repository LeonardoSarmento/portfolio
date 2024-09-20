import ApplyI18nProject from '@assets/data/pt-BR/projects/applyingI18n.md';
import Routing from '@assets/data/pt-BR/projects/routing.md';
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
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK27w9dGi5UptCnS36zQO49TwhEXgeIqNAYoBZ',
    date: new Date('August 30, 2024 09:54:00'),
    title: 'Aplicando i18n na prática',
    description: 'Te mostrar como você pode internacionalizar o seu projeto.',
    body: ApplyI18nProject,
    tags: [TAGS_OPTIONS_PROJECTS[0], TAGS_OPTIONS_PROJECTS[1]],
    file: null,
  },
  {
    id: 'routing',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK7Ru2oalPcgLKn2mI6ARSbDkxFXoTG1HNpeV8',
    date: new Date('September 19, 2024 19:31:00'),
    title: 'Roteamento e Gerenciamento de estados',
    description: 'Como você pode aplicar um roteamento dinâmico com gerencimento de estados.',
    body: Routing,
    tags: [TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[3], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
];
