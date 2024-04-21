import { Card, CardDescription, CardHeader } from '@components/ui/card';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
  component: PostsComponent,
});

function PostsComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;
  console.log(posts);

  return (
    <div className="grid h-dvh max-w-full grid-cols-12 grid-rows-12 gap-4 px-16">
      <div className="grid h-dvh grid-cols-12 grid-rows-4 gap-12 p-2 px-5">
        {posts.map((post) => (
          <Card key={post.id} className="col-span-5 mt-12 h-fit p-4 text-center">
            <Link className="flex h-full flex-col justify-between" to="/posts/$postId" params={{ postId: post.id }}>
              <img className="h-1/3 rounded-md" src={post.image} />
              <CardHeader>{post.title}</CardHeader>
              <CardDescription>{post.description}</CardDescription>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
