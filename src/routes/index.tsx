import { PendingComponent } from '@components/PendingComponent';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import { ScrollArea } from '@components/ui/scroll-area';
import { TABSEDUCATIONAL, TABSPROFESSIONAL } from '@constants/experience-content';
import { ABOUTMECONTENT, TCardContent } from '@constants/index';
import { postsQueryOptions, projectsQueryOptions } from '@services/hooks/postsQueryOptions';
import { PostType } from '@services/types/Post';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, LinkOptions } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';
import React, { Fragment, useMemo } from 'react';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(postsQueryOptions), queryClient.ensureQueryData(projectsQueryOptions);
  },
  pendingComponent: PendingComponent,
  component: Index,
});

function Index() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;

  const projectsQuery = useSuspenseQuery(projectsQueryOptions);
  const projects = projectsQuery.data;

  const CARROUSELOPTIONS: TCarrouselComponent[] = useMemo(
    () => [
      {
        buttonPath: { to: '/posts' },
        buttonTitle: 'Ver todos Posts',
        title: 'Posts',
        path: { to: '/posts/$postId' },
        publication: posts,
      },
      {
        buttonPath: { to: '/projects' },
        buttonTitle: 'Ver todos Projects',
        title: 'Projects',
        path: { to: '/projects/$projectId' },
        publication: projects,
      },
    ],
    [posts, projects],
  );

  return (
    <div className="grid-rows-auto mt-3 grid grid-cols-12 gap-4 px-16">
      <Card className="col-span-6 row-span-6 grid grid-cols-2 items-center px-4 pt-8">
        <CardAboutMe contents={ABOUTMECONTENT} />
      </Card>
      <Card className="col-span-3 row-span-6 flex flex-col items-center justify-center px-4">
        <ScrollArea className="my-3 h-[450px] w-full rounded-md">
          <CardExperience contents={TABSEDUCATIONAL} />
        </ScrollArea>
      </Card>
      <Card className="col-span-3 col-start-10 row-span-6 px-4">
        <ScrollArea className="my-3 h-[450px] w-full rounded-md">
          <CardExperience contents={TABSPROFESSIONAL} />
        </ScrollArea>
      </Card>
      <div className="col-span-12 row-start-7 mt-3 grid grid-cols-2 gap-4">
        {CARROUSELOPTIONS.map((options) => (
          <CarrouselComponent
            publication={options.publication}
            title={options.title}
            path={options.path}
            buttonPath={options.buttonPath}
            buttonTitle={options.buttonTitle}
          />
        ))}
      </div>
    </div>
  );
}

type TCarrouselComponent = {
  title: string;
  publication: PostType[];
  path: LinkOptions;
  buttonPath: LinkOptions;
  buttonTitle: string;
};

function MapDescriptions({ descriptions }: { descriptions: string[] }) {
  return descriptions.map((text) => (
    <CardDescription key={text} className="my-1">
      {text}
    </CardDescription>
  ));
}

function CardExperience({ contents }: { contents: TCardContent['experience'] }) {
  return (
    <>
      {contents.map((content) => (
        <Fragment key={content.value}>
          <CardHeader>
            <CardTitle>{content.header.title}</CardTitle>
            <CardContent className="p-0">
              <MapDescriptions descriptions={content.header.content.description} />
            </CardContent>
          </CardHeader>
          <CardContent>
            <MapDescriptions descriptions={content.learnings.content.description} />
          </CardContent>
        </Fragment>
      ))}
    </>
  );
}
function CardAboutMe({ contents }: { contents: TCardContent['about'] }) {
  return (
    <>
      <CardContent className="flex flex-col items-center justify-center">
        <img className="h-80 rounded-md" src={contents.header.src} alt={contents.header.alt} />
        <CardDescription className="mt-6 text-xs leading-tight text-muted-foreground">
          {contents.header.description}
        </CardDescription>
        {/* <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div> */}
        <CardTitle className="mb-2 mt-4">{contents.header.title}</CardTitle>
      </CardContent>
      <CardContent className="flex flex-col items-center justify-center">
        <ScrollArea className="my-3 h-[450px] w-full rounded-md">
          <MapDescriptions descriptions={contents.content.description} />
        </ScrollArea>
      </CardContent>
    </>
  );
}

const CarrouselComponent = ({
  title,
  publication,
  path,
  buttonPath,
  buttonTitle,
}: {
  title: string;
  publication: PostType[];
  path: LinkOptions;
  buttonPath: LinkOptions;
  buttonTitle: string;
}) => {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="col-span-1 mx-12 flex flex-col gap-3 text-center">
      <CardTitle className="text-lg">{title}</CardTitle>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {publication
            .filter((_, index) => index <= 10)
            .map((publication, index) => (
              <CarouselItem key={`${publication.id}-${index}`} className="h-[425px] basis-1/3">
                <Card key={publication.id} className="col-span-2 row-span-1 h-full p-2 text-center">
                  <Link
                    className="flex h-full flex-col"
                    to={path.to}
                    params={{ postId: publication.id, projectId: publication.id }}
                  >
                    <img className="aspect-video w-full rounded-md" src={publication.thumbnail} />
                    <div className="h-1/2">
                      <CardHeader className="flex flex-1">{publication.title}</CardHeader>
                    </div>
                    <ScrollArea className="h-28 w-full rounded-md">
                      <div className="grid grid-cols-4 gap-2 px-4">
                        {publication.tags
                          ? publication.tags.map((tag) => (
                              <Badge
                                key={`${publication.id}-${index}-${tag.value}`}
                                className="col-span-1 justify-center"
                              >
                                {tag.value}
                              </Badge>
                            ))
                          : null}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 flex h-full w-full flex-col justify-between">
                      <ScrollArea className="flex items-center justify-center">
                        <CardDescription className="h-14 w-full rounded-md">{publication.description}</CardDescription>
                      </ScrollArea>
                      <CardFooter className="mt-4 flex w-full">
                        <p className="w-full justify-center">{publication.date.toLocaleDateString()}</p>
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
        <Link to={buttonPath.to} search={{ page: '1', pageSize: '100' }}>
          {buttonTitle}
        </Link>
      </Button>
    </div>
  );
};
