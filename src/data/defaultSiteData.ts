import type { MemberDirectoryEntry, SiteData } from '../types/site'
import { defaultSoftwarePackages } from './softwarePackages'
import { defaultSoftwareTopics } from './softwareTopics'
import mentorshipDefaultRaw from '../assets/mentorship-default.md?raw'

type ParsedMemberRow = {
  period: string
  name: string
  institution: string
  level: string
  role?: string
}

function cleanText(s: string): string {
  return s.trim().replace(/\s+/g, ' ')
}

function cleanLevelDisplay(s: string): string {
  let out = cleanText(s).replace(/’/g, "'")
  out = out.replace(/\s*\/\s*/g, ' / ')
  return out
}

function formatPeriodForDisplay(periodRaw: string): string {
  const compact = cleanText(periodRaw)
  let out = compact.replace(/\s*-\s*/g, '–')
  if (out.endsWith('–')) {
    out = `${out.slice(0, -1)}–present`
  }
  return out.replace(/\s+/g, '')
}

function normalizePeriodKey(period: string): string {
  return formatPeriodForDisplay(period).replace(/\s+/g, '')
}

function parseMentorshipDefault(raw: string): {
  graduate: ParsedMemberRow[]
  undergraduate: ParsedMemberRow[]
  high: ParsedMemberRow[]
} {
  const graduate: ParsedMemberRow[] = []
  const undergraduate: ParsedMemberRow[] = []
  const high: ParsedMemberRow[] = []

  type Section = 'graduate' | 'undergraduate' | 'high'
  let section: Section | null = null

  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t) continue

    if (t.startsWith('## Graduate Student Mentorship')) section = 'graduate'
    else if (t.startsWith('## Undergraduate Interns')) section = 'undergraduate'
    else if (t.startsWith('## High School Interns')) section = 'high'
    else if (section && t.startsWith('|')) {
      const cells = t.split('|').slice(1, -1).map((c) => c.trim())
      if (cells.length < 4) continue

      const period = formatPeriodForDisplay(cells[0])
      const name = cells[1]
      const institution = cells[2]
      const levelCell = cells[3]

      let level = cleanLevelDisplay(levelCell)
      let role: string | undefined

      if (section === 'graduate') {
        const parts = levelCell.split(',').map((p) => p.trim()).filter(Boolean)
        if (parts.length >= 2) {
          level = cleanLevelDisplay(parts[0])
          role = cleanLevelDisplay(parts.slice(1).join(', '))
        }
      }

      const row: ParsedMemberRow = { period, name, institution, level, ...(role ? { role } : {}) }
      if (section === 'graduate') graduate.push(row)
      else if (section === 'undergraduate') undergraduate.push(row)
      else high.push(row)
    }
  }

  return { graduate, undergraduate, high }
}

function getMaxIdNumber(seed: MemberDirectoryEntry[], prefix: string): number {
  let max = 0
  const rx = new RegExp(`^${prefix}(\\d+)$`)
  for (const e of seed) {
    const m = e.id.match(rx)
    if (m) max = Math.max(max, Number(m[1]))
  }
  return max
}

function buildDirectoryEntriesFromParsed(
  seed: MemberDirectoryEntry[],
  parsed: ParsedMemberRow[],
  idPrefix: string,
): MemberDirectoryEntry[] {
  const seedMap = new Map<string, MemberDirectoryEntry>()
  for (const e of seed) seedMap.set(`${normalizePeriodKey(e.period)}|${e.name}`, e)

  let nextId = getMaxIdNumber(seed, idPrefix) + 1

  return parsed.map((r) => {
    const key = `${normalizePeriodKey(r.period)}|${r.name}`
    const seeded = seedMap.get(key)
    const id = seeded?.id ?? `${idPrefix}${nextId++}`

    return {
      id,
      period: r.period,
      name: r.name,
      institution: r.institution,
      level: r.level,
      role: r.role,
    }
  })
}

const parsedPeopleDirectory = parseMentorshipDefault(mentorshipDefaultRaw)

