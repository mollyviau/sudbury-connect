import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  type Audience,
  type Category,
  type Intake,
  type Language,
  matchResources,
} from "@/lib/resources";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sudbury Connect — Find local help in 3 simple screens" },
      {
        name: "description",
        content:
          "Answer a few quick questions and get a short list of real Sudbury organizations that can help with food, housing, mental health, legal aid, jobs and more.",
      },
      { property: "og:title", content: "Sudbury Connect" },
      {
        property: "og:description",
        content:
          "A friendly guide to community resources in Greater Sudbury. Tell us what's going on and we'll point you to the right people.",
      },
    ],
  }),
  component: Index,
});

const CATEGORY_STYLES: Record<
  Category,
  { emoji: string; hint: string; tint: string; bar: string }
> = {
  food: { emoji: "🍲", hint: "Meals, groceries, food bank", tint: "bg-coral/10", bar: "bg-coral" },
  housing: { emoji: "🏠", hint: "Rent, shelter, eviction", tint: "bg-primary/10", bar: "bg-primary" },
  mental_health: { emoji: "💛", hint: "Stress, anxiety, low mood", tint: "bg-sun/15", bar: "bg-sun" },
  crisis: { emoji: "🆘", hint: "Need help today", tint: "bg-bloom/10", bar: "bg-bloom" },
  addiction: { emoji: "🤝", hint: "Drugs, alcohol, recovery", tint: "bg-leaf/10", bar: "bg-leaf" },
  employment: { emoji: "💼", hint: "Job loss, training, income", tint: "bg-accent/15", bar: "bg-accent" },
  legal: { emoji: "⚖️", hint: "Tenant, ODSP, OW, rights", tint: "bg-coral/10", bar: "bg-coral" },
  family: { emoji: "👨‍👩‍👧", hint: "Parenting, childcare, youth", tint: "bg-bloom/10", bar: "bg-bloom" },
  health: { emoji: "🩺", hint: "Doctor, clinic, senior care", tint: "bg-leaf/10", bar: "bg-leaf" },
};

const SCREEN2_CATEGORIES: { id: Category; emoji: string; labelEn: string; labelFr: string }[] = [
  { id: "food", emoji: "🍎", labelEn: "Food", labelFr: "Nourriture" },
  { id: "housing", emoji: "🏠", labelEn: "Housing", labelFr: "Logement" },
  { id: "mental_health", emoji: "🧠", labelEn: "Mental Health", labelFr: "Santé mentale" },
  { id: "employment", emoji: "💼", labelEn: "Employment", labelFr: "Emploi" },
  { id: "legal", emoji: "⚖️", labelEn: "Legal Help", labelFr: "Aide juridique" },
  { id: "family", emoji: "👶", labelEn: "Family & Children", labelFr: "Famille et enfants" },
  { id: "health", emoji: "🧓", labelEn: "Senior Support", labelFr: "Soutien aux aînés" },
];

const AUDIENCES: { id: Audience; labelEn: string; labelFr: string; emoji: string }[] = [
  { id: "student", labelEn: "Student", labelFr: "Étudiant(e)", emoji: "🎓" },
  { id: "senior", labelEn: "Senior", labelFr: "Aîné(e)", emoji: "🧓" },
  { id: "family", labelEn: "Family", labelFr: "Famille", emoji: "👨‍👩‍👧" },
  { id: "individual", labelEn: "Individual", labelFr: "Individu", emoji: "👤" },
];

const LANGUAGES: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
  { id: "both", label: "Either is fine" },
];

const AREAS: { id: string; labelEn: string; labelFr: string }[] = [
  { id: "downtown", labelEn: "Downtown", labelFr: "Centre-ville" },
  { id: "south-end", labelEn: "South End", labelFr: "Extrémité sud" },
  { id: "hanmer", labelEn: "Hanmer", labelFr: "Hanmer" },
  { id: "capreol", labelEn: "Capreol", labelFr: "Capreol" },
  { id: "val-caron", labelEn: "Val Caron", labelFr: "Val Caron" },
  { id: "not-sure", labelEn: "Not sure", labelFr: "Je ne sais pas" },
];

type Step = "lang" | 0 | 1 | 2 | 3 | 4 | 5;

const LANG_STORAGE_KEY = "sudbury-connect:language";

