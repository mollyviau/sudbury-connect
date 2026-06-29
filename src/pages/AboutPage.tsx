import { Link } from 'react-router-dom';
import { ExternalLink } from '../components/ExternalLink';
import { Navbar } from '../components/Navbar';
import { EmergencyFooter } from '../components/EmergencyFooter';
import { useAppLanguage } from '../hooks/useAppLanguage';
import { usePageTitle } from '../hooks/usePageTitle';
import { tAboutPage } from '../i18n/aboutPage';
import { t } from '../i18n';

const linkClass =
  'font-bold text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring';

function TeamLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2 text-base">
      {links.map((link, index) => (
        <span key={link.href} className="inline-flex items-center">
          {index > 0 && <span className="mx-2 text-muted-foreground" aria-hidden="true">·</span>}
          <ExternalLink href={link.href} className={linkClass}>
            {link.label}
          </ExternalLink>
        </span>
      ))}
    </p>
  );
}

export default function AboutPage() {
  const language = useAppLanguage();
  const strings = tAboutPage(language);
  const appStrings = t(language);

  usePageTitle(strings.pageTitle);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:py-10">
        <header className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{strings.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {appStrings.appTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{strings.tagline}</p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-sm transition hover:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            {strings.tryApp}
          </Link>
        </header>

        <section className="a11y-card mt-10 rounded-xl p-6 sm:p-8" aria-labelledby="video-heading">
          <h2 id="video-heading" className="text-2xl font-bold text-foreground">
            {strings.videoTitle}
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-black shadow-sm">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/4dnMuw0h03A"
                title={strings.videoIframeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-4 text-base text-muted-foreground">
            <ExternalLink
              href="https://youtu.be/4dnMuw0h03A"
              className="font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              {strings.watchYoutube}
            </ExternalLink>
            {' · '}
            <ExternalLink
              href="https://youtu.be/4dnMuw0h03A"
              className="font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              {strings.youtubeCaptions}
            </ExternalLink>
            {' · '}
            <ExternalLink
              href="https://sudburyconnect.ca"
              className="font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              sudburyconnect.ca
            </ExternalLink>
          </p>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="project-heading">
          <h2 id="project-heading" className="text-2xl font-bold text-foreground">
            {strings.projectTitle}
          </h2>
          <dl className="mt-6 space-y-6 text-lg">
            <div>
              <dt className="font-bold text-primary">{strings.problemLabel}</dt>
              <dd className="mt-1 text-foreground">{strings.problemText}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary">{strings.whoLabel}</dt>
              <dd className="mt-1 text-foreground">{strings.whoText}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary">{strings.whatLabel}</dt>
              <dd className="mt-1 text-foreground">{strings.whatText}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary">{strings.builtLabel}</dt>
              <dd className="mt-1 text-foreground">{strings.builtText}</dd>
            </div>
          </dl>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="data-heading">
          <h2 id="data-heading" className="text-2xl font-bold text-foreground">
            {strings.dataTitle}
          </h2>
          <p className="mt-4 text-lg text-foreground">{strings.dataIntro}</p>

          <ul className="mt-6 space-y-6 text-lg">
            <li className="rounded-lg border border-border bg-secondary p-5">
              <h3 className="font-bold text-primary">{strings.curatedTitle}</h3>
              <p className="mt-2 text-foreground">{strings.curatedBody}</p>
              <p className="mt-3 text-base text-foreground">
                <ExternalLink href="https://211ontario.ca" className={linkClass}>
                  211 Ontario
                </ExternalLink>
                {' · '}
                <ExternalLink href="https://www.greatersudbury.ca" className={linkClass}>
                  {language === 'French' ? 'Ville du Grand Sudbury' : 'City of Greater Sudbury'}
                </ExternalLink>
              </p>
              <p className="mt-3 text-base text-muted-foreground">{strings.curatedNote}</p>
            </li>

            <li className="rounded-lg border border-border bg-secondary p-5">
              <h3 className="font-bold text-primary">{strings.osmTitle}</h3>
              <p className="mt-2 text-foreground">
                {strings.osmBodyBefore}
                <Link to="/resources" className={linkClass}>
                  {strings.allResourcesLink}
                </Link>
                {strings.osmBodyAfter}
              </p>
              <p className="mt-3 text-base text-muted-foreground">{strings.osmNote}</p>
              <p className="mt-2 text-base">
                <ExternalLink
                  href="https://wiki.openstreetmap.org/wiki/Overpass_API"
                  className={linkClass}
                >
                  Overpass API
                </ExternalLink>
              </p>
            </li>
          </ul>

          <p className="mt-6 text-base text-muted-foreground">
            {strings.dataDisclaimer.split('ODbL')[0]}
            <ExternalLink href="https://www.openstreetmap.org/copyright" className={linkClass}>
              ODbL
            </ExternalLink>
            .
          </p>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="text-2xl font-bold text-foreground">
            {strings.techTitle}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {strings.techStack.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-secondary px-4 py-3 text-base font-semibold text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="team-heading">
          <h2 id="team-heading" className="text-2xl font-bold text-foreground">
            {strings.teamTitle}
          </h2>
          <ul className="mt-6 space-y-8">
            <li>
              <h3 className="text-xl font-bold text-foreground">Molly Viau</h3>
              <p className="text-base font-semibold text-primary">{strings.teamMollyRole}</p>
              <p className="mt-2 text-lg text-foreground">{strings.teamMollyBio}</p>
              <TeamLinks
                links={[
                  { href: 'https://github.com/mollyviau', label: 'GitHub' },
                  { href: 'https://mollyviau.com', label: 'Website' },
                  { href: 'https://www.linkedin.com/in/mollyviau/', label: 'LinkedIn' },
                ]}
              />
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Audrey Goudi B</h3>
              <p className="text-base font-semibold text-primary">{strings.teamAudreyRole}</p>
              <p className="mt-2 text-lg text-foreground">{strings.teamAudreyBio}</p>
              <TeamLinks
                links={[
                  { href: 'https://www.linkedin.com/in/audrey-goudi/', label: 'LinkedIn' },
                ]}
              />
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Alex Yator</h3>
              <p className="text-base font-semibold text-primary">{strings.teamAlexRole}</p>
              <p className="mt-2 text-lg text-foreground">{strings.teamAlexBio}</p>
              <TeamLinks
                links={[
                  { href: 'https://www.linkedin.com/in/alex-yator-69a7842a3/', label: 'LinkedIn' },
                ]}
              />
            </li>
          </ul>
          <ExternalLink
            href="https://github.com/mollyviau/sudbury-connect"
            className="mt-6 inline-flex min-h-12 items-center font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            {strings.viewGithub}
          </ExternalLink>
        </section>
      </main>

      <EmergencyFooter language={language} />
    </div>
  );
}
