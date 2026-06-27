export type Language = 'English' | 'French';

export type MatchedResource = {
  name: string;
  description: string;
  phone: string;
  hours: string;
  languages: string[];
  address?: string;
  website?: string;
  category?: string;
};

export type UserAnswers = {
  categories: string[];
  whoAreYou: string;
  area: string;
  language: Language;
};

export type AppScreen = 1 | 2 | 3 | 4 | 5;
