import type { Language, MatchedResource } from '../types';

let cancelled = false;

export type ReadAloudLabels = {
  whatTheyOffer: string;
  phone: string;
  hours: string;
  address: string;
};

function formatPhoneForSpeech(phone: string): string {
  return phone.replace(/\D/g, ' ').trim();
}

/** One spoken line per field, in order, for each result card. */
export function buildResultSpeechSegments(
  results: MatchedResource[],
  labels: ReadAloudLabels,
): string[] {
  const segments: string[] = [];

  for (const resource of results) {
    segments.push(resource.name);
    segments.push(`${labels.whatTheyOffer}: ${resource.description}`);
    if (resource.address) segments.push(`${labels.address}: ${resource.address}`);
    if (resource.phone && !resource.phone.startsWith('See')) {
      segments.push(`${labels.phone}: ${formatPhoneForSpeech(resource.phone)}`);
    }
    if (resource.hours && resource.hours !== 'Contact for hours') {
      segments.push(`${labels.hours}: ${resource.hours}`);
    }
  }

  return segments;
}

export function stopReading(): void {
  cancelled = true;
  speechSynthesis.cancel();
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.startsWith(lang.slice(0, 2))) ??
    voices.find((v) => v.default)
  );
}

function runWhenVoicesReady(callback: () => void): void {
  if (speechSynthesis.getVoices().length > 0) {
    callback();
    return;
  }
  speechSynthesis.addEventListener('voiceschanged', callback, { once: true });
}

export function readSegments(
  segments: string[],
  language: Language,
  onDone: () => void,
): void {
  stopReading();
  cancelled = false;

  const lang = language === 'French' ? 'fr-CA' : 'en-CA';
  let index = 0;

  function speakNext() {
    if (cancelled || index >= segments.length) {
      onDone();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(segments[index++]);
    utterance.lang = lang;
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.onend = speakNext;
    utterance.onerror = speakNext;
    speechSynthesis.speak(utterance);
  }

  runWhenVoicesReady(() => {
    speechSynthesis.resume();
    speakNext();
  });
}

export function isSpeechSupported(): boolean {
  return 'speechSynthesis' in window;
}
