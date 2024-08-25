import { fetchPostsTags } from './posts';
import { queryOptions } from '@tanstack/react-query';
import { fetchProjectsTags } from './projects';

export const useQueryProjectsTags = queryOptions({
  queryKey: ['tags-projects'],
  queryFn: () => fetchProjectsTags(),
});

export const useQueryPostsTags = queryOptions({
  queryKey: ['tags-posts'],
  queryFn: () => fetchPostsTags(),
});

export const tagsQueryOptions = queryOptions({
  queryKey: ['tags'],
  queryFn: () => fetchPostsTags(),
});
