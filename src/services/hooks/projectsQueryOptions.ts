import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsUrl, fetchProjectsWithFilter } from './projects';
import { FilterType } from '@services/types/Filters';

export const projectsQueryOptions = queryOptions({
  queryKey: ['projects'],
  queryFn: () => fetchProjects(),
});

export const projectsQueryOptionsWithFilter = ({ tags, title, pageSize, views, page }: FilterType) => {
  const tagF = tags?.length === 0 && !tags ? 'No-tags' : tags;
  const tiltleF = !title ? 'No-title' : title;
  const pageSizeF = !pageSize ? 'No-pageSize' : pageSize;
  const viewsF = !views ? 'No-views' : views;
  const pageF = !page ? '1' : page;
  return queryOptions({
    queryKey: ['projects', { tagF, tiltleF, pageSizeF, viewsF, pageF }],
    queryFn: () => fetchProjectsWithFilter({ tags, title, pageSize, views, page }),
  });
};

export const useQueryProjectsUrl = () => {
  return useQuery({
    queryKey: ['projects-url'],
    queryFn: () => fetchProjectsUrl(),
  });
};
