import { Card, CardDescription, CardFooter, CardHeader } from '@components/ui/card';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
  component: PostsComponent,
});

function PostsComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;
  // console.log(posts);

  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      {[...posts, ...posts, ...posts, ...posts, ...posts, ...posts, ...posts].map((post) => (
        <Card key={post.id} className="col-span-2 row-span-1 mt-12 p-2 text-center">
          <Link
            className="flex h-full flex-col"
            to="/posts/$postId/modal"
            params={{ postId: post.id }}
            mask={{ to: '/posts/$postId', params: { postId: post.id } }}
          >
            <img className="aspect-video w-full rounded-md" src={post.image} />
            <div className="h-full">
              <CardHeader className="flex flex-1">{post.title}</CardHeader>
            </div>
            <div className="flex h-full flex-col justify-between">
              <CardDescription>{post.description}</CardDescription>
              <CardFooter className="justify-center">{post.date.toLocaleDateString()}</CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
