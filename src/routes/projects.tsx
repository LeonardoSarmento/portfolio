import { projectsQueryOptions } from '@services/hooks/postsQueryOptions';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQueryOptions),
  component: () => {
    return <Outlet />;
  },
});
