import { HashRouter, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { SiteDataProvider } from './context/SiteDataContext'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { ResearchPage } from './pages/ResearchPage'
import { TeachingPage } from './pages/TeachingPage'
import { PeoplePage } from './pages/PeoplePage'
import { SoftwarePage } from './pages/SoftwarePage'
import { PublicationsPage } from './pages/PublicationsPage'
import { CVPage } from './pages/CVPage'
import { PositionsPage } from './pages/PositionsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AdminPage } from './pages/admin/AdminPage'

export default function App() {
  return (
    <HashRouter>
      <SiteDataProvider>
        <AdminAuthProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="teaching" element={<TeachingPage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="software" element={<SoftwarePage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="curriculum-vitae" element={<CVPage />} />
              <Route path="positions" element={<PositionsPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="admin" element={<AdminPage />} />
          </Routes>
        </AdminAuthProvider>
      </SiteDataProvider>
    </HashRouter>
  )
}
