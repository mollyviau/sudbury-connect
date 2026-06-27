import type { Language, MatchedResource } from '../types';

let cancelled = false;
let keepAliveTimer: ReturnType<typeof setInterval> | null = null;

export type ReadAloudLabels = {
  whatTheyOffer: string;
  phone: string;
  hours: string;
  address: string;
};

function formatPhoneForSpeech(phone: string): string {
  return phone.replace(/\D/g, ' ').trim();
}

/** One spoken block per result card — better for TTS quality. */
export function buildResultSpeechBlocks(
  results: MatchedResource[],
  labels: ReadAloudLabels,
): string[] {
  return results.map((resource) => {
    const parts = [resource.name, `${labels.whatTheyOffer}: ${resource.description}`];
    if (resource.address) parts.push(`${labels.address}: ${resource.address}`);
    if (resource.phone && !resource.phone.startsWith('See')) {
      parts.push(`${labels.phone}: ${formatPhoneForSpeech(resource.phone)}`);
    }
    if (resource.hours && resource.hours !== 'Contact for hours') {
      parts.push(`${labels.hours}: ${resource.hours}`);
    }
    return parts.join('. ');
  });
}

/** @deprecated Use buildResultSpeechBlocks */
export function buildResultSpeechSegments(
  results: MatchedResource[],
  labels: ReadAloudLabels,
): string[] {
  return buildResultSpeechBlocks(results, labels);
}

function startKeepAlive(): void {
  stopKeepAlive();
  // Chrome can pause long speechSynthesis queues after ~15 s without this.
  keepAliveTimer = setInterval(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      speechSynthesis.resume();
    }
  }, 10_000);
}

function stopKeepAlive(): void {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

export function stopReading(): void {
  cancelled = true;
  stopKeepAlive();
  speechSynthesis.cancel();
}

function frenchVoiceHints(name: string): boolean {
  return /français|francais|french|hortense|caroline|denise|sylvie|julie|claire|amelie|michelle|thomas|guillaume|audrey|virginie|chloe/i.test(
    name,
  );
}

function voiceScore(voice: SpeechSynthesisVoice, language: Language): number {
  const lang = voice.lang.toLowerCase();
  const name = voice.name;

  if (language === 'French') {
    let score = -1;
    if (lang === 'fr-ca') score = 100;
    else if (lang.startsWith('fr-')) score = 85;
    else if (frenchVoiceHints(name)) score = 75;

    if (score < 0) return -1;

    if (/caroline|denise|hortense|sylvie/i.test(name)) score += 15;
    if (voice.localService) score += 8;
    return score;
  }

  let score = -1;
  if (lang === 'en-ca') score = 100;
  else if (lang.startsWith('en-')) score = 80;
  if (score < 0) return -1;
  if (voice.localService) score += 8;
  return score;
}

function pickVoice(language: Language): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices();
  const ranked = voices
    .map((voice) => ({ voice, score: voiceScore(voice, language) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.voice;
}

/** Split long card text so the browser TTS engine doesn't silently drop it. */
function chunkText(text: string, maxLen = 200): string[] {
  if (text.length <= maxLen) return [text];

  const parts: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let buf = '';

  for (const sentence of sentences) {
    const next = buf ? `${buf} ${sentence}` : sentence;
    if (next.length > maxLen && buf) {
      parts.push(buf.trim());
      buf = sentence;
    } else {
      buf = next;
    }
  }

  if (buf.trim()) parts.push(buf.trim());
  return parts.length > 0 ? parts : [text];
}

function flattenSegments(segments: string[]): string[] {
  return segments.flatMap((segment) => chunkText(segment));
}

/** Warm up voices — call on results screen so they're ready before Read to me. */
export function primeSpeechVoices(): void {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.getVoices();
  speechSynthesis.addEventListener(
    'voiceschanged',
    () => speechSynthesis.getVoices(),
    { once: true },
  );
}

/**
 * Read text aloud using browser speechSynthesis only.
 * Valsea TTS does not support French — browser fr-CA is the correct path.
 * The first utterance MUST start synchronously (same turn as the click handler).
 */
export function readSegments(
  segments: string[],
  language: Language,
  onDone: () => void,
): void {
  if (!('speechSynthesis' in window)) {
    onDone();
    return;
  }

  cancelled = false;
  speechSynthesis.cancel();

  const queue = flattenSegments(segments);
  if (queue.length === 0) {
    onDone();
    return;
  }

  const lang = language === 'French' ? 'fr-CA' : 'en-CA';
  let index = 0;

  function finish(): void {
    stopKeepAlive();
    onDone();
  }

  function speakNext(): void {
    if (cancelled) {
      finish();
      return;
    }
    if (index >= queue.length) {
      finish();
      return;
    }

    const text = queue[index++];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = language === 'French' ? 0.9 : 0.95;

    const voice = pickVoice(language);
    if (voice) utterance.voice = voice;

    utterance.onend = speakNext;
    utterance.onerror = speakNext;
    speechSynthesis.speak(utterance);
  }

  // Same synchronous turn as the button click — required by Chrome/Edge.
  speechSynthesis.getVoices();
  speechSynthesis.resume();
  startKeepAlive();
  speakNext();
}

export function isSpeechSupported(): boolean {
  return 'speechSynthesis' in window;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  primeSpeechVoices();
}
