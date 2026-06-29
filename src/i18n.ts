import type { Language } from './types';

type Strings = {
  appTitle: string;
  pickLanguage: string;
  english: string;
  french: string;
  whatNeed: string;
  whatNeedSub: string;
  aboutYouTitle: string;
  aboutYouSub: string;
  back: string;
  questionOf: string;
  tagline: string;
  resultsEyebrow: string;
  resultsSub: string;
  callLabel: string;
  languagesServed: string;
  resourcesPageTitle: string;
  resourcesPageIntro: string;
  resourcesFilterLabel: string;
  resourcesClearFilters: string;
  resourcesLoading: string;
  resourcesNoMatchTitle: string;
  resourcesNoMatchHint: string;
  resourcesVisitWebsite: string;
  resourcesLanguageLabel: string;
  resourcesCountLabel: string;
  resourcesDataSources: string;
  resourcesOsmSource: string;
  whoAreYou: string;
  whereLive: string;
  next: string;
  findResources: string;
  loading: string;
  readToMe: string;
  stopReading: string;
  home: string;
  startOver: string;
  viewMoreResources: string;
  phone: string;
  hours: string;
  whatTheyOffer: string;
  languages: string;
  address: string;
  website: string;
  noResults: string;
  noResultsHint: string;
  voiceHint: string;
  voiceListening: string;
  voiceProcessing: string;
  voiceNoMatch: string;
  voiceHeard: string;
  voiceSearching: string;
  voiceHintFull: string;
  errorTitle: string;
  tryAgain: string;
  student: string;
  senior: string;
  family: string;
  individual: string;
  downtown: string;
  southEnd: string;
  hanmer: string;
  capreol: string;
  valCaron: string;
  notSure: string;
  prevResult: string;
  nextResult: string;
  footerTitle: string;
  footerEmergency: string;
  footerCrisis: string;
  footerSuicide: string;
  footer211: string;
  footer811: string;
  footerKids: string;
  footer247: string;
  categories: Record<string, string>;
  skipToMain: string;
  navHomeLabel: string;
  navResources: string;
  navAbout: string;
  navMainLabel: string;
  openMenu: string;
  closeMenu: string;
  mobileMenuLabel: string;
  opensInNewTab: string;
  categoriesGroupLabel: string;
  whoGroupLabel: string;
  areaGroupLabel: string;
  progressStep: string;
  pageTitleLanguage: string;
  pageTitleNeed: string;
  pageTitleAboutYou: string;
  pageTitleLoading: string;
  pageTitleResults: string;
  pageTitleResources: string;
  h1Language: string;
  h1Need: string;
  h1AboutYou: string;
  h1Loading: string;
  h1Results: string;
  selectCategoryHint: string;
  resultsLoaded: string;
  descriptionEnglishOnly: string;
};

