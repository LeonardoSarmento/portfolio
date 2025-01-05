import ApplyI18nProject from '@assets/data/pt-BR/projects/applyingI18n.md';
import Routing from '@assets/data/pt-BR/projects/routing.md';
import Tables from '@assets/data/pt-BR/projects/tables.md';
import Games from '@assets/data/pt-BR/projects/games.md';
import DynamicForm from '@assets/data/pt-BR/projects/dynamicform.md';
import Template from '@assets/data/pt-BR/projects/template.md';
import DataTable from '@assets/data/pt-BR/projects/datatable.md';
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
    tags: [TAGS_OPTIONS_PROJECTS[0], TAGS_OPTIONS_PROJECTS[5]],
    file: null,
  },
  {
    id: 'routing',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK7Ru2oalPcgLKn2mI6ARSbDkxFXoTG1HNpeV8',
    date: new Date('September 19, 2024 19:31:00'),
    title: 'Roteamento e Gerenciamento de estados',
    description: 'Como você pode aplicar um roteamento dinâmico com gerencimento de estados.',
    body: Routing,
    tags: [TAGS_OPTIONS_PROJECTS[1], TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
  {
    id: 'tables',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK71PxxQlPcgLKn2mI6ARSbDkxFXoTG1HNpeV8',
    date: new Date('September 21, 2024 14:45:44'),
    title: 'Caso de uso de uma tabela gerenciada por parâmetros de URL',
    description: 'Como aplicar o gerenciamento de filtros usando parâmetros de URL a uma tabela em um projeto.',
    body: Tables,
    tags: [TAGS_OPTIONS_PROJECTS[1], TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[3], TAGS_OPTIONS_PROJECTS[4]],
    file: null,
  },
  {
    id: 'template',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK7dQQTblPcgLKn2mI6ARSbDkxFXoTG1HNpeV8',
    date: new Date('December 06, 2024 18:33:14'),
    title: 'Modelo para aplicativos de front-end',
    description: 'Modelo completo para aplicativos de front-end.',
    body: Template,
    tags: [TAGS_OPTIONS_PROJECTS[4], TAGS_OPTIONS_PROJECTS[6], TAGS_OPTIONS_PROJECTS[8]],
    file: null,
  },
  {
    id: 'data-table',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKyFNpNa0GikrIoDYxfvmXthAce94qHPJsZzK2',
    date: new Date('December 15, 2024 21:12:27'),
    title: 'Um DataTable para aplicativos de front-end',
    description:
      'Um componente DataTable robusto e personalizável com recursos avançados de filtragem, paginação e muito mais.',
    body: DataTable,
    tags: [TAGS_OPTIONS_PROJECTS[2], TAGS_OPTIONS_PROJECTS[3], TAGS_OPTIONS_PROJECTS[6], TAGS_OPTIONS_PROJECTS[8]],
    file: null,
  },
  {
    id: 'dynamic-form',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKkF0jWKDl36HN0cyQmU7ubkZvr1wEhYoAIGq2',
    date: new Date('December 20, 2024 09:53:50'),
    title: 'Um componente DynamicForm reutilizável para você',
    description:
      'Um componente Form com vários tipos de campos de entrada, validações e recursos de segurança de tipo.',
    body: DynamicForm,
    tags: [TAGS_OPTIONS_PROJECTS[5], TAGS_OPTIONS_PROJECTS[6], TAGS_OPTIONS_PROJECTS[8]],
    file: null,
  },
  {
    id: 'games',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKUnrwmJfH9dm7C0LnbJYSOMxl3aPjz1iFvWQN',
    date: new Date('December 28, 2024 01:27:08'),
    title: 'Vários jogos para você se divertir',
    description: 'Explore experiências interativas com animações suaves e designs responsivos!',
    body: Games,
    tags: [TAGS_OPTIONS_PROJECTS[7]],
    file: null,
  },
];
