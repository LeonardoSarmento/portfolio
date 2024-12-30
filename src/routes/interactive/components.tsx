import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/interactive/components')({
  component: () => <div>Hello /interactive/components!</div>
})