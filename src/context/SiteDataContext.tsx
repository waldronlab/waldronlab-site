import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import defaultPublicationsRaw from '../assets/publications-default.md?raw'
import defaultCvRaw from '../assets/cv-default.md?raw'
import defaultResourcesRaw from '../assets/resources-default.md?raw'
import { defaultSiteData } from '../data/defaultSiteData'
import { deepMerge } from '../lib/deepMerge'
import type { SiteData, ThemeId } from '../types/site'

const STORAGE_KEY = 'waldron-lab-site-v2'
const LEGACY_STORAGE_KEY = 'waldron-lab-site-v1'

function loadStored(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultSiteData)
    const parsed = JSON.parse(raw) as Partial<SiteData>

    // Arrays from localStorage replace defaults wholesale.
    // To ensure newly-added people still show up, we merge by `id` for the
    // directory-like lists.
    const base = structuredClone(defaultSiteData)
    const merged = deepMerge(base, parsed)

    function mergePeopleArrayById<T extends { id: string }>(baseArr: T[], patchArr: T[]): T[] {
      const patchById = new Map(patchArr.map((p) => [p.id, p] as const))
      const baseIds = new Set(baseArr.map((b) => b.id))
      const result = baseArr.map((b) => patchById.get(b.id) ?? b)
      for (const p of patchArr) if (!baseIds.has(p.id)) result.push(p)
      return result
    }

    ;(merged as any).labMembers = mergePeopleArrayById(
      base.labMembers,
      Array.isArray(parsed.labMembers) ? (parsed.labMembers as any) : base.labMembers,
    )
    ;(merged as any).labAlumni = mergePeopleArrayById(
      base.labAlumni,
      Array.isArray(parsed.labAlumni) ? (parsed.labAlumni as any) : base.labAlumni
    )
    ;(merged as any).graduateMentorship = mergePeopleArrayById(
      base.graduateMentorship,
      Array.isArray(parsed.graduateMentorship) ? (parsed.graduateMentorship as any) : base.graduateMentorship
    )
    ;(merged as any).undergraduateInterns = mergePeopleArrayById(
      base.undergraduateInterns,
      Array.isArray(parsed.undergraduateInterns) ? (parsed.undergraduateInterns as any) : base.undergraduateInterns
    )
    ;(merged as any).highSchoolInterns = mergePeopleArrayById(
      base.highSchoolInterns,
      Array.isArray(parsed.highSchoolInterns) ? (parsed.highSchoolInterns as any) : base.highSchoolInterns
    )

    return merged
  } catch {
    return structuredClone(defaultSiteData)
  }
}

type SiteDataContextValue = {
  data: SiteData
  setData: (next: SiteData) => void
  patchData: (patch: Partial<SiteData>) => void
  setThemeId: (id: ThemeId) => void
  resetToDefaults: () => void
  effectivePublicationsMarkdown: string
  effectiveCvMarkdown: string
  effectiveResourcesMarkdown: string
  effectivePeopleExtraMarkdown: string
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<SiteData>(loadStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* ignore quota */
    }
  }, [data])

  useEffect(() => {
    document.documentElement.dataset.theme = data.themeId
  }, [data.themeId])

  const setData = useCallback((next: SiteData) => {
    setDataState(next)
  }, [])

  const patchData = useCallback((patch: Partial<SiteData>) => {
    setDataState((prev) => deepMerge(prev, patch))
  }, [])

  const setThemeId = useCallback((id: ThemeId) => {
    setDataState((prev) => ({ ...prev, themeId: id }))
  }, [])

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    setDataState(structuredClone(defaultSiteData))
  }, [])

  const effectivePublicationsMarkdown = data.publicationsMarkdown.trim()
    ? data.publicationsMarkdown
    : defaultPublicationsRaw

  const effectiveCvMarkdown = data.cvMarkdown.trim() ? data.cvMarkdown : defaultCvRaw

  const effectiveResourcesMarkdown = data.resourcesMarkdown.trim()
    ? data.resourcesMarkdown
    : defaultResourcesRaw

  const effectivePeopleExtraMarkdown = data.peopleExtraMarkdown

  const value = useMemo(
    () => ({
      data,
      setData,
      patchData,
      setThemeId,
      resetToDefaults,
      effectivePublicationsMarkdown,
      effectiveCvMarkdown,
      effectiveResourcesMarkdown,
      effectivePeopleExtraMarkdown,
    }),
    [
      data,
      setData,
      patchData,
      setThemeId,
      resetToDefaults,
      effectivePublicationsMarkdown,
      effectiveCvMarkdown,
      effectiveResourcesMarkdown,
      effectivePeopleExtraMarkdown,
    ]
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData outside SiteDataProvider')
  return ctx
}
