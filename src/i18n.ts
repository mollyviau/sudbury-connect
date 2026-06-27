import type { Language } from './types';

type Strings = {
  appTitle: string;
  pickLanguage: string;
  english: string;
  french: string;
  whatNeed: string;
  whoAreYou: string;
  whereLive: string;
  next: string;
  findResources: string;
  loading: string;
  readToMe: string;
  stopReading: string;
  home: string;
  startOver: string;
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
};

const en: Strings = {
  appTitle: 'Sudbury Connect',
  pickLanguage: 'Choose your language',
  english: 'English',
  french: 'Français',
  whatNeed: 'What do you need help with?',
  whoAreYou: 'Who are you?',
  whereLive: 'Where in Sudbury?',
  next: 'Next →',
  findResources: 'Find Resources →',
  loading: 'Finding resources for you...',
  readToMe: '🔊 Read to me',
  stopReading: '⏹ Stop reading',
  home: 'Home',
  startOver: '🔄 Start Over',
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
};

const fr: Strings = {
  appTitle: 'Sudbury Connect',
  pickLanguage: 'Choisissez votre langue',
  english: 'English',
  french: 'Français',
  whatNeed: 'De quoi avez-vous besoin?',
  whoAreYou: 'Qui êtes-vous?',
  whereLive: 'Où habitez-vous à Sudbury?',
  next: 'Suivant →',
  findResources: 'Trouver des ressources →',
  loading: 'Nous cherchons des ressources pour vous...',
  readToMe: '🔊 Me lire',
  stopReading: '⏹ Arrêter la lecture',
  home: 'Accueil',
  startOver: '🔄 Recommencer',
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
};

/** Language picker heading — always bilingual on the home screen. */
export const PICK_LANGUAGE_BILINGUAL =
  'Choose your language / Choisissez votre langue';

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
