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
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { setLoggedInPressed } from '@services/state/slice';
import { useTranslation } from 'react-i18next';

type UserToggleBtn = ToggleProps & React.RefAttributes<HTMLButtonElement>;

export function UserToggle({ ...props }: UserToggleBtn) {
  const auth = useAuth();
  const router = useRouter();
  const { t } = useTranslation('login');
  const dispatch = useAppDispatch();
  const pressed = useAppSelector((select) => select.user.loggedInPressed);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((values) => {
    if (values.username !== import.meta.env.VITE_USER_USERNAME && values.password !== import.meta.env.VITE_USER_CODE) {
      toast.error(t('toastMessage.error.title'), {
        description: t('toastMessage.error.description'),
      });
      return;
    }
    auth.login(values);
    toast.success(t('toastMessage.success.title', { val: getRandomNumberWithDecimals() }), {
      description: t('toastMessage.success.description', { username: values.username }),
    });
    dispatch(setLoggedInPressed(true));
    setOpen(false);
  });

  function LogoutUser() {
    auth.logout().then(() => {
      router.invalidate();
    });
    dispatch(setLoggedInPressed(false));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toggle {...props} asChild aria-label="Toggle italic" pressed={pressed}>
        <DialogTrigger className="transition-all duration-300 hover:scale-125">
          {auth.isAuthenticated ? <Skull size={20} /> : <ScanFace size={20} />}
        </DialogTrigger>
      </Toggle>
      <DialogContent className="w-80 rounded-md sm:max-w-md md:w-full">
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
  const { t } = useTranslation('login');
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('loggedIn.header.title')}</DialogTitle>
        <DialogDescription>{t('loggedIn.header.description')}</DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor={t('loggedIn.username.id')} className="sr-only">
            {t('loggedIn.username.label')}
          </Label>
          <Input id={t('loggedIn.username.id')} placeholder={user} readOnly />
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" onClick={OnClick}>
            {t('loggedIn.buttons.logout')}
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            {t('loggedIn.buttons.hide')}
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
  const { t } = useTranslation('login');
  return (
    <Form {...form}>
      <DialogHeader>
        <DialogTitle>{t('loginForm.header.title')}</DialogTitle>
        <DialogDescription>{t('loginForm.header.description')}</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('loginForm.username.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('loginForm.username.placeholder')} {...field} />
              </FormControl>
              <FormDescription>{t('loginForm.username.description')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('loginForm.password.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('loginForm.password.placeholder')} type="password" {...field} />
              </FormControl>
              <FormDescription>{t('loginForm.password.description')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-start">
          <Button type="submit">{t('loginForm.button.submit')}</Button>
          <DialogClose asChild onClick={() => form.reset()}>
            <Button type="button" variant="secondary">
              {t('loginForm.button.giveUp')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
