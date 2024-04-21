import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return <div className="grid h-dvh grid-cols-12 p-2">Hello from About!</div>;
}
