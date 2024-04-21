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

// const items: { to: LinkOptions['to']; title: string }[] = [
//   { to: '/', title: 'Home' },
//   { to: '/posts/', title: 'Posts' },
//   { to: '/contact', title: 'Building Your Application' },
// ];

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
    console.log(id);
    console.log(filtredOption);

    return (
      <Breadcrumb ref={ref} className={className} {...props}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={initial ? initial.to : '/'} params={false}>
                {initial ? initial.title : 'Home'}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
              <Link to={FolderId} params={false}>
                {currentFolder.title}
              </Link>
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
                        {filtredOption ? filtredOption.title : 'Wrong URL'}
                        <ChevronDownIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {options.map(({ to, title }) => (
                          <BreadcrumbLink key={to} asChild>
                            <Link to={routeId} params={{ postId: to, projectId: to }}>
                              <DropdownMenuItem>{title}</DropdownMenuItem>
                            </Link>
                          </BreadcrumbLink>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Drawer open={open} onOpenChange={setOpen}>
                      <DrawerTrigger aria-label="Toggle Menu">
                        {filtredOption ? filtredOption.title : 'Wrong URL'}
                        <ChevronDownIcon />
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader className="text-left">
                          <DrawerTitle>Navigate to</DrawerTitle>
                          <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                        </DrawerHeader>
                        <div className="grid gap-1 px-4">
                          {options.map(({ to, title }, index) => (
                            <BreadcrumbLink key={index} asChild>
                              <Link to={routeId} params={{ postId: to, projectId: to }} className="py-1 text-sm">
                                {title}
                              </Link>
                            </BreadcrumbLink>
                          ))}
                        </div>
                        <DrawerFooter className="pt-4">
                          <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
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
