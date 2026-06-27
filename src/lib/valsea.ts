import type { Language } from '../types';

const API_BASE = import.meta.env.DEV ? '/api/valsea' : 'https://api.valsea.ai';

function getApiKey(): string {
  const key = import.meta.env.VITE_VALSEA_API_KEY;
  if (!key) throw new Error('Missing VITE_VALSEA_API_KEY');
  return key;
}

function valseaLanguage(language: Language): string {
  return language === 'French' ? 'french-ca' : 'english-us';
}

export async function transcribeAudio(blob: Blob, language: Language): Promise<string> {
  const formData = new FormData();
  formData.append('file', blob, 'recording.webm');
  formData.append('model', 'valsea-transcribe');
  formData.append('language', valseaLanguage(language));
  formData.append('enable_correction', 'true');
  formData.append('response_format', 'verbose_json');

  const response = await fetch(`${API_BASE}/v1/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getApiKey()}` },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? data.error?.message ?? `Transcription failed (${response.status})`);
  }
  const text = (data.clarified_text ?? data.text ?? '') as string;
  return text.trim();
}

export async function speakText(text: string, language: Language): Promise<void> {
  const response = await fetch(`${API_BASE}/v1/audio/speech`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'valsea-tts',
      input: text,
      voice: 'valsea-neutral',
      language: valseaLanguage(language),
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message ?? `Speech failed (${response.status})`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  try {
    const audio = new Audio(url);
    await new Promise<void>((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error('Audio playback failed'));
      audio.play().catch(reject);
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function recordUntilStopped(): Promise<{ start: () => Promise<void>; stop: () => Promise<Blob> }> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true },
  });
  const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
    ? 'audio/webm;codecs=opus'
    : MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : 'audio/mp4';
  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  return {
    async start() {
      chunks.length = 0;
      recorder.start(250);
    },
    stop() {
      return new Promise<Blob>((resolve, reject) => {
        recorder.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          resolve(new Blob(chunks, { type: mimeType }));
        };
        recorder.onerror = () => {
          stream.getTracks().forEach((t) => t.stop());
          reject(new Error('Recording failed'));
        };
        if (recorder.state === 'inactive') {
          stream.getTracks().forEach((t) => t.stop());
          reject(new Error('Recording was not started'));
          return;
        }
        recorder.stop();
      });
    },
  };
}
