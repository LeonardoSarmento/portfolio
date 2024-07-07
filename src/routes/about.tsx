import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">Hello from About!</div>;
}
