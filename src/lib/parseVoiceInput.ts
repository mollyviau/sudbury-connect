import type { Language } from '../types';
import { askNemotronJson } from './nvidiaChat';
import { CATEGORY_OPTIONS, WHO_OPTIONS, AREA_OPTIONS } from '../i18n';

const VALID_CATEGORIES = new Set(CATEGORY_OPTIONS.map((c) => c.id));
const VALID_WHO = new Set(WHO_OPTIONS.map((w) => w.id));
const VALID_AREAS = new Set(AREA_OPTIONS.map((a) => a.id));

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  food: ['food', 'nourriture', 'aliment', 'hungry', 'faim', 'eat', 'manger', 'pantry', 'groceries', 'grocerie', 'meal', 'repas', 'bank'],
  housing: ['housing', 'logement', 'rent', 'loyer', 'shelter', 'homeless', 'house', 'home', 'maison', 'appartement', 'apartment', 'evict'],
  'mental health': ['mental health', 'mental', 'crisis', 'crise', 'anxiety', 'anxieux', 'depression', 'stress', 'counselling', 'counseling', 'santé mentale', 'sante mentale', 'therapy', 'thérapie'],
  employment: ['employment', 'job', 'work', 'emploi', 'travail', 'career', 'carrière', 'carriere', 'unemployed', 'chômage', 'chomage'],
  legal: ['legal', 'lawyer', 'court', 'juridique', 'avocat', 'justice', 'law', 'loi'],
  family: ['family', 'famille', 'children', 'child', 'kids', 'enfants', 'enfant', 'parent', 'baby', 'bébé'],
  senior: ['senior', 'elderly', 'aîné', 'ainé', 'aine', 'aînée', 'ainee', 'retired', 'retraité', 'retraite', 'older adult'],
};

const WHO_KEYWORDS: Record<string, string[]> = {
  student: ['student', 'étudiant', 'etudiant', 'étudiante', 'etudiante', 'school', 'university', 'college', 'école', 'ecole'],
  senior: ['senior', 'elderly', 'aîné', 'ainé', 'aine', 'aînée', 'ainee', 'retired', 'retraité', 'retraite', 'older'],
  family: ['family', 'famille', 'parent', 'parents', 'children', 'kids', 'enfants', 'enfant', 'mother', 'father', 'mère', 'père'],
  individual: ['individual', 'individu', 'myself', 'alone', 'single', 'seul', 'seule', 'just me'],
};

const AREA_KEYWORDS: Record<string, string[]> = {
  'Downtown Sudbury': ['downtown', 'centre-ville', 'centre ville', 'center-ville', 'center ville', 'centre ville sudbury'],
  'South End': ['south end', 'extrémité sud', 'extremite sud'],
  Hanmer: ['hanmer'],
  Capreol: ['capreol'],
  'Val Caron': ['val caron', 'valcaron'],
  any: ['not sure', 'unsure', "don't know", 'dont know', 'anywhere', 'any area', 'je ne sais pas', 'pas sûr', 'pas sur', 'no idea'],
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/['']/g, "'");
}

function matchesKeyword(text: string, keyword: string): boolean {
  const normalized = normalize(text);
  const kw = normalize(keyword);
  if (kw.includes(' ')) return normalized.includes(kw);
  return new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(normalized);
}

function findMatches(text: string, rules: Record<string, string[]>): string[] {
  const matched: string[] = [];
  const sorted = Object.entries(rules).sort(
    (a, b) => Math.max(...b[1].map((k) => k.length)) - Math.max(...a[1].map((k) => k.length)),
  );
  for (const [id, keywords] of sorted) {
    if (keywords.some((kw) => matchesKeyword(text, kw))) {
      matched.push(id);
    }
  }
  return matched;
}

export function matchCategoriesFromSpeech(text: string): string[] {
  return findMatches(text, CATEGORY_KEYWORDS);
}

export function matchProfileFromSpeech(text: string): { whoAreYou?: string; area?: string } {
  const whoMatches = findMatches(text, WHO_KEYWORDS);
  const areaMatches = findMatches(text, AREA_KEYWORDS);
  const area = areaMatches.find((a) => a !== 'any') ?? areaMatches[0];
  return { whoAreYou: whoMatches[0], area };
}

export type ParsedVoiceInput = {
  categories: string[];
  whoAreYou?: string;
  area?: string;
};

export function parseFullVoiceInputSync(text: string): ParsedVoiceInput {
  return {
    categories: matchCategoriesFromSpeech(text),
    ...matchProfileFromSpeech(text),
  };
}

export async function parseFullVoiceInput(
  text: string,
  language: Language,
): Promise<ParsedVoiceInput> {
  const fromKeywords = parseFullVoiceInputSync(text);
  if (
    fromKeywords.categories.length > 0 ||
    fromKeywords.whoAreYou ||
    fromKeywords.area
  ) {
    return fromKeywords;
  }

  try {
    const parsed = await askNemotronJson<{
      categories?: string[];
      whoAreYou?: string | null;
      area?: string | null;
    }>(
      `Parse voice input for a Sudbury community resource app.
Language: ${language}. Transcript: "${text}"

Return JSON with categories (ids: food, housing, mental health, employment, legal, family, senior), whoAreYou (student|senior|family|individual), area ("Downtown Sudbury"|"South End"|"Hanmer"|"Capreol"|"Val Caron"|"any").
Example: "I am a student and I need food" → {"categories":["food"],"whoAreYou":"student","area":null}`,
      120,
    );

    const categories = (parsed.categories ?? []).filter((id) =>
      VALID_CATEGORIES.has(id as (typeof CATEGORY_OPTIONS)[number]['id']),
    );
    const whoAreYou =
      parsed.whoAreYou &&
      VALID_WHO.has(parsed.whoAreYou as (typeof WHO_OPTIONS)[number]['id'])
        ? parsed.whoAreYou
        : undefined;
    const area =
      parsed.area && VALID_AREAS.has(parsed.area as (typeof AREA_OPTIONS)[number]['id'])
        ? parsed.area
        : undefined;

    if (categories.length > 0 || whoAreYou || area) {
      return { categories, whoAreYou, area };
    }
  } catch {
    // no match
  }

  return fromKeywords;
}

export async function parseCategoriesFromSpeech(
  text: string,
  language: Language,
): Promise<string[]> {
  const parsed = await parseFullVoiceInput(text, language);
  return parsed.categories;
}

export async function parseProfileFromSpeech(
  text: string,
  language: Language,
): Promise<{ whoAreYou?: string; area?: string }> {
  const parsed = await parseFullVoiceInput(text, language);
  return { whoAreYou: parsed.whoAreYou, area: parsed.area };
}
