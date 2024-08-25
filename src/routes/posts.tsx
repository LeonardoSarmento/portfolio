import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import i18n from '../i18n/config'

export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions(i18n.language)),
  component: () => {
    return <Outlet />;
  },
});
