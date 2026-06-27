export type Category =
  | "food"
  | "housing"
  | "mental_health"
  | "legal"
  | "employment"
  | "addiction"
  | "family"
  | "health"
  | "crisis";

export type Audience = "student" | "senior" | "family" | "youth" | "indigenous" | "newcomer" | "anyone" | "individual";
export type Language = "en" | "fr" | "both";

export interface Resource {
  id: string;
  name: string;
  blurb: string;
  offers: string[];
  categories: Category[];
  audiences: Audience[];
  language: Language;
  area: string;
  phone?: string;
  website?: string;
  hours?: string;
  address?: string;
}

export const resources: Resource[] = [
  {
    id: "211",
    name: "211 Ontario",
    blurb: "Free, confidential helpline that connects you to community and social services across Ontario.",
    offers: ["Phone & chat navigation", "Multilingual support", "24/7"],
    categories: ["food", "housing", "mental_health", "legal", "employment", "family", "health", "crisis"],
    audiences: ["anyone", "senior", "student", "family", "youth", "newcomer", "indigenous"],
    language: "both",
    area: "All of Sudbury",
    phone: "2-1-1",
    website: "https://211ontario.ca",
    hours: "24 hours, 7 days a week",
  },
  {
    id: "sudbury-food-bank",
    name: "Sudbury Food Bank",
    blurb: "Provides emergency food support and connects residents to neighbourhood food pantries.",
    offers: ["Emergency food hampers", "Pantry referrals", "Holiday meal programs"],
    categories: ["food", "family"],
    audiences: ["anyone", "family", "senior", "student"],
    language: "both",
    area: "Greater Sudbury",
    phone: "(705) 671-9663",
    website: "https://sudburyfoodbank.com",
    hours: "Mon–Fri, 9am–4pm",
    address: "211 Beech St, Sudbury",
  },
  {
    id: "elgin-mission",
    name: "Elgin Street Mission",
    blurb: "Daily hot meals, clothing, and outreach support for anyone facing poverty or homelessness.",
    offers: ["Hot meals daily", "Clothing & hygiene", "Outreach workers"],
    categories: ["food", "housing"],
    audiences: ["anyone"],
    language: "en",
    area: "Downtown Sudbury",
    phone: "(705) 674-2851",
    website: "https://thesudburymission.com",
    hours: "Meals served daily 11:30am–1pm",
    address: "41 Elgin St, Sudbury",
  },
  {
    id: "off-the-street",
    name: "Off the Street Emergency Shelter",
    blurb: "Low-barrier overnight shelter for adults experiencing homelessness in Sudbury.",
    offers: ["Overnight beds", "Warm meals", "Referrals to housing"],
    categories: ["housing", "crisis"],
    audiences: ["anyone"],
    language: "en",
    area: "Downtown Sudbury",
    phone: "(705) 675-7575",
    hours: "Open nightly 8pm–8am",
    address: "200 Larch St, Sudbury",
  },
  {
    id: "crisis-line",
    name: "Sudbury & Districts Crisis Line",
    blurb: "24/7 crisis support for mental health, suicidal thoughts, or emotional distress.",
    offers: ["Crisis counselling", "Mobile crisis team", "Safety planning"],
    categories: ["mental_health", "crisis"],
    audiences: ["anyone"],
    language: "both",
    area: "All of Sudbury",
    phone: "(705) 675-4760",
    hours: "24 hours, 7 days a week",
  },
  {
    id: "cmha",
    name: "Canadian Mental Health Association — Sudbury/Manitoulin",
    blurb: "Mental health and addictions support, counselling, peer programs and housing help.",
    offers: ["Counselling", "Addictions support", "Peer programs"],
    categories: ["mental_health", "addiction", "housing"],
    audiences: ["anyone", "youth", "senior"],
    language: "both",
    area: "Greater Sudbury",
    phone: "(705) 675-7252",
    website: "https://cmha-sm.on.ca",
    hours: "Mon–Fri, 8:30am–4:30pm",
    address: "111 Elm St, Suite 100, Sudbury",
  },
  {
    id: "monarch",
    name: "Monarch Recovery Services",
    blurb: "Addictions counselling and treatment programs for adults across northeastern Ontario.",
    offers: ["Addictions counselling", "Day treatment", "Aftercare"],
    categories: ["addiction", "mental_health"],
    audiences: ["anyone"],
    language: "en",
    area: "Greater Sudbury",
    phone: "(705) 524-4054",
    website: "https://monarchrecovery.ca",
    hours: "Mon–Fri, 8:30am–4:30pm",
  },
  {
    id: "legal-clinic",
    name: "Sudbury Community Legal Clinic",
    blurb: "Free legal help for low-income residents — tenant rights, ODSP/OW, employment, and more.",
    offers: ["Legal advice", "Tribunal representation", "Public legal education"],
    categories: ["legal", "housing", "employment"],
    audiences: ["anyone", "senior"],
    language: "both",
    area: "Greater Sudbury",
    phone: "(705) 674-3200",
    website: "https://sudburycommunitylegalclinic.ca",
    hours: "Mon–Fri, 9am–4:30pm",
    address: "40 Elm St, Suite 270, Sudbury",
  },
  {
    id: "yes-employment",
    name: "YES Employment Services",
    blurb: "Free employment counselling, resume help, training funding and job search support.",
    offers: ["Job search support", "Resume help", "Training funding"],
    categories: ["employment"],
    audiences: ["anyone", "youth", "student", "newcomer"],
    language: "both",
    area: "Greater Sudbury",
    phone: "(705) 670-8888",
    website: "https://yesemployment.ca",
    hours: "Mon–Fri, 8:30am–4:30pm",
    address: "275 Larch St, Sudbury",
  },
  {
    id: "better-beginnings",
    name: "Better Beginnings Better Futures",
    blurb: "Family support, parenting programs, and after-school activities in the Donovan and Flour Mill.",
    offers: ["Parent support", "Kids programs", "Family meals"],
    categories: ["family", "food"],
    audiences: ["family", "youth"],
    language: "both",
    area: "Donovan & Flour Mill",
    phone: "(705) 671-1941",
    website: "https://bbbf.ca",
    hours: "Mon–Fri, 9am–5pm",
  },
  {
    id: "centre-victoria",
    name: "Centre de santé communautaire du Grand Sudbury",
    blurb: "Services de santé et de bien-être en français pour la communauté francophone de Sudbury.",
    offers: ["Soins primaires", "Santé mentale", "Programmes communautaires"],
    categories: ["health", "mental_health", "family"],
    audiences: ["anyone", "senior", "family"],
    language: "fr",
    area: "Grand Sudbury",
    phone: "(705) 670-2274",
    website: "https://centresantesudbury.ca",
    hours: "Lun–Ven, 8h30–16h30",
    address: "19 rue Frood, Sudbury",
  },
  {
    id: "shkagamik-kwe",
    name: "Shkagamik-Kwe Health Centre",
    blurb: "Indigenous-led primary care, traditional healing, and wellness programs for all ages.",
    offers: ["Primary care", "Traditional healing", "Mental wellness"],
    categories: ["health", "mental_health", "family"],
    audiences: ["indigenous", "anyone", "family", "youth", "senior"],
    language: "en",
    area: "Greater Sudbury",
    phone: "(705) 675-1596",
    website: "https://shkagamikkwe.com",
    hours: "Mon–Fri, 8:30am–4:30pm",
    address: "161 Applegrove St, Sudbury",
  },
  {
    id: "senior-centre",
    name: "Parkside Older Adult Centre",
    blurb: "Friendly hub for adults 55+ — meals, fitness, social programs and information services.",
    offers: ["Hot lunches", "Fitness classes", "Social programs"],
    categories: ["food", "health", "family"],
    audiences: ["senior"],
    language: "both",
    area: "Downtown Sudbury",
    phone: "(705) 673-6227",
    hours: "Mon–Fri, 9am–4pm",
    address: "140 Durham St, Sudbury",
  },
  {
    id: "go-girls",
    name: "N'Swakamok Native Friendship Centre",
    blurb: "Cultural programs, youth services, family support and employment help for urban Indigenous people.",
    offers: ["Youth programs", "Cultural support", "Employment help"],
    categories: ["family", "employment", "mental_health"],
    audiences: ["indigenous", "youth", "family"],
    language: "en",
    area: "Downtown Sudbury",
    phone: "(705) 674-2128",
    website: "https://nfcsudbury.com",
    hours: "Mon–Fri, 9am–5pm",
    address: "110 Elm St, Sudbury",
  },
];

export interface Intake {
  categories: Category[];
  audience: Audience;
  language: Language;
  area: string;
}

export function matchResources(intake: Intake): Resource[] {
  const scored = resources.map((r) => {
    let score = 0;
    const overlap = r.categories.filter((c) => intake.categories.includes(c)).length;
    score += overlap * 10;
    if (intake.audience !== "anyone" && r.audiences.includes(intake.audience)) score += 6;
    if (r.audiences.includes("anyone")) score += 1;
    if (intake.language === "fr" && (r.language === "fr" || r.language === "both")) score += 4;
    if (intake.language === "en" && (r.language === "en" || r.language === "both")) score += 2;
    if (intake.language === "both" && r.language === "both") score += 2;
    if (intake.language === "fr" && r.language === "en") score -= 3;
    return { r, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.r);
}