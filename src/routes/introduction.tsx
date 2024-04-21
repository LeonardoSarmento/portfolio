import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/introduction')({
  component: Introduction,
});

function Introduction() {
  return <div className="grid h-dvh grid-cols-12 p-2">Hello from Introduction!</div>;
}
