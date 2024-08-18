import { HeaderContentComponent } from '@components/ContentByIdComponent';
import MarkdownRenderer from '@components/MarkdownRenderer';
import { PROJECTBYIDCONTENT } from '@constants/by-id-content';
import { projectQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { useQueryProjectsUrl } from '@services/hooks/projectsQueryOptions';
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
  const URL = `${import.meta.env.VITE_BASE_URL}/projects/${project.id}`;

  return (
    <>
      <HeaderContentComponent
        content={project}
        optionsUrl={optionsUrl}
        path={{ to: '/projects/$projectId/edit', params: { projectId: project.id } }}
        shareComponent={PROJECTBYIDCONTENT}
        shareComponentURL={URL}
      />
      <MarkdownRenderer markdown={project.body} />
    </>
  );
}