const en: Strings = {
  appTitle: 'Sudbury Connect',
  pickLanguage: 'Choose your language',
  english: 'English',
  french: 'Français',
  whatNeed: 'What do you need help with?',
  whatNeedSub: 'Pick anything that fits. You can choose more than one.',
  aboutYouTitle: 'A bit about you',
  aboutYouSub: 'Two quick questions.',
  back: 'Back',
  questionOf: 'Question',
  tagline: 'Help finding help, in plain words.',
  resultsEyebrow: "Here's your shortlist",
  resultsSub:
    "Based on what you told us, these Sudbury organizations are a good fit. Pick one to call — they'll listen and help you figure out the next step.",
  callLabel: 'Call',
  languagesServed: 'Languages served',
  resourcesPageTitle: 'Community resources',
  resourcesPageIntro:
    'Browse real Greater Sudbury organizations. Select one or more topics to filter the list.',
  resourcesFilterLabel: 'Filter resources by topic',
  resourcesClearFilters: 'Clear all filters',
  resourcesLoading: 'Loading resources…',
  resourcesNoMatchTitle: 'No resources match those topics.',
  resourcesNoMatchHint: 'Try clearing filters or choosing a different combination.',
  resourcesVisitWebsite: 'Visit website',
  resourcesLanguageLabel: 'Display language',
  resourcesCountLabel: 'resources',
  resourcesDataSources:
    '{total} organizations ({curated} curated + {osm} from OpenStreetMap).',
  resourcesOsmSource: 'OpenStreetMap',
  whoAreYou: 'Who are you?',
  whereLive: 'Where in Sudbury?',
  next: 'Next →',
  findResources: 'Find Resources →',
  loading: 'Finding resources for you...',
  readToMe: '🔊 Read to me',
  stopReading: '⏹ Stop reading',
  home: 'Home',
  startOver: '🔄 Start Over',
  viewMoreResources: 'View all matching resources →',
  phone: 'Phone',
  hours: 'Hours',
  whatTheyOffer: 'What they offer',
  languages: 'Languages',
  address: 'Address',
  website: 'Website',
  noResults: 'No matching resources found for those choices.',
  noResultsHint: 'Try a different category or area — or tap Home to start again.',
  voiceHint: 'Tap mic — say what you need and about you',
  voiceListening: 'Listening… tap mic when done',
  voiceProcessing: 'Understanding…',
  voiceNoMatch: 'Could not match your words — try again or tap the buttons',
  voiceHeard: 'Heard:',
  voiceSearching: 'Got it — finding resources for you…',
  voiceHintFull: 'Try: "I\'m a student and I need food"',
  errorTitle: 'Something went wrong',
  tryAgain: 'Try again',
  student: 'Student',
  senior: 'Senior',
  family: 'Family',
  individual: 'Individual',
  downtown: 'Downtown',
  southEnd: 'South End',
  hanmer: 'Hanmer',
  capreol: 'Capreol',
  valCaron: 'Val Caron',
  notSure: 'Not sure',
  prevResult: 'Previous result',
  nextResult: 'Next result',
  footerTitle: 'Need help right now?',
  footerEmergency: 'If this is an emergency, call 911.',
  footerCrisis: 'Sudbury crisis line',
  footerSuicide: 'Suicide crisis helpline',
  footer211: 'Community & social services',
  footer811: 'Health advice (Ontario)',
  footerKids: 'Kids Help Phone (ages 5–29)',
  footer247: '24/7',
  categories: {
    food: 'Food',
    housing: 'Housing',
    'mental health': 'Mental Health',
    employment: 'Employment',
    legal: 'Legal Help',
    family: 'Family & Children',
    senior: 'Senior Support',
  },
  skipToMain: 'Skip to main content',
  navHomeLabel: 'Sudbury Connect — home',
  navResources: 'Resources',
  navAbout: 'About / Demo',
  navMainLabel: 'Main navigation',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  mobileMenuLabel: 'Mobile navigation menu',
  opensInNewTab: 'opens in a new tab',
  categoriesGroupLabel: 'What you need help with',
  whoGroupLabel: 'Who you are',
  areaGroupLabel: 'Where you live in Sudbury',
  progressStep: 'Question {current} of {total}',
  pageTitleLanguage: 'Choose language',
  pageTitleNeed: 'What you need',
  pageTitleAboutYou: 'About you',
  pageTitleLoading: 'Finding resources',
  pageTitleResults: 'Your matches',
  pageTitleResources: 'Community resources',
  h1Language: 'Choose your language',
  h1Need: 'What do you need help with?',
  h1AboutYou: 'A bit about you',
  h1Loading: 'Finding resources for you',
  h1Results: 'Your matched resources',
  selectCategoryHint: 'Select at least one topic above to continue.',
  resultsLoaded: 'Found {count} matching resource(s).',
  descriptionEnglishOnly: '(Description available in English only.)',
};

