import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { EmergencyFooter } from '../components/EmergencyFooter';

const TECH_STACK = [
  'React 19 + TypeScript + Vite',
  'Tailwind CSS v4',
  '312+ curated Greater Sudbury resources',
  'OpenStreetMap / Overpass API (live community places)',
  'Web Speech API (voice in / read aloud)',
  'NVIDIA Nemotron (AI matching tests)',
  'Valsea AI (voice fallback)',
  'Apify (data collection)',
  'Cursor + Lovable (build & design)',
  'GitHub + Vercel (deploy)',
];

const linkClass =
  'font-bold text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring';

function TeamLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2 text-base">
      {links.map((link, index) => (
        <span key={link.href} className="inline-flex items-center">
          {index > 0 && <span className="mx-2 text-muted-foreground" aria-hidden="true">·</span>}
          <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
            {link.label}
          </a>
        </span>
      ))}
    </p>
  );
}

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:py-10">
        <header className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Hackathon demo</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Sudbury Connect
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Health, Safety &amp; Community Well-Being — helping people in Greater Sudbury find real
            local help in English or French.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-sm transition hover:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            Try the live app →
          </Link>
        </header>

        <section className="a11y-card mt-10 rounded-xl p-6 sm:p-8" aria-labelledby="video-heading">
          <h2 id="video-heading" className="text-2xl font-bold text-foreground">
            Video demo
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-black shadow-sm">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/4dnMuw0h03A"
                title="Sudbury Connect demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-4 text-base text-muted-foreground">
            <a
              href="https://youtu.be/4dnMuw0h03A"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              Watch on YouTube
            </a>
            {' · '}
            <a
              href="https://sudburyconnect.ca"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              sudburyconnect.ca
            </a>
          </p>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="project-heading">
          <h2 id="project-heading" className="text-2xl font-bold text-foreground">
            The project
          </h2>
          <dl className="mt-6 space-y-6 text-lg">
            <div>
              <dt className="font-bold text-primary">Problem</dt>
              <dd className="mt-1 text-foreground">
                Community resources in Sudbury are scattered across dozens of English-only sites and
                PDFs. People in crisis — especially seniors, students, and French speakers — often
                don&apos;t know where to start.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-primary">Who it&apos;s for</dt>
              <dd className="mt-1 text-foreground">
                Seniors, students, families, and anyone who needs food, housing, mental health,
                legal, or employment help in Greater Sudbury — in plain language, on a phone.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-primary">What it is</dt>
              <dd className="mt-1 text-foreground">
                A bilingual, accessible 5-step guide: pick a language, say what you need, answer two
                quick questions, and get 3–5 real local organizations with phone numbers, hours, and
                optional read-aloud.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-primary">How we built it</dt>
              <dd className="mt-1 text-foreground">
                The UI was designed in Lovable, matching and voice were wired in Cursor, and the app
                is deployed on Vercel. Matching runs locally for instant results; AI powers voice
                parsing and integration tests.
              </dd>
            </div>
          </dl>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="data-heading">
          <h2 id="data-heading" className="text-2xl font-bold text-foreground">
            Where our resource data comes from
          </h2>
          <p className="mt-4 text-lg text-foreground">
            Sudbury Connect combines a hand-curated local directory with live map data so people see
            both verified community services and nearby places that may help.
          </p>

          <ul className="mt-6 space-y-6 text-lg">
            <li className="rounded-lg border border-border bg-secondary p-5">
              <h3 className="font-bold text-primary">Curated directory (core)</h3>
              <p className="mt-2 text-foreground">
                Our team collected and normalized <strong>312 Greater Sudbury organizations</strong>{' '}
                from trusted sources — including{' '}
                <a
                  href="https://211ontario.ca"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  211 Ontario
                </a>
                ,{' '}
                <a
                  href="https://www.greatersudbury.ca"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  City of Greater Sudbury
                </a>{' '}
                listings, and individual agency websites. Data was gathered with{' '}
                <strong>Apify</strong> scraping workflows and manual research, then cleaned into
                one JSON file with phone numbers, hours, addresses, categories, and French
                descriptions where available.
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                These curated entries are what power the main matching flow — they have the richest
                contact details and bilingual descriptions.
              </p>
            </li>

            <li className="rounded-lg border border-border bg-secondary p-5">
              <h3 className="font-bold text-primary">OpenStreetMap (live supplement)</h3>
              <p className="mt-2 text-foreground">
                When you open the app or browse{' '}
                <Link to="/resources" className={linkClass}>
                  all resources
                </Link>
                , we also query the{' '}
                <a
                  href="https://wiki.openstreetmap.org/wiki/Overpass_API"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  Overpass API
                </a>{' '}
                for community places mapped in OpenStreetMap across Greater Sudbury — clinics,
                community centres, libraries, NGOs, social facilities, and similar locations.
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                OSM results are mapped into our topic categories, deduplicated against the curated
                list, and cached for 24 hours. Entries tagged{' '}
                <strong>OpenStreetMap</strong> on the resources page come from this layer. Many lack
                a phone number; we show &ldquo;Contact for phone number&rdquo; when one isn&apos;t
                listed on the map.
              </p>
            </li>
          </ul>

          <p className="mt-6 text-base text-muted-foreground">
            <strong className="text-foreground">Please note:</strong> This is a hackathon demo, not
            an official government directory. Hours and services change — always confirm details with
            the organization before visiting. OpenStreetMap data is © OpenStreetMap contributors
            under the{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              ODbL
            </a>
            .
          </p>
        </section>

        <section className="a11y-card mt-8 rounded-xl p-6 sm:p-8" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="text-2xl font-bold text-foreground">
            Tech stack
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {TECH_STACK.map((item) => (
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
            Team
          </h2>
          <ul className="mt-6 space-y-8">
            <li>
              <h3 className="text-xl font-bold text-foreground">Molly Viau</h3>
              <p className="text-base font-semibold text-primary">Lead developer</p>
              <p className="mt-2 text-lg text-foreground">
                Built the app architecture, resource matching logic, voice integration, deployment,
                and overall project direction.
              </p>
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
              <p className="text-base font-semibold text-primary">Data &amp; research</p>
              <p className="mt-2 text-lg text-foreground">
                Community resource research, data collection, and resource categorization.
              </p>
              <TeamLinks
                links={[
                  {
                    href: 'https://www.linkedin.com/in/audrey-goudi/',
                    label: 'LinkedIn',
                  },
                ]}
              />
            </li>
            <li>
              <h3 className="text-xl font-bold text-foreground">Alex Yator</h3>
              <p className="text-base font-semibold text-primary">UI design</p>
              <p className="mt-2 text-lg text-foreground">
                Front-end design and interface implementation.
              </p>
              <TeamLinks
                links={[
                  {
                    href: 'https://www.linkedin.com/in/alex-yator-69a7842a3/',
                    label: 'LinkedIn',
                  },
                ]}
              />
            </li>
          </ul>
          <a
            href="https://github.com/mollyviau/sudbury-connect"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            View source on GitHub →
          </a>
        </section>
      </main>

      <EmergencyFooter language="English" />
    </div>
  );
}
