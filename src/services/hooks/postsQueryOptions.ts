import { fetchPosts, fetchPostsUrl, fetchPostsWithFilter } from './posts';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { FilterType } from '@services/types/Filters';

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
});

export const postsQueryOptionsWithFilter = ({ tags, title, pageSize, views, page }: FilterType) => {
  const tagF = tags?.length === 0 && !tags ? 'No-tags' : tags;
  const tiltleF = !title ? 'No-title' : title;
  const viewsF = !views ? 'No-views' : views;
  const pageSizeF = !pageSize ? 'No-pageSize' : pageSize;
  const pageF = !page ? '1' : page;
  return queryOptions({
    queryKey: ['posts', { tagF, tiltleF, pageSizeF, viewsF, pageF }],
    queryFn: () => fetchPostsWithFilter({ tags, title, pageSize, views, page }),
  });
};

export const useQueryPostsUrl = () => {
  return useQuery({
    queryKey: ['posts-url'],
    queryFn: () => fetchPostsUrl(),
  });
};