const seedGraduateMentorship: MemberDirectoryEntry[] = [
  { id: 'gm1', period: '2021', name: 'Martha Martin', institution: 'CUNY SPH', level: "Master's Fieldwork" },
  { id: 'gm2', period: '2021', name: 'Frans Cuevas', institution: 'CUNY SPH', level: "Master's Fieldwork" },
  { id: 'gm3', period: '2021', name: 'Joyessa Dey', institution: 'CUNY SPH', level: "Master's Fieldwork" },
  { id: 'gm4', period: '2021', name: 'Samara Khan', institution: 'CUNY SPH', level: "Master's Fieldwork" },
  { id: 'gm5', period: '2021', name: 'Kweku Amoo', institution: 'CUNY SPH', level: "Master's Fieldwork" },
  { id: 'gm6', period: '2021', name: 'Clare Grieve', institution: 'CUNY SPH', level: "Master's Fieldwork / Thesis" },
  { id: 'gm7', period: '2020', name: 'Yu Wang', institution: 'NYU', level: 'Research Assistant' },
  { id: 'gm8', period: '2019–present', name: 'Chloe Mirzayi', institution: 'CUNY SPH', level: 'PhD Sponsor' },
  {
    id: 'gm9',
    period: '2016–2018',
    name: 'Carmen Rodriguez Cabrera',
    institution: 'CUNY SPH',
    level: "Master's Fieldwork / Thesis",
    role: 'Research Assistant',
  },
  { id: 'gm10', period: '2014–present', name: 'Anna Stachel', institution: 'CUNY SPH', level: 'Doctoral Sponsor' },
  { id: 'gm11', period: '2013–2015', name: 'Jasmine Abdelnabi', institution: 'CUNY SPH', level: 'Research Mentorship' },
]

const seedUndergraduateInterns: MemberDirectoryEntry[] = [
  {
    id: 'ui1',
    period: '2017',
    name: 'Abzal Bacchus',
    institution: 'New York City College of Technology',
    level: 'Bioinformatics Student Intern',
  },
  {
    id: 'ui2',
    period: '2015–2016',
    name: 'Faizan Malik',
    institution: 'New York City College of Technology',
    level: 'Bioinformatics Student Intern',
  },
  {
    id: 'ui3',
    period: '2015–2017',
    name: 'Rimsha Azhar',
    institution: 'New York City College of Technology',
    level: 'Bioinformatics Student Intern',
  },
  {
    id: 'ui4',
    period: '2015',
    name: 'Benjamin Joseph',
    institution: 'New York City College of Technology',
    level: 'Bioinformatics Student Intern',
  },
  {
    id: 'ui5',
    period: '2015',
    name: 'Ahou Eby',
    institution: 'New York City College of Technology',
    level: 'Bioinformatics Student Intern',
  },
  {
    id: 'ui6',
    period: '2015',
    name: 'Stephie Louis',
    institution: 'New York City College of Technology',
    level: 'Bioinformatics Student Intern',
  },
]

const seedHighSchoolInterns: MemberDirectoryEntry[] = [
  {
    id: 'hi1',
    period: '2020–present',
    name: 'Jonathan Ye',
    institution: 'Poolesville High School',
    level: 'Bioinformatics Student Intern',
  },
  {
    id: 'hi2',
    period: '2015–2016',
    name: 'David Yaffe',
    institution: 'Millburn High School',
    level: 'Bioinformatics Student Intern',
  },
]

const graduateMentorship = buildDirectoryEntriesFromParsed(seedGraduateMentorship, parsedPeopleDirectory.graduate, 'gm')
const undergraduateInterns = buildDirectoryEntriesFromParsed(
  seedUndergraduateInterns,
  parsedPeopleDirectory.undergraduate,
  'ui',
)
const highSchoolInterns = buildDirectoryEntriesFromParsed(seedHighSchoolInterns, parsedPeopleDirectory.high, 'hi')

