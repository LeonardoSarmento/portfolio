import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/experience')({
  component: Experience,
});

function Experience() {
  return <div className="grid h-dvh grid-cols-12 p-2">Hello from Experience!</div>;
}
