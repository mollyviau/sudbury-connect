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
import './App.css';

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

  return (
    <main className="app">
      <AppHeader language={language} showHome onHome={goHome} isLanguageScreen={screen === 1} />

      <div className="app-content">
      {screen === 1 && (
        <section className="screen">
          <h2>{PICK_LANGUAGE_BILINGUAL}</h2>
          <div className="button-grid two-col">
            <button
              type="button"
              className="big-btn"
              onClick={() => {
                setLanguage('English');
                setScreen(2);
              }}
            >
              🇬🇧 {strings.english}
            </button>
            <button
              type="button"
              className="big-btn"
              onClick={() => {
                setLanguage('French');
                setScreen(2);
              }}
            >
              🇫🇷 {strings.french}
            </button>
          </div>
        </section>
      )}

      {screen === 2 && (
        <section className="screen screen-compact">
          <div className="screen-top">
            <h2>{strings.whatNeed}</h2>
            <VoiceButton
              language={language}
              label={strings.voiceHint}
              listeningLabel={strings.voiceListening}
              processingLabel={strings.voiceProcessing}
              onTranscript={handleVoice}
              onError={setError}
            />
          </div>
          <p className="voice-hint">{strings.voiceHintFull}</p>
          {voiceFeedback && <p className="voice-feedback">{voiceFeedback}</p>}
          {error && (
            <p className="error" role="alert">
              {strings.errorTitle}: {error}
            </p>
          )}
          <div className="button-grid category-grid">
            {CATEGORY_OPTIONS.map(({ id, icon }) => (
              <button
                key={id}
                type="button"
                className={`big-btn ${categories.includes(id) ? 'selected' : ''}`}
                onClick={() => toggleCategory(id)}
              >
                {icon} {strings.categories[id]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="primary-btn"
            disabled={categories.length === 0}
            onClick={handleNextFromCategories}
          >
            {strings.next}
          </button>
        </section>
      )}

      {screen === 3 && (
        <section className="screen screen-compact">
          <div className="screen-top">
            <h2>{strings.whoAreYou}</h2>
            <VoiceButton
              language={language}
              label={strings.voiceHint}
              listeningLabel={strings.voiceListening}
              processingLabel={strings.voiceProcessing}
              onTranscript={handleVoice}
              onError={setError}
            />
          </div>
          {voiceFeedback && <p className="voice-feedback">{voiceFeedback}</p>}
          <div className="button-grid who-grid">
            {WHO_OPTIONS.map(({ id, icon }) => (
              <button
                key={id}
                type="button"
                className={`big-btn ${resolvedWho() === id ? 'selected' : ''}`}
                onClick={() => setWhoAreYou(id)}
              >
                {icon} {whoLabel(id, strings)}
              </button>
            ))}
          </div>

          <h2 className="section-heading">{strings.whereLive}</h2>
          <div className="button-grid area-grid">
            {AREA_OPTIONS.map(({ id }) => (
              <button
                key={id}
                type="button"
                className={`big-btn ${resolvedArea() === id ? 'selected' : ''}`}
                onClick={() => setArea(id)}
              >
                {areaLabel(id, strings)}
              </button>
            ))}
          </div>

          {error && (
            <p className="error" role="alert">
              {strings.errorTitle}: {error}
            </p>
          )}

          <button
            type="button"
            className="primary-btn"
            disabled={categories.length === 0}
            onClick={() =>
              findResources({
                categories,
                whoAreYou: resolvedWho(),
                area: resolvedArea(),
              })
            }
          >
            {strings.findResources}
          </button>
        </section>
      )}

      {screen === 4 && (
        <section className="screen loading-screen">
          <div className="spinner" aria-hidden="true" />
          <p>{strings.loading}</p>
        </section>
      )}

      {screen === 5 && (
        <section className="screen screen-results">
          <div className="read-controls">
            {!readingAloud ? (
              <button type="button" className="secondary-btn" onClick={readResultsAloud}>
                {strings.readToMe}
              </button>
            ) : (
              <button type="button" className="stop-btn" onClick={handleStopReading}>
                {strings.stopReading}
              </button>
            )}
          </div>

          <div className="results">
            {results.length === 0 ? (
              <div className="no-results">
                <p>{strings.noResults}</p>
                <p className="no-results-hint">{strings.noResultsHint}</p>
              </div>
            ) : (
              results.map((resource) => (
                <article key={`${resource.name}-${resource.phone}`} className="result-card">
                  <h2>{resource.name}</h2>
                  {resource.category && (
                    <p className="result-category">{resource.category}</p>
                  )}
                  <p className="result-description">{resource.description}</p>
                  {resource.address && (
                    <p className="detail">📍 {resource.address}</p>
                  )}
                  <p className="detail">
                    📞{' '}
                    {resource.phone.startsWith('See') || resource.phone.includes('@') ? (
                      resource.phone
                    ) : (
                      <a href={`tel:${resource.phone.replace(/\D/g, '')}`}>{resource.phone}</a>
                    )}
                  </p>
                  <p className="detail">🕐 {resource.hours}</p>
                  <p className="detail">🗣️ {resource.languages.join(', ')}</p>
                  {resource.website && (
                    <p className="detail">
                      🌐{' '}
                      <a
                        href={resource.website.split(/\s+/)[0]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {strings.website}
                      </a>
                    </p>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      )}
      </div>

      <div className="app-footer-zone">
        <EmergencyFooter language={language} />
      </div>
    </main>
  );
}
