import { PendingComponent } from '@components/PendingComponent';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import { ScrollArea } from '@components/ui/scroll-area';
import { postsQueryOptions, projectsQueryOptions } from '@services/hooks/postsQueryOptions';
import { MY_PHOTO } from '@services/utils/Images';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(postsQueryOptions), queryClient.ensureQueryData(projectsQueryOptions);
  },
  pendingComponent: PendingComponent,
  component: Index,
});

function Index() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;

  const projectsQuery = useSuspenseQuery(projectsQueryOptions);
  const projects = projectsQuery.data;

  return (
    <div className="grid-rows-auto mt-3 grid grid-cols-12 gap-4 px-16">
      <Card className="col-span-6 row-span-6 grid grid-cols-2 items-center px-4 pt-8">
        <CardContent className="flex flex-col items-center justify-center">
          <img className="h-80 rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
          <CardDescription className="mt-6 text-xs leading-tight text-muted-foreground">
            Front End Engineer | React | React Native | TypeScript | Agile
          </CardDescription>
          {/* <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div> */}
          <CardTitle className="mb-2 mt-4">Leonardo</CardTitle>
        </CardContent>
        <CardContent className="flex flex-col items-center justify-center">
          <CardDescription className="text-xs">
            As a dedicated Virtual Systems Fellow at the SENAI Institute of Technology — Operational Efficiency, I have
            been actively developing web applications for various clients.
          </CardDescription>
          <CardDescription className="text-xs">
            My expertise lies in using ReactJs, React Native, and TypeScript for frontend development and integrating
            REST APIs with Node.Js on the backend, always ensuring agility in my work. In my pursuit of specialization,
            I have embarked on postgraduate studies in Software Architecture and Solutions, with a keen focus on
            understanding the comprehensive Cloud environment.
          </CardDescription>
          <CardDescription className="text-xs">
            Currently, I am honing my skills in React Native through a project targeted at industry professionals in
            occupational health and safety. This project involves capturing data via Bluetooth connection with various
            sensors, storing it in the application with an offline-first approach, and displaying the data through
            real-time graphs. The technologies I’m using include Expo, React Native, TypeScript, React-native-ble-plx,
            Redux-toolkit, React Query with Axios, React-hook-form, and Zod.
          </CardDescription>
          <CardDescription className="text-xs">
            In addition, I have contributed to a health sector project, where we developed a management system for
            companies to analyze their employees’ mental health data. This involved creating a Progressive Web
            Application (PWA) for employees to manage their appointments, available clinics for consultations, and
            mental health forms. A separate website was also developed for the company and clinics to manage all their
            employees’ data, appointments, and forms.
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="col-span-3 row-span-6 flex flex-col items-center justify-center px-4">
        <CardContent>
          <CardHeader>
            <CardTitle>XP Educação</CardTitle>
            <CardContent className="p-0">
              <CardDescription>Postgraduate Degree, Software Architecture and Solutions</CardDescription>
              <CardDescription>Nov 2023 - Aug 2024</CardDescription>
            </CardContent>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Specialized in software project lifecycle, focusing on project requirements, structuring, and management.
              Gained expertise in Software Architecture and Cloud-based Solutions Architecture.
            </CardDescription>
          </CardContent>
          <CardHeader>
            <CardTitle>Faculdade UCL</CardTitle>
            <CardContent className="p-0">
              <CardDescription>Bachelor of Engineering - BE, Engenharia Civil</CardDescription>
              <CardDescription>2014 - 2021</CardDescription>
            </CardContent>
          </CardHeader>
        </CardContent>
      </Card>
      <Card className="col-span-3 col-start-10 row-span-6 px-4">
        <ScrollArea className="my-3 h-[450px] w-full rounded-md">
          <CardHeader>
            <CardTitle>Virtual Systems Fellow</CardTitle>
            <CardContent className="p-0">
              <CardDescription>Sistema Findes · Full-time</CardDescription>
              <CardDescription>Feb 2023 - Present · 1 yr 2 mos</CardDescription>
              <CardDescription>Vitória, Espírito Santo, Brazil · On-site</CardDescription>
            </CardContent>
          </CardHeader>
          <CardContent>
            <CardDescription>Working on software development projects, focusing on the frontend.</CardDescription>
            <CardDescription>
              • Collaborated with a cross-functional team in an Agile environment to successfully deliver multiple
              software projects on time and within budget
            </CardDescription>
            <CardDescription>
              • Participated in calls with 4 companies, helping the development of 4 innovative projects and securing
              R$300K plus in funding.
            </CardDescription>
            <CardDescription>
              • Developing projects using React, React Native, TypeScript, Expo, React Query, Axios, Zod, React -
              hook-form, React-native-ble-plx, Redux Toolkit, REST API, BPMN and Agile Methodologies.
            </CardDescription>
          </CardContent>
          <CardHeader>
            <CardTitle>Laboratorist</CardTitle>
            <CardContent className="p-0">
              <CardDescription>LABMATERIAIS · Internship</CardDescription>
              <CardDescription>Feb 2021 - Jun 2021 · 5 mos</CardDescription>
              <CardDescription>Serra, Espírito Santo, Brazil · On-site</CardDescription>
            </CardContent>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Development of activities related to all the stages of the concrete compressive strength test. Therefore,
              participation in the concreting of the client's site, carrying out the concrete slump test.
            </CardDescription>
            <CardDescription>
              Demolding of specimens obtained during concreting at the client's site. Identification and storage of the
              specimens in the wet chamber.
            </CardDescription>
            <CardDescription>
              Maintenance of the molds used in concreting, concrete compressive strength test, disposal of broken
              specimens and creation of the test certificate for each invoice.
            </CardDescription>
          </CardContent>
        </ScrollArea>
      </Card>
      <div className="col-span-12 row-start-7 mt-3 grid grid-cols-2 gap-4">
        <div className="col-span-1 mx-12 flex max-h-full flex-col gap-3 text-center">
          <CardTitle className="text-lg">Posts</CardTitle>
          <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {posts
                .filter((_, index) => index <= 10)
                .map((post, index) => (
                  // {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={`${post.id}-${index}`} className="h-[425px] basis-1/3">
                    <Card key={post.id} className="col-span-2 row-span-1 h-full p-2 text-center">
                      <Link
                        className="flex h-full flex-col"
                        to="/posts/$postId"
                        params={{ postId: post.id }}
                        // mask={{ to: '/posts/$postId', params: { postId: post.id } }}
                      >
                        <img className="aspect-video w-full rounded-md" src={post.thumbnail} />
                        <div className="h-1/2">
                          <CardHeader className="flex flex-1">{post.title}</CardHeader>
                        </div>
                        <ScrollArea className="h-28 w-full rounded-md">
                          <div className="grid grid-cols-4 gap-2 px-4">
                            {post.tags
                              ? post.tags.map((tag) => (
                                  <Badge key={`${post.id}-${index}-${tag.value}`} className="col-span-1 justify-center">
                                    {tag.value}
                                  </Badge>
                                ))
                              : null}
                          </div>
                        </ScrollArea>
                        <div className="mt-4 flex h-full w-full flex-col justify-between">
                          <ScrollArea className="flex items-center justify-center">
                            <CardDescription className="h-14 w-full rounded-md">{post.description}</CardDescription>
                          </ScrollArea>
                          <CardFooter className="mt-4 flex w-full">
                            <p className="w-full justify-center">{post.date.toLocaleDateString()}</p>
                          </CardFooter>
                        </div>
                      </Link>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button asChild>
            <Link to="/posts" search={{ page: '1', pageSize: '100' }}>
              Ver todos os Posts
            </Link>
          </Button>
        </div>
        <div className="col-span-1 mx-12 flex flex-col gap-3 text-center">
          <CardTitle className="text-lg">Projetos</CardTitle>
          <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {projects
                .filter((_, index) => index <= 10)
                .map((project, index) => (
                  // {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={`${project.id}-${index}`} className="h-[425px] basis-1/3">
                    <Card key={project.id} className="col-span-2 row-span-1 h-full  p-2 text-center">
                      <Link
                        className="flex h-full flex-col"
                        to="/projects/$projectId"
                        params={{ projectId: project.id }}
                        // mask={{ to: '/posts/$postId', params: { postId: post.id } }}
                      >
                        <img className="aspect-video w-full rounded-md" src={project.thumbnail} />
                        <div className="h-1/2">
                          <CardHeader className="flex flex-1">{project.title}</CardHeader>
                        </div>
                        <ScrollArea className="h-28 w-full rounded-md">
                          <div className="grid grid-cols-4 gap-2 px-4">
                            {project.tags
                              ? project.tags.map((tag) => (
                                  <Badge
                                    key={`${project.id}-${index}-${tag.value}`}
                                    className="col-span-1 justify-center"
                                  >
                                    {tag.value}
                                  </Badge>
                                ))
                              : null}
                          </div>
                        </ScrollArea>
                        <div className="mt-4 flex h-full w-full flex-col justify-between">
                          <ScrollArea className="h-14 w-full rounded-md">
                            <CardDescription>{project.description}</CardDescription>
                          </ScrollArea>
                          <CardFooter className="mt-4 flex w-full">
                            <p className="w-full justify-center">{project.date.toLocaleDateString()}</p>
                          </CardFooter>
                        </div>
                      </Link>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button asChild>
            <Link to="/projects" search={{ page: '1', pageSize: '100' }}>
              Ver todos os Projetos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
