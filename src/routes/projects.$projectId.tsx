import { BreadcrumbResponsive } from '@components/Breadcrumbs';
import { MarkdownRenderer } from '@components/MarkdownRenderer';
import { Card, CardDescription, CardHeader } from '@components/ui/card';
import { normalizeDate } from '@lib/utils';
import { projectQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { useQueryProjectsUrl } from '@services/hooks/postsQueryOptions';
import { ErrorComponent, ErrorComponentProps, createFileRoute } from '@tanstack/react-router';

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
  const project = Route.useLoaderData();
  const { data: optionsUrl } = useQueryProjectsUrl();
  console.log(optionsUrl);
  return (
    <>
      <Card className="col-span-12 mx-10 grid h-fit grid-cols-12 p-4 text-center">
        <img src={project.image} className="col-span-12 mx-auto h-32 w-1/5 justify-center rounded" />
        <CardHeader className="col-span-12">{project.title}</CardHeader>
        <BreadcrumbResponsive
          currentFolder={{ title: 'Projects' }}
          options={optionsUrl}
          className="col-span-12 flex justify-center py-2"
        />
        <CardDescription className="col-span-12">{normalizeDate(project.date)}</CardDescription>
        <CardDescription className="col-span-12">{project.description}</CardDescription>
      </Card>
      <MarkdownRenderer markdown={project.body} />
    </>
  );
}
