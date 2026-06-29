/** Topic tags for the resources browser — maps to `ResourceRecord.dataCategory`. */
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
