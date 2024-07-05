import { fetchPosts, fetchPostsUrl, fetchPostsWithFilter, fetchTags } from './posts';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectsUrl, fetchProjectsWithFilter } from './projects';
import { FilterType } from '@src/routes/posts.index';

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
});

export const postsQueryOptionsWithFilter = ({ tags, title, count, views }: FilterType) => {
  const tagF = tags?.length === 0 && !tags ? 'No-tags' : tags;
  const tiltleF = !title ? 'No-title' : title;
  const countF = !count ? 'No-count' : count;
  const viewsF = !views ? 'No-views' : views;
  return queryOptions({
    queryKey: ['posts', { tagF, tiltleF, countF, viewsF }],
    queryFn: () => fetchPostsWithFilter({ tags, title, count, views }),
  });
};

export const projectsQueryOptionsWithFilter = ({ tags, title, count, views }: FilterType) => {
  const tagF = tags?.length === 0 && !tags ? 'No-tags' : tags;
  const tiltleF = !title ? 'No-title' : title;
  const countF = !count ? 'No-count' : count;
  const viewsF = !views ? 'No-views' : views;
  return queryOptions({
    queryKey: ['projects', { tagF, tiltleF, countF, viewsF }],
    queryFn: () => fetchProjectsWithFilter({ tags, title, count, views }),
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
