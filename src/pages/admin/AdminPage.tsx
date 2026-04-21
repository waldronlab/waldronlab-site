import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, LogOut, RotateCcw, Upload } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useSiteData } from '../../context/SiteDataContext'
import { defaultSiteData } from '../../data/defaultSiteData'
import { deepMerge } from '../../lib/deepMerge'
import { ThemeSwitcher } from '../../components/ThemeSwitcher'
import type { SiteData } from '../../types/site'

const tabs = [
  { id: 'general', label: 'Site & identity' },
  { id: 'home', label: 'Home' },
  { id: 'pages', label: 'Page copy' },
  { id: 'people', label: 'People & research' },
  { id: 'software', label: 'Software JSON' },
  { id: 'advanced', label: 'Import / export' },
] as const

type TabId = (typeof tabs)[number]['id']

function AdminLogin() {
  const { login } = useAdminAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    if (!login(password)) setError(true)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--lab-muted)] hover:text-[var(--lab-accent)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to site
      </Link>
      <div className="glass-panel rounded-2xl p-8">
        <h1 className="font-display text-2xl font-bold text-[var(--lab-text)]">Admin sign-in</h1>
        <p className="mt-2 text-sm text-[var(--lab-muted)]">
          Manage themes, navigation, and content. Default password is set in{' '}
          <code className="rounded bg-[var(--lab-surface-solid)] px-1">VITE_ADMIN_PASSWORD</code> or the
          built-in development default.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--lab-muted)]">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border bg-transparent px-4 py-3 text-[var(--lab-text)] outline-none focus:ring-2 focus:ring-[var(--lab-accent)]"
              style={{ borderColor: 'var(--lab-border)' }}
              autoComplete="current-password"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-400">Incorrect password. Try again.</p>
          ) : null}
          <button
            type="submit"
            className="font-display w-full rounded-xl py-3 text-sm font-bold text-[var(--lab-on-accent)]"
            style={{ background: 'var(--lab-accent)' }}
          >
            Enter admin
          </button>
        </form>
      </div>
    </div>
  )
}

function JsonEditor({
  label,
  value,
  onApply,
  hint,
}: {
  label: string
  value: string
  onApply: (parsed: unknown) => void
  hint?: string
}) {
  const [text, setText] = useState(value)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    setText(value)
    setErr(null)
  }, [value])

  const apply = () => {
    setErr(null)
    try {
      const parsed = JSON.parse(text)
      onApply(parsed)
    } catch {
      setErr('Invalid JSON')
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--lab-muted)]">
        {label}
      </label>
      {hint ? <p className="text-xs text-[var(--lab-muted)]">{hint}</p> : null}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-48 w-full resize-y rounded-xl border p-4 font-mono text-xs leading-relaxed text-[var(--lab-text)]"
        style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
        spellCheck={false}
      />
      {err ? <p className="text-sm text-red-400">{err}</p> : null}
      <button
        type="button"
        onClick={apply}
        className="rounded-lg border px-4 py-2 text-xs font-bold text-[var(--lab-accent)]"
        style={{ borderColor: 'var(--lab-border)' }}
      >
        Apply {label}
      </button>
    </div>
  )
}

