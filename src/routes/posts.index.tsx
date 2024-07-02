import { copyToClipboard } from '@components/CodeCopyButton';
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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Navigate, Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
  component: PostsComponent,
});

function PostsComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;
  function copyPostRoute(postId: string) {
    const url = `${import.meta.env.VITE_BASE_URL}/posts/${postId}`;
    try {
      copyToClipboard(url);
      toast.success('Link salvo no ctrl+v patrão', { description: `Pediu tá feito, ${url} tá na mão` });
    } catch (error) {
      toast.error('Não foi possível copiar o link', { description: 'Sinto mt falhei fui mlk :(' });
    }
  }
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
                <>{post.tags ? post.tags.map((tag) => <Badge className="col-span-1 justify-center">{tag.value}</Badge>) : null}</>
              </div>
              <div className="flex h-full w-full flex-col mt-4 justify-between">
                <CardDescription>{post.description}</CardDescription>
                <CardFooter className="mt-4 flex w-full">
                  <p className="w-full justify-center">{post.date.toLocaleDateString()}</p>
                  <div className="flex justify-end">
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
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
                <Link to="/posts/$postId/edit" params={{ postId: post.id }}>
                  <DropdownMenuItem>
                    Editar
                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => copyPostRoute(post.id)}>Compartilhar</DropdownMenuItem>
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
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      ))}
    </div>
  );
}
