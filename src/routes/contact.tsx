import { Boxes } from '@components/ui/background-boxes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import HoverContainer from '@components/ui/hover-container';
import { Separator } from '@components/ui/separator';
import { TypewriterEffectSmooth } from '@components/ui/typewriter-effect';
import { SocialMediaItems } from '@constants/index';
import { LEO_DIA_D, THUMBSUP } from '@services/utils/Images';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: Contact,
});
const words = [
  {
    text: 'Dúvida com',
  },
  {
    text: 'o que gastar',
  },
  {
    text: 'o seu dinheiro?',
  },
  {
    text: 'Faz um pix pra mim :)',
    className: 'text-green-500 dark:text-green-500',
  },
];

function Contact() {
  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      <div className="col-span-5 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Contato</CardTitle>
            <CardDescription>Caso queira me dar dinheiro, entre em contato pelas minhas redes sociais</CardDescription>
            <Separator />
            <CardDescription>Se vc for o agiota, tente no site da concorrência!</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="items-center space-y-3 p-3">
            <CardTitle className="text-center">Mídias sociais</CardTitle>
            <HoverContainer items={SocialMediaItems} />
          </CardContent>
        </Card>
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4">
          <CardTitle>Feito com muito carinho por Leonardo Araujo Sarmento</CardTitle>
          <img className="h-6 rounded-md" src={THUMBSUP} />
        </div>
      </div>
      <div className="relative col-span-7 flex min-h-[750px] flex-col items-center justify-center overflow-hidden rounded-lg">
        <Boxes className="z" />
        <img className="h-80 rounded-md z-[1]" src={LEO_DIA_D} alt="Leonardo's photo at ISTEO 'D' day" />
        <div className="flex items-center z-[1]">
          <CardTitle className="bg-white text-4xl dark:bg-transparent ">"</CardTitle>
          <TypewriterEffectSmooth
            textClassName="xl:text-2xl lg:text-2xl bg-white dark:bg-transparent pb-0.5"
            cursorClassName="xl:h-8"
            words={words}
          />
          <CardTitle className="bg-white text-4xl dark:bg-transparent ">"</CardTitle>
          <CardTitle className="relative bottom-1 bg-white pb-0.5 text-2xl ml-2 dark:bg-transparent"> - eu</CardTitle>
        </div>
      </div>
    </div>
  );
}
