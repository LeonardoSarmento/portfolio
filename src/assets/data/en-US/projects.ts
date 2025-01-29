import ApplyI18nProject from '@assets/data/en-US/projects/applyingI18n.md';
import Routing from '@assets/data/en-US/projects/routing.md';
import Tables from '@assets/data/en-US/projects/tables.md';
import Games from '@assets/data/en-US/projects/games.md';
import DynamicForm from '@assets/data/en-US/projects/dynamicform.md';
import DataTable from '@assets/data/en-US/projects/datatable.md';
import Template from '@assets/data/en-US/projects/template.md';
import { TagType } from '@services/types/Tag';
import { PublicationType } from '@services/types/Publication';
import { TAGS_OPTIONS_PROJECTS } from '@constants/tags';
import {
  PROJECTI18N,
  PROJECTROUTING,
  PROJECTTABLEUSECASE,
  PROJECTTEMPLATE,
  PROJECTDATATABLE,
  PROJECTDYNAMICFORM,
  PROJECTGAMES,
} from '../thumbnails/projects/links';

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
    thumbnail: PROJECTI18N,
    date: new Date('August 30, 2024 09:54:00'),
    title: 'Applying i18n in practice',
    description: 'Show you how you can internationalize your project',
    body: ApplyI18nProject,
    tags: [TAGS_OPTIONS_PROJECTS[0], TAGS_OPTIONS_PROJECTS[5]],
    file: null,
  },
  {
    id: 'routing',
    thumbnail: PROJECTROUTING,
    date: new Date('September 19, 2024 19:31:00'),
    title: 'Routing and State Managment use case',
    description: 'Use case to apply routing and state managment to a project.',
    body: Routing,
    tags: [TAGS_OPTIONS_PROJECTS[1], TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
  {
    id: 'tables',
    thumbnail: PROJECTTABLEUSECASE,
    date: new Date('September 21, 2024 14:45:44'),
    title: 'Use case for a table managed by URL Parameters',
    description: 'How to apply filter management using URL parameters to a table in a project.',
    body: Tables,
    tags: [TAGS_OPTIONS_PROJECTS[1], TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[3], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
  {
    id: 'template',
    thumbnail: PROJECTTEMPLATE,
    date: new Date('December 06, 2024 18:33:14'),
    title: 'Template for front-end applications',
    description: 'All around template for front-end applications.',
    body: Template,
    tags: [TAGS_OPTIONS_PROJECTS[4], TAGS_OPTIONS_PROJECTS[6], TAGS_OPTIONS_PROJECTS[8]],
    file: null,
  },
  {
    id: 'data-table',
    thumbnail: PROJECTDATATABLE,
    date: new Date('December 15, 2024 21:12:27'),
    title: 'A DataTable for front-end applications',
    description:
      'A robust and customizable DataTable component with advanced features for filtering, pagination, and more.',
    body: DataTable,
    tags: [TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[3], TAGS_OPTIONS_PROJECTS[6], TAGS_OPTIONS_PROJECTS[8]],
    file: null,
  },
  {
    id: 'dynamic-form',
    thumbnail: PROJECTDYNAMICFORM,
    date: new Date('December 20, 2024 09:53:50'),
    title: 'A reusable DynamicForm component for you',
    description: 'A Form component with multiple input field types, validations, and type-safe features.',
    body: DynamicForm,
    tags: [TAGS_OPTIONS_PROJECTS[5], TAGS_OPTIONS_PROJECTS[6], TAGS_OPTIONS_PROJECTS[8]],
    file: null,
  },
  {
    id: 'games',
    thumbnail: PROJECTGAMES,
    date: new Date('December 28, 2024 01:27:08'),
    title: 'Lots of games for you to enjoy',
    description: 'Explore interactive experiences with smooth animations and responsive designs!',
    body: Games,
    tags: [TAGS_OPTIONS_PROJECTS[7]],
    file: null,
  },
];
