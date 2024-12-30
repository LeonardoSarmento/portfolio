import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/interactive/components/charts')({
  component: () => <div>Hello /interactive/components/charts!</div>
})