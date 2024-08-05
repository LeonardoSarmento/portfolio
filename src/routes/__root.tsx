import { ErrorComponent } from '@components/ErrorComponent';
import { Footer } from '@components/Footer';
import { NavigationMenuGroup } from '@components/NavigationMenu';
import { NotFoundComponent } from '@components/NotFoundComponent';
// import { BackgroundGradientAnimation } from '@components/ui/background-gradient-animation';
import { type AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, ScrollRestoration, createRootRouteWithContext, useLocation } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { Toaster } from 'sonner';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const path = useLocation();
  return (
    <>
      {/* <BackgroundGradientAnimation> */}
      <NavigationMenuGroup />
      {/* <Container> */}
      <ScrollRestoration getKey={(location) => location.pathname} />
      <div className="flex max-h-screen h-[90%] flex-col justify-between">
        <Outlet />
        {path.pathname !== '/contact' ? <Footer /> : null}
      </div>
      <Toaster richColors closeButton />
      {/* </Container> */}
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
      {/* </BackgroundGradientAnimation> */}
    </>
  );
}
