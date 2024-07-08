import { BreadcrumbResponsive } from '@components/Breadcrumbs';
import MarkdownRenderer from '@components/MarkdownRenderer';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { normalizeDate } from '@lib/utils';
import { useAuth } from '@services/hooks/auth';
import { projectQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { useQueryProjectsUrl } from '@services/hooks/postsQueryOptions';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { ErrorComponent, ErrorComponentProps, createFileRoute, useRouter } from '@tanstack/react-router';
import { CopyIcon, Share2 } from 'lucide-react';

export const Route = createFileRoute('/projects/$projectId')({
  loader: ({ context: { queryClient }, params: { projectId } }) =>
    queryClient.ensureQueryData(projectQueryOptions(projectId)),
  errorComponent: ProjectErrorComponent as any,
  component: ProjectComponent,
});

export function ProjectErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }

  return <ErrorComponent error={error} />;
}

function ProjectComponent() {
  const auth = useAuth();
  const router = useRouter();
  const project = Route.useLoaderData();
  const { data: optionsUrl } = useQueryProjectsUrl();
  console.log(optionsUrl);
  const URL = `${import.meta.env.VITE_BASE_URL}/projects/${project.id}`;

  return (
    <>
      <Card className="col-span-12 mx-10 grid h-fit grid-cols-12 p-4 text-center">
        <img src={project.thumbnail} className="col-span-12 mx-auto h-32 w-1/5 justify-center rounded" />
        <CardHeader className="col-span-12 gap-3">
          <CardTitle>{project.title}</CardTitle>
          <div className="col-span-12 flex w-full justify-center gap-2">
            <>
              {project.tags
                ? project.tags.map((tag) => (
                    <Badge key={tag.value} className="justify-center">
                      {tag.value}
                    </Badge>
                  ))
                : null}
            </>
          </div>
        </CardHeader>
        <BreadcrumbResponsive
          currentFolder={{ title: 'projects' }}
          options={optionsUrl}
          className="col-span-12 flex justify-center"
        />
        <div className="col-span-12 grid grid-cols-12 gap-2">
          <CardDescription className="col-span-12 pt-2">{normalizeDate(project.date)}</CardDescription>
          <CardDescription className="col-span-4 col-start-5 flex items-center justify-center">
            {project.description}
          </CardDescription>
          {auth.isAuthenticated ? (
            <Button
              className="col-span-1 col-start-10"
              onClick={() => router.navigate({ to: '/projects/$projectId/edit', params: { projectId: project.id } })}
            >
              Editar
            </Button>
          ) : null}
          <Button className="col-span-1 col-start-11" onClick={() => router.history.back()}>
            Voltar
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="col-span-1 col-start-12 flex justify-center gap-2">
                <p>Compartilhar</p>
                <Share2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="z-5 w-[520px]">
              <div className="flex flex-col space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold">Compartilhe com seus inimigos :)</h3>
                <p className="text-sm text-muted-foreground">
                  Qualquer um com esse link em ctrl+c ctrl+v ficará mais forte que nunca.
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={URL} readOnly className="h-9" />
                </div>
                <Button type="button" size="sm" className="px-3" onClick={() => CopyToClipboardRoute(URL)}>
                  <span className="sr-only">Copiar</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
      <MarkdownRenderer markdown={project.body} />
    </>
  );
}
