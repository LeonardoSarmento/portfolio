import { createFileRoute } from '@tanstack/react-router';
import { FilterSchema } from '@services/types/Filters';
import { FilterMenuComponent } from '@components/FilterMenuComponent';
import { RenderAllContents } from '@components/RenderAllContents';
import { projectsQueryOptionsWithFilter } from '@services/hooks/projectsQueryOptions';

export const Route = createFileRoute('/projects/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) =>
    queryClient.ensureQueryData(projectsQueryOptionsWithFilter(filters)),
  validateSearch: FilterSchema,
  component: ProjectsComponent,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Projects | Leonardo`,
      content:
        "Explore my software development projects. See the tools and technologies I use or have used in my work, and learn about the solutions I've built.",
    },
  ],
});

function ProjectsComponent() {
  const projects = Route.useLoaderData();
  const URL: string = `${import.meta.env.VITE_BASE_URL}/projects/`;
  return (
    <FilterMenuComponent
      path={{ to: '/projects' }}
      createPath={{ to: '/projects/create' }}
      hasContent={projects.length > 0}
      contentSize={projects.length}
    >
      <RenderAllContents
        URL={URL}
        contents={projects}
        path={{ to: '/projects/$projectId' }}
        editPath={{ to: '/projects/$projectId/edit' }}
      />
    </FilterMenuComponent>
  );
}