const fr: Strings = {
  appTitle: 'Connexion Sudbury',
  pickLanguage: 'Choisissez votre langue',
  english: 'English',
  french: 'Français',
  whatNeed: 'De quoi avez-vous besoin?',
  whatNeedSub: 'Choisissez tout ce qui s\'applique. Vous pouvez en choisir plusieurs.',
  aboutYouTitle: 'Un peu à propos de vous',
  aboutYouSub: 'Deux questions rapides.',
  back: 'Retour',
  questionOf: 'Question',
  tagline: 'Trouver de l\'aide, en mots simples.',
  resultsEyebrow: 'Votre liste',
  resultsSub:
    'Selon ce que vous nous avez dit, ces organismes de Sudbury peuvent vous aider. Choisissez-en un et appelez — ils vous écouteront.',
  callLabel: 'Appeler',
  languagesServed: 'Langues servies',
  resourcesPageTitle: 'Ressources communautaires',
  resourcesPageIntro:
    'Parcourez les organismes du Grand Sudbury. Choisissez un ou plusieurs sujets pour filtrer la liste.',
  resourcesFilterLabel: 'Filtrer les ressources par sujet',
  resourcesClearFilters: 'Effacer tous les filtres',
  resourcesLoading: 'Chargement des ressources…',
  resourcesNoMatchTitle: 'Aucune ressource ne correspond à ces sujets.',
  resourcesNoMatchHint: 'Essayez d\'effacer les filtres ou de choisir une autre combinaison.',
  resourcesVisitWebsite: 'Visiter le site web',
  resourcesLanguageLabel: 'Langue d\'affichage',
  resourcesCountLabel: 'ressources',
  resourcesDataSources:
    '{total} organismes ({curated} sélectionnés + {osm} via OpenStreetMap).',
  resourcesOsmSource: 'OpenStreetMap',
  whoAreYou: 'Qui êtes-vous?',
  whereLive: 'Où habitez-vous à Sudbury?',
  next: 'Suivant →',
  findResources: 'Trouver des ressources →',
  loading: 'Nous cherchons des ressources pour vous...',
  readToMe: '🔊 Me lire',
  stopReading: '⏹ Arrêter la lecture',
  home: 'Accueil',
  startOver: '🔄 Recommencer',
  viewMoreResources: 'Voir toutes les ressources correspondantes →',
  phone: 'Téléphone',
  hours: 'Heures',
  whatTheyOffer: 'Ce qu\'ils offrent',
  languages: 'Langues',
  address: 'Adresse',
  website: 'Site web',
  noResults: 'Aucune ressource ne correspond à vos choix.',
  noResultsHint: 'Essayez une autre catégorie ou un autre secteur — ou touchez Accueil.',
  voiceHint: 'Micro — dites ce dont vous avez besoin et qui vous êtes',
  voiceListening: 'Écoute… appuyez sur le micro quand vous avez fini',
  voiceProcessing: 'Compréhension…',
  voiceNoMatch: 'Impossible de comprendre — réessayez ou touchez les boutons',
  voiceHeard: 'Entendu :',
  voiceSearching: 'Compris — nous cherchons des ressources…',
  voiceHintFull: 'Exemple : « Je suis étudiant et j\'ai besoin de nourriture »',
  errorTitle: 'Une erreur est survenue',
  tryAgain: 'Réessayer',
  student: 'Étudiant(e)',
  senior: 'Aîné(e)',
  family: 'Famille',
  individual: 'Individu',
  downtown: 'Centre-ville',
  southEnd: 'Extrémité sud',
  hanmer: 'Hanmer',
  capreol: 'Capreol',
  valCaron: 'Val Caron',
  notSure: 'Je ne sais pas',
  prevResult: 'Résultat précédent',
  nextResult: 'Résultat suivant',
  footerTitle: 'Besoin d\'aide immédiate?',
  footerEmergency: 'En cas d\'urgence, composez le 911.',
  footerCrisis: 'Ligne de crise de Sudbury',
  footerSuicide: 'Ligne d\'aide en cas de suicide',
  footer211: 'Services communautaires et sociaux',
  footer811: 'Conseils santé (Ontario)',
  footerKids: 'Jeunesse, J\'écoute (5 à 29 ans)',
  footer247: '24 h/24',
  categories: {
    food: 'Nourriture',
    housing: 'Logement',
    'mental health': 'Santé mentale',
    employment: 'Emploi',
    legal: 'Aide juridique',
    family: 'Famille et enfants',
    senior: 'Soutien aux aînés',
  },
  skipToMain: 'Passer au contenu principal',
  navHomeLabel: 'Connexion Sudbury — accueil',
  navResources: 'Ressources',
  navAbout: 'À propos / Démo',
  navMainLabel: 'Navigation principale',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  mobileMenuLabel: 'Menu de navigation mobile',
  opensInNewTab: 's\'ouvre dans un nouvel onglet',
  categoriesGroupLabel: 'De quoi avez-vous besoin',
  whoGroupLabel: 'Qui êtes-vous',
  areaGroupLabel: 'Où habitez-vous à Sudbury',
  progressStep: 'Question {current} sur {total}',
  pageTitleLanguage: 'Choisir la langue',
  pageTitleNeed: 'Vos besoins',
  pageTitleAboutYou: 'À propos de vous',
  pageTitleLoading: 'Recherche en cours',
  pageTitleResults: 'Vos résultats',
  pageTitleResources: 'Ressources communautaires',
  h1Language: 'Choisissez votre langue',
  h1Need: 'De quoi avez-vous besoin?',
  h1AboutYou: 'Un peu à propos de vous',
  h1Loading: 'Nous cherchons des ressources',
  h1Results: 'Vos ressources correspondantes',
  selectCategoryHint: 'Sélectionnez au moins un sujet ci-dessus pour continuer.',
  resultsLoaded: '{count} ressource(s) correspondante(s) trouvée(s).',
  descriptionEnglishOnly: '(Description disponible en anglais seulement.)',
};

