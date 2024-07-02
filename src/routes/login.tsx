import { UserAuthForm } from '@components/UserAuthForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Login,
});

export function Login() {
  return (
    <div className="my-40 flex justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="create-account">Criar</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Acesse sua conta</h1>
                <p className="text-sm text-muted-foreground">Escreva seu nome e senha abaixo</p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                Clicando em acessar, você concorda com todos os{' '}
                <Link to="/" className="underline underline-offset-4 hover:text-primary">
                  Termos de serviço
                </Link>{' '}
                e{' '}
                <Link to="/" className="underline underline-offset-4 hover:text-primary">
                  Políticas de Compras e Privacidades
                </Link>
                .
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="create-account">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
                <p className="text-sm text-muted-foreground">
                  Faça sua conta para poder utilizar todas funcionalidades incriveis desse site portfolio
                </p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                Clicando em acessar, você concorda com todos os{' '}
                <Link to="/" className="underline underline-offset-4 hover:text-primary">
                  Termos de serviço
                </Link>{' '}
                e{' '}
                <Link to="/" className="underline underline-offset-4 hover:text-primary">
                  Políticas de Compras e Privacidades
                </Link>
                .
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
