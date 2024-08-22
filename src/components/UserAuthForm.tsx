import * as React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginType } from '@services/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuth } from '@services/hooks/auth';
import { getRandomNumberWithDecimals } from '@services/utils/utils';
import { useRouter } from '@tanstack/react-router';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useAppDispatch } from '@services/state/store';
import { setLoggedInPressed } from '@services/state/slice';
import { useTranslation } from 'react-i18next';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const auth = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('login');

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((values) => {
    // if (values.username !== import.meta.env.VITE_USER_USERNAME && values.password !== import.meta.env.VITE_USER_CODE) {
    //   toast.error(t('toastMessage.error.title'), {
    //     description: t('toastMessage.error.description'),
    //   });
    //   return;
    // }
    auth.login(values).then(() => router.invalidate());
    dispatch(setLoggedInPressed(true));
    toast.success(t('toastMessage.success.title', { val: getRandomNumberWithDecimals() }), {
      description: t('toastMessage.success.description', { username: values.username }),
    });
  });

  return (
    <div className={'grid gap-6'} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('userAuthForm.username.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('userAuthForm.username.placeholder')} {...field} />
                    </FormControl>
                    <FormDescription>{t('userAuthForm.username.description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('userAuthForm.password.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('userAuthForm.password.placeholder')} type="password" {...field} />
                    </FormControl>
                    <FormDescription>{t('userAuthForm.password.description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{t('userAuthForm.button.label')}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
