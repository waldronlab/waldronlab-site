export type ThemeId = 'noir' | 'dawn' | 'ocean'

export interface NavItem {
  title: string
  path: string
}

export interface SiteMeta {
  title: string
  tagline: string
  description: string
  authorName: string
  authorBio: string
  authorAvatar: string
  email: string
  github: string
  linkedin: string
  twitter: string
  repositoryUrl: string
}

export interface HomeFeature {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  align: 'left' | 'right'
}

export interface ResearchGrant {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  align: 'left' | 'right'
}

export interface LabMember {
  id: string
  name: string
  title?: string
  imageUrl: string
  excerpt: string
  github?: string
  linkedin?: string
  twitter?: string
}

export interface LabAlumnus {
  id: string
  years: string
  name: string
  title?: string
  github?: string
  linkedin?: string
  twitter?: string
  nextstep?: string
}

export interface MemberDirectoryEntry {
  id: string
  period: string
  name: string
  institution?: string
  level?: string
  role?: string
  github?: string
  linkedin?: string
  twitter?: string
}

export interface SoftwareTopic {
  id: string
  title: string
  audience: string
  level: string
  stack: string[]
  description: string
  primaryUrl: string
  primaryLabel: string
  packageUrl?: string
  packageLabel?: string
}

export interface SoftwarePackage {
  id: string
  category: string
  title: string
  excerpt: string
  imageUrl: string
  url: string
  btnLabel: string
  stack: string[]
}

export interface TeachingItem {
  id: string
  title: string
  description: string
  url: string
  homepage?: string
}

export interface TeachingSection {
  id: string
  heading: string
  subheading?: string
  items: TeachingItem[]
}

export interface SiteData {
  meta: SiteMeta
  themeId: ThemeId
  nav: NavItem[]
  homeIntroMarkdown: string
  homeCtaPrimary: { label: string; path: string }
  homeCtaSecondary: { label: string; path: string }
  homeHeroImage: string
  homeFeatures: HomeFeature[]
  researchIntroMarkdown: string
  researchGrants: ResearchGrant[]
  peopleIntroMarkdown: string
  labMembers: LabMember[]
  labAlumni: LabAlumnus[]
  graduateMentorship: MemberDirectoryEntry[]
  undergraduateInterns: MemberDirectoryEntry[]
  highSchoolInterns: MemberDirectoryEntry[]
  softwareIntroMarkdown: string
  softwareTopics: SoftwareTopic[]
  softwarePackages: SoftwarePackage[]
  teachingIntroMarkdown: string
  teachingSections: TeachingSection[]
  positionsMarkdown: string
  resourcesMarkdown: string
  publicationsIntroMarkdown: string
  /** Empty = use bundled default from assets */
  publicationsMarkdown: string
  /** Empty = use bundled default from assets */
  cvMarkdown: string
  /** Rendered below alumni on People */
  peopleExtraMarkdown: string
}
