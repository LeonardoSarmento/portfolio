import { ContentCardComponent } from '@components/ContentCardComponent';
import { PendingComponent } from '@components/PendingComponent';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import { ScrollArea } from '@components/ui/scroll-area';
import { TABSEDUCATIONAL, TABSPROFESSIONAL } from '@constants/experience-content';
import { ABOUTMECONTENT, CARROUSELPARTIALOPTIONS, TCardContent, TCarrouselComponent } from '@constants/index';
import { cn } from '@lib/utils';
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
        ...CARROUSELPARTIALOPTIONS[0],
        publication: posts,
      },
      {
        ...CARROUSELPARTIALOPTIONS[1],
        publication: projects,
      },
    ],
    [posts, projects],
  );

  return (
    <div className="mt-3 flex flex-col gap-4 px-16">
      <div className="flex gap-4">
        <CardAboutMe contents={ABOUTMECONTENT} />
        <Card className="w-2/4">
          <ScrollArea className="my-3 h-[450px] rounded-md">
            <CardExperience contents={TABSEDUCATIONAL} />
          </ScrollArea>
        </Card>
        <Card className="w-2/4">
          <ScrollArea className="my-3 h-[450px] rounded-md">
            <CardExperience contents={TABSPROFESSIONAL} />
          </ScrollArea>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {CARROUSELOPTIONS.map((option) => (
          <CarrouselComponent
            key={option.title}
            publication={option.publication}
            title={option.title}
            path={option.path}
            buttonPath={option.buttonPath}
            buttonTitle={option.buttonTitle}
          />
        ))}
      </div>
    </div>
  );
}

export function MapDescriptions({ descriptions, className }: { descriptions: string[]; className?: string }) {
  return descriptions.map((text, index) => (
    <CardDescription key={`${text}-${index}`} className={cn('my-1', className)}>
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
    <Card className="flex w-full items-center justify-around">
      <CardContent className="flex flex-col items-center justify-center">
        <img className="h-80 rounded-md" src={contents.header.src} alt={contents.header.alt} />
        <CardDescription className="mt-6 text-xs leading-tight text-muted-foreground">
          {contents.header.description}
        </CardDescription>
        <CardTitle className="mb-2 mt-4">{contents.header.title}</CardTitle>
      </CardContent>
      <CardContent className="flex w-1/2 items-center justify-center">
        <ScrollArea className="my-3 h-[450px] rounded-md">
          <MapDescriptions descriptions={contents.content.description} />
        </ScrollArea>
      </CardContent>
    </Card>
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
  publication?: PostType[];
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
          {publication &&
            publication
              .filter((_, index) => index <= 10)
              .map((publication, index) => (
                <CarouselItem key={`${publication.id}-${index}`} className="basis-1/3">
                  <ContentCardComponent
                    content={publication}
                    index={index}
                    path={path}
                    className="col-span-2 row-span-1"
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button asChild>
        <Link to={buttonPath.to} search={buttonPath.search}>
          {buttonTitle}
        </Link>
      </Button>
    </div>
  );
};
