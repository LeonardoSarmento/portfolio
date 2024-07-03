import Container from '@components/Container';
import { Footer } from '@components/Footer';
import { NavigationMenuGroup } from '@components/NavigationMenu';
import { Toaster } from '@components/ui/sonner';
// import { BackgroundGradientAnimation } from '@components/ui/background-gradient-animation';
import { type AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import React, { Suspense } from 'react';

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
});

function RootComponent() {
  return (
    <>
      {/* <BackgroundGradientAnimation> */}
      <NavigationMenuGroup />
      {/* <Container> */}
      <ScrollRestoration getKey={(location) => location.pathname} />
      <div className="flex h-screen flex-col justify-between">
        <Outlet />
        <div className="flex flex-col justify-self-end">
          <Footer />
        </div>
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
