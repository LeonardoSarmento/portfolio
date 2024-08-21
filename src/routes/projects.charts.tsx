import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/charts')({
  component: Charts,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Charts | Leonardo`,
      content: 'Something about Shadcn/ui charts components...',
    },
  ],
});

function Charts() {
  return <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">Hello from Charts!</div>;
}