function Index() {
  const [step, setStep] = useState<Step>("lang");
  const [categories, setCategories] = useState<Category[]>([]);
  const [audience, setAudience] = useState<Audience>("individual");
  const [language, setLanguage] = useState<Language>("en");
  const [area, setArea] = useState<string>("Not sure");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (saved === "en" || saved === "fr") {
      setLanguage(saved);
      setStep(1);
    }
  }, []);

  useEffect(() => {
    if (step !== 3) return;
    const timer = setTimeout(() => setStep(4), 2500);
    return () => clearTimeout(timer);
  }, [step]);

  function chooseLanguage(lang: Language) {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
    setStep(1);
  }

  const intake: Intake = { categories, audience, language, area };
  const results = useMemo(() => matchResources(intake), [categories, audience, language, area]);

  function reset() {
    setStep(1);
    setCategories([]);
    setAudience("individual");
    setArea("Not sure");
  }

  function goBack() {
    if (step === "lang") return;
    if (step === 1) setStep("lang");
    else if (step === 3 || step === 4) setStep(2);
    else if (typeof step === "number" && step > 1) setStep((step - 1) as Step);
  }

  function toggleCategory(c: Category) {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  if (step === "lang") {
    return <LanguageSplash onChoose={chooseLanguage} />;
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header language={language} />
      <div className="mx-auto w-full max-w-3xl px-5 pt-4 sm:pt-6">
        <BackButton onBack={goBack} language={language} />
      </div>
      <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-4 sm:pt-6">
        
        {step > 0 && step < 3 && (
          <Progress
            current={step as number}
            total={2}
          />
        )}

        {step === 1 && (
          <Question
            title={language === "fr" ? "De quoi avez-vous besoin d'aide?" : "What do you need help with?"}
            subtitle={
              language === "fr"
                ? "Choisissez tout ce qui s'applique. Vous pouvez en choisir plusieurs."
                : "Pick anything that fits. You can choose more than one."
            }
          >
            <div className="flex items-center justify-center">
              <button
                type="button"
                disabled
                aria-label="Voice input coming soon"
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary text-3xl text-muted-foreground"
              >
                🎤
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SCREEN2_CATEGORIES.map((c) => {
                const active = categories.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    aria-pressed={active}
                    className={`flex min-h-14 w-full items-center gap-4 rounded-xl border p-5 text-left shadow-sm transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary hover:bg-secondary"
                    }`}
                  >
                    <span aria-hidden className="text-5xl">{c.emoji}</span>
                    <span className="text-xl font-bold">
                      {language === "fr" ? c.labelFr : c.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>
            <NextButton
              label={language === "fr" ? "Suivant" : "Next"}
              disabled={categories.length === 0}
              onClick={() => setStep(2)}
            />
          </Question>
        )}

        {step === 2 && (
          <Question
            title={language === "fr" ? "Un peu à propos de vous" : "A Bit About You"}
            subtitle={language === "fr" ? "Deux questions rapides." : "Two quick questions."}
          >
            <div className="flex items-center justify-center">
              <button
                type="button"
                disabled
                aria-label="Voice input coming soon"
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary text-3xl text-muted-foreground"
              >
                🎤
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-bold text-foreground">
                {language === "fr" ? "Qui êtes-vous?" : "Who are you?"}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {AUDIENCES.map((a) => {
                  const active = audience === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAudience(a.id)}
                      aria-pressed={active}
                      className={`flex min-h-14 w-full items-center gap-3 rounded-xl border p-4 text-left shadow-sm transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary hover:bg-secondary"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl"
                      >
                        {a.emoji}
                      </span>
                      <span className="text-xl font-bold">
                        {language === "fr" ? a.labelFr : a.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-foreground">
                {language === "fr" ? "Où en Sudbury?" : "Where in Sudbury?"}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {AREAS.map((a) => {
                  const active = area === a.labelEn;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setArea(a.labelEn)}
                      aria-pressed={active}
                      className={`relative flex min-h-14 w-full items-center rounded-xl border p-4 text-left text-lg font-bold shadow-sm transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary hover:bg-secondary"
                      }`}
                    >
                      <span aria-hidden className="mr-2">📍</span>
                      {language === "fr" ? a.labelFr : a.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            <NextButton
              label={language === "fr" ? "Trouver des ressources" : "Find Resources"}
              onClick={() => setStep(3)}
            />
          </Question>
        )}



        {step === 3 && <LoadingScreen language={language} />}
        {step === 4 && <Results results={results} intake={intake} onReset={reset} />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ language }: { language: Language }) {
  return _Header({ language });
}

function LanguageSplash({ onChoose }: { onChoose: (lang: Language) => void }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-6 py-10 text-foreground">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Sudbury Connect</h1>
        <p className="mt-3 text-xl text-muted-foreground" style={{ lineHeight: 1.6 }}>
          Choose your language · Choisissez votre langue
        </p>
      </div>
      <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChoose("en")}
          className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl bg-primary p-8 text-primary-foreground shadow-sm transition hover:brightness-90 active:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          <span aria-hidden className="text-6xl">EN</span>
          <span className="text-3xl font-bold">English</span>
        </button>
        <button
          type="button"
          onClick={() => onChoose("fr")}
          className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl bg-accent p-8 text-accent-foreground shadow-sm transition hover:brightness-90 active:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          <span aria-hidden className="text-6xl">FR</span>
          <span className="text-3xl font-bold">Français</span>
        </button>
      </div>
    </div>
  );
}

function _Header({ language }: { language: Language }) {
  const isFr = language === "fr";
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-5 py-4">
        <div
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-primary-foreground"
        >
          🤝
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-bold leading-none text-foreground">
            {isFr ? "Connexion Sudbury" : "Sudbury Connect"}
          </p>
          <p className="mt-1 text-base text-muted-foreground">
            {isFr ? "Trouver de l'aide, en mots simples." : "Help finding help, in plain words."}
          </p>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-3xl px-5 py-6 text-center text-sm text-muted-foreground">
        If you're in immediate danger, call{" "}
        <a href="tel:911" className="font-bold text-primary underline">
          911
        </a>
        . For 24/7 crisis support, call the Sudbury Crisis Line at{" "}
        <a href="tel:7056754760" className="font-bold text-primary underline">
          (705) 675-4760
        </a>
        .
      </div>
    </footer>
  );
}

function FlatGraphic() {
  return (
    <svg
      viewBox="0 0 360 240"
      className="absolute -right-8 -top-8 w-64 opacity-90 sm:w-80"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="180" cy="120" r="100" className="fill-sun" opacity="0.35" />
      <circle cx="260" cy="70" r="60" className="fill-coral" opacity="0.25" />
      <rect x="40" y="150" width="90" height="50" rx="25" className="fill-accent" opacity="0.3" />
      <circle cx="300" cy="180" r="25" className="fill-leaf" opacity="0.3" />
      <rect x="220" y="160" width="50" height="30" rx="15" className="fill-bloom" opacity="0.2" />
    </svg>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary p-8 sm:p-12">
      <FlatGraphic />
      <div className="relative text-primary-foreground">
        <p className="font-display text-sm font-bold uppercase tracking-widest text-primary-foreground/90">
          Welcome to Sudbury Connect
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Tell us what's going on. We'll point you to real local help.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
          Answer <span className="font-bold">4 quick questions</span> and we'll show you a short
          list of Sudbury organizations that fit your situation — with phone numbers, hours and what
          they actually offer.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-4 text-lg font-bold text-primary transition hover:brightness-110 active:scale-[0.99]"
        >
          Let's get started →
        </button>
        <p className="mt-4 text-sm text-primary-foreground/70">Free · Anonymous · Takes about a minute</p>
      </div>
    </section>
  );
}

function Progress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="mb-6 mt-2">
      <div className="flex justify-between text-base font-bold uppercase tracking-wider text-muted-foreground">
        <span>
          Question {current} of {total}
        </span>
      </div>
      <div className="mt-2 flex h-4 gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition ${
              i < current ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function BackButton({ onBack, language }: { onBack: () => void; language: Language }) {
  const label = language === "fr" ? "Retour" : "Back";
  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex min-h-14 items-center gap-2 rounded-xl border border-border bg-card px-6 text-xl font-bold text-foreground shadow-sm hover:bg-secondary active:bg-secondary"
      aria-label={language === "fr" ? "Retourner à l'écran précédent" : "Go back to previous screen"}
    >
      <span aria-hidden>←</span> {label}
    </button>
  );
}

function LoadingScreen({ language }: { language: Language }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div
        className="h-14 w-14 rounded-full border-4 border-border border-t-primary animate-spin"
        aria-hidden="true"
      />
      <p className="text-2xl font-bold text-foreground">
        {language === "fr" ? "Nous cherchons des ressources pour vous..." : "Finding resources for you..."}
      </p>
    </div>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function NextButton({
  onClick,
  disabled,
  label = "Continue",
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div className="mt-8 flex justify-center sm:justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-xl font-bold text-primary-foreground shadow-sm transition hover:brightness-90 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {label} →
      </button>
    </div>
  );
}

function Results({
  results,
  intake,
  onReset,
}: {
  results: ReturnType<typeof matchResources>;
  intake: Intake;
  onReset: () => void;
}) {
  const isFr = intake.language === "fr";
  const top = results.slice(0, 5);

  function langLabel(l: Language) {
    if (l === "both") return isFr ? "Anglais et français" : "English & French";
    if (l === "fr") return isFr ? "Français" : "French";
    return isFr ? "Anglais" : "English";
  }

  function readToMe() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const intro = isFr
      ? `Voici ${top.length} ressources qui peuvent vous aider.`
      : `Here are ${top.length} resources that can help you.`;
    const parts = [intro];
    top.forEach((r, i) => {
      const hours = r.hours ? (isFr ? ` Heures: ${r.hours}.` : ` Hours: ${r.hours}.`) : "";
      const phone = r.phone ? (isFr ? ` Téléphone: ${r.phone}.` : ` Phone: ${r.phone}.`) : "";
      parts.push(`${i + 1}. ${r.name}. ${r.blurb}${phone}${hours}`);
    });
    const utter = new SpeechSynthesisUtterance(parts.join(" "));
    utter.lang = isFr ? "fr-CA" : "en-CA";
    utter.rate = 0.95;
    synth.speak(utter);
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={readToMe}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-accent px-6 text-xl font-bold text-accent-foreground shadow-sm transition hover:brightness-90 active:brightness-90 sm:w-auto"
        >
          <span aria-hidden className="text-2xl">🔊</span>
          {isFr ? "Lire à voix haute" : "Read to me"}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-base font-bold uppercase tracking-widest text-primary">
            {isFr ? "Votre liste" : "Here's your shortlist"}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            {top.length > 0
              ? isFr
                ? `${top.length} endroit${top.length === 1 ? "" : "s"} qui peuvent aider`
                : `${top.length} place${top.length === 1 ? "" : "s"} that can help`
              : isFr
              ? "Essayons une combinaison différente"
              : "Let's try a different combination"}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {isFr
              ? "Selon ce que vous nous avez dit, ces organismes de Sudbury peuvent vous aider. Choisissez-en un et appelez — ils vous écouteront."
              : "Based on what you told us, these Sudbury organizations are a good fit. Pick one to call — they'll listen and help you figure out the next step."}
          </p>
        </div>
      </div>

      {top.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center shadow-sm">
          <p className="text-xl font-bold text-foreground">
            {isFr ? "Aucune correspondance exacte." : "No exact matches yet."}
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            {isFr ? "Appelez le " : "Call "}
            <span className="font-bold text-primary">2-1-1</span>
            {isFr
              ? " en tout temps — c'est gratuit et ils peuvent vous orienter."
              : " any time — it's free and they can point you to the right place."}
          </p>
        </div>
      )}

      <ul className="space-y-4">
        {top.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-border bg-card shadow-sm transition hover:border-primary"
            style={{ padding: "20px" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-xl font-bold leading-tight text-foreground">{r.name}</h3>
              <span className="rounded-md border border-border bg-secondary px-3 py-1 text-sm font-bold text-foreground">
                📍 {r.area}
              </span>
            </div>
            <p
              className="mt-3 text-foreground"
              style={{ fontSize: "18px", color: "#6b7280", lineHeight: 1.6 }}
            >
              {r.blurb}
            </p>

            {r.phone && (
              <a
                href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}
                className="mt-5 flex min-h-14 items-center gap-3 rounded-xl border border-border bg-secondary px-5 font-bold text-primary shadow-sm transition hover:bg-card hover:border-primary"
                aria-label={`${isFr ? "Appeler" : "Call"} ${r.name} ${r.phone}`}
              >
                <span aria-hidden className="text-2xl">📞</span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {isFr ? "Appeler" : "Call"}
                  </span>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: "#1a56db" }}>
                    {r.phone}
                  </span>
                </span>
              </a>
            )}

            <dl className="mt-5 space-y-3 text-lg">
              {r.hours && (
                <div className="flex items-start gap-3">
                  <span aria-hidden className="text-xl">🕐</span>
                  <div>
                    <dt className="font-bold text-foreground">{isFr ? "Heures" : "Hours"}</dt>
                    <dd className="text-muted-foreground">{r.hours}</dd>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <span aria-hidden className="text-xl">🗣️</span>
                <div>
                  <dt className="font-bold text-foreground">{isFr ? "Langues servies" : "Languages served"}</dt>
                  <dd className="text-muted-foreground">{langLabel(r.language)}</dd>
                </div>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-6">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 text-xl font-bold text-primary-foreground shadow-sm transition hover:brightness-90 active:brightness-90 sm:w-auto"
        >
          <span aria-hidden className="text-2xl">🔄</span>
          {isFr ? "Recommencer" : "Start Over"}
        </button>
      </div>
    </section>
  );
}
