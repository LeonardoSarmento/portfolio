import { FilterMenuComponent } from '@components/FilterMenuComponent';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useAuth } from '@services/hooks/auth';
import { postsQueryOptionsWithFilter } from '@services/hooks/postsQueryOptions';
import { useFormFilters } from '@services/hooks/useFormFilters';
import { FilterSchema, FilterType } from '@services/types/Filters';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';
export const NOT_FOUND = new URL('/public/assets/ThumbsUpSadCat.png', import.meta.url).href;

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
  const { form, ResetFilters } = useFormFilters({ path: { to: '/posts/', params: false } });
  const navigate = useNavigate();

  function onSubmit(data: FilterType) {
    // toast('You submitted the following values:', {
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    // console.log('posts: ', posts);
    console.log('data: ', data.tags);
    navigate({
      to: '/posts/',
      search: {
        tags: data.tags?.length === 0 ? undefined : data.tags,
        title: data.title === '' ? undefined : data.title,
        count: data.count,
        views: data.views,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
          <div className="col-span-12 grid grid-cols-12 items-center justify-end gap-2 space-x-2">
            {auth.isAuthenticated ? (
              <Button className="m-2" onClick={() => navigate({ to: '/posts/create' })} type="button">
                Criar
              </Button>
            ) : null}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-6 col-start-6 flex w-full">
                  <FormControl>
                    <Input placeholder="Procure por um título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              Procurar
            </Button>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <FilterMenuComponent path={{ to: '/posts/', params: false }} />
            <div className="col-span-11 col-start-2 grid h-fit w-full grid-cols-12 gap-4">
              {posts.length > 0 ? (
                posts.map((post, index) => (
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
              ) : (
                <div className="relative top-1/2 col-span-11 flex flex-col items-center justify-end gap-4">
                  <CardContent className="flex items-center justify-center rounded-xl border p-6">
                    <blockquote className="space-y-2 pr-6">
                      <p className="text-lg">
                        &ldquo;Não encontrei nenhuma postagem com esse tema. falhei, fui mlk blz? :(&rdquo;
                      </p>
                      <footer className="text-sm">Leonardo Sarmento</footer>
                    </blockquote>
                    <Separator orientation="vertical" className="mx-1" />
                    <img className="h-80 rounded-md" src={NOT_FOUND} alt="Thumb Up Sad Cat" />
                  </CardContent>
                  <div className="flex gap-4">
                    <CardTitle className="mt-2">Retire os filtros e tente novamente: </CardTitle>
                    <Button type="submit" onClick={ResetFilters}>
                      Tentar novamente
                    </Button>
                  </div>
                  {/* <ReloadIcon className="mr-2 h-10 w-6 animate-spin" /> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
