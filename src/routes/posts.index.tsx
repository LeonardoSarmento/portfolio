import { FilterMenuComponent } from '@components/FilterMenuComponent';
import { MovetoTopButton } from '@components/MoveToTop';
import { RenderAllContents } from '@components/RenderAllContents';
import { postsQueryOptionsWithFilter } from '@services/hooks/postsQueryOptions';
import { FilterSchema } from '@services/types/Filters';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import i18n from '../i18n/config';
import { useQueryPostsTags } from '@services/hooks/tagsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/posts/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) =>
    queryClient.ensureQueryData(postsQueryOptionsWithFilter(filters, i18n.language)),
  validateSearch: FilterSchema,
  component: PostsComponent,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Posts | Leonardo`,
      content:
        'Read my blog posts where I share insights and experiences related to work, life, and various other topics. Stay updated with my latest thoughts and stories.',
    },
  ],
});

function PostsComponent() {
  const posts = Route.useLoaderData();
  const URL: string = `${import.meta.env.VITE_BASE_URL}/posts/`;
  const { pageSize } = useSearch({ strict: false });
  const TAGS = useSuspenseQuery(useQueryPostsTags);
  return (
    <FilterMenuComponent
      path={{ to: '/posts' }}
      createPath={{ to: '/posts/create' }}
      hasContent={posts.length > 0}
      contentSize={posts.length}
      TAGS={TAGS.data}
    >
      <RenderAllContents
        URL={URL}
        contents={posts}
        path={{ to: '/posts/$postId' }}
        editPath={{ to: '/posts/$postId/edit' }}
      />
      {pageSize && +pageSize > 15 ? <MovetoTopButton className="xl:hidden" /> : null}
    </FilterMenuComponent>
  );
}
