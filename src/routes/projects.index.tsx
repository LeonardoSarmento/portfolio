import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { projectsQueryOptionsWithFilter, useQueryTags } from '@services/hooks/postsQueryOptions';
import { Link, createFileRoute } from '@tanstack/react-router';
import { NOT_FOUND } from './posts.index';
import { useAuth } from '@services/hooks/auth';
import { useNavigate } from '@tanstack/react-router';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage, Form } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@components/ui/scroll-area';
import { Badge } from '@components/ui/badge';
import { FilterSchema, FilterType } from '@services/types/Filters';
import { useFormFilters } from '@services/hooks/useFormFilters';
import { FilterMenuComponent } from '@components/FilterMenuComponent';

export const Route = createFileRoute('/projects/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) =>
    queryClient.ensureQueryData(projectsQueryOptionsWithFilter(filters)),
  validateSearch: FilterSchema,
  component: ProjectsComponent,
});

function ProjectsComponent() {
  const auth = useAuth();
  const projects = Route.useLoaderData();

  const { form, ResetFilters } = useFormFilters({ path: { to: '/projects/', params: false } });
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
      to: '/projects/',
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
              <Button className="m-2" onClick={() => navigate({ to: '/projects/create' })} type="button">
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
            <FilterMenuComponent path={{ to: '/projects/', params: false }} />
            <div className="col-span-11 col-start-2 grid h-fit w-full grid-cols-12 gap-4">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <Card key={`${project.id}-${index}`} className="col-span-2 row-span-1 p-2 text-center">
                    <Link
                      className="flex h-full flex-col"
                      to="/projects/$projectId"
                      params={{ projectId: project.id }}
                      // mask={{ to: '/posts/$postId', params: { postId: post.id } }}
                    >
                      <img className="aspect-video w-full rounded-md" src={project.thumbnail} />
                      <div className="h-1/2">
                        <CardHeader className="flex flex-1">{project.title}</CardHeader>
                      </div>
                      <ScrollArea className="h-28 w-full rounded-md">
                        <div className="grid grid-cols-4 gap-2 px-4">
                          <>
                            {project.tags
                              ? project.tags.map((tag) => (
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
                          <CardDescription>{project.description}</CardDescription>
                        </ScrollArea>
                        <CardFooter className="mt-4 flex w-full text-center">
                          <p className="w-full text-center">{project.date.toLocaleDateString()}</p>
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
                                        CopyToClipboardRoute(`${import.meta.env.VITE_BASE_URL}/projects/${project.id}`);
                                    }}
                                  >
                                    Compartilhar
                                  </DropdownMenuItem>
                                  {auth.isAuthenticated ? (
                                    <>
                                      {project.editable === false ? null : (
                                        <Link to="/projects/$projectId/edit" params={{ projectId: project.id }}>
                                          <DropdownMenuItem>
                                            Editar
                                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                          </DropdownMenuItem>
                                        </Link>
                                      )}
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation(),
                                            toast.error('Sem deletar projeto por aqui malandro', {
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
                        &ldquo;Não encontrei nenhuma projeto com esse tema. falhei, fui mlk blz? :(&rdquo;
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
