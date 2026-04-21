import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'

export function PublicationsPage() {
  const { data, effectivePublicationsMarkdown } = useSiteData()

  return (
    <div>
      <PageHeader title="Publications" />
      <div className="mx-auto max-w-3xl px-4 pb-8 md:px-8">
        <MarkdownBody>{data.publicationsIntroMarkdown}</MarkdownBody>
      </div>
      <div className="mx-auto max-w-4xl px-4 pb-24 md:px-8">
        <div className="glass-panel p-6 md:p-10">
          <MarkdownBody>{effectivePublicationsMarkdown}</MarkdownBody>
        </div>
      </div>
    </div>
  )
}
