import { Boxes } from '@components/ui/background-boxes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import HoverContainer from '@components/ui/hover-container';
import { Separator } from '@components/ui/separator';
import { TypewriterEffectSmooth } from '@components/ui/typewriter-effect';
import { CONTACTCONTENT } from '@constants/contact-content';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      <div className="col-span-5 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{CONTACTCONTENT.title}</CardTitle>
            <CardDescription>{CONTACTCONTENT.description[0]}</CardDescription>
            <Separator />
            <CardDescription>{CONTACTCONTENT.description[1]}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="items-center space-y-3 p-3">
            <CardTitle className="text-center">{CONTACTCONTENT.socialMedia.title}</CardTitle>
            <HoverContainer items={CONTACTCONTENT.socialMedia.content} />
          </CardContent>
        </Card>
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4">
          <CardTitle>{CONTACTCONTENT.content.title}</CardTitle>
          <img className="h-6 rounded-md" src={CONTACTCONTENT.content.src} alt={CONTACTCONTENT.content.alt} />
        </div>
      </div>
      <div className="relative col-span-7 flex min-h-[750px] flex-col items-center justify-center overflow-hidden rounded-lg">
        <Boxes />
        <img
          className="z-[1] h-80 rounded-md"
          src={CONTACTCONTENT.sideContent.src}
          alt={CONTACTCONTENT.sideContent.alt}
        />
        <div className="z-[1] flex items-center">
          <TypewriterEffectSmooth
            textClassName="xl:text-2xl lg:text-2xl bg-white dark:bg-transparent pb-0.5"
            cursorClassName="xl:h-8"
            words={CONTACTCONTENT.sideContent.content.typewriter}
          />
          <CardTitle className="relative bottom-1 ml-2 bg-white pb-0.5 text-2xl dark:bg-transparent">
            {CONTACTCONTENT.sideContent.content.title}
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
