/** Topic tags for the resources browser — maps to `ResourceRecord.dataCategory`. */
import { USER_CATEGORY_TO_DATA } from './loadResources';

export const RESOURCE_TOPIC_TAGS = [
  {
    id: 'Food Bank & Meal Program',
    labelEn: 'Food & meals',
    labelFr: 'Nourriture et repas',
    icon: '🍎',
  },
  {
    id: 'Mental Health & Addictions',
    labelEn: 'Mental health',
    labelFr: 'Santé mentale',
    icon: '🧠',
  },
  {
    id: 'Housing & Shelter',
    labelEn: 'Housing',
    labelFr: 'Logement',
    icon: '🏠',
  },
  {
    id: 'Employment & Training',
    labelEn: 'Employment',
    labelFr: 'Emploi',
    icon: '💼',
  },
  { id: 'Legal Aid', labelEn: 'Legal help', labelFr: 'Aide juridique', icon: '⚖️' },
  {
    id: 'Senior Services',
    labelEn: 'Senior support',
    labelFr: 'Soutien aux aînés',
    icon: '🧓',
  },
  {
    id: 'Family & Children',
    labelEn: 'Family & children',
    labelFr: 'Famille et enfants',
    icon: '👶',
  },
] as const;

export type ResourceTopicId = (typeof RESOURCE_TOPIC_TAGS)[number]['id'];

export function topicTagLabel(
  tag: (typeof RESOURCE_TOPIC_TAGS)[number],
  language: 'English' | 'French',
): string {
  return language === 'French' ? tag.labelFr : tag.labelEn;
}

const VALID_TOPIC_IDS = new Set<string>(RESOURCE_TOPIC_TAGS.map((t) => t.id));

/** Map flow category ids (food, housing, …) to browser topic ids. */
export function topicIdsFromUserCategories(userCategories: string[]): ResourceTopicId[] {
  const ids = new Set<ResourceTopicId>();

  for (const category of userCategories) {
    for (const topicId of USER_CATEGORY_TO_DATA[category] ?? []) {
      if (VALID_TOPIC_IDS.has(topicId)) {
        ids.add(topicId as ResourceTopicId);
      }
    }
  }

  return [...ids];
}

export function buildResourcesBrowsePath(userCategories: string[]): string {
  if (userCategories.length === 0) return '/resources';
  const params = new URLSearchParams();
  params.set('topics', userCategories.join(','));
  return `/resources?${params.toString()}`;
}

export function parseTopicsFromSearchParams(searchParams: URLSearchParams): ResourceTopicId[] {
  const topicsParam = searchParams.get('topics');
  if (!topicsParam) return [];

  const userCategories = topicsParam
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return topicIdsFromUserCategories(userCategories);
}
