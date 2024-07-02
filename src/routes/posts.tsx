import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
  component: () => {
    return <Outlet />;
  },
});
