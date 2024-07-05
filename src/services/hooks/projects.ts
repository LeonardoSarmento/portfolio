import { projects as AllProjects } from '@assets/data/projects';
import { FilterType } from '@src/routes/posts.index';

// export type ProjecType = {
//   id: string;
//   title: string;
//   description: string;
// };

export class ProjectNotFoundError extends Error {}

export const fetchProject = async (projectId: string) => {
  console.log(`Fetching post with id ${projectId}...`);
  await new Promise((r) => setTimeout(r, 500));
  const projects = AllProjects;
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    throw new ProjectNotFoundError(`Post with id "${projectId}" not found!`);
  } else {
    return project;
  }
};

export const fetchProjectsWithFilter = async ({ tags, count, title, views }: FilterType) => {
  console.log('Fetching posts with filters...');
  await new Promise((r) => setTimeout(r, 500));
  console.log('tags: ', { tags, count, title, views });

  if (!tags && (!count || count === 'All')) {
    return AllProjects;
  }

  const projects = AllProjects;
  if (tags && tags.length >= 0 && (!count || count === 'All')) {
    // console.log('filtrando', projects);
    const filtered = projects.filter((project) => project.tags?.some((tag) => tags.includes(tag.id)));
    return filtered;
  }
  if (tags && tags.length >= 0 && count) {
    // console.log('filtrando', projects);
    const filtered = projects
      .filter((project) => project.tags?.some((tag) => tags.includes(tag.id)))
      .filter((_, index) => index + 1 <= +count);
    return filtered;
  }
  if (tags && tags.length === 0 && count) {
    const projectsFilteredWithCount = projects.filter((_, index) => index + 1 <= +count);
    // console.log('projectsWithFilter: ', projects);
    return projectsFilteredWithCount;
  }
  if (!tags && count) {
    const projectsFilteredWithCount = projects.filter((_, index) => index + 1 <= +count);
    // console.log('projectsWithFilter: ', projects);
    return projectsFilteredWithCount;
  }
  return projects;
};

export const fetchProjects = async () => {
  console.log('Fetching Project...');
  await new Promise((r) => setTimeout(r, 500));
  const project = AllProjects;
  return project;
};

export const fetchProjectsUrl = async () => {
  console.log('Fetching Project url...');
  await new Promise((r) => setTimeout(r, 500));
  const project = AllProjects.map((project) => ({ to: project.id, title: project.title }));
  return project;
};
