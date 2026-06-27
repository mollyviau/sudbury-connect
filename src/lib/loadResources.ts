import type { Language } from '../types';
import sudburyData from '../data/sudbury_resources.json';

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

function isValidResource(raw: RawResource): boolean {
  return !!(raw.name?.trim() && raw.phone?.trim() && raw.description?.trim());
}

function normalizeResource(raw: RawResource): ResourceRecord {
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
  };
}

let cached: ResourceRecord[] | null = null;

export async function loadResources(): Promise<ResourceRecord[]> {
  if (cached) return cached;
  const bundle = sudburyData as { resources: RawResource[] };
  cached = bundle.resources.filter(isValidResource).map(normalizeResource);
  return cached;
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

export function displayDescription(resource: ResourceRecord, language: Language): string {
  return language === 'French' && resource.descriptionFr
    ? resource.descriptionFr
    : resource.description;
}
