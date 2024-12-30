import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/interactive/games/')({
  component: () => <div>Hello /interactive/games!</div>,
});
