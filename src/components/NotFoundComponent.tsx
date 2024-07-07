import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Footer } from './Footer';
import { NOT_FOUND_GIF } from '@services/utils/Images';

export function NotFoundComponent() {
  const router = useRouter();
  return (
    <div className="grid h-screen w-full grid-cols-1 grid-rows-3 items-end">
      <div className="row-span-1 row-start-2 flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <img className="h-80 rounded-md" src={NOT_FOUND_GIF} alt="John Travolta lost in Pulp Fiction meme" />
          <CardTitle className="mt-4">Não encontrei essa página...</CardTitle>
          <CardDescription>Jurava que estava por aqui isso... Bom, tente novamente abaixo :)</CardDescription>
        </CardContent>
        <div className="flex gap-3">
          <Button
            onClick={(e) => {
              e.preventDefault(), router.navigate({ to: '/' });
            }}
            type="button"
          >
            Inicio
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault(), router.history.back();
            }}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </div>
      <div className="row-span-1 row-start-3">
        <Footer />
      </div>
    </div>
  );
}
