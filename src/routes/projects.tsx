import { projectsQueryOptions } from '@services/hooks/postsQueryOptions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQueryOptions),
});
