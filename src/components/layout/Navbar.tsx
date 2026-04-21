import { Link, NavLink } from 'react-router-dom'
import { FlaskConical, LayoutDashboard } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { cn } from '../../lib/cn'

export function Navbar() {
  const { data } = useSiteData()

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150"
      style={{
        borderColor: 'var(--lab-border)',
        background: 'color-mix(in srgb, var(--lab-bg) 88%, transparent)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-8">
        <Link
          to="/"
          className="font-display group flex items-center gap-3 text-base font-semibold tracking-tight"
          style={{ color: 'var(--lab-text)' }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors group-hover:border-[color-mix(in_srgb,var(--lab-accent)_35%,var(--lab-border))]"
            style={{
              background: 'var(--lab-accent-dim)',
              color: 'var(--lab-accent)',
              borderColor: 'var(--lab-border)',
            }}
          >
            <FlaskConical className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden />
          </span>
          <span className="hidden min-w-0 truncate sm:inline">{data.meta.title}</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {data.nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[color-mix(in_srgb,var(--lab-accent)_14%,transparent)] text-[var(--lab-accent)]'
                    : 'text-[var(--lab-muted)] hover:bg-[color-mix(in_srgb,var(--lab-text)_6%,transparent)] hover:text-[var(--lab-text)]'
                )
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher className="hidden sm:inline-flex" />
          <Link
            to="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-[color-mix(in_srgb,var(--lab-text)_6%,transparent)] hover:text-[var(--lab-text)]"
            style={{
              borderColor: 'var(--lab-border)',
              color: 'var(--lab-muted)',
            }}
            title="Admin"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="sr-only">Admin</span>
          </Link>
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        style={{ borderColor: 'var(--lab-border)' }}
      >
        {data.nav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                isActive
                  ? 'bg-[color-mix(in_srgb,var(--lab-accent)_18%,transparent)] text-[var(--lab-accent)]'
                  : 'bg-[var(--lab-surface)] text-[var(--lab-muted)]'
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
        <div className="ml-auto shrink-0">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
