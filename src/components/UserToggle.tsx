import { useAuth } from '@services/hooks/auth';
import { Toggle } from './ui/toggle';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { LoginSchema, LoginType } from '@services/types/User';
import { toast } from 'sonner';
import { getRandomNumberWithDecimals } from '@services/utils/utils';
import { useState } from 'react';
import { Label } from './ui/label';
import { ScanFace, Skull } from 'lucide-react';
import { ToggleProps } from '@radix-ui/react-toggle';
import { useRouter } from '@tanstack/react-router';

type UserToggleBtn = ToggleProps & React.RefAttributes<HTMLButtonElement>;

export function UserToggle({ ...props }: UserToggleBtn) {
  const auth = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(auth.isAuthenticated);
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((values) => {
    if (values.username !== import.meta.env.VITE_USER_USERNAME && values.password !== import.meta.env.VITE_USER_CODE) {
      toast.error('Você mentiu pra mim cara :(', {
        description: 'Aumenta o limite do seu cartão de crédito ai só pra garantir',
      });
      return;
    }
    auth.login(values);
    toast.success(`Compra de R$ ${getRandomNumberWithDecimals()} aprovada com sucesso!`, {
      description: `Por favor ${values.username} não verifique com seu banco :)`,
    });
    setPressed(true);
    setOpen(false);
  });

  function LogoutUser() {
    auth
      .logout()
      .then(() => {
        router.invalidate();
      })
      // .finally(() => {
      //   router.navigate({ to: '/' });
      // });
    setPressed(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toggle {...props} asChild aria-label="Toggle italic" pressed={pressed}>
        <DialogTrigger>{auth.isAuthenticated ? <Skull size={20} /> : <ScanFace size={20} />}</DialogTrigger>
      </Toggle>
      <DialogContent className="sm:max-w-md">
        {auth.isAuthenticated && auth.user ? (
          <LoggedIn user={auth.user} OnClick={LogoutUser} />
        ) : (
          <LoginForm form={form} onSubmit={onSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoggedIn({ user, OnClick }: { user: string; OnClick(): void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Nome no verso do cartão</DialogTitle>
        <DialogDescription>Sua conta está no nome de:</DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="username" className="sr-only">
            username
          </Label>
          <Input id="username" placeholder={user} readOnly />
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" onClick={OnClick}>
            Sair da conta
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Esconder
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}

function LoginForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<LoginType>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}) {
  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>Seja bem vindo, meu nome é Severino</DialogTitle>
        <DialogDescription>Cara cracha cara cracha cara cracha</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diz seu nome ai amigo</FormLabel>
              <FormControl>
                <Input placeholder="Põe ele aqui" {...field} />
              </FormControl>
              <FormDescription>Só pra testar um negócinho aqui rapidinho</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código secreto</FormLabel>
              <FormControl>
                <Input placeholder="CVV" type="password" {...field} />
              </FormControl>
              <FormDescription>#Confia</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-start">
          <Button type="submit">Confirmar</Button>
          <DialogClose asChild onClick={() => form.reset()}>
            <Button type="button" variant="secondary">
              Desisti
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
