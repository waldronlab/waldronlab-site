import { Link } from 'react-router-dom'
import { BookOpen, ExternalLink } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'

export function TeachingPage() {
  const { data } = useSiteData()

  return (
    <div>
      <PageHeader title="Teaching" subtitle="Open educational resources for courses and workshops." />
      <div className="mx-auto max-w-3xl px-4 pb-12 md:px-8">
        <MarkdownBody>{data.teachingIntroMarkdown}</MarkdownBody>
      </div>
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-24 md:px-8">
        {data.teachingSections.map((sec) => (
          <section key={sec.id}>
            <div className="mb-6 flex items-start gap-3">
              <span
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                style={{
                  background: 'var(--lab-accent-dim)',
                  color: 'var(--lab-accent)',
                  borderColor: 'var(--lab-border)',
                }}
              >
                <BookOpen className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold" style={{ color: 'var(--lab-text)' }}>
                  {sec.heading}
                </h2>
                {sec.subheading ? (
                  <p className="text-sm font-medium" style={{ color: 'var(--lab-accent)' }}>
                    {sec.subheading}
                  </p>
                ) : null}
              </div>
            </div>
            <ul className="space-y-4">
              {sec.items.map((item) => (
                <li key={item.id} className="glass-panel card-hover p-5">
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--lab-text)' }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.url.startsWith('http') ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lab-accent)]"
                      >
                        Repository
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        to={item.url}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lab-accent)]"
                      >
                        Open
                      </Link>
                    )}
                    {item.homepage ? (
                      <a
                        href={item.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lab-accent)]"
                      >
                        Homepage
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
