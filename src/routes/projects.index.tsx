import { createFileRoute, useSearch } from '@tanstack/react-router';
import { FilterSchema } from '@services/types/Filters';
import { FilterMenuComponent } from '@components/FilterMenuComponent';
import { RenderAllContents } from '@components/RenderAllContents';
import { projectsQueryOptionsWithFilter } from '@services/hooks/projectsQueryOptions';
import { MovetoTopButton } from '@components/MoveToTop';
import i18n from '../i18n/config';
import { useQueryProjectsTags } from '@services/hooks/tagsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/projects/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) =>
    queryClient.ensureQueryData(projectsQueryOptionsWithFilter(filters, i18n.language)),
  validateSearch: FilterSchema,
  component: ProjectsComponent,
});

function ProjectsComponent() {
  const projects = Route.useLoaderData();
  const TAGS = useSuspenseQuery(useQueryProjectsTags);
  const { pageSize } = useSearch({ strict: false });
  const URL: string = `${location.origin}/projects/`;
  return (
    <FilterMenuComponent
      path={{ to: '/projects' }}
      createPath={{ to: '/projects/create' }}
      hasContent={projects.length > 0}
      contentSize={projects.length}
      TAGS={TAGS.data}
    >
      <RenderAllContents
        URL={URL}
        contents={projects}
        path={{ to: '/projects/$projectId' }}
        editPath={{ to: '/projects/$projectId/edit' }}
      />
      {pageSize && +pageSize > 15 ? <MovetoTopButton className="xl:hidden" /> : null}
    </FilterMenuComponent>
  );
}
