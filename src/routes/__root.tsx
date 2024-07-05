import Container from '@components/Container';
import { Footer } from '@components/Footer';
import { MY_PHOTO, NavigationMenuGroup } from '@components/NavigationMenu';
import { Button } from '@components/ui/button';
import { CardContent, CardTitle } from '@components/ui/card';
import { Toaster } from '@components/ui/sonner';
// import { BackgroundGradientAnimation } from '@components/ui/background-gradient-animation';
import { type AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
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
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function NotFoundComponent() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center">
          <img className="h-80 rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
          <p className="mt-6 text-xs leading-tight text-muted-foreground">
            Front End Engineer | React | React Native | TypeScript | Agile
          </p>
          {/* <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div> */}
          <CardTitle className="mb-2 mt-4">Leonardo</CardTitle>
        </CardContent>
        <CardTitle className="mt-2">Não encontrei essa página...</CardTitle>
        <div className="flex gap-3">
          <Button
            onClick={(e) => {
              e.preventDefault(), router.navigate({ to: '/' });
            }}
            type="button"
          >
            Inicio
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault(), router.history.back();
            }}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
function ErrorComponent() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center">
          <img className="h-80 rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
          <p className="mt-6 text-xs leading-tight text-muted-foreground">
            Front End Engineer | React | React Native | TypeScript | Agile
          </p>
          {/* <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div> */}
          <CardTitle className="mb-2 mt-4">Leonardo</CardTitle>
        </CardContent>
        <CardTitle className="mt-2">Não encontrei essa página...</CardTitle>
        <div className="flex gap-3">
          <Button
            onClick={(e) => {
              e.preventDefault(), router.navigate({ to: '/' });
            }}
            type="button"
          >
            Inicio
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault(), router.history.back();
            }}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <>
      {/* <BackgroundGradientAnimation> */}
      <NavigationMenuGroup />
      {/* <Container> */}
      <ScrollRestoration getKey={(location) => location.pathname} />
      <div className="flex h-screen flex-col justify-between">
        <Outlet />
        <Footer />
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
