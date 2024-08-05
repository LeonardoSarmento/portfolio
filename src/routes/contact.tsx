import { Boxes } from '@components/ui/background-boxes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import HoverContainer from '@components/ui/hover-container';
import { Separator } from '@components/ui/separator';
import { SocialMediaItems } from '@constants/index';
import { MY_PHOTO, THUMBSUP } from '@services/utils/Images';
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
        <div className="flex min-h-[300px] flex-col justify-center items-center space-y-4">
          <CardTitle>Feito com muito carinho por Leonardo Araujo Sarmento</CardTitle>
          <img className="h-6 rounded-md" src={THUMBSUP} />
        </div>
      </div>
      <div className="relative col-span-7 flex min-h-[750px] flex-col items-center justify-center overflow-hidden rounded-lg">
        <Boxes />
        <img className="z-[5] h-80 rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
      </div>
    </div>
  );
}
