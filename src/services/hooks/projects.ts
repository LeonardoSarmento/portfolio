import { projects as AllProjects } from '@assets/data/projects';
import { FilterType } from '@services/types/Filters';

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

export const fetchProjectsWithFilter = async ({ tags, pageSize, title, views, page = '1' }: FilterType) => {
  console.log('Fetching posts with filters...');
  await new Promise((r) => setTimeout(r, 500));
  console.log('tags: ', { tags, pageSize, title, views });

  const offset = (+page - 1) * (pageSize ? +pageSize : AllProjects.length);

  const projects = AllProjects;

  let filteredProjects = projects;

  if (title) {
    const queryTitle = title.toLowerCase();
    filteredProjects = filteredProjects.filter((project) => project.title.toLowerCase().includes(queryTitle));
  }

  if (tags && tags.length > 0) {
    filteredProjects = filteredProjects.filter((project) => project.tags?.some((tag) => tags.includes(tag.id)));
  }

  if (pageSize && pageSize !== 'All') {
    const maxPageSize = +pageSize;
    filteredProjects = filteredProjects.slice(offset, offset + maxPageSize);
  } else {
    filteredProjects = filteredProjects.slice(offset);
  }

  return filteredProjects;
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
