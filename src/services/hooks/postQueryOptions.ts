import { fetchPost} from './posts';
import { queryOptions } from '@tanstack/react-query';
import { fetchProject } from './projects';

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', { postId }],
    queryFn: () => fetchPost(postId),
  });

export const projectQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ['project', { projectId }],
    queryFn: () => fetchProject(projectId),
  });
