import type { Language } from '../types';
import { t } from '../i18n';
import sudburyData from '../data/sudbury_resources.json';
import { fetchOverpassResources, isLikelyDuplicate } from './overpassResources';

export type RawResource = {
  id: number;
  name: string;
  category: string;
  whoItServes: string;
  languages: string[];
  phone: string;
  hours: string;
  area: string;
  address?: string;
  description: string;
  descriptionFr?: string;
  website?: string;
};

export type ResourceRecord = {
  id: number;
  name: string;
  dataCategory: string;
  whoItServes: 'anyone' | 'families' | 'seniors' | 'students';
  area: string;
  address: string;
  phone: string;
  description: string;
  descriptionFr?: string;
  website?: string;
  languages: string[];
  hours: string;
  source: 'curated' | 'osm';
};

/** Maps app questionnaire categories to 211 / scraped data categories. */
export const USER_CATEGORY_TO_DATA: Record<string, string[]> = {
  food: ['Food Bank & Meal Program'],
  'mental health': ['Mental Health & Addictions'],
  housing: ['Housing & Shelter'],
  employment: ['Employment & Training'],
  legal: ['Legal Aid'],
  senior: ['Senior Services'],
  family: ['Family & Children'],
};

export const USER_AREA_TO_DATA: Record<string, string[]> = {
  'Downtown Sudbury': [
    'Downtown Sudbury',
    'Downtown',
    'Elm',
    'Elgin',
    'Larch',
    'Cedar',
    'Mackenzie',
    'West End',
    'Flour Mill',
    'Donovan',
  ],
  'South End': ['South End', 'South', 'Regent', 'Algonquin', 'Barrydowne', 'Laurentian', 'New Sudbury'],
  Hanmer: ['Hanmer'],
  Capreol: ['Capreol', 'Coniston', 'Falconbridge', 'Onaping'],
  'Val Caron': ['Val Caron', 'Valley East', 'Hanmer', 'Garson', 'Azilda', 'Chelmsford', 'Greater Sudbury'],
  any: [],
};

function normalizeWhoItServes(raw: string, description: string): ResourceRecord['whoItServes'] {
  const text = `${raw} ${description}`.toLowerCase();
  if (text.includes('student') || text.includes('étudiant') || text.includes('university')) {
    return 'students';
  }
  if (text.includes('senior') || text.includes('aîné') || text.includes('ainé')) return 'seniors';
  if (text.includes('famil') || text.includes('famille') || text.includes('children')) return 'families';
  if (raw.toLowerCase() === 'seniors') return 'seniors';
  if (raw.toLowerCase() === 'families') return 'families';
  return 'anyone';
}

function isValidCuratedResource(raw: RawResource): boolean {
  return !!(raw.name?.trim() && raw.phone?.trim() && raw.description?.trim());
}

function isValidOsmResource(raw: RawResource): boolean {
  if (!raw.name?.trim() || !raw.description?.trim()) return false;
  return !!(raw.phone?.trim() || raw.address?.trim() || raw.website?.trim());
}

function normalizeResource(raw: RawResource, source: ResourceRecord['source']): ResourceRecord {
  const langs = raw.languages?.length ? raw.languages : ['English'];
  const hasFrench = langs.some((l) => l.toLowerCase().includes('french')) || !!raw.descriptionFr?.trim();

  return {
    id: raw.id,
    name: raw.name,
    dataCategory: raw.category,
    whoItServes: normalizeWhoItServes(raw.whoItServes, raw.description),
    area: raw.area,
    address: raw.address?.trim() ?? '',
    phone: raw.phone.trim(),
    description: raw.description,
    descriptionFr: raw.descriptionFr,
    website: raw.website?.trim() || undefined,
    languages: hasFrench && !langs.some((l) => l.toLowerCase().includes('french'))
      ? [...langs, 'French']
      : langs,
    hours: raw.hours?.trim() || 'Contact for hours',
    source,
  };
}

function loadCuratedResources(): ResourceRecord[] {
  const bundle = sudburyData as { resources: RawResource[] };
  return bundle.resources.filter(isValidCuratedResource).map((r) => normalizeResource(r, 'curated'));
}

