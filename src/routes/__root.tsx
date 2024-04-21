import Container from '@components/Container';
import { NavigationMenuGroup } from '@components/NavigationMenu';
// import { BackgroundGradientAnimation } from '@components/ui/background-gradient-animation';
import { type AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      {/* <BackgroundGradientAnimation> */}
      <NavigationMenuGroup />
      {/* <Container> */}
      <Outlet />
      {/* </Container> */}
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
      {/* </BackgroundGradientAnimation> */}
    </>
  );
}
