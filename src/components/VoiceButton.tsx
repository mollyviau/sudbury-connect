import { useRef, useState } from 'react';
import type { Language } from '../types';
import {
  isBrowserSpeechSupported,
  startBrowserSpeechSession,
  stopBrowserSpeechSession,
} from '../lib/browserSpeech';
import { transcribeAudio, recordUntilStopped } from '../lib/valsea';

type VoiceButtonProps = {
  language: Language;
  label: string;
  listeningLabel: string;
  processingLabel: string;
  onTranscript: (text: string) => Promise<void>;
  onError: (message: string) => void;
};

export function VoiceButton({
  language,
  label,
  listeningLabel,
  processingLabel,
  onTranscript,
  onError,
}: VoiceButtonProps) {
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [liveText, setLiveText] = useState('');
  const browserRecRef = useRef<SpeechRecognition | null>(null);
  const valseaSessionRef = useRef<Awaited<ReturnType<typeof recordUntilStopped>> | null>(null);
  const useBrowser = isBrowserSpeechSupported();

  async function finishWithTranscript(text: string) {
    setProcessing(true);
    setLiveText('');
    try {
      await onTranscript(text);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Voice input failed');
    } finally {
      setProcessing(false);
    }
  }

  async function stopValseaRecording() {
    setListening(false);
    setProcessing(true);
    try {
      const session = valseaSessionRef.current;
      if (!session) return;
      const blob = await session.stop();
      valseaSessionRef.current = null;
      if (blob.size < 1000) {
        onError('Recording too short — speak a full sentence, then tap mic again');
        return;
      }
      const text = await transcribeAudio(blob, language);
      if (!text) {
        onError('Could not understand — try again');
        return;
      }
      await onTranscript(text);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Voice input failed');
    } finally {
      setProcessing(false);
      setLiveText('');
    }
  }

  async function toggleListening() {
    if (processing) return;

    if (listening) {
      if (useBrowser && browserRecRef.current) {
        setListening(false);
        stopBrowserSpeechSession(browserRecRef.current);
        return;
      }
      await stopValseaRecording();
      return;
    }

    setLiveText('');

    if (useBrowser) {
      try {
        browserRecRef.current = startBrowserSpeechSession(language, {
          onPartial: setLiveText,
          onFinal: (text) => {
            browserRecRef.current = null;
            setListening(false);
            void finishWithTranscript(text);
          },
          onError: (msg) => {
            browserRecRef.current = null;
            setListening(false);
            setLiveText('');
            if (msg !== 'Listening cancelled') onError(msg);
          },
        });
        setListening(true);
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Speech recognition failed');
      }
      return;
    }

    try {
      valseaSessionRef.current = await recordUntilStopped();
      await valseaSessionRef.current.start();
      setListening(true);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Microphone access denied');
    }
  }

  const statusLabel = processing
    ? processingLabel
    : liveText
      ? `"${liveText}"`
      : listening
        ? listeningLabel
        : label;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className={`flex h-16 w-16 items-center justify-center rounded-full border-[3px] text-3xl shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
          listening
            ? 'border-destructive bg-destructive/15'
            : processing
              ? 'cursor-wait border-primary bg-primary/15 opacity-80'
              : 'border-border bg-card hover:border-primary'
        }`}
        title={statusLabel}
        aria-label={statusLabel}
        aria-pressed={listening}
        aria-busy={processing}
        disabled={processing}
        onClick={toggleListening}
      >
        {processing ? '⏳' : '🎤'}
      </button>
      {(listening || processing || liveText) && (
        <p className="max-w-xs text-center text-base text-foreground">{statusLabel}</p>
      )}
    </div>
  );
}
