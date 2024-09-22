import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsUrl, fetchProjectsWithFilter } from './projects';
import { FilterType } from '@services/types/Filters';
import { useTranslation } from 'react-i18next';

export const projectsQueryOptions = (language: string) =>
  queryOptions({
    queryKey: ['projects', { language }],
    queryFn: () => fetchProjects(language),
  });

export const projectsQueryOptionsWithFilter = (
  { tags, title, pageSize, views, page }: FilterType,
  language: string,
) => {
  const tagF = tags?.length === 0 && !tags ? 'No-tags' : tags;
  const tiltleF = !title ? 'No-title' : title;
  const pageSizeF = !pageSize ? 'No-pageSize' : pageSize;
  const viewsF = !views ? 'No-views' : views;
  const pageF = !page ? '1' : page;
  return queryOptions({
    queryKey: ['projects', { tagF, tiltleF, pageSizeF, viewsF, pageF }, { language }],
    queryFn: () => fetchProjectsWithFilter({ tags, title, pageSize, views, page }, language),
  });
};

export const useQueryProjectsUrl = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  return useQuery({
    queryKey: ['projects-url', { language }],
    queryFn: () => fetchProjectsUrl(language),
  });
};
