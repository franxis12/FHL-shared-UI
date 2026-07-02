import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ExampleIcon from './assets/icons/example-icon.svg?react'
import { Button } from './components/Button'
import { Card } from './components/Card'
import './index.css'

function Demo() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            FHL-shared-UI
          </p>
          <h1 className="text-3xl font-bold tracking-tight">React component library playground</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            This small Vite page exists only so you can run the library locally while Storybook
            handles component isolation.
          </p>
        </header>

        <section className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="primary" icon={ExampleIcon}>
            Button With Icon
          </Button>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card title="Simple Card">
            Reusable shared components usually start small. This sandbox keeps the surface area
            intentionally limited.
          </Card>
          <Card title="Card With Icon" icon={ExampleIcon}>
            SVG files imported with <code className="rounded bg-slate-200 px-1 py-0.5">?react</code>{' '}
            become React components through vite-plugin-svgr.
          </Card>
        </section>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
)
