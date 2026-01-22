import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/search"!</div>
}
