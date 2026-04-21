import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <h1 className="font-display text-5xl font-semibold tracking-tight text-[var(--lab-accent)] md:text-6xl">
        404
      </h1>
      <p className="mt-4 text-base text-[var(--lab-muted)] md:text-lg">This page is not in the lab directory.</p>
      <Link
        to="/"
        className="font-display mt-8 rounded-lg px-6 py-3 text-sm font-semibold text-[var(--lab-on-accent)] shadow-sm transition-[box-shadow,transform] hover:-translate-y-px hover:shadow-md"
        style={{ background: 'var(--lab-accent)' }}
      >
        Back home
      </Link>
    </div>
  )
}