function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { data, setData, patchData, resetToDefaults } = useSiteData()
  const [tab, setTab] = useState<TabId>('general')
  const fileRef = useRef<HTMLInputElement>(null)

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'waldron-lab-site-data.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }, [data])

  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<SiteData>
        setData(deepMerge(structuredClone(defaultSiteData), parsed))
      } catch {
        alert('Could not parse JSON file.')
      }
    }
    reader.readAsText(f)
    e.target.value = ''
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--lab-muted)] hover:text-[var(--lab-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            View site
          </Link>
          <h1 className="font-display mt-2 text-3xl font-bold text-[var(--lab-text)]">Admin</h1>
          <p className="text-sm text-[var(--lab-muted)]">Changes save automatically to this browser.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-[var(--lab-muted)]"
            style={{ borderColor: 'var(--lab-border)' }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b pb-4" style={{ borderColor: 'var(--lab-border)' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className="rounded-full px-4 py-2 text-xs font-bold transition-colors"
            style={
              tab === t.id
                ? { background: 'var(--lab-accent)', color: 'var(--lab-on-accent)' }
                : { background: 'var(--lab-surface)', color: 'var(--lab-muted)' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass-panel space-y-6 rounded-2xl p-6 md:p-8">
        {tab === 'general' && (
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ['meta.title', data.meta.title, (v: string) => patchData({ meta: { ...data.meta, title: v } })],
                ['meta.tagline', data.meta.tagline, (v: string) => patchData({ meta: { ...data.meta, tagline: v } })],
                [
                  'meta.description',
                  data.meta.description,
                  (v: string) => patchData({ meta: { ...data.meta, description: v } }),
                ],
                ['meta.email', data.meta.email, (v: string) => patchData({ meta: { ...data.meta, email: v } })],
                ['meta.github', data.meta.github, (v: string) => patchData({ meta: { ...data.meta, github: v } })],
                [
                  'meta.linkedin',
                  data.meta.linkedin,
                  (v: string) => patchData({ meta: { ...data.meta, linkedin: v } }),
                ],
                ['meta.twitter', data.meta.twitter, (v: string) => patchData({ meta: { ...data.meta, twitter: v } })],
                [
                  'meta.repositoryUrl',
                  data.meta.repositoryUrl,
                  (v: string) => patchData({ meta: { ...data.meta, repositoryUrl: v } }),
                ],
                [
                  'meta.authorAvatar (path on waldronlab.io)',
                  data.meta.authorAvatar,
                  (v: string) => patchData({ meta: { ...data.meta, authorAvatar: v } }),
                ],
                [
                  'homeHeroImage',
                  data.homeHeroImage,
                  (v: string) => patchData({ homeHeroImage: v }),
                ],
              ] as const
            ).map(([key, val, onChange]) => (
              <label key={key} className="block md:col-span-2">
                <span className="text-xs font-semibold text-[var(--lab-muted)]">{key}</span>
                <input
                  value={val}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm text-[var(--lab-text)]"
                  style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="text-xs font-semibold text-[var(--lab-muted)]">meta.authorBio</span>
              <textarea
                value={data.meta.authorBio}
                onChange={(e) => patchData({ meta: { ...data.meta, authorBio: e.target.value } })}
                rows={3}
                className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm text-[var(--lab-text)]"
                style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
              />
            </label>
            <JsonEditor
              label="Navigation (JSON array of {title, path})"
              value={JSON.stringify(data.nav, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ nav: parsed })}
            />
          </div>
        )}

        {tab === 'home' && (
          <div className="space-y-6">
            <label className="block">
              <span className="text-xs font-semibold text-[var(--lab-muted)]">homeIntroMarkdown</span>
              <textarea
                value={data.homeIntroMarkdown}
                onChange={(e) => patchData({ homeIntroMarkdown: e.target.value })}
                rows={10}
                className="mt-1 w-full rounded-xl border p-4 font-mono text-xs text-[var(--lab-text)]"
                style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="text-xs text-[var(--lab-muted)]">CTA primary label</span>
                <input
                  value={data.homeCtaPrimary.label}
                  onChange={(e) =>
                    patchData({ homeCtaPrimary: { ...data.homeCtaPrimary, label: e.target.value } })
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
                />
              </label>
              <label>
                <span className="text-xs text-[var(--lab-muted)]">CTA primary path</span>
                <input
                  value={data.homeCtaPrimary.path}
                  onChange={(e) =>
                    patchData({ homeCtaPrimary: { ...data.homeCtaPrimary, path: e.target.value } })
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
                />
              </label>
              <label>
                <span className="text-xs text-[var(--lab-muted)]">CTA secondary label</span>
                <input
                  value={data.homeCtaSecondary.label}
                  onChange={(e) =>
                    patchData({ homeCtaSecondary: { ...data.homeCtaSecondary, label: e.target.value } })
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
                />
              </label>
              <label>
                <span className="text-xs text-[var(--lab-muted)]">CTA secondary path</span>
                <input
                  value={data.homeCtaSecondary.path}
                  onChange={(e) =>
                    patchData({ homeCtaSecondary: { ...data.homeCtaSecondary, path: e.target.value } })
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
                />
              </label>
            </div>
            <JsonEditor
              label="homeFeatures"
              value={JSON.stringify(data.homeFeatures, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ homeFeatures: parsed })}
              hint="Array of { id, title, excerpt, imageUrl, align: left|right }"
            />
          </div>
        )}

        {tab === 'pages' && (
          <div className="space-y-8">
            {(
              [
                ['researchIntroMarkdown', data.researchIntroMarkdown],
                ['peopleIntroMarkdown', data.peopleIntroMarkdown],
                ['softwareIntroMarkdown', data.softwareIntroMarkdown],
                ['teachingIntroMarkdown', data.teachingIntroMarkdown],
                ['publicationsIntroMarkdown', data.publicationsIntroMarkdown],
                ['positionsMarkdown', data.positionsMarkdown],
                [
                  'publicationsMarkdown (empty = bundled default)',
                  data.publicationsMarkdown,
                ],
                ['cvMarkdown (empty = bundled default)', data.cvMarkdown],
                ['resourcesMarkdown (empty = bundled default)', data.resourcesMarkdown],
                ['peopleExtraMarkdown (empty = bundled mentorship tables)', data.peopleExtraMarkdown],
              ] as const
            ).map(([field, val]) => (
              <label key={field} className="block">
                <span className="text-xs font-semibold text-[var(--lab-muted)]">{field}</span>
                <textarea
                  value={val}
                  onChange={(e) => patchData({ [field]: e.target.value } as Partial<SiteData>)}
                  rows={field.includes('publications') || field.includes('cv') ? 14 : 6}
                  className="mt-1 w-full rounded-xl border p-4 font-mono text-xs text-[var(--lab-text)]"
                  style={{ borderColor: 'var(--lab-border)', background: 'var(--lab-surface-solid)' }}
                />
              </label>
            ))}
          </div>
        )}

        {tab === 'people' && (
          <div className="space-y-8">
            <JsonEditor
              label="labMembers"
              value={JSON.stringify(data.labMembers, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ labMembers: parsed })}
            />
            <JsonEditor
              label="labAlumni"
              value={JSON.stringify(data.labAlumni, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ labAlumni: parsed })}
            />
            <JsonEditor
              label="graduateMentorship"
              value={JSON.stringify(data.graduateMentorship, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ graduateMentorship: parsed })}
            />
            <JsonEditor
              label="undergraduateInterns"
              value={JSON.stringify(data.undergraduateInterns, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ undergraduateInterns: parsed })}
            />
            <JsonEditor
              label="highSchoolInterns"
              value={JSON.stringify(data.highSchoolInterns, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ highSchoolInterns: parsed })}
            />
            <JsonEditor
              label="researchGrants"
              value={JSON.stringify(data.researchGrants, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ researchGrants: parsed })}
            />
            <JsonEditor
              label="teachingSections"
              value={JSON.stringify(data.teachingSections, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ teachingSections: parsed })}
            />
          </div>
        )}

        {tab === 'software' && (
          <div className="space-y-8">
            <JsonEditor
              label="softwareTopics"
              value={JSON.stringify(data.softwareTopics, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ softwareTopics: parsed })}
            />
            <JsonEditor
              label="softwarePackages"
              value={JSON.stringify(data.softwarePackages, null, 2)}
              onApply={(parsed) => Array.isArray(parsed) && patchData({ softwarePackages: parsed })}
            />
          </div>
        )}

        {tab === 'advanced' && (
          <div className="space-y-6">
            <p className="text-sm text-[var(--lab-muted)]">
              Export the full site configuration for backup, or import a previously exported file. Reset
              restores the built-in defaults from this repository (does not clear browser until you save —
              it writes fresh defaults immediately).
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={exportJson}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[var(--lab-on-accent)]"
                style={{ background: 'var(--lab-accent)' }}
              >
                <Download className="h-4 w-4" />
                Download JSON
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold text-[var(--lab-text)]"
                style={{ borderColor: 'var(--lab-border)' }}
              >
                <Upload className="h-4 w-4" />
                Import JSON
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={onImportFile}
              />
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset all site data to repository defaults?')) resetToDefaults()
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-red-400/50 px-5 py-3 text-sm font-bold text-red-300"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function AdminPage() {
  const { isAuthenticated } = useAdminAuth()
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}
