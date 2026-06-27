import { useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { VoiceButton } from './components/VoiceButton';
import { EmergencyFooter } from './components/EmergencyFooter';
import { matchResources } from './lib/matchResources';
import { parseFullVoiceInput } from './lib/parseVoiceInput';
import {
  buildResultSpeechSegments,
  primeSpeechVoices,
  readSegments,
  stopReading,
} from './lib/readAloud';
import type { AppScreen, Language, MatchedResource } from './types';
import {
  AREA_OPTIONS,
  CATEGORY_OPTIONS,
  WHO_OPTIONS,
  areaLabel,
  PICK_LANGUAGE_BILINGUAL,
  t,
  whoLabel,
} from './i18n';

function optionButtonClass(selected: boolean, compact = false): string {
  const base = compact
    ? 'flex min-h-14 w-full items-center gap-3 rounded-xl border-2 p-4 text-left shadow-sm transition'
    : 'flex min-h-14 w-full items-center gap-4 rounded-xl border-2 p-5 text-left shadow-sm transition';
  return selected
    ? `${base} border-primary bg-primary text-primary-foreground`
    : `${base} border-border bg-card text-foreground hover:border-primary hover:bg-secondary`;
}

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="mb-6 mt-2">
      <div className="text-base font-bold uppercase tracking-wider text-muted-foreground">
        {label} {current} of {total}
      </div>
      <div
        className="mt-2 flex h-4 gap-1.5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition ${i < current ? 'bg-primary' : 'bg-secondary'}`}
          />
        ))}
      </div>
    </div>
  );
}

function QuestionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="a11y-card rounded-xl p-6 sm:p-8">
      <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function PrimaryAction({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-8 flex justify-center sm:justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-xl font-bold text-primary-foreground shadow-sm transition hover:brightness-90 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {label}
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>(1);
  const [language, setLanguage] = useState<Language>('English');
  const [categories, setCategories] = useState<string[]>([]);
  const [whoAreYou, setWhoAreYou] = useState('');
  const [area, setArea] = useState('');
  const [results, setResults] = useState<MatchedResource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const [readingAloud, setReadingAloud] = useState(false);

  const strings = t(language);
  const isFr = language === 'French';

  useEffect(() => {
    if (screen === 5) primeSpeechVoices();
  }, [screen, language]);

  const DEFAULT_WHO = 'individual';
  const DEFAULT_AREA = 'any';

  function resolvedWho(value = whoAreYou) {
    return value || DEFAULT_WHO;
  }

  function resolvedArea(value = area) {
    return value || DEFAULT_AREA;
  }

  function goToScreen3() {
    setWhoAreYou((w) => w || DEFAULT_WHO);
    setArea((a) => a || DEFAULT_AREA);
    setScreen(3);
  }

  function goHome() {
    stopReading();
    setReadingAloud(false);
    setScreen(1);
    setCategories([]);
    setWhoAreYou('');
    setArea('');
    setResults([]);
    setError(null);
    setVoiceFeedback(null);
  }

  function goBack() {
    stopReading();
    setReadingAloud(false);
    setError(null);
    setVoiceFeedback(null);
    if (screen === 2) setScreen(1);
    else if (screen === 3) setScreen(2);
  }

  function toggleCategory(id: string) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  async function findResources(overrides?: {
    categories?: string[];
    whoAreYou?: string;
    area?: string;
  }) {
    const cats = overrides?.categories ?? categories;
    const who = overrides?.whoAreYou ?? resolvedWho();
    const areaVal = overrides?.area ?? resolvedArea();

    if (cats.length === 0) return;

    setCategories(cats);
    setWhoAreYou(who);
    setArea(areaVal);
    setError(null);
    setVoiceFeedback(null);
    setScreen(4);
    try {
      const matched = await matchResources({
        categories: cats,
        whoAreYou: who,
        area: areaVal,
        language,
      });
      setResults(matched);
      setScreen(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setScreen(3);
    }
  }

  async function handleVoice(text: string) {
    setError(null);
    const parsed = await parseFullVoiceInput(text, language);

    const newCategories =
      parsed.categories.length > 0
        ? [...new Set([...categories, ...parsed.categories])]
        : categories;
    const newWho = parsed.whoAreYou ?? resolvedWho();
    const newArea = parsed.area ?? resolvedArea();

    const gotSomething =
      parsed.categories.length > 0 || !!parsed.whoAreYou || !!parsed.area;

    if (!gotSomething) {
      setVoiceFeedback(`${strings.voiceNoMatch} (${strings.voiceHeard} "${text}")`);
      return;
    }

    setCategories(newCategories);
    if (parsed.whoAreYou) setWhoAreYou(parsed.whoAreYou);
    if (parsed.area) setArea(parsed.area);

    const readyToSearch =
      newCategories.length > 0 && (!!parsed.whoAreYou || !!parsed.area);
    if (readyToSearch) {
      setScreen(4);
      await findResources({
        categories: newCategories,
        whoAreYou: newWho,
        area: newArea,
      });
      return;
    }

    setVoiceFeedback(`${strings.voiceHeard} "${text}"`);
    if (newCategories.length > 0 && screen === 2) {
      goToScreen3();
    }
  }

  async function handleNextFromCategories() {
    setVoiceFeedback(null);
    setError(null);
    if (categories.length === 0) return;
    if (whoAreYou && area) {
      await findResources({ categories, whoAreYou, area });
      return;
    }
    goToScreen3();
  }

  function readResultsAloud() {
    if (results.length === 0) return;

    const segments = buildResultSpeechSegments(results, {
      whatTheyOffer: strings.whatTheyOffer,
      phone: strings.phone,
      hours: strings.hours,
      address: strings.address,
    });

    readSegments(segments, language, () => setReadingAloud(false));
    setReadingAloud(true);
  }

  function handleStopReading() {
    stopReading();
    setReadingAloud(false);
  }

  function resultsHeading(): string {
    const n = results.length;
    if (n === 0) return strings.noResults;
    if (isFr) {
      return `${n} endroit${n === 1 ? '' : 's'} qui peuvent aider`;
    }
    return `${n} place${n === 1 ? '' : 's'} that can help`;
  }

  if (screen === 1) {
    return (
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Sudbury Connect
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">{PICK_LANGUAGE_BILINGUAL}</p>
          </div>
          <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setLanguage('English');
                setScreen(2);
              }}
              className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl bg-primary p-8 text-primary-foreground shadow-sm transition hover:brightness-90 active:brightness-90"
            >
              <span aria-hidden className="text-6xl">
                EN
              </span>
              <span className="text-3xl font-bold">{strings.english}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLanguage('French');
                setScreen(2);
              }}
              className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl bg-accent p-8 text-accent-foreground shadow-sm transition hover:brightness-90 active:brightness-90"
            >
              <span aria-hidden className="text-6xl">
                FR
              </span>
              <span className="text-3xl font-bold">{strings.french}</span>
            </button>
          </div>
        </div>
        <EmergencyFooter language={language} />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <AppHeader language={language} showHome onHome={goHome} />

      {(screen === 2 || screen === 3) && (
        <div className="mx-auto w-full max-w-3xl px-5 pt-4">
          <button
            type="button"
            onClick={goBack}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-border bg-card px-6 text-lg font-bold text-foreground shadow-sm hover:bg-secondary"
          >
            <span aria-hidden>←</span> {strings.back}
          </button>
        </div>
      )}

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-8 pt-4 sm:pt-6">
        {screen === 2 && (
          <>
            <ProgressBar
              current={1}
              total={2}
              label={isFr ? 'Question' : strings.questionOf}
            />
            <QuestionCard title={strings.whatNeed} subtitle={strings.whatNeedSub}>
              <div className="flex justify-center">
                <VoiceButton
                  language={language}
                  label={strings.voiceHint}
                  listeningLabel={strings.voiceListening}
                  processingLabel={strings.voiceProcessing}
                  onTranscript={handleVoice}
                  onError={setError}
                />
              </div>
              <p className="mt-4 text-center text-base text-muted-foreground">
                {strings.voiceHintFull}
              </p>
              {voiceFeedback && (
                <p className="mt-3 rounded-lg bg-secondary p-3 text-sm text-foreground">
                  {voiceFeedback}
                </p>
              )}
              {error && (
                <p className="mt-3 text-sm text-destructive" role="alert">
                  {strings.errorTitle}: {error}
                </p>
              )}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CATEGORY_OPTIONS.map(({ id, icon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={categories.includes(id)}
                    className={optionButtonClass(categories.includes(id))}
                    onClick={() => toggleCategory(id)}
                  >
                    <span aria-hidden className="text-5xl">
                      {icon}
                    </span>
                    <span className="text-xl font-bold">{strings.categories[id]}</span>
                  </button>
                ))}
              </div>
              <PrimaryAction
                label={strings.next}
                disabled={categories.length === 0}
                onClick={handleNextFromCategories}
              />
            </QuestionCard>
          </>
        )}

        {screen === 3 && (
          <>
            <ProgressBar
              current={2}
              total={2}
              label={isFr ? 'Question' : strings.questionOf}
            />
            <QuestionCard title={strings.aboutYouTitle} subtitle={strings.aboutYouSub}>
              <div className="flex justify-center">
                <VoiceButton
                  language={language}
                  label={strings.voiceHint}
                  listeningLabel={strings.voiceListening}
                  processingLabel={strings.voiceProcessing}
                  onTranscript={handleVoice}
                  onError={setError}
                />
              </div>
              {voiceFeedback && (
                <p className="mt-4 rounded-lg bg-secondary p-3 text-sm text-foreground">
                  {voiceFeedback}
                </p>
              )}

              <h3 className="mt-6 text-2xl font-bold text-foreground">{strings.whoAreYou}</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {WHO_OPTIONS.map(({ id, icon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={resolvedWho() === id}
                    className={optionButtonClass(resolvedWho() === id, true)}
                    onClick={() => setWhoAreYou(id)}
                  >
                    <span
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl"
                    >
                      {icon}
                    </span>
                    <span className="text-xl font-bold">{whoLabel(id, strings)}</span>
                  </button>
                ))}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-foreground">{strings.whereLive}</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {AREA_OPTIONS.map(({ id }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={resolvedArea() === id}
                    className={optionButtonClass(resolvedArea() === id, true)}
                    onClick={() => setArea(id)}
                  >
                    <span aria-hidden className="text-2xl">
                      📍
                    </span>
                    <span className="text-lg font-bold">{areaLabel(id, strings)}</span>
                  </button>
                ))}
              </div>

              {error && (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {strings.errorTitle}: {error}
                </p>
              )}

              <PrimaryAction
                label={strings.findResources}
                disabled={categories.length === 0}
                onClick={() =>
                  findResources({
                    categories,
                    whoAreYou: resolvedWho(),
                    area: resolvedArea(),
                  })
                }
              />
            </QuestionCard>
          </>
        )}

        {screen === 4 && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
            <div
              className="h-14 w-14 animate-spin rounded-full border-4 border-border border-t-primary"
              aria-hidden
            />
            <p className="text-2xl font-bold text-foreground">{strings.loading}</p>
          </div>
        )}

        {screen === 5 && (
          <section className="space-y-6">
            <div className="flex justify-center">
              {!readingAloud ? (
                <button
                  type="button"
                  onClick={readResultsAloud}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-accent px-6 text-xl font-bold text-accent-foreground shadow-sm transition hover:brightness-90 sm:w-auto"
                >
                  {strings.readToMe}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopReading}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border-2 border-destructive bg-destructive/10 px-6 text-xl font-bold text-destructive shadow-sm sm:w-auto"
                >
                  {strings.stopReading}
                </button>
              )}
            </div>

            <div className="a11y-card rounded-xl p-6 sm:p-8">
              <p className="text-base font-bold uppercase tracking-widest text-primary">
                {strings.resultsEyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                {resultsHeading()}
              </h2>
              {results.length > 0 && (
                <p className="mt-3 text-lg text-muted-foreground">{strings.resultsSub}</p>
              )}
            </div>

            {results.length === 0 ? (
              <div className="a11y-card rounded-xl border-dashed p-6 text-center">
                <p className="text-xl font-bold text-foreground">{strings.noResults}</p>
                <p className="mt-2 text-lg text-muted-foreground">{strings.noResultsHint}</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {results.map((resource) => (
                  <li
                    key={`${resource.name}-${resource.phone}`}
                    className="a11y-card rounded-xl p-5 transition hover:border-primary sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-xl font-bold leading-tight text-foreground">
                        {resource.name}
                      </h3>
                      {resource.category && (
                        <span className="rounded-md border border-border bg-secondary px-3 py-1 text-sm font-bold text-foreground">
                          {resource.category}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-lg leading-relaxed text-foreground">
                      {resource.description}
                    </p>

                    {resource.phone && (
                      resource.phone.startsWith('See') || resource.phone.includes('@') ? (
                        <div className="mt-5 flex min-h-14 items-center gap-3 rounded-xl border border-border bg-secondary px-5">
                          <span aria-hidden className="text-2xl">
                            📞
                          </span>
                          <span className="text-lg text-muted-foreground">{resource.phone}</span>
                        </div>
                      ) : (
                        <a
                          href={`tel:${resource.phone.replace(/\D/g, '')}`}
                          className="mt-5 flex min-h-14 items-center gap-3 rounded-xl border border-border bg-secondary px-5 font-bold text-primary shadow-sm transition hover:border-primary hover:bg-card"
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
                      {resource.hours && (
                        <div className="flex items-start gap-3">
                          <span aria-hidden className="text-xl">
                            🕐
                          </span>
                          <div>
                            <dt className="font-bold text-foreground">{strings.hours}</dt>
                            <dd className="text-foreground">{resource.hours}</dd>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <span aria-hidden className="text-xl">
                          🗣️
                        </span>
                        <div>
                          <dt className="font-bold text-foreground">{strings.languagesServed}</dt>
                          <dd className="text-foreground">{resource.languages.join(', ')}</dd>
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
                                className="font-bold text-primary underline"
                              >
                                {strings.website}
                              </a>
                            </dd>
                          </div>
                        </div>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={goHome}
                className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 text-xl font-bold text-primary-foreground shadow-sm transition hover:brightness-90 sm:w-auto"
              >
                {strings.startOver}
              </button>
            </div>
          </section>
        )}
      </main>

      <EmergencyFooter language={language} />
    </div>
  );
}
