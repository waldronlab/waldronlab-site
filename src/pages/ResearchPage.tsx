import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'
import { assetUrl } from '../lib/assetUrl'
import { cn } from '../lib/cn'

export function ResearchPage() {
  const { data } = useSiteData()

  return (
    <div>
      <PageHeader title="Research" subtitle={data.meta.tagline} />
      <div className="mx-auto max-w-3xl px-4 pb-10 md:px-8">
        <MarkdownBody>{data.researchIntroMarkdown}</MarkdownBody>
      </div>
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-24 md:px-8">
        {data.researchGrants.map((g) => {
          const isLeft = g.align === 'left'
          return (
            <article
              key={g.id}
              className={cn(
                'glass-panel card-hover grid gap-6 overflow-hidden p-6 md:grid-cols-[minmax(0,1fr)_200px] md:items-start md:p-8',
                !isLeft && 'md:[direction:rtl]'
              )}
            >
              <div className="md:[direction:ltr]">
                <h2
                  className="font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl"
                  style={{ color: 'var(--lab-text)' }}
                >
                  {g.title}
                </h2>
                <div className="mt-4 text-sm md:text-base">
                  <MarkdownBody>{g.excerpt}</MarkdownBody>
                </div>
              </div>
              <div className="flex justify-center md:[direction:ltr] md:justify-end">
                <img
                  src={assetUrl(g.imageUrl)}
                  alt=""
                  className="h-24 w-auto max-w-full object-contain opacity-90 md:h-28"
                />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
