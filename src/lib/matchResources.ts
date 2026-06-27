import { askNemotron } from './nvidiaChat';
import {
  displayDescription,
  displayName,
  loadResources,
  resourceMatchesUserCategories,
  userCategoriesSupported,
  USER_AREA_TO_DATA,
  type ResourceRecord,
} from './loadResources';
import type { MatchedResource, UserAnswers } from '../types';

export type { MatchedResource, UserAnswers };

const WHO_SERVE_MATCH: Record<string, string[]> = {
  student: ['anyone', 'students', 'families'],
  individual: ['anyone'],
  senior: ['seniors', 'anyone'],
  family: ['families', 'anyone'],
};

function areaMatches(userArea: string, resourceArea: string): boolean {
  if (userArea === 'any') return true;

  const mapped = USER_AREA_TO_DATA[userArea] ?? [userArea];
  const resource = resourceArea.toLowerCase();

  return mapped.some((a) => {
    const area = a.toLowerCase();
    return resource === area || resource.includes(area) || area.includes(resource);
  });
}

function scoreResource(resource: ResourceRecord, answers: UserAnswers): number {
  if (!resourceMatchesUserCategories(resource, answers.categories)) return 0;

  let score = 20;

  const serveMatches = WHO_SERVE_MATCH[answers.whoAreYou] ?? ['anyone'];
  if (serveMatches.includes(resource.whoItServes)) {
    score += resource.whoItServes === 'anyone' ? 4 : 10;
  }

  if (answers.whoAreYou === 'senior' && resource.whoItServes === 'seniors') score += 8;
  if (answers.whoAreYou === 'family' && resource.whoItServes === 'families') score += 8;

  if (areaMatches(answers.area, resource.area)) score += 8;

  if (resource.languages.includes(answers.language)) score += 5;

  return score;
}

function toMatchedResource(resource: ResourceRecord, language: UserAnswers['language']): MatchedResource {
  return {
    name: displayName(resource, language),
    description: displayDescription(resource, language),
    phone: resource.phone,
    hours: resource.hours,
    languages: resource.languages,
    address: resource.address || undefined,
    website: resource.website,
    category: resource.dataCategory,
  };
}

function matchResourcesLocal(
  allResources: ResourceRecord[],
  userAnswers: UserAnswers,
): MatchedResource[] {
  if (!userCategoriesSupported(userAnswers.categories, allResources)) {
    return [];
  }

  const ranked = allResources
    .map((resource) => ({ resource, score: scoreResource(resource, userAnswers) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, 5).map(({ resource }) => toMatchedResource(resource, userAnswers.language));
}

function parseResourceArray(text: string): MatchedResource[] {
  const cleaned = text.replace(/```(?:json)?/g, '').trim();
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Could not find JSON array in model response: ${text.slice(0, 300)}`);
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

/** Fast local matching — used by the app. */
export async function matchResources(userAnswers: UserAnswers): Promise<MatchedResource[]> {
  const allResources = await loadResources();
  return matchResourcesLocal(allResources, userAnswers);
}

/** Nemotron AI matching — slower, used for integration tests. */
export async function matchResourcesWithAI(userAnswers: UserAnswers): Promise<MatchedResource[]> {
  const allResources = await loadResources();
  const pool = allResources.filter((r) => resourceMatchesUserCategories(r, userAnswers.categories));

  if (pool.length === 0) return [];

  const prompt = `Community resource assistant for Sudbury, Ontario.

Person needs: ${userAnswers.categories.join(', ')}
Who they are: ${userAnswers.whoAreYou}
Area: ${userAnswers.area}
Language for descriptions: ${userAnswers.language}

Resources (pick 3-5 most relevant, use exact name and phone from list):
${JSON.stringify(pool)}

Return ONLY a JSON array: [{"name":"","description":"","phone":"","hours":"","languages":[]}]`;

  const text = await askNemotron(prompt, 800);
  return parseResourceArray(text);
}
