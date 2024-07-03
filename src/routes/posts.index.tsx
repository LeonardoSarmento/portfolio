import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useAuth } from '@services/hooks/auth';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
  component: PostsComponent,
});

function PostsComponent() {
  const auth = useAuth();
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;
  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      {[...posts].map((post) => (
        // {[...posts, ...posts, ...posts, ...posts, ...posts, ...posts, ...posts].map((post) => (
        <Card key={post.id} className="col-span-2 row-span-1 mt-12 p-2 text-center">
          <DropdownMenu>
            <Link
              className="flex h-full flex-col"
              to="/posts/$postId"
              params={{ postId: post.id }}
              // mask={{ to: '/posts/$postId', params: { postId: post.id } }}
            >
              <img className="aspect-video w-full rounded-md" src={post.thumbnail} />
              <div className="h-1/2">
                <CardHeader className="flex flex-1">{post.title}</CardHeader>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4">
                <>
                  {post.tags
                    ? post.tags.map((tag) => (
                        <Badge key={tag.value} className="col-span-1 justify-center">
                          {tag.value}
                        </Badge>
                      ))
                    : null}
                </>
              </div>
              <div className="mt-4 flex h-full w-full flex-col justify-between">
                <CardDescription>{post.description}</CardDescription>
                <CardFooter className="mt-4 flex w-full">
                  <p className="w-full justify-center">{post.date.toLocaleDateString()}</p>
                  <div className="flex justify-end">
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <Menu />
                      </Button>
                    </DropdownMenuTrigger>
                  </div>
                </CardFooter>
              </div>
            </Link>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Postagem</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => CopyToClipboardRoute(`${import.meta.env.VITE_BASE_URL}/posts/${post.id}`)}
                >
                  Compartilhar
                </DropdownMenuItem>
                {auth.isAuthenticated ? (
                  <>
                    <Link to="/posts/$postId/edit" params={{ postId: post.id }}>
                      <DropdownMenuItem>
                        Editar
                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() =>
                        toast.error('Sem deletar post por aqui malandro', {
                          icon: <Angry />,
                          description: 'Deixa isso pra uma outra hora',
                          classNames: {
                            title: 'ml-2',
                            description: 'ml-2',
                          },
                        })
                      }
                    >
                      Deletar
                    </DropdownMenuItem>
                  </>
                ) : null}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      ))}
    </div>
  );
}
