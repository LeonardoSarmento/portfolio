import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
});