function mergeResources(curated: ResourceRecord[], osmRaw: RawResource[]): ResourceRecord[] {
  const osmResources = osmRaw
    .filter(isValidOsmResource)
    .map((r) => normalizeResource(r, 'osm'))
    .filter(
      (osm) =>
        !curated.some(
          (existing) =>
            isLikelyDuplicate(existing.name, osm.name) ||
            (existing.phone !== 'Contact for phone number' &&
              osm.phone !== 'Contact for phone number' &&
              existing.phone.replace(/\D/g, '') === osm.phone.replace(/\D/g, '')),
        ),
    );

  return [...curated, ...osmResources];
}

let cached: ResourceRecord[] | null = null;
let loadPromise: Promise<ResourceRecord[]> | null = null;

export async function loadResources(): Promise<ResourceRecord[]> {
  if (cached) return cached;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const curated = loadCuratedResources();
    const osmRaw = await fetchOverpassResources();
    cached = mergeResources(curated, osmRaw);
    return cached;
  })();

  try {
    return await loadPromise;
  } finally {
    loadPromise = null;
  }
}

export type ResourceLoadStats = {
  total: number;
  curated: number;
  osm: number;
};

export async function loadResourceStats(): Promise<ResourceLoadStats> {
  const resources = await loadResources();
  const osm = resources.filter((r) => r.source === 'osm').length;
  return {
    total: resources.length,
    curated: resources.length - osm,
    osm,
  };
}

export function resourceMatchesUserCategories(
  resource: ResourceRecord,
  userCategories: string[],
): boolean {
  for (const cat of userCategories) {
    const dataCats = USER_CATEGORY_TO_DATA[cat];
    if (dataCats?.includes(resource.dataCategory)) return true;
  }
  return false;
}

export function userCategoriesSupported(
  userCategories: string[],
  allResources: ResourceRecord[],
): boolean {
  return userCategories.some((cat) =>
    allResources.some((r) => USER_CATEGORY_TO_DATA[cat]?.includes(r.dataCategory)),
  );
}

export function displayName(resource: ResourceRecord, _language: Language): string {
  return resource.name;
}

const DATA_CATEGORY_LABELS: Record<string, { en: string; fr: string }> = {
  'Food Bank & Meal Program': {
    en: 'Food Bank & Meal Program',
    fr: 'Banque alimentaire et programme de repas',
  },
  'Mental Health & Addictions': {
    en: 'Mental Health & Addictions',
    fr: 'Santé mentale et dépendances',
  },
  'Housing & Shelter': { en: 'Housing & Shelter', fr: 'Logement et hébergement' },
  'Employment & Training': { en: 'Employment & Training', fr: 'Emploi et formation' },
  'Legal Aid': { en: 'Legal Aid', fr: 'Aide juridique' },
  'Senior Services': { en: 'Senior Services', fr: 'Services aux aînés' },
  'Family & Children': { en: 'Family & Children', fr: 'Famille et enfants' },
};

export function displayCategory(resource: ResourceRecord, language: Language): string {
  const labels = DATA_CATEGORY_LABELS[resource.dataCategory];
  if (!labels) return resource.dataCategory;
  return language === 'French' ? labels.fr : labels.en;
}

export function displayLanguages(languages: string[], language: Language): string[] {
  if (language !== 'French') return languages;
  return languages.map((lang) => {
    if (lang.toLowerCase().includes('english')) return 'Anglais';
    if (lang.toLowerCase().includes('french')) return 'Français';
    return lang;
  });
}

export function displayDescription(resource: ResourceRecord, language: Language): string {
  const base =
    language === 'French' && resource.descriptionFr
      ? resource.descriptionFr
      : resource.description;

  if (
    language === 'French' &&
    !resource.descriptionFr?.trim() &&
    resource.source === 'osm'
  ) {
    return `${base} ${t(language).descriptionEnglishOnly}`;
  }

  if (language === 'French' && !resource.descriptionFr?.trim() && resource.source === 'curated') {
    return `${base} ${t(language).descriptionEnglishOnly}`;
  }

  return base;
}

/** True when the phone field is a real dialable number. */
export function isCallablePhone(phone: string): boolean {
  if (!phone?.trim()) return false;
  if (phone.startsWith('See') || phone.startsWith('Contact for') || phone.includes('@')) {
    return false;
  }
  return phone.replace(/\D/g, '').length >= 10;
}
