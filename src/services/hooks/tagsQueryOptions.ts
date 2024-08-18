import { fetchTags } from './posts';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const useQueryTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchTags(),
  });
};

export const tagsQueryOptions = queryOptions({
  queryKey: ['tags'],
  queryFn: () => fetchTags(),
});
