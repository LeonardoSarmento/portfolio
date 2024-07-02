import { Card, CardDescription, CardFooter, CardHeader } from '@components/ui/card';
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
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      {[...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects].map((project) => (
        <Card key={project.id} className="col-span-2 row-span-1 mt-12 p-2 text-center">
          <Link
            className="flex h-full flex-col"
            to="/projects/$projectId/modal"
            params={{ projectId: project.id }}
            mask={{ to: '/projects/$projectId', params: { projectId: project.id } }}
          >
            <img className="aspect-video w-full rounded-md" src={project.image} />
            <div className="h-full">
              <CardHeader className="flex flex-1">{project.title}</CardHeader>
            </div>
            <div className="flex h-full flex-col justify-between">
              <CardDescription>{project.description}</CardDescription>
              <CardFooter className="justify-center">{project.date.toLocaleDateString()}</CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
