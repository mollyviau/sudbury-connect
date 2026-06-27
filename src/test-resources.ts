import { matchResources } from './lib/matchResources';
import type { UserAnswers } from './types';

const scenarios: { name: string; answers: UserAnswers; expectNameIncludes: string }[] = [
  {
    name: 'Jake — student needs food',
    answers: {
      categories: ['food'],
      whoAreYou: 'student',
      area: 'any',
      language: 'English',
    },
    expectNameIncludes: 'Food',
  },
  {
    name: 'Maria — senior, French, downtown',
    answers: {
      categories: ['food'],
      whoAreYou: 'senior',
      area: 'Downtown Sudbury',
      language: 'French',
    },
    expectNameIncludes: 'ACCESS',
  },
  {
    name: 'Tremblays — housing, Val Caron',
    answers: {
      categories: ['housing'],
      whoAreYou: 'family',
      area: 'Val Caron',
      language: 'English',
    },
    expectNameIncludes: 'Housing',
  },
];

let passed = 0;

for (const scenario of scenarios) {
  const results = await matchResources(scenario.answers);
  const names = results.map((r) => r.name).join(', ');
  const ok =
    results.length >= 1 &&
    results.some(
      (r) =>
        r.name.includes(scenario.expectNameIncludes) ||
        r.description.includes(scenario.expectNameIncludes),
    );

  console.log(`\n=== ${scenario.name} ===`);
  console.log(JSON.stringify(results, null, 2));

  if (!ok) {
    throw new Error(`${scenario.name}: expected match for "${scenario.expectNameIncludes}", got: ${names}`);
  }
  console.log(`✓ ${scenario.name}`);
  passed++;
}

const mentalHealth = await matchResources({
  categories: ['mental health'],
  whoAreYou: 'student',
  area: 'any',
  language: 'English',
});
if (mentalHealth.length === 0 || !mentalHealth.some((r) => r.name.includes('Crisis'))) {
  throw new Error('Expected mental health results');
}
console.log('\n✓ Mental health returns Crisis Centre');

console.log(`\n✅ All ${passed} resource tests passed`);
