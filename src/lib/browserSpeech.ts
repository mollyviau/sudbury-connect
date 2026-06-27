import type { Language } from '../types';

type SpeechRecognitionCtor = new () => SpeechRecognition;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  const w = window as Window & { webkitSpeechRecognition?: SpeechRecognitionCtor };
  return window.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isBrowserSpeechSupported(): boolean {
  return getSpeechRecognitionCtor() != null;
}

export function startBrowserSpeechSession(
  language: Language,
  handlers: {
    onPartial?: (text: string) => void;
    onFinal: (text: string) => void;
    onError: (message: string) => void;
  },
): SpeechRecognition {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) throw new Error('Speech recognition not supported in this browser');

  const rec = new Ctor();
  rec.lang = language === 'French' ? 'fr-CA' : 'en-CA';
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  const finalParts: string[] = [];
  let settled = false;

  rec.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0]?.transcript ?? '';
      if (result.isFinal) {
        finalParts.push(transcript.trim());
      } else {
        interim += transcript;
      }
    }
    const combined = [...finalParts, interim.trim()].filter(Boolean).join(' ');
    if (combined) handlers.onPartial?.(combined);
  };

  rec.onerror = (event) => {
    if (settled) return;
    settled = true;
    const msg =
      event.error === 'no-speech'
        ? 'No speech detected — try again'
        : event.error === 'not-allowed'
          ? 'Microphone access denied'
          : event.error === 'aborted'
            ? 'Listening cancelled'
            : `Speech error: ${event.error}`;
    handlers.onError(msg);
  };

  rec.onend = () => {
    if (settled) return;
    settled = true;
    const text = finalParts.join(' ').trim();
    if (!text) {
      handlers.onError('Could not understand — try again');
      return;
    }
    handlers.onFinal(text);
  };

  rec.start();
  return rec;
}

export function stopBrowserSpeechSession(rec: SpeechRecognition): void {
  rec.stop();
}

export function abortBrowserSpeechSession(rec: SpeechRecognition): void {
  rec.abort();
}
