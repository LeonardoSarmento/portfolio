import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return (
    <div className="absolute z-50 flex h-dvh grid-cols-12 p-2 ">
      <h3>Welcome to my Contacts!</h3>
    </div>
  );
}
