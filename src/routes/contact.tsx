import { Boxes } from '@components/ui/background-boxes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import HoverContainer from '@components/ui/hover-container';
import { Separator } from '@components/ui/separator';
import { TypewriterEffectSmooth } from '@components/ui/typewriter-effect';
import { SocialMediaItems } from '@constants/home';
import { cn } from '@lib/utils';
import { useMediaQuery } from '@services/hooks/use-media-query';
import { LEO_DIA_D, THUMBSUP } from '@services/utils/Images';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react/jsx-runtime';

export const Route = createFileRoute('/contact')({
  component: Contact,
});
type TWords = { text: string; className?: string };

function Contact() {
  const { t } = useTranslation('contact');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const words: TWords[] = [];
  const message = t('contact-content.sideContent.content.typewriter', { ns: 'contact', returnObjects: true });
  message.map((word) =>
    words.push({
      text: word.text,
      className: word.className === 'punchline' ? 'text-green-500 dark:text-green-500' : undefined,
    }),
  );
  const contactContent = {
    ...t('contact-content', { returnObjects: true }),
    socialMedia: {
      ...t('contact-content.socialMedia', { returnObjects: true }),
      content: SocialMediaItems,
    },
    content: {
      ...t('contact-content.content', { returnObjects: true }),
      src: THUMBSUP,
    },
    sideContent: {
      ...t('contact-content.sideContent', { returnObjects: true }),
      content: {
        ...t('contact-content.sideContent.content', { returnObjects: true }),
        typewriter: words,
      },
      src: LEO_DIA_D,
    },
  };

  return (
    <div className="flex flex-1 flex-wrap-reverse items-center justify-center gap-4 px-4 xl:flex-nowrap xl:justify-around xl:px-16">
      <div className="mb-8 flex w-screen flex-col flex-wrap space-y-4 xl:mb-0 xl:w-1/3">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{contactContent.title}</CardTitle>
            {contactContent.description.map((cardDesc, index) => (
              <Fragment key={`${cardDesc}-${index}`}>
                <CardDescription>{cardDesc}</CardDescription>
                {contactContent.description.length !== index + 1 ? <Separator /> : null}
              </Fragment>
            ))}
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="items-center space-y-3 p-3">
            <CardTitle className="text-center">{contactContent.socialMedia.title}</CardTitle>
            <HoverContainer items={contactContent.socialMedia.content} />
          </CardContent>
        </Card>
        <div className="flex flex-col items-center justify-center space-y-4">
          <CardTitle className="text-center">{contactContent.content.title}</CardTitle>
          <img
            className="h-6 w-5 rounded-lg transition-all duration-300 hover:scale-150"
            src={contactContent.content.src}
            alt={contactContent.content.alt}
          />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col gap-10 overflow-hidden rounded-lg py-6 xl:gap-0 xl:py-20">
        <Boxes className="invisible xl:visible" />
        <div className="visible absolute flex h-full w-full flex-col items-center justify-center gap-10 bg-grid-black/[0.2] dark:bg-grid-white/[0.2] xl:invisible">
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>

        <div className="z-[1] mx-auto mt-10 h-64 overflow-hidden rounded-md">
          <img
            className="relative bottom-10 right-10 mx-auto h-64 scale-125 md:bottom-0 md:right-0 md:scale-100"
            src={contactContent.sideContent.src}
            alt={contactContent.sideContent.alt}
          />
        </div>
        <div className="z-[1] flex flex-wrap items-center justify-center gap-2 xl:px-0">
          <div className="flex w-full flex-wrap justify-center px-4 text-center xl:px-0">
            {isDesktop ? (
              <TypewriterEffectSmooth
                textClassName="xl:text-xl lg:text-2xl bg-white dark:bg-transparent pb-0.5"
                cursorClassName="xl:h-8 max-sm:hidden"
                words={contactContent.sideContent.content.typewriter}
              />
            ) : (
              <>
                {words.flatMap((word, index) => (
                  <p
                    className={cn(
                      'lg:text:3xl whitespace-nowrap text-xs font-bold sm:text-base md:text-xl xl:flex-nowrap xl:text-5xl',
                      word.className,
                    )}
                    key={`${word.text}-${index}`}
                  >
                    {word.text}
                  </p>
                ))}
              </>
            )}
          </div>
          <CardTitle className="relative bottom-1 bg-white pb-0.5 dark:bg-transparent xl:ml-2">
            <span className='pb-0.5" bg-white dark:bg-transparent lg:text-2xl xl:text-2xl'>
              {contactContent.sideContent.content.title}
            </span>
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
