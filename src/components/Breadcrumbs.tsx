import * as React from 'react';

import { useMediaQuery } from '@services/hooks/use-media-query';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { Link, RouterState, useRouterState } from '@tanstack/react-router';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ScrollArea } from './ui/scroll-area';
import { useTranslation } from 'react-i18next';
import breadcrumbContent from '../i18n/pt-BR/breadcrumbs.json';

type RouteT = { to: string; title: string };
type currentFolderT = { title: string };

type BreadcrumbProps = {
  initial?: RouteT;
  currentFolder: currentFolderT;
  options?: RouteT[];
} & React.HTMLAttributes<HTMLDivElement>;

export const BreadcrumbResponsive = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ initial, currentFolder, options, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const router = useRouterState();
    const FolderId: RouterState['matches'][1]['routeId'] = React.useMemo(
      () => router.matches[1].routeId,
      [router.matches[1].routeId],
    );
    const routeId: RouterState['matches'][2]['routeId'] = React.useMemo(
      () => router.matches[2].routeId,
      [router.matches[2].routeId],
    );
    const routeParams: RouterState['matches'][2]['params'] = React.useMemo(
      () => router.matches[2].params,
      [router.matches[2].params],
    );

    const id = Object.values(routeParams)[0];
    const filtredOption = React.useMemo(
      () => options && options.filter((option) => option.to === id)[0],
      [options, id],
    );
    // console.log(id);
    // console.log(filtredOption);
    const { t } = useTranslation('breadcrumbs');

    return (
      <Breadcrumb ref={ref} className={className} {...props}>
        <BreadcrumbList className="mb-5 max-sm:justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={initial ? initial.to : '/'}>{initial ? initial.title : t('home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
              <Link to={FolderId}>{t(currentFolder.title as keyof typeof breadcrumbContent)}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {options ? (
            options.length === 1 ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                    <Link to={routeId} params={{ postId: options[0].to }}>
                      {options[0].title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isDesktop ? (
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        {filtredOption ? filtredOption.title : t('wrongUrl')}
                        <ChevronDownIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <ScrollArea className="max-h-96 rounded-md">
                          {options
                            .filter((_, index) => index <= 10)
                            .reverse()
                            .map(({ to, title }, index) => (
                              <BreadcrumbLink
                                key={`desktop-breadcrumbs-${index}-${to}`}
                                asChild
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Link to={routeId} params={{ postId: to, projectId: to }}>
                                  <DropdownMenuItem>{title}</DropdownMenuItem>
                                </Link>
                              </BreadcrumbLink>
                            ))}
                          <BreadcrumbLink key={routeId} asChild onClick={(e) => e.stopPropagation()}>
                            <Link to={FolderId}>
                              <DropdownMenuItem>{t('seeAll')}</DropdownMenuItem>
                            </Link>
                          </BreadcrumbLink>
                        </ScrollArea>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Drawer open={open} onOpenChange={setOpen}>
                      <DrawerTrigger aria-label="Toggle Menu" className="flex items-center gap-2">
                        {filtredOption ? filtredOption.title : t('wrongUrl')}
                        <ChevronDownIcon />
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader className="text-left">
                          <DrawerTitle>{t('title')}</DrawerTitle>
                          <DrawerDescription>{t('description')}</DrawerDescription>
                        </DrawerHeader>
                        <div className="grid gap-1 px-4">
                          <ScrollArea className="h-96 rounded-md">
                            {options
                              .filter((_, index) => index <= 10)
                              .reverse()
                              .map(({ to, title }, index) => (
                                <BreadcrumbLink
                                  key={`mobile-breadcrumbs-${index}-${to}`}
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex flex-col"
                                >
                                  <Link
                                    to={routeId}
                                    params={{ postId: to, projectId: to }}
                                    onClick={() => setOpen(false)}
                                    className="py-1 text-sm"
                                  >
                                    {title}
                                  </Link>
                                </BreadcrumbLink>
                              ))}
                            <BreadcrumbLink key={routeId} asChild onClick={(e) => e.stopPropagation()}>
                              <Link to={FolderId} onClick={() => setOpen(false)}>
                                <span>{t('seeAll')}</span>
                              </Link>
                            </BreadcrumbLink>
                          </ScrollArea>
                        </div>
                        <DrawerFooter className="pt-4">
                          <DrawerClose asChild>
                            <Button variant="outline">{t('button')}</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  )}
                </BreadcrumbItem>
              </>
            )
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
);
