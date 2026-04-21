import { useMemo, useState } from 'react'
import { ExternalLink, Package } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'
import { assetUrl } from '../lib/assetUrl'
import { cn } from '../lib/cn'

export function SoftwarePage() {
  const { data } = useSiteData()
  const categories = useMemo(() => {
    const s = new Set<string>()
    data.softwarePackages.forEach((p) => s.add(p.category))
    return ['All', ...Array.from(s)]
  }, [data.softwarePackages])
  const [cat, setCat] = useState('All')
  const filtered = useMemo(
    () =>
      cat === 'All' ? data.softwarePackages : data.softwarePackages.filter((p) => p.category === cat),
    [cat, data.softwarePackages]
  )

  return (
    <div>
      <PageHeader title="Software" subtitle="Bioconductor packages, tutorials, and data resources." />
      <div className="mx-auto max-w-3xl px-4 pb-8 md:px-8">
        <MarkdownBody>{data.softwareIntroMarkdown}</MarkdownBody>
      </div>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <h2
          className="lab-section-title flex items-center gap-3 text-2xl font-semibold"
          style={{ color: 'var(--lab-text)' }}
        >
          <Package className="h-6 w-6 shrink-0 text-[var(--lab-accent)]" strokeWidth={2} />
          Start here by topic
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {data.softwareTopics.map((t) => (
            <article
              key={t.id}
              className="glass-panel card-hover relative overflow-hidden p-6"
            >
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
                style={{ background: 'var(--lab-accent)' }}
              />
              <div className="relative">
                <div className="flex flex-wrap gap-2">
                  <span className="lab-chip">{t.level}</span>
                  {t.stack.slice(0, 3).map((x) => (
                    <span key={x} className="lab-chip">
                      {x}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-display mt-4 text-xl font-semibold leading-tight"
                  style={{ color: 'var(--lab-text)' }}
                >
                  {t.title}
                </h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--lab-muted)' }}>
                  {t.audience}
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
                  {t.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={t.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold"
                    style={{ background: 'var(--lab-accent)', color: 'var(--lab-on-accent)' }}
                  >
                    {t.primaryLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {t.packageUrl ? (
                    <a
                      href={t.packageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors hover:border-[var(--lab-accent)]"
                      style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-text)' }}
                    >
                      {t.packageLabel}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 pb-24 md:px-8">
        <h2 className="lab-section-title text-2xl font-semibold" style={{ color: 'var(--lab-text)' }}>
          Package catalog
        </h2>
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                'rounded-md border px-4 py-1.5 text-xs font-semibold transition-all',
                c === cat
                  ? 'border-transparent text-[var(--lab-on-accent)]'
                  : 'border-[var(--lab-border)] text-[var(--lab-muted)] hover:text-[var(--lab-text)]'
              )}
              style={
                c === cat
                  ? { background: 'var(--lab-accent)' }
                  : { background: 'var(--lab-surface)' }
              }
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="glass-panel card-hover flex flex-col overflow-hidden"
            >
              <div
                className="flex h-36 items-center justify-center border-b"
                style={{
                  borderColor: 'var(--lab-border)',
                  background: 'var(--lab-surface-solid)',
                }}
              >
                <img
                  src={assetUrl(p.imageUrl)}
                  alt=""
                  className="max-h-28 max-w-[80%] object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="lab-chip w-fit text-[0.65rem]">{p.category}</span>
                <h3 className="font-display mt-3 text-lg font-semibold" style={{ color: 'var(--lab-text)' }}>
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
                  {p.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((x) => (
                    <span
                      key={x}
                      className="rounded-md px-2 py-0.5 text-[0.65rem] font-medium"
                      style={{
                        background: 'var(--lab-accent-dim)',
                        color: 'var(--lab-muted)',
                      }}
                    >
                      {x}
                    </span>
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display mt-4 inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'var(--lab-accent)', color: 'var(--lab-on-accent)' }}
                >
                  {p.btnLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
