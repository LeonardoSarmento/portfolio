import { useAuth } from '@services/hooks/auth';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Login } from './login';

export const Route = createFileRoute('/_auth')({
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
