import { Moon, Sun, Waves } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import type { ThemeId } from '../types/site'
import { cn } from '../lib/cn'

const themes: { id: ThemeId; label: string; icon: typeof Moon }[] = [
  { id: 'noir', label: 'Noir', icon: Moon },
  { id: 'dawn', label: 'Dawn', icon: Sun },
  { id: 'ocean', label: 'Ocean', icon: Waves },
]

export function ThemeSwitcher({ className }: { className?: string }) {
  const { data, setThemeId } = useSiteData()

  return (
    <div
      className={cn(
        'inline-flex rounded-full border p-1 gap-0.5',
        className
      )}
      style={{
        borderColor: 'var(--lab-border)',
        background: 'var(--lab-surface)',
      }}
      role="group"
      aria-label="Color theme"
    >
      {themes.map(({ id, label, icon: Icon }) => {
        const active = data.themeId === id
        return (
          <button
            key={id}
            type="button"
            title={label}
            onClick={() => setThemeId(id)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full transition-all',
              active
                ? 'text-[var(--lab-on-accent)]'
                : 'text-[var(--lab-muted)] hover:text-[var(--lab-text)]'
            )}
            style={
              active
                ? {
                    background: 'var(--lab-accent)',
                    boxShadow: '0 1px 3px color-mix(in srgb, var(--lab-text) 18%, transparent)',
                  }
                : undefined
            }
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            <span className="sr-only">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
