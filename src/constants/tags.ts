import { TagType } from '@services/types/Tag';

export const TAGS_OPTIONS_POSTS: TagType[] = [
  { id: 'portfolio', label: 'Portfolio', value: 'portfolio' },
  { id: 'config', label: 'Config', value: 'config' },
  { id: 'github', label: 'Github', value: 'github' },
  { id: 'ssh', label: 'SSH', value: 'ssh' },
  { id: 'i18n', label: 'I18n', value: 'i18n' },
  { id: 'zod', label: 'Zod', value: 'zod' },
];

export const TAGS_OPTIONS_PROJECTS: TagType[] = [
  { id: 'i18n', label: 'I18n', value: 'i18n' },
  { id: 'zod', label: 'Zod', value: 'zod' },
];
