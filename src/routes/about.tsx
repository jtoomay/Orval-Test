import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="leading-relaxed text-slate-700">
        This is a sandbox app for testing Orval and MSW. The{' '}
        <code className="rounded bg-slate-200 px-1 py-0.5 text-sm">src/api/</code> directory holds
        Orval-generated API code, and{' '}
        <code className="rounded bg-slate-200 px-1 py-0.5 text-sm">src/mocks/</code> holds the MSW
        request handlers.
      </p>
    </section>
  )
}
