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
import { EXPERIENCECONTENT, TExperienceStack, TTabsContent } from '@constants/experience-content';
import { MapDescriptions } from '.';

export const Route = createFileRoute('/experience')({
  component: Experience,
});

function Experience() {
  return (
    <div className="flex gap-4 px-16">
      <Meteors number={100} />
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{EXPERIENCECONTENT.experience.title}</CardTitle>
          <MapDescriptions descriptions={EXPERIENCECONTENT.experience.description} />
        </CardHeader>
        <Separator />
        <ExperienceComponent contents={EXPERIENCECONTENT.experience.stack} />
      </Card>
      <div>
        <div>
          <CardHeader className="text-center">
            <CardTitle>{EXPERIENCECONTENT.education.title}</CardTitle>
            <MapDescriptions descriptions={EXPERIENCECONTENT.education.description} />
          </CardHeader>
          <CardContent>
            <TabsComponent contents={EXPERIENCECONTENT.education.stack} />
          </CardContent>
        </div>
        <div>
          <CardHeader className="text-center">
            <CardTitle>{EXPERIENCECONTENT.professional.title}</CardTitle>
            <MapDescriptions descriptions={EXPERIENCECONTENT.professional.description} />
          </CardHeader>
          <CardContent>
            <TabsComponent contents={EXPERIENCECONTENT.professional.stack} />
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
        <TabsContent key={content.value} value={content.value}>
          <CardContent className="flex py-4">
            <div className='space-y-2 w-[400px]'>
              <div className="flex items-center gap-2">
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
            <div className='w-[400px] space-y-4'>
              <CardTitle className="text-center">{content.learnings.title}</CardTitle>
              <ScrollArea className="h-[150px] rounded-md">
                <MapDescriptions descriptions={content.learnings.content.description} />
              </ScrollArea>
            </div>
            <div className='space-y-4 w-full'>
              <CardTitle className="text-center">{content.tools.title}</CardTitle>
              <ScrollArea className="h-[150px] rounded-md">
                <CardContent className="grid grid-cols-2 gap-x-3 p-0">
                  {content.tools.content.map((tech) => (
                    <IconTecButton key={tech.title} path={tech.url} className="col-span-1">
                      {tech.icon}
                      {tech.title}
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
    <CardContent className="mt-5 flex flex-col justify-items-center gap-2 py-0">
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
      <CardContent className="grid grid-cols-12 gap-2">{children}</CardContent>
    </CardContent>
  );
}
