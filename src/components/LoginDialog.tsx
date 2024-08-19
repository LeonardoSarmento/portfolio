import * as React from 'react';

import { cn } from '@lib/utils';
import { useMediaQuery } from '@services/hooks/use-media-query';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useTranslation } from 'react-i18next';

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { t } = useTranslation('login');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{t('dialog.triggerButton')}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dialog.title')}</DialogTitle>
            <DialogDescription>{t('dialog.description')}</DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{t('dialog.triggerButton')}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t('dialog.title')}</DrawerTitle>
          <DrawerDescription>{t('dialog.description')}</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t('dialog.drawerClose')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  const { t } = useTranslation('login');
  return (
    <form className={cn('grid items-start gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor={t('profileForm.email.id')}>{t('profileForm.email.label')}</Label>
        <Input
          type={t('profileForm.email.id')}
          id={t('profileForm.email.id')}
          defaultValue="leonardo.a.sarmento@gmail.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={t('profileForm.username.id')}>{t('profileForm.username.label')}</Label>
        <Input id={t('profileForm.username.id')} defaultValue="@leo" />
      </div>
      <Button type="submit">{t('profileForm.button')}</Button>
    </form>
  );
}
