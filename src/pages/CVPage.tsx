import {
  AtSign,
  BookOpenText,
  CircleUserRound,
  Github,
  GraduationCap,
  Linkedin,
  Microscope,
  ScrollText,
} from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'
import { assetUrl } from '../lib/assetUrl'

export function CVPage() {
  const { data, effectiveCvMarkdown } = useSiteData()
  const { meta } = data

  return (
    <div>
      <PageHeader title="Curriculum Vitae" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 md:grid-cols-[280px_1fr] md:px-8">
        <aside className="glass-panel h-fit p-5 md:sticky md:top-24">
          <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--lab-border)' }}>
            <img
              src={assetUrl(meta.authorAvatar)}
              alt={meta.authorName}
              className="aspect-[4/5] w-full object-cover object-[center_14%]"
            />
          </div>
          <div className="mt-4">
            <p className="font-display text-xl font-semibold" style={{ color: 'var(--lab-text)' }}>
              {meta.authorName}
            </p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
              {meta.authorBio}
            </p>
          </div>
          <ul className="mt-5 grid gap-2 text-sm">
            <li>
              <a
                href={`mailto:${meta.email}`}
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <AtSign className="h-4 w-4" /> Email
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/${meta.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/in/${meta.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://orcid.org/0000-0003-2725-0694"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <CircleUserRound className="h-4 w-4" /> ORCID
              </a>
            </li>
            <li>
              <a
                href="https://scholar.google.com/citations?user=-Bfm-2IAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <GraduationCap className="h-4 w-4" /> Google Scholar
              </a>
            </li>
            <li>
              <a
                href="https://www.ncbi.nlm.nih.gov/pmc/?term=levi+waldron"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <BookOpenText className="h-4 w-4" /> PubMed Central
              </a>
            </li>
            <li>
              <a
                href="https://www.biorxiv.org/search/author1%3Alevi%2Bwaldron"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <Microscope className="h-4 w-4" /> bioRxiv
              </a>
            </li>
            <li>
              <a
                href="/curriculum-vitae"
                className="inline-flex items-center gap-2 text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-accent)]"
              >
                <ScrollText className="h-4 w-4" /> Curriculum Vitae
              </a>
            </li>
          </ul>
        </aside>
        <div className="glass-panel p-6 md:p-10">
          <div className="prose-lab cv-prose">
            <MarkdownBody>{effectiveCvMarkdown}</MarkdownBody>
          </div>
        </div>
      </div>
    </div>
  )
}