/** Language picker heading — always bilingual on the home screen. */
export const PICK_LANGUAGE_BILINGUAL =
  'Choose your language / Choisissez votre langue';

/** Skip link — bilingual for users who have not picked a language yet. */
export const SKIP_TO_MAIN_BILINGUAL =
  'Skip to main content / Passer au contenu principal';

export function resultsLoadedLabel(language: Language, count: number): string {
  return t(language).resultsLoaded.replace('{count}', String(count));
}

export function progressStepLabel(language: Language, current: number, total: number): string {
  return t(language).progressStep
    .replace('{current}', String(current))
    .replace('{total}', String(total));
}

export function t(language: Language): Strings {
  return language === 'French' ? fr : en;
}

export const CATEGORY_OPTIONS = [
  { id: 'food', icon: '🍎' },
  { id: 'housing', icon: '🏠' },
  { id: 'mental health', icon: '🧠' },
  { id: 'employment', icon: '💼' },
  { id: 'legal', icon: '⚖️' },
  { id: 'family', icon: '👶' },
  { id: 'senior', icon: '🧓' },
] as const;

export const WHO_OPTIONS = [
  { id: 'student', icon: '🎓' },
  { id: 'senior', icon: '🧓' },
  { id: 'family', icon: '👨‍👩‍👧' },
  { id: 'individual', icon: '👤' },
] as const;

export const AREA_OPTIONS = [
  { id: 'Downtown Sudbury' },
  { id: 'South End' },
  { id: 'Hanmer' },
  { id: 'Capreol' },
  { id: 'Val Caron' },
  { id: 'any' },
] as const;

export function areaLabel(areaId: string, strings: Strings): string {
  const map: Record<string, string> = {
    'Downtown Sudbury': strings.downtown,
    'South End': strings.southEnd,
    Hanmer: strings.hanmer,
    Capreol: strings.capreol,
    'Val Caron': strings.valCaron,
    any: strings.notSure,
  };
  return map[areaId] ?? areaId;
}

export function whoLabel(whoId: string, strings: Strings): string {
  const map: Record<string, string> = {
    student: strings.student,
    senior: strings.senior,
    family: strings.family,
    individual: strings.individual,
  };
  return map[whoId] ?? whoId;
}
