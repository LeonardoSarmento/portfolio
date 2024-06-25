import { useAuth } from '@services/hooks/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Login } from './login';

export const Route = createFileRoute('/_auth')({
//   beforeLoad: ({ context, location }) => {
//     if (!context.auth.isAuthenticated) {
//       throw redirect({
//         to: '/',
//         search: {
//           redirect: location.href,
//         },
//       });
//     }
//   },
  component: () => {
    if (!isAuthenticated()) {
      return <Login />;
    }
    return <Outlet />;
  },
});

function isAuthenticated() {
  const auth = useAuth();
  return auth.isAuthenticated;
}
