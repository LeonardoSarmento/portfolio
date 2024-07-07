/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProjectsImport } from './routes/projects'
import { Route as PostsImport } from './routes/posts'
import { Route as LoginImport } from './routes/login'
import { Route as IntroductionImport } from './routes/introduction'
import { Route as ExperienceImport } from './routes/experience'
import { Route as ContactImport } from './routes/contact'
import { Route as AboutImport } from './routes/about'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as ProjectsIndexImport } from './routes/projects.index'
import { Route as PostsIndexImport } from './routes/posts.index'
import { Route as ProjectsChartsImport } from './routes/projects.charts'
import { Route as ProjectsProjectIdImport } from './routes/projects.$projectId'
import { Route as PostsPostIdImport } from './routes/posts.$postId'
import { Route as ProjectsProjectIdModalImport } from './routes/projects_.$projectId.modal'
import { Route as PostsPostIdModalImport } from './routes/posts_.$postId.modal'
import { Route as AuthProjectsCreateImport } from './routes/_auth.projects.create'
import { Route as AuthPostsCreateImport } from './routes/_auth.posts.create'
import { Route as AuthProjectsProjectIdEditImport } from './routes/_auth.projects.$projectId.edit'
import { Route as AuthPostsPostIdEditImport } from './routes/_auth.posts.$postId.edit'

// Create/Update Routes

const ProjectsRoute = ProjectsImport.update({
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any)

const PostsRoute = PostsImport.update({
  path: '/posts',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IntroductionRoute = IntroductionImport.update({
  path: '/introduction',
  getParentRoute: () => rootRoute,
} as any)

const ExperienceRoute = ExperienceImport.update({
  path: '/experience',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProjectsIndexRoute = ProjectsIndexImport.update({
  path: '/',
  getParentRoute: () => ProjectsRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  path: '/',
  getParentRoute: () => PostsRoute,
} as any)

const ProjectsChartsRoute = ProjectsChartsImport.update({
  path: '/charts',
  getParentRoute: () => ProjectsRoute,
} as any)

const ProjectsProjectIdRoute = ProjectsProjectIdImport.update({
  path: '/$projectId',
  getParentRoute: () => ProjectsRoute,
} as any)

const PostsPostIdRoute = PostsPostIdImport.update({
  path: '/$postId',
  getParentRoute: () => PostsRoute,
} as any)

const ProjectsProjectIdModalRoute = ProjectsProjectIdModalImport.update({
  path: '/projects/$projectId/modal',
  getParentRoute: () => rootRoute,
} as any)

const PostsPostIdModalRoute = PostsPostIdModalImport.update({
  path: '/posts/$postId/modal',
  getParentRoute: () => rootRoute,
} as any)

const AuthProjectsCreateRoute = AuthProjectsCreateImport.update({
  path: '/projects/create',
  getParentRoute: () => AuthRoute,
} as any)

const AuthPostsCreateRoute = AuthPostsCreateImport.update({
  path: '/posts/create',
  getParentRoute: () => AuthRoute,
} as any)

const AuthProjectsProjectIdEditRoute = AuthProjectsProjectIdEditImport.update({
  path: '/projects/$projectId/edit',
  getParentRoute: () => AuthRoute,
} as any)

const AuthPostsPostIdEditRoute = AuthPostsPostIdEditImport.update({
  path: '/posts/$postId/edit',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/experience': {
      preLoaderRoute: typeof ExperienceImport
      parentRoute: typeof rootRoute
    }
    '/introduction': {
      preLoaderRoute: typeof IntroductionImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/posts': {
      preLoaderRoute: typeof PostsImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      preLoaderRoute: typeof ProjectsImport
      parentRoute: typeof rootRoute
    }
    '/posts/$postId': {
      preLoaderRoute: typeof PostsPostIdImport
      parentRoute: typeof PostsImport
    }
    '/projects/$projectId': {
      preLoaderRoute: typeof ProjectsProjectIdImport
      parentRoute: typeof ProjectsImport
    }
    '/projects/charts': {
      preLoaderRoute: typeof ProjectsChartsImport
      parentRoute: typeof ProjectsImport
    }
    '/posts/': {
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof PostsImport
    }
    '/projects/': {
      preLoaderRoute: typeof ProjectsIndexImport
      parentRoute: typeof ProjectsImport
    }
    '/_auth/posts/create': {
      preLoaderRoute: typeof AuthPostsCreateImport
      parentRoute: typeof AuthImport
    }
    '/_auth/projects/create': {
      preLoaderRoute: typeof AuthProjectsCreateImport
      parentRoute: typeof AuthImport
    }
    '/posts/$postId/modal': {
      preLoaderRoute: typeof PostsPostIdModalImport
      parentRoute: typeof rootRoute
    }
    '/projects/$projectId/modal': {
      preLoaderRoute: typeof ProjectsProjectIdModalImport
      parentRoute: typeof rootRoute
    }
    '/_auth/posts/$postId/edit': {
      preLoaderRoute: typeof AuthPostsPostIdEditImport
      parentRoute: typeof AuthImport
    }
    '/_auth/projects/$projectId/edit': {
      preLoaderRoute: typeof AuthProjectsProjectIdEditImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthRoute.addChildren([
    AuthPostsCreateRoute,
    AuthProjectsCreateRoute,
    AuthPostsPostIdEditRoute,
    AuthProjectsProjectIdEditRoute,
  ]),
  AboutRoute,
  ContactRoute,
  ExperienceRoute,
  IntroductionRoute,
  LoginRoute,
  PostsRoute.addChildren([PostsPostIdRoute, PostsIndexRoute]),
  ProjectsRoute.addChildren([
    ProjectsProjectIdRoute,
    ProjectsChartsRoute,
    ProjectsIndexRoute,
  ]),
  PostsPostIdModalRoute,
  ProjectsProjectIdModalRoute,
])

/* prettier-ignore-end */
