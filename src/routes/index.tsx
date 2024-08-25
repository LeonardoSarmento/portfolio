import { ContentCardComponent } from '@components/ContentCardComponent';
import { PendingComponent } from '@components/PendingComponent';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import { ScrollArea } from '@components/ui/scroll-area';
import { TABSEDUCATIONAL, TABSPROFESSIONAL } from '@constants/experience-content';
import { ABOUTMECONTENT, CARROUSELPARTIALOPTIONS } from '@constants/home';
import { cn } from '@lib/utils';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { projectsQueryOptions } from '@services/hooks/projectsQueryOptions';
import { TCardContent, TCarrouselComponent } from '@services/types/constants/index-content';
import { PublicationType } from '@services/types/Publication';
import { Link, LinkOptions } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';
import React, { Fragment, useMemo } from 'react';
import i18n from '../i18n/config';

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    const ensurePosts = queryClient.ensureQueryData(postsQueryOptions(i18n.language));
    const ensureProjects = queryClient.ensureQueryData(projectsQueryOptions(i18n.language));
    const [posts, projects] = await Promise.all([ensurePosts, ensureProjects]);

    return { posts, projects };
  },
  pendingComponent: PendingComponent,
  component: Index,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Leonardo's portfolio`,
      content:
        'Explore the portfolio of a skilled software engineer. Learn about me, view my resume, and browse through my blog posts and projects showcased in an interactive carousel.',
    },
  ],
});

function Index() {
  const { posts, projects } = Route.useLoaderData();
  const carrouselOptionsContent = CARROUSELPARTIALOPTIONS();
  const aboutMeContent = ABOUTMECONTENT();

  const CARROUSELOPTIONS: TCarrouselComponent[] = useMemo(
    () => [
      {
        ...carrouselOptionsContent[0],
        publication: posts,
      },
      {
        ...carrouselOptionsContent[1],
        publication: projects,
      },
    ],
    [posts, projects, carrouselOptionsContent],
  );

  return (
    <div className="mt-3 flex flex-col gap-4 px-6 lg:px-14">
      <div className="flex flex-wrap gap-4 lg:flex-nowrap">
        <CardAboutMe contents={aboutMeContent} />
        <CardWithScroll>
          <CardExperience contents={TABSEDUCATIONAL()} />
        </CardWithScroll>
        <CardWithScroll>
          <CardExperience contents={TABSPROFESSIONAL()} />
        </CardWithScroll>
      </div>
      <div className="flex flex-wrap justify-center gap-8 px-10 xl:grid xl:grid-cols-2 xl:flex-nowrap xl:gap-x-32 xl:px-10">
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
    <Card className="flex w-full flex-wrap items-center justify-around pt-5 xl:flex-nowrap xl:pt-0">
      <CardContent className="flex flex-col items-center justify-center py-0 xl:p-6">
        <img className="h-80 w-64 rounded-md" src={contents.header.src} alt={contents.header.alt} />
        <CardDescription className="mt-6 text-center text-xs leading-tight text-muted-foreground">
          {contents.header.description}
        </CardDescription>
        <CardTitle className="mb-2 mt-4">{contents.header.title}</CardTitle>
      </CardContent>
      <CardContent className="flex items-center justify-center xl:w-1/2">
        <ScrollArea className="my-3 h-[250px] rounded-md xl:h-[450px]">
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
  publication?: PublicationType[];
  path: LinkOptions;
  buttonPath: LinkOptions;
  buttonTitle: string;
}) => {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="my-3 flex w-full flex-col gap-4 text-center md:my-0 xl:col-span-1">
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
                <CarouselItem key={`${publication.id}-${index}`} className="basis-5/6 md:basis-1/3">
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

function CardWithScroll({
  children,
  clasName,
  clasNameScroll,
}: {
  clasName?: string;
  clasNameScroll?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn('py-3 lg:w-2/4', clasName)}>
      <ScrollArea className={cn('h-[350px] rounded-md md:h-[680px] xl:h-[450px]', clasNameScroll)}>
        {children}
      </ScrollArea>
    </Card>
  );
}