export const defaultSiteData: SiteData = {
  themeId: 'dawn',
  meta: {
    title: 'Waldron Lab',
    tagline: 'Public health data science at CUNY SPH',
    description:
      'Cancer genomics, the human microbiome, and open methods & software in R/Bioconductor.',
    authorName: 'Levi Waldron',
    authorBio:
      'Professor of Biostatistics at CUNY Graduate School of Public Health and Health Policy.',
    authorAvatar: '/assets/img/levi-waldron.jpg',
    email: 'levi.waldron@sph.cuny.edu',
    github: 'waldronlab',
    linkedin: 'levi-waldron-a0755123',
    twitter: 'LeviWaldron1',
    repositoryUrl: 'https://github.com/waldronlab/waldronlab.github.io',
  },
  nav: [
    { title: 'Research', path: '/research' },
    { title: 'Teaching', path: '/teaching' },
    { title: 'Lab Members', path: '/people' },
    { title: 'Software', path: '/software' },
    { title: 'Publications', path: '/publications' },
    { title: 'CV', path: '/curriculum-vitae' },
    { title: 'Positions', path: '/positions' },
    { title: 'Resources', path: '/resources' },
  ],
  homeHeroImage: '/assets/img/BiocStickersMontage-1.png',
  homeIntroMarkdown: `Welcome to the Waldron lab for public health data science at the CUNY School of Public Health in New York City. I teach biostatistics, run an active research program in cancer genomics and metagenomic profiling of the human microbiome, develop methods within the intersection of statistical analysis and computation, and work to grow an inclusive community around open-source bioinformatics software and methods.

My lab aims to generate new insights into human health, disease, and treatment through improved tools and novel analysis of publicly available data.I welcome anyone interested in joining our community to get involved with [BugSigDB](https://bugsigdb.org) and the [Microbiome Virtual International Forum](https://microbiome-vif.org).`,
  homeCtaPrimary: { label: 'Explore lab software', path: '/software' },
  homeCtaSecondary: { label: 'Meet the team', path: '/people' },
  homeFeatures: [
    {
      id: 'hf1',
      title: 'Motivation',
      excerpt:
        'I am driven by the conviction that health disparities rooted in race, ethnicity, class, and geography must be dismantled through systemic social, political, and scientific action. My professional contribution to this mission is centered on the Bioconductor project, where I support the open-source bioinformatics ecosystem through both individual package development and broader community advocacy.',
      imageUrl: '/assets/img/noun_1231043_cc.svg',
      align: 'left',
    },
    {
      id: 'hf2',
      title: 'Cancer Genomics',
      excerpt:
        'Methods and hypotheses using cancer genomics data—gene expression in disease subtypes and outcomes in ovarian carcinoma, colorectal cancer, and more. Software including MultiAssayExperiment and curatedTCGAData.',
      imageUrl: '/assets/img/noun_1349710_cc.svg',
      align: 'right',
    },
    {
      id: 'hf3',
      title: 'Human Microbiome Studies',
      excerpt:
        'Metagenomic depth and resolution for microbial communities; the microbiome as interface between individual and environment. curatedMetagenomicData and HMP16SData among contributions.',
      imageUrl: '/assets/img/noun_715507_cc.svg',
      align: 'left',
    },
    {
      id: 'hf4',
      title: 'Community-building',
      excerpt:
        'An active and inclusive open-source bioinformatics and data science community through [Bioconductor](https://www.bioconductor.org/about/technical-advisory-board/) and the [Microbiome Virtual International Forum](https://microbiome-vif.org).',
      imageUrl: '/assets/img/community-clipart.png',
      align: 'right',
    },
  ],
  researchIntroMarkdown: `My Research spans epidemiology, biostatistics, bioinformatics, and computational biology—opportunities for students and interns in data analysis or scientific software development, especially with R and Bioconductor. Below are narratives for current grants; see the [NIH RePORTER](https://projectreporter.nih.gov/) for more.`,
  researchGrants: [
    {
      id: 'rg1',
      title: 'Exploiting public metagenomic data to uncover cancer–microbiome relationships',
      excerpt: `NIH [#5R01CA230551](https://reporter.nih.gov/project-details/9963159) (PI). Improves identification of microbiome roles in cancer through cross-study comparison, higher-resolution viral and strain detection from shotgun data, and accessible methods for the broader community. Collaborators at CUNY SPH, Harvard, Colorado Anschutz, and Trento.`,
      imageUrl: '/assets/img/NCI-logo.png',
      align: 'left',
    },
    {
      id: 'rg2',
      title: 'Cancer genomics: integrative and scalable solutions in R/Bioconductor',
      excerpt: `NIH [#5U24CA180996](https://reporter.nih.gov/project-details/10017896) (co-PI). Software and data resources for managing and analyzing diverse cancer genomics with advanced computational and statistical approaches. With Roswell Park, Harvard Medical School, and Padova.`,
      imageUrl: '/assets/img/NCI-logo.png',
      align: 'right',
    },
    {
      id: 'rg3',
      title: 'Genomic Data Science Analysis, Visualization, and Informatics Lab-space (AnVIL)',
      excerpt: `NIH [#5U24HG010263](https://reporter.nih.gov/project-details/9974560) (co-PI). Cloud workspace for genomic research toward precision medicine. [More about AnVIL](https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL).`,
      imageUrl: '/assets/img/anvil.png',
      align: 'left',
    },
  ],
  peopleIntroMarkdown:
    'A complete directory of the Waldron Lab community, including current members, alumni, graduate mentorship, and student interns. Each section includes period of service, training level, institution, and social links where available.',
  labMembers: [
    {
      id: 'lm1',
      name: 'Marcel Ramos, MPH',
      title: 'Senior Data Scientist',
      imageUrl: '/assets/img/marcel-ramos.jpg',
      excerpt:
        'Marcel led MultiAssayExperiment and is a member of the Bioconductor core team.',
      github: 'LiNk-NY',
      linkedin: 'mramos148',
      twitter: 'M2RUseR',
    },
    {
      id: 'lm2',
      name: 'Chloe Mirzayi, MPH',
      title: 'Postdoctoral Fellow',
      imageUrl: '/assets/img/chloe-mirzayi.jpg',
      excerpt: 'Bioinformatics and software development with a focus on the human microbiome.',
      github: 'cmirzayi',
      linkedin: 'cmirzayi',
    },
    {
      id: 'lm3',
      name: 'Andres Wokaty, BA',
      title: 'Systems Developer',
      imageUrl: '/assets/img/awokaty.png',
      excerpt:
        'Python and R programmer on the Bioconductor core team; leads nightly builds for thousands of packages.',
      github: 'jwokaty',
    },
    {
      id: 'lm4',
      name: 'Giacomo Antonello, PhD',
      title: 'Postdoctoral Data Scientist',
      imageUrl: '/assets/img/giacomo-antonello.jpg',
      excerpt:
        "ASAP / Michael J. Fox Foundation project on gut microbiome and Parkinson's using multi-omic data.",
      github: 'g-antonello',
      linkedin: 'giacomo-antonello',
    },
    {
      id: 'lm5',
      name: 'Kaelyn Long, MS',
      title: 'Research Scientist',
      imageUrl: '/assets/img/kaelyn-long.jpg',
      excerpt:
        "Bioinformatician/curator with ASAP and MJFF on microbiome roles in Parkinson's disease.",
    },
    {
      id: 'lm6',
      name: 'Ouma Ronald, BSE',
      title: 'Software Engineer',
      imageUrl: '/assets/img/Ronald.jpg',
      excerpt:
        'Software engineer and a Certified Clinical Nurse. Focuses on AI/ML. ',
      github: 'RonaldRonnie',
    },
    {
      id: 'lm7',
      name: 'Eslam Abousamra, PhD',
      title: 'Researcher',
      imageUrl: '/assets/img/Eslam.jpeg',
      excerpt:
        'Eslam is a researcher specializing in cancer image analysis, focusing on the integration of pathology whole-slide image (WSI) embeddings with multi-omics and clinical data..',
    }
  ],
  labAlumni: [
    {
      id: 'a1',
      years: '2023–2025',
      name: 'Samuel Gamboa, PhD',
      title: 'Postdoctoral Fellow',
      github: 'sdgamboa',
    },
    {
      id: 'a2',
      years: '2016–2018',
      name: 'Lucas Schiffer, MPH',
      title: 'Research Assistant',
      github: 'schifferl',
      linkedin: 'schifferl',
      twitter: '_schifferl',
      nextstep: 'PhD in Bioinformatics, Boston University',
    },
    {
      id: 'a3',
      years: '2016–2018',
      name: 'Audrey Renson',
      title: 'MPH Capstone, Research Assistant',
      linkedin: 'audreyrenson',
      github: 'audreyrenson',
      nextstep: 'PhD in Epidemiology, UNC',
    },
    {
      id: 'a4',
      years: '2018–2023',
      name: 'Sehyun Oh, PhD',
      title: 'Postdoctoral Fellow',
      nextstep: 'Assistant Professor, CUNY SPH',
    },
    {
      id: 'a5',
      years: '2018–2023',
      name: 'Rimsha Azhar, MS',
      title: 'Research Assistant',
      nextstep: 'Data Analyst, Weill Cornell',
    },
    {
      id: 'a6',
      years: '2015–2016',
      name: 'Lavanya Kannan, PhD',
      title: 'Postdoctoral Fellow',
      linkedin: 'kannanlavanya',
      nextstep: 'Bioinformatician, New York University',
    },
    {
      id: 'a7',
      years: '2014',
      name: 'Ragheed Al-Dulaimi',
      title: 'Research Assistant',
      linkedin: 'ragheed-al-dulaimi-75487837',
      nextstep: 'Statistician, University of Utah',
    },
    {
      id: 'a8',
      years: '2018–2020',
      name: 'Shaimaa El-Safoury, MPH',
      title: 'MPH Capstone, Research Assistant',
      linkedin: 'shaimaa-elsafoury-a03753aa',
    },
    {
      id: 'a9',
      years: '2017–2020',
      name: 'Ludwig Geistlinger, PhD',
      title: 'Postdoctoral Fellow',
      nextstep: 'Research Associate, Harvard Medical School',
    },
    {
      id: 'a10',
      years: '2019–2021',
      name: 'Kelly Eckenrode, PhD',
      title: 'Postdoctoral Fellow',
      nextstep: 'Postdoctoral Fellow, Harvard School of Public Health',
    },
    {
      id: 'a11',
      years: '2017–2023',
      name: 'Fatima Zohra, MPH',
      title: 'Research Assistant',
    },
    {
      id: 'a12',
      years: '2019–2020',
      name: 'Asya Khledorodova, PhD',
      title: 'Research Assistant',
      nextstep: 'Bioinformatician at Frederick National Laboratory, MD',
    },
  ],
  graduateMentorship,
  undergraduateInterns,
  highSchoolInterns,
  softwareIntroMarkdown:
    '**Start here by topic** — guided entry points to workshops and vignettes. **Package catalog** — Bioconductor and related tools from the lab.',
  softwareTopics: defaultSoftwareTopics,
  softwarePackages: defaultSoftwarePackages,
  teachingIntroMarkdown: `Teaching is a core part of the lab. Below are open educational resources for classroom teaching and workshops worldwide.`,
  teachingSections: [
    {
      id: 'ts1',
      heading: 'CUNY Graduate School of Public Health and Health Policy',
      subheading: 'Introductory Biostatistics',
      items: [
        {
          id: 'ti1',
          title: 'PUBH614',
          description:
            'Quantitative and qualitative data analysis in public health research. Labs with webR and Google Colab.',
          url: 'https://github.com/CUNY-epibios/PUBH614',
          homepage: 'https://cuny-epibios.github.io/PUBH614/',
        },
      ],
    },
    {
      id: 'ts2',
      heading: 'CUNY SPH',
      subheading: 'Applied Biostatistics II',
      items: [
        {
          id: 'ti2',
          title: 'BIOS 621/821',
          description: 'Applied Biostatistics II — lectures, labs, and recordings.',
          url: 'https://github.com/waldronbios2/cunybios2',
          homepage: 'https://bios2.waldronlab.io',
        },
      ],
    },
    {
      id: 'ts3',
      heading: 'University of Trento (Italy)',
      subheading: 'Applied Statistics for High-Throughput Biology',
      items: [
        {
          id: 'ti3',
          title: 'AppStatBio',
          description:
            'Developed for a Fulbright in 2016; updated and offered annually in Trento and Verona.',
          url: 'https://www.github.com/waldronlab/AppStatBio',
        },
      ],
    },
    {
      id: 'ts4',
      heading: 'Bioconductor workshops',
      items: [
        {
          id: 'ti4',
          title: 'CNVWorkshop',
          description: 'CNV analysis with Bioconductor.',
          url: 'https://github.com/waldronlab/CNVWorkshop',
          homepage: 'https://waldronlab.io/CNVWorkshop',
        },
        {
          id: 'ti5',
          title: 'PublicDataResources',
          description: 'Public data and Bioconductor (GEO, SRA, GDC, …).',
          url: 'https://github.com/waldronlab/PublicDataResources',
          homepage: 'https://waldronlab.io/PublicDataResources/',
        },
        {
          id: 'ti6',
          title: 'AnVILWorkshop',
          description: 'AnVIL / Terra for Bioconductor conferences.',
          url: 'https://github.com/waldronlab/AnVILWorkshop',
          homepage: 'http://waldronlab.io/AnVILWorkshop',
        },
        {
          id: 'ti7',
          title: 'MultiAssayWorkshop',
          description: 'Multi-omic integration with MultiAssayExperiment.',
          url: 'https://github.com/waldronlab/MultiAssayWorkshop',
          homepage: 'https://waldronlab.io/MultiAssayWorkshop/',
        },
        {
          id: 'ti8',
          title: 'curatedTCGAWorkshop',
          description: 'BiocNYC R/Bioconductor (archived).',
          url: 'https://github.com/waldronlab/curatedTCGAWorkshop',
        },
        {
          id: 'ti9',
          title: 'MicrobiomeWorkshop',
          description: 'Microbiome analysis with Bioconductor (archived).',
          url: 'https://github.com/waldronlab/MicrobiomeWorkshop',
        },
        {
          id: 'ti10',
          title: 'MultiAssayExperimentWorkshop',
          description: 'Multi-omics representation and analysis (archived).',
          url: 'https://github.com/waldronlab/MultiAssayExperimentWorkshop',
        },
      ],
    },
    {
      id: 'ts5',
      heading: 'R and data science resources',
      items: [
        {
          id: 'ti11',
          title: 'Recommended textbooks & links',
          description: 'Curated list of books and references for learning R and data science.',
          url: '/resources',
        },
      ],
    },
  ],
  positionsMarkdown: `## Ongoing

Student fieldwork, internships, and part-time roles are often available. Email **waldronlab@gmail.com** with your CV and a short statement of interest.

Expressions of interest from prospective students, postdocs, and developers are welcome—positions can sometimes be shaped for the right candidate.`,
  resourcesMarkdown: '',
  publicationsIntroMarkdown: `For an always-up-to-date list, see [Google Scholar](https://scholar.google.com/citations?user=-Bfm-2IAAAAJ&hl=en) or [NCBI My Bibliography](https://www.ncbi.nlm.nih.gov/myncbi/levi.waldron.1/bibliography/40557437/public/). Most papers are open access via the lab site, [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/?term=levi+waldron), or [bioRxiv](https://www.biorxiv.org/search/author1%3Alevi%2Bwaldron). Contact Levi if you cannot access a manuscript.`,
  publicationsMarkdown: '',
  cvMarkdown: '',
  peopleExtraMarkdown: '',
}
