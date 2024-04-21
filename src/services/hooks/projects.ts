import { projects as AllProjects } from '@assets/data/projects';

export type ProjecType = {
  id: string;
  title: string;
  description: string;
};

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
