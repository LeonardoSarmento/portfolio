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
  const contactContent = CONTACTCONTENT();
  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      <div className="col-span-5 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{contactContent.title}</CardTitle>
            <CardDescription>{contactContent.description[0]}</CardDescription>
            <Separator />
            <CardDescription>{contactContent.description[1]}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="items-center space-y-3 p-3">
            <CardTitle className="text-center">{contactContent.socialMedia.title}</CardTitle>
            <HoverContainer items={contactContent.socialMedia.content} />
          </CardContent>
        </Card>
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4">
          <CardTitle>{contactContent.content.title}</CardTitle>
          <img
            className="h-6 rounded-lg transition-all duration-300 hover:scale-150"
            src={contactContent.content.src}
            alt={contactContent.content.alt}
          />
        </div>
      </div>
      <div className="relative col-span-7 flex min-h-[750px] flex-col items-center justify-center overflow-hidden rounded-lg">
        <Boxes />
        <img
          className="z-[1] h-80 rounded-md"
          src={contactContent.sideContent.src}
          alt={contactContent.sideContent.alt}
        />
        <div className="z-[1] flex items-center">
          <TypewriterEffectSmooth
            textClassName="xl:text-2xl lg:text-2xl bg-white dark:bg-transparent pb-0.5"
            cursorClassName="xl:h-8"
            words={contactContent.sideContent.content.typewriter}
          />
          <CardTitle className="relative bottom-1 ml-2 bg-white pb-0.5 text-2xl dark:bg-transparent">
            {contactContent.sideContent.content.title}
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
