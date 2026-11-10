import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { mocksEnabled } from '../lib/apiMode'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})

const linkClass = 'rounded px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900'
const activeClass = 'bg-slate-900 text-white hover:bg-slate-900 hover:text-white'

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Orval Test</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                mocksEnabled ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {mocksEnabled ? 'Mock API' : 'Real API'}
            </span>
          </div>
          <nav className="flex gap-2">
            <Link
              to="/"
              className={linkClass}
              activeProps={{ className: activeClass }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
            <Link to="/about" className={linkClass} activeProps={{ className: activeClass }}>
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  )
}
