import { fetchPosts, fetchPostsUrl, fetchPostsWithFilter, fetchTags } from './posts';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsUrl } from './projects';
import { FilterType } from '@src/routes/posts.index';

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
});

export const postsQueryOptionsWithFilter = ({ tags }: FilterType) => {
  const filter = tags?.length === 0 && !tags ? 'No-filter' : tags;
  return queryOptions({
    queryKey: ['posts', { filter }],
    queryFn: () => fetchPostsWithFilter({ tags }),
  });
};

export const useQueryPostsUrl = () => {
  return useQuery({
    queryKey: ['posts-url'],
    queryFn: () => fetchPostsUrl(),
  });
};
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

export const projectsQueryOptions = queryOptions({
  queryKey: ['projects'],
  queryFn: () => fetchProjects(),
});

export const useQueryProjectsUrl = () => {
  return useQuery({
    queryKey: ['projects-url'],
    queryFn: () => fetchProjectsUrl(),
  });
};
