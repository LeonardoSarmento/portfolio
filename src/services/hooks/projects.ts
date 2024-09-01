import { projects_pt_br } from '@assets/data/pt-BR/projects';
import { projects_en_us } from '@assets/data/en-US/projects';
import { FilterType } from '@services/types/Filters';
import { TAGS_OPTIONS_PROJECTS } from '@constants/tags';

export class ProjectNotFoundError extends Error {}

export const fetchProject = async ({ projectId, language }: { projectId: string; language: string }) => {
  console.log(`Fetching post with id ${projectId}...`);
  // await new Promise((r) => setTimeout(r, 500));
  const projects = language === 'pt-BR' ? projects_pt_br : projects_en_us;
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    throw new ProjectNotFoundError(`Post with id "${projectId}" not found!`);
  } else {
    return project;
  }
};

export const fetchProjectsWithFilter = async ({ tags, pageSize, title, page = '1' }: FilterType, language: string) => {
  // console.log('Fetching posts with filters...');
  // await new Promise((r) => setTimeout(r, 500));
  // console.log('tags: ', { tags, pageSize, title, views });
  const projects = language === 'pt-BR' ? projects_pt_br : projects_en_us;

  const offset = (+page - 1) * (pageSize ? +pageSize : projects.length);

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

  return filteredProjects.reverse();
};

export const fetchProjects = async (language: string) => {
  console.log('Fetching Project...');
  // await new Promise((r) => setTimeout(r, 500));
  const projects = language === 'pt-BR' ? projects_pt_br : projects_en_us;
  return projects.reverse();
};

export const fetchProjectsUrl = async (language: string) => {
  console.log('Fetching Project url...');
  // await new Promise((r) => setTimeout(r, 500));
  const projects = language === 'pt-BR' ? projects_pt_br : projects_en_us;
  const projectsUrl = projects.map((project) => ({ to: project.id, title: project.title }));
  return projectsUrl;
};

export const fetchProjectsTags = async () => {
  console.log('Fetching tags...');
  // await new Promise((r) => setTimeout(r, 500));
  const tags = TAGS_OPTIONS_PROJECTS;
  return tags;
};
