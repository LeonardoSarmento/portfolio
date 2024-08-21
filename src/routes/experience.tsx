import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { cn } from '@lib/utils';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Fragment, PropsWithChildren } from 'react';
import { ScrollArea } from '@components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Meteors } from '@components/ui/meteors';
import { EXPERIENCECONTENT } from '@constants/experience-content';
import { MapDescriptions } from '.';
import { TExperienceStack, TTabsContent } from '@services/types/constants/experience';

export const Route = createFileRoute('/experience')({
  component: Experience,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Experiences | Leonardo`,
      content:
        'Discover my professional journey and academic background. Learn about where I worked and studied, the roles I held, and the technologies I mastered.',
    },
  ],
});

function Experience() {
  const experienceContent = EXPERIENCECONTENT();
  return (
    <div className="flex flex-col flex-wrap gap-4 px-4 lg:flex-row xl:flex-nowrap xl:px-16">
      <div className="max-w-screen absolute max-h-screen xl:overflow-hidden">
        <Meteors number={100} className="max-xl:hidden" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{experienceContent.experience.title}</CardTitle>
          <MapDescriptions descriptions={experienceContent.experience.description} />
        </CardHeader>
        <Separator />
        <ExperienceComponent contents={experienceContent.experience.stack} />
      </Card>
      <div className="flex flex-col flex-wrap xl:w-2/3">
        <div>
          <CardHeader className="text-center">
            <CardTitle>{experienceContent.education.title}</CardTitle>
            <MapDescriptions descriptions={experienceContent.education.description} />
          </CardHeader>

          <CardContent>
            <TabsComponent contents={experienceContent.education.stack} />
          </CardContent>
        </div>
        <div>
          <CardHeader className="text-center">
            <CardTitle>{experienceContent.professional.title}</CardTitle>
            <MapDescriptions descriptions={experienceContent.professional.description} />
          </CardHeader>
          <CardContent>
            <TabsComponent contents={experienceContent.professional.stack} />
          </CardContent>
        </div>
      </div>
    </div>
  );
}

const ExperienceComponent = ({ contents }: { contents: TExperienceStack[] }) => {
  return (
    <>
      {contents.map((content, index) => (
        <Fragment key={content.title}>
          <ExperienceCardContent title={content.title} description={content.description}>
            {content.stack.map((tech) => (
              <IconTecButton key={tech.title} path={tech.url}>
                {tech.icon}
                {tech.title}
              </IconTecButton>
            ))}
          </ExperienceCardContent>
          {contents.length !== index + 1 ? <Separator /> : null}
        </Fragment>
      ))}
    </>
  );
};

const TabsComponent = ({ contents }: { contents: TTabsContent[] }) => {
  return (
    <Tabs defaultValue={contents[0].value} className="flex flex-col">
      <TabsList className="mx-auto">
        {contents.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {contents.map((content) => (
        <TabsContent key={content.value} value={content.value} className="rounded-lg border-2">
          <CardContent className="flex flex-wrap justify-center space-y-10 py-4 xl:flex-nowrap xl:space-y-0">
            <div className="flex w-2/3 flex-col flex-wrap items-center justify-around gap-10 text-center xl:flex-row xl:flex-nowrap xl:items-start xl:gap-4 xl:space-x-5">
              <div className="space-y-2 xl:w-2/3">
                <div className="flex flex-col flex-wrap items-center justify-center gap-2 xl:flex-row">
                  <Avatar key={content.value}>
                    <AvatarImage src={content.header.avatar.src} />
                    <AvatarFallback>{content.header.avatar.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{content.header.title}</CardTitle>
                </div>
                <CardDescription>{content.header.description}</CardDescription>
                <CardContent className="p-0">
                  <MapDescriptions descriptions={content.header.content.description} />
                </CardContent>
              </div>
              <div className="space-y-4 xl:w-2/3">
                <CardTitle className="text-center">{content.learnings.title}</CardTitle>
                <ScrollArea className="h-40 rounded-md xl:h-56">
                  <MapDescriptions descriptions={content.learnings.content.description} />
                </ScrollArea>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 xl:w-1/3">
              <CardTitle className="text-center">{content.tools.title}</CardTitle>
              <ScrollArea className="mx-8 h-60 rounded-md xl:h-56">
                <CardContent className="flex flex-col flex-wrap justify-around p-0">
                  {content.tools.content.map((tech) => (
                    <IconTecButton key={tech.title} path={tech.url} className="w-40">
                      {tech.icon}
                      <small className="text-wrap text-xs font-medium leading-none">{tech.title}</small>
                    </IconTecButton>
                  ))}
                </CardContent>
              </ScrollArea>
            </div>
          </CardContent>
        </TabsContent>
      ))}
    </Tabs>
  );
};

type TIconTecBtn = {
  children: React.ReactNode;
  path: string;
  className?: string;
};
function IconTecButton({ children, path, className }: TIconTecBtn) {
  return (
    <Button variant="ghost" className={cn('col-span-4 gap-2', className)} asChild>
      <Link to={path} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  );
}

type ExperienceCardContentType = {
  title?: string;
  description?: string;
} & PropsWithChildren;

function ExperienceCardContent({ title, description, children }: ExperienceCardContentType) {
  return (
    <CardContent className="mt-5 flex flex-col flex-wrap justify-items-center gap-2 py-0">
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
      <CardContent className="flex flex-wrap justify-center gap-2 xl:grid xl:grid-cols-12 xl:flex-nowrap">
        {children}
      </CardContent>
    </CardContent>
  );
}
