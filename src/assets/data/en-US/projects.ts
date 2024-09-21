import ApplyI18nProject from '@assets/data/en-US/projects/applyingI18n.md';
import Routing from '@assets/data/en-US/projects/routing.md';
import Tables from '@assets/data/en-US/projects/tables.md';
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

export const projects_en_us: PublicationType[] = [
  {
    id: 'applying-i18n-to-projects',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK27w9dGi5UptCnS36zQO49TwhEXgeIqNAYoBZ',
    date: new Date('August 30, 2024 09:54:00'),
    title: 'Applying i18n in practice',
    description: 'Show you how you can internationalize your project',
    body: ApplyI18nProject,
    tags: [TAGS_OPTIONS_PROJECTS[0], TAGS_OPTIONS_PROJECTS[5]],
    file: null,
  },
  {
    id: 'routing',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK7Ru2oalPcgLKn2mI6ARSbDkxFXoTG1HNpeV8',
    date: new Date('September 19, 2024 19:31:00'),
    title: 'Routing and State Managment use case',
    description: 'Use case to apply routing and state managment to a project.',
    body: Routing,
    tags: [TAGS_OPTIONS_PROJECTS[1], TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
  {
    id: 'tables',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK71PxxQlPcgLKn2mI6ARSbDkxFXoTG1HNpeV8',
    date: new Date('September 21, 2024 14:45:44'),
    title: 'Use case for a table managed by URL Parameters',
    description: 'How to apply filter management using URL parameters to a table in a project.',
    body: Tables,
    tags: [TAGS_OPTIONS_PROJECTS[1], TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[3], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
];
