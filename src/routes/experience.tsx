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
import { EXPERIENCECONTENT, TABSEDUCATIONAL, TABSPROFESSIONAL, TExperienceContent, TTabsContent } from '@constants/experience-content';

export const Route = createFileRoute('/experience')({
  component: Experience,
});

function Experience() {
  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      <Meteors number={100} />
      <div className="col-span-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Experiências</CardTitle>
            <CardDescription>
              Ao longo de minha jornada, passei por várias áreas de conhecimentos e acumulei algumas experiências
              profissionais que levo diariamente, no pessoal e profissional.
            </CardDescription>
            <CardDescription>
              Atualmente trabalhando com desenvolvimento de software no{' '}
              <strong>ISTEO - Instituto SENAI de Tecnologia em Eficiência Operacional</strong>. Ativamente desenvolvendo
              aplicações web e mobile junto a clientes de divesas áreas e localidades.
            </CardDescription>
            <CardDescription>Possuo experiências nas seguintes Stacks e suas tecnologias:</CardDescription>
          </CardHeader>
          <Separator />
          <ExperienceComponent contents={EXPERIENCECONTENT} />
        </Card>
      </div>
      <div className="col-span-7 col-start-6 grid grid-cols-12 grid-rows-2 gap-2">
        <div className="col-span-12 row-span-1">
          <div className="flex h-full flex-col justify-center">
            <CardHeader className="text-center">
              <CardTitle>Educação</CardTitle>
              <CardDescription>
                Um breve resumo sobre minhas experiências no campo acadêmico e tecnologias utilizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsComponent contents={TABSEDUCATIONAL} />
            </CardContent>
          </div>
        </div>
        <div className="col-span-12 row-span-1 row-start-2">
          <div className="flex h-full flex-col justify-center">
            <CardHeader className="text-center">
              <CardTitle>Profissional</CardTitle>
              <CardDescription>As etapas profissionais e as experiências acumuladas em cada lugar</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsComponent contents={TABSPROFESSIONAL} />
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}

const ExperienceComponent = ({ contents }: { contents: TExperienceContent[] }) => {
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
          {contents.length >= index ? <Separator /> : null}
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
          <CardContent className="grid grid-cols-4 items-center">
            <div className="col-span-1">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar key={content.value}>
                    <AvatarImage src={content.header.avatar.src} />
                    <AvatarFallback>{content.header.avatar.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{content.header.title}</CardTitle>
                </div>
                <CardDescription>{content.header.description}</CardDescription>
                <CardContent className="p-0">
                  {content.header.content.description.map((description) => (
                    <CardDescription key={description}>{description}</CardDescription>
                  ))}
                </CardContent>
              </CardHeader>
            </div>
            <div className="col-span-1 col-start-2">
              <CardHeader>
                <CardTitle className="text-center">{content.learnings.title}</CardTitle>
                <ScrollArea className="h-[150px] rounded-md">
                  {content.learnings.content.description.map((description) => (
                    <CardDescription key={description}>{description}</CardDescription>
                  ))}
                </ScrollArea>
              </CardHeader>
            </div>
            <div className="col-span-2 col-start-3">
              <CardHeader>
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
              </CardHeader>
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
    <CardContent className="mt-5 grid grid-cols-12 justify-items-center gap-2 py-0">
      <CardTitle className="col-span-12">{title}</CardTitle>
      <CardDescription className="col-span-12">{description}</CardDescription>
      <CardContent className="col-span-12 grid grid-cols-12 gap-2">{children}</CardContent>
    </CardContent>
  );
}
