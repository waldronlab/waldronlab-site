import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'
import { MarkdownBody } from '../components/MarkdownBody'
import { assetUrl } from '../lib/assetUrl'
import { cn } from '../lib/cn'

export function HomePage() {
  const { data } = useSiteData()
  const { meta } = data

  return (
    <div>
      <section className="relative min-h-[min(48vh,22rem)] overflow-hidden sm:min-h-[min(52vh,26rem)]">
        <div
          className="absolute inset-0 scale-100 bg-no-repeat"
          style={{
            backgroundImage: `url(${assetUrl(data.homeHeroImage)})`,
            // Make the montage run left-to-right across the hero.
            // Using 100% auto avoids heavy vertical upscaling (less blur)
            // while keeping the left side aligned.
            backgroundPosition: 'left center',
            backgroundSize: '100% auto',
          }}
          aria-hidden
        />
        <div className="absolute inset-0" style={{ background: 'var(--lab-hero-gradient)' }} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 80% at 75% 40%, transparent 0%, var(--lab-hero-vignette) 100%)`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--lab-bg)] to-transparent sm:h-28"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[min(48vh,22rem)] w-full max-w-xl flex-col justify-center px-4 py-12 sm:min-h-[min(52vh,26rem)] md:px-8 md:py-16">
          <div className="hero-editorial">
            <div className="hero-editorial-inner">
              <p className="hero-tagline">{meta.tagline}</p>
              <h1 className="hero-title mt-4 text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:mt-5 sm:text-3xl md:text-4xl md:leading-[1.06]">
                {meta.title}
              </h1>
              <p className="hero-subtitle mt-4 max-w-xl text-[1rem] leading-relaxed sm:mt-5 sm:text-[1.0625rem]">
                {meta.description}
              </p>
              <div className="hero-cta-row mt-8 sm:mt-9">
                <Link to={data.homeCtaPrimary.path} className="hero-primary-btn">
                  {data.homeCtaPrimary.label}
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-95" strokeWidth={2} aria-hidden />
                </Link>
                <Link to={data.homeCtaSecondary.path} className="hero-secondary-btn">
                  {data.homeCtaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 pt-4 md:px-8 md:pb-24">
        <div className="welcome-portrait-wrap">
          <figure className="m-0 w-full max-w-none">
            <div className="welcome-portrait-frame mx-auto">
              <img
                src={assetUrl(meta.authorAvatar)}
                alt={meta.authorName}
                className="aspect-[4/5] h-auto w-full object-cover object-[center_12%]"
                width={272}
                height={340}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 max-w-md text-center">
              <span className="font-display text-base font-semibold" style={{ color: 'var(--lab-text)' }}>
                {meta.authorName}
              </span>
              <span className="mt-1 block text-sm leading-snug text-[var(--lab-muted)]">{meta.authorBio}</span>
            </figcaption>
          </figure>
        </div>

        <div className="glass-panel p-8 md:p-10">
          <MarkdownBody>{data.homeIntroMarkdown}</MarkdownBody>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link to="/people" className="glass-panel card-hover p-4">
            <p className="font-display text-sm font-semibold" style={{ color: 'var(--lab-text)' }}>
              Lab community
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
              Members, alumni, mentorship, and interns.
            </p>
          </Link>
          <Link to="/curriculum-vitae" className="glass-panel card-hover p-4">
            <p className="font-display text-sm font-semibold" style={{ color: 'var(--lab-text)' }}>
              Curriculum vitae
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
              Readable profile, service, and funding history.
            </p>
          </Link>
          <Link to="/publications" className="glass-panel card-hover p-4">
            <p className="font-display text-sm font-semibold" style={{ color: 'var(--lab-text)' }}>
              Publications
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--lab-muted)' }}>
              Open scholarship and current research output.
            </p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-4 pb-28 md:space-y-20 md:px-8">
        {data.homeFeatures.map((f) => {
          const isLeft = f.align === 'left'
          return (
            <article
              key={f.id}
              className={cn(
                'glass-panel card-hover grid gap-8 overflow-hidden p-6 md:grid-cols-2 md:items-center md:gap-10 md:p-9',
                !isLeft && 'md:[direction:rtl]'
              )}
            >
              <div className={cn('md:[direction:ltr]', !isLeft && 'md:text-right')}>
                <h2
                  className="font-display text-xl font-semibold tracking-tight md:text-2xl"
                  style={{ color: 'var(--lab-text)' }}
                >
                  {f.title}
                </h2>
                <div className="mt-4">
                  <MarkdownBody>{f.excerpt}</MarkdownBody>
                </div>
              </div>
              <div className={cn('flex justify-center md:[direction:ltr]', !isLeft && 'md:justify-start')}>
                <div
                  className="relative flex h-48 w-full max-w-sm items-center justify-center rounded-lg md:h-52"
                  style={{
                    background: 'var(--lab-accent-dim)',
                    border: '1px solid var(--lab-border)',
                  }}
                >
                  <img
                    src={assetUrl(f.imageUrl)}
                    alt=""
                    className="max-h-40 max-w-[85%] object-contain"
                  />
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
