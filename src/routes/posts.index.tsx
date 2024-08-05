import { FilterMenuComponent } from '@components/FilterMenuComponent';
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
import { ScrollArea } from '@components/ui/scroll-area';
import { useAuth } from '@services/hooks/auth';
import { postsQueryOptionsWithFilter } from '@services/hooks/postsQueryOptions';
import { FilterSchema } from '@services/types/Filters';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/posts/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) =>
    queryClient.ensureQueryData(postsQueryOptionsWithFilter(filters)),
  validateSearch: FilterSchema,
  component: PostsComponent,
});

function PostsComponent() {
  const auth = useAuth();
  const posts = Route.useLoaderData();

  return (
    <FilterMenuComponent
      path={{ to: '/posts' }}
      createPath={{ to: '/posts/create' }}
      hasContent={posts.length > 0}
      contentSize={posts.length}
    >
      <div className="col-span-11 col-start-2 grid h-fit w-full grid-cols-12 gap-4">
        {posts.length > 0
          ? posts.map((post, index) => (
              <Card key={`${post.id}-${index}`} className="col-span-2 row-span-1 p-2 text-center">
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
                  <ScrollArea className="h-28 w-full rounded-md">
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
                  </ScrollArea>
                  <div className="mt-4 flex h-full w-full flex-col justify-between">
                    <ScrollArea className="h-28 w-full rounded-md">
                      <CardDescription>{post.description}</CardDescription>
                    </ScrollArea>
                    <CardFooter className="mt-4 flex w-full text-center">
                      <p className="w-full text-center">{post.date.toLocaleDateString()}</p>
                      <div className="z-50 flex w-fit justify-self-end">
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" onClick={(e) => e.preventDefault()} type="button">
                              <Menu />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="relative w-56">
                            <DropdownMenuLabel>Postagem</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation(),
                                    CopyToClipboardRoute(`${import.meta.env.VITE_BASE_URL}/posts/${post.id}`);
                                }}
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
                                    onClick={(e) => {
                                      e.stopPropagation(),
                                        toast.error('Sem deletar post por aqui malandro', {
                                          icon: <Angry />,
                                          description: 'Deixa isso pra uma outra hora',
                                          classNames: {
                                            title: 'ml-2',
                                            description: 'ml-2',
                                          },
                                        });
                                    }}
                                  >
                                    Deletar
                                  </DropdownMenuItem>
                                </>
                              ) : null}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardFooter>
                  </div>
                </Link>
              </Card>
            ))
          : null}
      </div>
    </FilterMenuComponent>
  );
}
