import { cn } from '../lib/cn'

type Props = {
  title: string
  subtitle?: string
  className?: string
}

export function PageHeader({ title, subtitle, className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto max-w-6xl border-b px-4 pt-14 pb-10 md:px-8',
        className
      )}
      style={{ borderColor: 'var(--lab-border)' }}
    >
      <h1
        className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl"
        style={{ color: 'var(--lab-text)' }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p className="lab-lede mt-4 max-w-2xl text-base md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  )
}
