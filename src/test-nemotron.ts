import { matchResourcesWithAI } from './lib/matchResources';
import type { MatchedResource, UserAnswers } from './types';

type Scenario = {
  name: string;
  answers: UserAnswers;
  expectLanguage: 'English' | 'French';
  expectNameFragment: string;
};

const scenarios: Scenario[] = [
  {
    name: 'Maria',
    answers: {
      categories: ['food'],
      whoAreYou: 'senior',
      area: 'Downtown Sudbury',
      language: 'French',
    },
    expectLanguage: 'French',
    expectNameFragment: 'ACCESS',
  },
  {
    name: 'Jake',
    answers: {
      categories: ['mental health'],
      whoAreYou: 'student',
      area: 'any',
      language: 'English',
    },
    expectLanguage: 'English',
    expectNameFragment: 'Crisis',
  },
  {
    name: 'Tremblays',
    answers: {
      categories: ['housing'],
      whoAreYou: 'family',
      area: 'Val Caron',
      language: 'English',
    },
    expectLanguage: 'English',
    expectNameFragment: 'Housing',
  },
];

function looksFrench(text: string): boolean {
  return /[àâäéèêëïîôùûüç]|(\b(des|les|pour|dans|avec|une|aux)\b)/i.test(text);
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

let passed = 0;

for (const scenario of scenarios) {
  console.log(`\n=== ${scenario.name.toUpperCase()} ===`);
  const results: MatchedResource[] = await matchResourcesWithAI(scenario.answers);

  assert(Array.isArray(results), `${scenario.name}: expected an array`);
  assert(results.length >= 1 && results.length <= 5, `${scenario.name}: expected 1-5 results`);

  const matched = results.some(
    (r) =>
      r.name.includes(scenario.expectNameFragment) ||
      r.description.includes(scenario.expectNameFragment),
  );
  assert(matched, `${scenario.name}: expected results related to "${scenario.expectNameFragment}"`);

  if (scenario.expectLanguage === 'French') {
    assert(
      results.some((r) => looksFrench(r.description)),
      `${scenario.name}: expected French descriptions`,
    );
  }

  console.log(JSON.stringify(results, null, 2));
  console.log(`✓ ${scenario.name} passed`);
  passed++;
}

console.log(`\n✅ All ${passed} Nemotron scenarios passed`);
