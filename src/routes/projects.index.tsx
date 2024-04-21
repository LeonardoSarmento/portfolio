import { Card, CardDescription, CardHeader } from '@components/ui/card';
import { projectsQueryOptions } from '@services/hooks/postsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(projectsQueryOptions),
  component: ProjectsComponent,
});

function ProjectsComponent() {
  const projectsQuery = useSuspenseQuery(projectsQueryOptions);
  const projects = projectsQuery.data;

  return (
    <div className="grid h-dvh max-w-full grid-cols-12 grid-rows-12 gap-4 px-16">
      <div className="grid h-dvh grid-cols-12 grid-rows-4 gap-12 p-2 px-5">
        {projects.map((project) => (
          <Card key={project.id} className="col-span-5 mt-12 h-fit p-4 text-center">
            <Link
              className="flex h-full flex-col justify-between"
              to="/projects/$projectId"
              params={{ projectId: project.id }}
            >
              <img className="h-1/3 rounded-md" src={project.image} />
              <CardHeader>{project.title}</CardHeader>
              <CardDescription>{project.description}</CardDescription>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
