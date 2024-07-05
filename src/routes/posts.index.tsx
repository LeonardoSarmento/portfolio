import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Separator } from '@components/ui/separator';
import { Slider } from '@components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useAuth } from '@services/hooks/auth';
import { postsQueryOptionsWithFilter, useQueryTags } from '@services/hooks/postsQueryOptions';
import { CopyToClipboardRoute } from '@services/utils/utils';
import {
  ErrorComponent,
  ErrorComponentProps,
  Link,
  createFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { Angry, Menu } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const NOT_FOUND = new URL('/public/assets/ThumbsUpSadCat.png', import.meta.url).href;

export const FilterSchema = z.object({
  tags: z.array(z.string().optional()).optional().catch([]),
  title: z.string().optional().catch(''),
  views: z.number().optional().catch(1000),
  count: z.string().optional().catch('100'),
});

export type FilterType = z.infer<typeof FilterSchema>;
// type FilterType = z.infer<typeof FilterSchema> & SearchSchemaInput;

export const Route = createFileRoute('/posts/')({
  loaderDeps: ({ search: { tags, title, count, views } }) => ({ tags, title, count, views }),
  loader: ({ context: { queryClient }, deps: { tags, title, count, views } }) =>
    queryClient.ensureQueryData(postsQueryOptionsWithFilter({ tags, title, count, views })),
  validateSearch: FilterSchema,
  component: PostsComponent,
});

function PostsComponent() {
  const auth = useAuth();
  const posts = Route.useLoaderData();
  // const router = useRouter();
  const filters = Route.useSearch();
  const { data: TAGS } = useQueryTags();
  const navigate = useNavigate();

  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: filters,
  });

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
        title: data.title,
        count: data.count,
        views: data.views,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
          <div className="col-span-1 row-span-full mt-24 flex w-full">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-center">Filtros</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <CardContent className="mt-3 flex flex-col space-y-5 p-0">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="my-4 flex justify-center">Temas</FormLabel>
                          <FormDescription>Selecione quais temas você quer ler sobre.</FormDescription>
                        </div>
                        {TAGS &&
                          TAGS.map((tag) => (
                            <FormField
                              key={tag.id}
                              control={form.control}
                              name="tags"
                              render={({ field }) => {
                                return (
                                  <FormItem key={tag.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(tag.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange(field.value ? [...field.value, tag.id] : [tag.id])
                                            : field.onChange(field.value?.filter((value) => value !== tag.id));
                                        }}
                                        onClick={() => console.log(field.value)}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{tag.label}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex flex-col items-start space-y-3">
                          <FormLabel className="text-sm font-normal">Quantidade</FormLabel>
                          <FormDescription>Selecione a quantidade de você deseja visualizar.</FormDescription>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue className="w-fit" placeholder="Qntd" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={'All'}>Todos</SelectItem>
                              <SelectItem value={'5'}>5</SelectItem>
                              <SelectItem value={'25'}>25</SelectItem>
                              <SelectItem value={'50'}>50</SelectItem>
                              <SelectItem value={'100'}>100</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Filtrar</Button>
                </CardContent>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-11 col-start-2 grid h-fit w-full grid-cols-12 gap-4">
            <div className="relative top-10 col-span-12 grid grid-cols-12 items-center justify-end space-x-2">
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
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Card key={`${post.id}-${index}`} className="col-span-2 row-span-1 mt-12 p-2 text-center">
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
                  <Button
                    type="submit"
                    onClick={() => {
                      form.setValue('tags', []);
                      navigate({ to: '/posts/' });
                    }}
                  >
                    Tentar novamente
                  </Button>
                </div>
                {/* <ReloadIcon className="mr-2 h-10 w-6 animate-spin" /> */}
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
