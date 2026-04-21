import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { PageHeader } from '../components/PageHeader'

export function PositionsPage() {
  const { data } = useSiteData()

  return (
    <div>
      <PageHeader title="Positions" subtitle="Join the lab — fieldwork, internships, and research roles." />
      <div className="mx-auto max-w-3xl px-4 pb-24 md:px-8">
        <div className="glass-panel p-6 md:p-10">
          <MarkdownBody>{data.positionsMarkdown}</MarkdownBody>
        </div>
      </div>
    </div>
  )
}
