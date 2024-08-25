import { fetchPost } from './posts';
import { queryOptions } from '@tanstack/react-query';
import { fetchProject } from './projects';

export const postQueryOptions = (postId: string, language: string) =>
  queryOptions({
    queryKey: ['posts', { postId }, { language }],
    queryFn: () => fetchPost({ postId, language }),
  });

export const projectQueryOptions = (projectId: string, language: string) =>
  queryOptions({
    queryKey: ['project', { projectId }, { language }],
    queryFn: () => fetchProject({ projectId, language }),
  });
