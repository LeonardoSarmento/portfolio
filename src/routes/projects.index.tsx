import { Card, CardDescription, CardFooter, CardHeader } from '@components/ui/card';
import { projectsQueryOptionsWithFilter } from '@services/hooks/postsQueryOptions';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@services/hooks/auth';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';
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
import { ScrollArea } from '@components/ui/scroll-area';
import { Badge } from '@components/ui/badge';
import { FilterSchema } from '@services/types/Filters';
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

  return (
    <FilterMenuComponent
      path={{ to: '/projects' }}
      createPath={{ to: '/projects/create' }}
      hasContent={projects.length > 0}
      contentSize={projects.length}
    >
      <div className="col-span-11 col-start-2 grid h-fit w-full grid-cols-12 gap-4">
        {projects.length > 0
          ? projects.map((project, index) => (
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
          : null}
      </div>
    </FilterMenuComponent>
  );
}
