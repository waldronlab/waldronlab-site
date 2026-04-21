import { Github, Linkedin, Twitter } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'
import { assetUrl } from '../lib/assetUrl'
import type { MemberDirectoryEntry } from '../types/site'

function SocialLinks({
  name,
  github,
  linkedin,
  twitter,
}: {
  name: string
  github?: string
  linkedin?: string
  twitter?: string
}) {
  return (
    <div className="mt-2 flex gap-2">
      {github ? (
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border p-2 transition-colors hover:text-[var(--lab-accent)]"
          style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
          aria-label={`${name} GitHub`}
        >
          <Github className="h-4 w-4" />
        </a>
      ) : null}
      {linkedin ? (
        <a
          href={`https://www.linkedin.com/in/${linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border p-2 transition-colors hover:text-[var(--lab-accent)]"
          style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
          aria-label={`${name} LinkedIn`}
        >
          <Linkedin className="h-4 w-4" />
        </a>
      ) : null}
      {twitter ? (
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border p-2 transition-colors hover:text-[var(--lab-accent)]"
          style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
          aria-label={`${name} Twitter`}
        >
          <Twitter className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  )
}

function DirectorySection({
  title,
  rows,
}: {
  title: string
  rows: MemberDirectoryEntry[]
}) {
  if (rows.length === 0) return null
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
      <h2 className="lab-section-title text-2xl font-semibold" style={{ color: 'var(--lab-text)' }}>
        {title}
      </h2>
      <div className="grid gap-3">
        {rows.map((row) => (
          <article key={row.id} className="glass-panel grid gap-3 px-4 py-3 md:grid-cols-[160px_1fr]">
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--lab-accent)' }}>
              {row.period}
            </div>
            <div>
              <p className="font-display text-base font-semibold" style={{ color: 'var(--lab-text)' }}>
                {row.name}
              </p>
              <p className="text-sm" style={{ color: 'var(--lab-muted)' }}>
                {[row.level, row.role, row.institution].filter(Boolean).join(' · ')}
              </p>
              <SocialLinks
                name={row.name}
                github={row.github}
                linkedin={row.linkedin}
                twitter={row.twitter}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function PeoplePage() {
  const { data, effectivePeopleExtraMarkdown } = useSiteData()

  return (
    <div>
      <PageHeader title="People" />
      <div className="mx-auto max-w-3xl px-4 pb-8 md:px-8">
        <MarkdownBody>{data.peopleIntroMarkdown}</MarkdownBody>
      </div>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="lab-section-title text-2xl font-semibold" style={{ color: 'var(--lab-text)' }}>
          Lab members
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.labMembers.map((m) => (
            <article
              key={m.id}
              className="glass-panel card-hover flex flex-col overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={assetUrl(m.imageUrl)}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--lab-text)' }}>
                  {m.name}
                </h3>
                {m.title ? (
                  <p className="text-sm font-medium" style={{ color: 'var(--lab-accent)' }}>
                    {m.title}
                  </p>
                ) : null}
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
                  {m.excerpt}
                </p>
                <div className="mt-4 flex gap-2">
                  {m.github ? (
                    <a
                      href={`https://github.com/${m.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-2 transition-colors hover:text-[var(--lab-accent)]"
                      style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
                      aria-label={`${m.name} GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  ) : null}
                  {m.linkedin ? (
                    <a
                      href={`https://www.linkedin.com/in/${m.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-2 transition-colors hover:text-[var(--lab-accent)]"
                      style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
                      aria-label={`${m.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  ) : null}
                  {m.twitter ? (
                    <a
                      href={`https://twitter.com/${m.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border p-2 transition-colors hover:text-[var(--lab-accent)]"
                      style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
                      aria-label={`${m.name} Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 md:px-8">
        <h2 className="lab-section-title text-2xl font-semibold" style={{ color: 'var(--lab-text)' }}>
          Lab alumni
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.labAlumni.map((a) => (
            <li key={a.id} className="glass-panel px-4 py-3 text-sm">
              <span className="font-mono text-xs" style={{ color: 'var(--lab-accent)' }}>
                {a.years}
              </span>
              <p className="font-display font-semibold" style={{ color: 'var(--lab-text)' }}>
                {a.name}
                {a.title ? <span className="font-normal text-[var(--lab-muted)]"> — {a.title}</span> : null}
              </p>
              {a.nextstep ? (
                <p className="mt-1 text-xs" style={{ color: 'var(--lab-muted)' }}>
                  Next: {a.nextstep}
                </p>
              ) : null}
              <SocialLinks
                name={a.name}
                github={a.github}
                linkedin={a.linkedin}
                twitter={a.twitter}
              />
            </li>
          ))}
        </ul>
      </section>

      <DirectorySection title="Graduate student mentorship" rows={data.graduateMentorship} />
      <DirectorySection title="Undergraduate interns" rows={data.undergraduateInterns} />
      <DirectorySection title="High school interns" rows={data.highSchoolInterns} />

      {effectivePeopleExtraMarkdown.trim() ? (
        <section className="mx-auto mt-16 max-w-6xl px-4 pb-24 md:px-8">
          <MarkdownBody>{effectivePeopleExtraMarkdown}</MarkdownBody>
        </section>
      ) : (
        <div className="pb-24" />
      )}
    </div>
  )
}
