import { FilterMenuComponent } from '@components/FilterMenuComponent';
import { RenderAllContents } from '@components/RenderAllContents';
import { postsQueryOptionsWithFilter } from '@services/hooks/postsQueryOptions';
import { FilterSchema } from '@services/types/Filters';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) =>
    queryClient.ensureQueryData(postsQueryOptionsWithFilter(filters)),
  validateSearch: FilterSchema,
  component: PostsComponent,
});

function PostsComponent() {
  const posts = Route.useLoaderData();
  const URL: string = `${import.meta.env.VITE_BASE_URL}/posts/`;
  return (
    <FilterMenuComponent
      path={{ to: '/posts' }}
      createPath={{ to: '/posts/create' }}
      hasContent={posts.length > 0}
      contentSize={posts.length}
    >
      <RenderAllContents
        URL={URL}
        contents={posts}
        path={{ to: '/posts/$postId' }}
        editPath={{ to: '/posts/$postId/edit' }}
      />
    </FilterMenuComponent>
  );
}
