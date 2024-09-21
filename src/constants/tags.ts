import { TagType } from '@services/types/Tag';

export const TAGS_OPTIONS_POSTS: TagType[] = [
  { id: 'config', label: 'Config', value: 'config' },
  { id: 'i18n', label: 'I18n', value: 'i18n' },
  { id: 'github', label: 'Github', value: 'github' },
  { id: 'portfolio', label: 'Portfolio', value: 'portfolio' },
  { id: 'ssh', label: 'SSH', value: 'ssh' },
  { id: 'zod', label: 'Zod', value: 'zod' },
];

export const TAGS_OPTIONS_PROJECTS: TagType[] = [
  { id: 'i18n', label: 'I18n', value: 'i18n' },
  { id: 'query', label: 'Query', value: 'query' },
  { id: 'router', label: 'Router', value: 'router' },
  { id: 'table', label: 'Table', value: 'table' },
  { id: 'tanstack', label: 'Tanstack', value: 'tanstack' },
  { id: 'zod', label: 'Zod', value: 'zod' },
];
