import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Footer } from './Footer';
import { ERROR_GIF } from '@services/utils/Images';

export function ErrorComponent() {
  const router = useRouter();
  return (
    <div className="grid h-screen w-full grid-cols-1 grid-rows-3 items-end">
      <div className="row-span-1 row-start-2 flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <img className="h-80 rounded-md" src={ERROR_GIF} alt="John Travolta lost in Pulp Fiction meme" />
          <CardTitle className="mt-4">Vishh quebrou algo aqui chefia...</CardTitle>
          <CardDescription>
            Vou colocar aqui pra consertar tá fica a vontade ai... Mas primerio, tenta colocar pra rodar ai abaixo dnv
            :)
          </CardDescription>
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
