import { BreadcrumbResponsive } from '@components/Breadcrumbs';
import { MarkdownRenderer } from '@components/MarkdownRenderer';
import { Card, CardDescription, CardHeader } from '@components/ui/card';
import { normalizeDate } from '@lib/utils';
import { postQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { useQueryPostsUrl } from '@services/hooks/postsQueryOptions';
import { ErrorComponent, ErrorComponentProps, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params: { postId } }) => queryClient.ensureQueryData(postQueryOptions(postId)),
  errorComponent: PostErrorComponent as any,
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }

  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const post = Route.useLoaderData();
  const { data: optionsUrl } = useQueryPostsUrl();

  return (
    <>
      <Card className="col-span-12 mx-10 grid h-fit grid-cols-12 p-4 text-center">
        <img src={post.image} className="col-span-12 mx-auto h-32 w-1/5 justify-center rounded" />
        <CardHeader className="col-span-12">{post.title}</CardHeader>
        <BreadcrumbResponsive
          currentFolder={{ title: 'Posts' }}
          options={optionsUrl}
          className="col-span-12 flex justify-center py-2"
        />
        <CardDescription className="col-span-12">{normalizeDate(post.date)}</CardDescription>
        <CardDescription className="col-span-12">{post.description}</CardDescription>
      </Card>
      <MarkdownRenderer markdown={post.body} />
    </>
  );
}
