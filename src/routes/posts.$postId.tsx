import MarkdownRenderer from '@components/MarkdownRenderer';
import { postQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { useQueryPostsUrl } from '@services/hooks/postsQueryOptions';
import { ErrorComponent, ErrorComponentProps, createFileRoute } from '@tanstack/react-router';
import { POSTBYIDCONTENT } from '@constants/by-id-content';
import { HeaderContentComponent } from '@components/ContentByIdComponent';

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params: { postId } }) => queryClient.ensureQueryData(postQueryOptions(postId)),
  // errorComponent: PostErrorComponent as any,
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
  const URL = `${import.meta.env.VITE_BASE_URL}/posts/${post.id}`;

  return (
    <>
      <HeaderContentComponent
        content={post}
        optionsUrl={optionsUrl}
        path={{ to: '/posts/$postId/edit', params: { postId: post.id } }}
        shareComponent={POSTBYIDCONTENT()}
        shareComponentURL={URL}
      />
      <MarkdownRenderer markdown={post.body} />
    </>
  );
}
