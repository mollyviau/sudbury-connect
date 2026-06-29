import { useEffect, useMemo, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { EmergencyFooter } from '../components/EmergencyFooter';
import {
  displayCategory,
  displayDescription,
  displayLanguages,
  isCallablePhone,
  loadResources,
  type ResourceRecord,
} from '../lib/loadResources';
import {
  RESOURCE_TOPIC_TAGS,
  topicTagLabel,
  type ResourceTopicId,
} from '../lib/resourceTopics';
import { t } from '../i18n';
import { persistLanguage, readStoredLanguage } from '../lib/languagePreference';
import type { Language } from '../types';

function ResourceCard({ resource, language }: { resource: ResourceRecord; language: Language }) {
  const strings = t(language);

  return (
    <li className="a11y-card rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-bold leading-tight text-foreground">{resource.name}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {resource.source === 'osm' && (
            <span className="rounded-md border border-border bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground">
              {strings.resourcesOsmSource}
            </span>
          )}
          <span className="rounded-md border border-border bg-secondary px-3 py-1 text-sm font-bold text-foreground">
            {displayCategory(resource, language)}
          </span>
        </div>
      </div>
      <p className="mt-3 text-lg leading-relaxed text-foreground">
        {displayDescription(resource, language)}
      </p>
      {isCallablePhone(resource.phone) ? (
        <a
          href={`tel:${resource.phone.replace(/\D/g, '')}`}
          className="mt-5 flex min-h-14 items-center gap-3 rounded-xl border border-border bg-secondary px-5 font-bold text-primary shadow-sm transition hover:border-primary hover:bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          <span aria-hidden className="text-2xl">
            📞
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {strings.callLabel}
            </span>
            <span className="text-xl font-bold text-primary">{resource.phone}</span>
          </span>
        </a>
      ) : (
        resource.phone && (
          <p className="mt-4 text-lg text-foreground">
            <span className="font-bold">{strings.phone}:</span> {resource.phone}
          </p>
        )
      )}
      <dl className="mt-5 space-y-3 text-lg">
        {resource.address && (
          <div className="flex items-start gap-3">
            <span aria-hidden className="text-xl">
              📍
            </span>
            <div>
              <dt className="font-bold text-foreground">{strings.address}</dt>
              <dd className="text-foreground">{resource.address}</dd>
            </div>
          </div>
        )}
        <div className="flex items-start gap-3">
          <span aria-hidden className="text-xl">
            🕐
          </span>
          <div>
            <dt className="font-bold text-foreground">{strings.hours}</dt>
            <dd className="text-foreground">{resource.hours}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span aria-hidden className="text-xl">
            🗣️
          </span>
          <div>
            <dt className="font-bold text-foreground">{strings.languagesServed}</dt>
            <dd className="text-foreground">
              {displayLanguages(resource.languages, language).join(', ')}
            </dd>
          </div>
        </div>
        {resource.website && (
          <div className="flex items-start gap-3">
            <span aria-hidden className="text-xl">
              🌐
            </span>
            <div>
              <dt className="font-bold text-foreground">{strings.website}</dt>
              <dd>
                <a
                  href={resource.website.split(/\s+/)[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-primary underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                >
                  {strings.resourcesVisitWebsite}
                </a>
              </dd>
            </div>
          </div>
        )}
      </dl>
    </li>
  );
}

function LanguageToggle({
  language,
  onChange,
  label,
  englishLabel,
  frenchLabel,
}: {
  language: Language;
  onChange: (language: Language) => void;
  label: string;
  englishLabel: string;
  frenchLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap items-center gap-3"
    >
      <span className="text-base font-semibold text-foreground">{label}</span>
      <div className="inline-flex rounded-xl border-2 border-border bg-card p-1 shadow-sm">
        <button
          type="button"
          aria-pressed={language === 'English'}
          onClick={() => onChange('English')}
          className={`min-h-11 rounded-lg px-4 py-2 text-base font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
            language === 'English'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          {englishLabel}
        </button>
        <button
          type="button"
          aria-pressed={language === 'French'}
          onClick={() => onChange('French')}
          className={`min-h-11 rounded-lg px-4 py-2 text-base font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
            language === 'French'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          {frenchLabel}
        </button>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);
  const [resources, setResources] = useState<ResourceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<ResourceTopicId[]>([]);
  const [announcement, setAnnouncement] = useState('');

  const strings = t(language);
  const isFr = language === 'French';

  useEffect(() => {
    void loadResources().then((data) => {
      setResources(data);
      setLoading(false);
    });
  }, []);

  function setPageLanguage(next: Language) {
    setLanguage(next);
    persistLanguage(next);
  }

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return resources;
    return resources.filter((r) => selectedTags.includes(r.dataCategory as ResourceTopicId));
  }, [resources, selectedTags]);

  useEffect(() => {
    if (loading) {
      setAnnouncement(strings.resourcesLoading);
      return;
    }
    if (selectedTags.length === 0) {
      setAnnouncement(
        isFr
          ? `Affichage de ${resources.length} ressources.`
          : `Showing all ${resources.length} resources.`,
      );
      return;
    }
    const tagLabels = selectedTags.map((id) => {
      const tag = RESOURCE_TOPIC_TAGS.find((t) => t.id === id);
      return tag ? topicTagLabel(tag, language) : id;
    }).join(', ');
    setAnnouncement(
      filtered.length === 0
        ? isFr
          ? `Aucune ressource ne correspond à ${tagLabels}.`
          : `No resources match ${tagLabels}.`
        : isFr
          ? `Affichage de ${filtered.length} ressource${filtered.length === 1 ? '' : 's'} pour ${tagLabels}.`
          : `Showing ${filtered.length} resource${filtered.length === 1 ? '' : 's'} for ${tagLabels}.`,
    );
  }, [filtered.length, isFr, language, loading, resources.length, selectedTags, strings.resourcesLoading]);

  function toggleTag(id: ResourceTopicId) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  const countLabel =
    loading
      ? strings.resourcesLoading
      : selectedTags.length === 0
        ? `${filtered.length} ${strings.resourcesCountLabel}`
        : isFr
          ? `${filtered.length} ressource${filtered.length === 1 ? '' : 's'} correspondante${filtered.length === 1 ? '' : 's'}`
          : `${filtered.length} matching resource${filtered.length === 1 ? '' : 's'}`;

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {strings.resourcesPageTitle}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{strings.resourcesPageIntro}</p>
          </div>
          <LanguageToggle
            language={language}
            onChange={setPageLanguage}
            label={strings.resourcesLanguageLabel}
            englishLabel={strings.english}
            frenchLabel={strings.french}
          />
        </div>

        {!loading && (
          <p className="mt-2 text-base text-muted-foreground">
            {strings.resourcesDataSources
              .replace('{total}', String(resources.length))
              .replace('{curated}', String(resources.filter((r) => r.source === 'curated').length))
              .replace('{osm}', String(resources.filter((r) => r.source === 'osm').length))}
          </p>
        )}

        <div className="mt-8" role="group" aria-label={strings.resourcesFilterLabel}>
          <div className="flex flex-wrap gap-2">
            {RESOURCE_TOPIC_TAGS.map((tag) => {
              const selected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleTag(tag.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 py-2 text-base font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
                    selected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:border-primary hover:bg-secondary'
                  }`}
                >
                  <span aria-hidden>{tag.icon}</span>
                  {topicTagLabel(tag, language)}
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={clearTags}
              className="mt-4 text-base font-semibold text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              {strings.resourcesClearFilters}
            </button>
          )}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
        <p className="mt-6 text-base font-semibold text-foreground" aria-hidden="true">
          {countLabel}
        </p>

        {loading ? (
          <p className="mt-8 text-lg text-muted-foreground">{strings.resourcesLoading}</p>
        ) : filtered.length === 0 ? (
          <div className="a11y-card mt-8 rounded-xl border-dashed p-8 text-center">
            <p className="text-xl font-bold text-foreground">{strings.resourcesNoMatchTitle}</p>
            <p className="mt-2 text-lg text-muted-foreground">{strings.resourcesNoMatchHint}</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} language={language} />
            ))}
          </ul>
        )}
      </main>

      <EmergencyFooter language={language} />
    </div>
  );
}
