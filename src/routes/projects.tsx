import { projectsQueryOptions } from '@services/hooks/projectsQueryOptions';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import i18n from '../i18n/config'

export const Route = createFileRoute('/projects')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQueryOptions(i18n.language)),
  component: () => {
    return <Outlet />;
  },
});
