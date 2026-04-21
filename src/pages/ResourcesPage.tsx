import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'

export function ResourcesPage() {
  const { effectiveResourcesMarkdown } = useSiteData()

  return (
    <div>
      <PageHeader title="Resources" subtitle="Textbooks and references for R and data science." />
      <div className="mx-auto max-w-3xl px-4 pb-24 md:px-8">
        <div className="glass-panel p-6 md:p-10">
          <MarkdownBody>{effectiveResourcesMarkdown}</MarkdownBody>
        </div>
      </div>
    </div>
  )
}
