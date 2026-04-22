import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../context/SiteDataContext'
import { assetUrl } from '../../lib/assetUrl'

export function Footer() {
  const { data } = useSiteData()
  const { meta } = data

  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: 'var(--lab-border)' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start md:justify-between">
          <div className="max-w-lg">
            <p className="font-display text-lg font-semibold tracking-tight" style={{ color: 'var(--lab-text)' }}>
              {meta.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
              {meta.tagline}
            </p>
            <nav className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3" aria-label="Footer">
              {data.nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-text)]"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <a
              href={`mailto:${meta.email}`}
              className="glass-panel card-hover flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ color: 'var(--lab-accent)' }}
              aria-label="Email"
            >
              <Mail className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
            </a>
            <a
              href={`https://github.com/${meta.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel card-hover flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ color: 'var(--lab-accent)' }}
              aria-label="GitHub"
            >
              <Github className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
            </a>
            <a
              href={`https://www.linkedin.com/in/${meta.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel card-hover flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ color: 'var(--lab-accent)' }}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
            </a>
            <a
              href={`https://twitter.com/${meta.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel card-hover flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ color: 'var(--lab-accent)' }}
              aria-label="Twitter"
            >
              <Twitter className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
            </a>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center gap-4 border-t pt-8 text-center text-xs md:flex-row md:justify-between md:text-left"
          style={{ borderColor: 'var(--lab-border)', color: 'var(--lab-muted)' }}
        >
          <p className="max-w-md leading-relaxed">Developed by Levi Waldron.</p>
          <img
            src={assetUrl(meta.authorAvatar)}
            alt=""
            className="h-14 w-14 shrink-0 rounded-full object-cover opacity-50 ring-1 ring-[var(--lab-border)]"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  )
}
