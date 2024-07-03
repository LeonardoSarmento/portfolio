import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return <div className="grid h-dvh grid-cols-12 p-2">Hello from Contact!</div>;
}
