import type { Language } from '../types';
import resourcesData from '../data/resources.json';

export type RawResource = {
  name: string;
  category: string;
  whoItServes: string;
  languages: string[];
  phone: string;
  hours: string;
  area: string;
  description: string;
  descriptionFr?: string;
};

export type ResourceRecord = {
  id: number;
  name: string;
  category: string;
  whoItServes: 'anyone' | 'families' | 'seniors' | 'students';
  area: string;
  phone: string;
  description: string;
  descriptionFr?: string;
  languages: string[];
  hours: string;
};

export const USER_AREA_TO_DATA: Record<string, string[]> = {
  'Downtown Sudbury': ['Downtown'],
  'South End': ['South End'],
  Hanmer: ['Hanmer'],
  Capreol: ['Capreol'],
  'Val Caron': ['Val Caron'],
  any: [],
};

function normalizeWhoItServes(raw: string, description: string): ResourceRecord['whoItServes'] {
  const text = `${raw} ${description}`.toLowerCase();
  if (text.includes('student') || text.includes('étudiant') || text.includes('university')) {
    return 'students';
  }
  if (text.includes('senior') || text.includes('aîné') || text.includes('ainé')) return 'seniors';
  if (text.includes('famil') || text.includes('famille')) return 'families';
  if (raw.toLowerCase() === 'seniors') return 'seniors';
  if (raw.toLowerCase() === 'families') return 'families';
  return 'anyone';
}

function normalizeResource(raw: RawResource, id: number): ResourceRecord {
  return {
    id,
    name: raw.name,
    category: raw.category,
    whoItServes: normalizeWhoItServes(raw.whoItServes, raw.description),
    area: raw.area,
    phone: raw.phone,
    description: raw.description,
    descriptionFr: raw.descriptionFr,
    languages: raw.languages,
    hours: raw.hours,
  };
}

let cached: ResourceRecord[] | null = null;

export async function loadResources(): Promise<ResourceRecord[]> {
  if (cached) return cached;
  cached = (resourcesData as RawResource[]).map(normalizeResource);
  return cached;
}

export function resourceMatchesUserCategories(
  resource: ResourceRecord,
  userCategories: string[],
): boolean {
  return userCategories.includes(resource.category);
}

export function userCategoriesSupported(
  userCategories: string[],
  allResources: ResourceRecord[],
): boolean {
  return userCategories.some((cat) => allResources.some((r) => r.category === cat));
}

export function displayName(_resource: ResourceRecord, _language: Language): string {
  return _resource.name;
}

export function displayDescription(resource: ResourceRecord, language: Language): string {
  return language === 'French' && resource.descriptionFr
    ? resource.descriptionFr
    : resource.description;
}
