import type { Language } from '../types';

export type AboutStrings = {
  pageTitle: string;
  eyebrow: string;
  tagline: string;
  tryApp: string;
  videoTitle: string;
  videoIframeTitle: string;
  watchYoutube: string;
  youtubeCaptions: string;
  projectTitle: string;
  problemLabel: string;
  problemText: string;
  whoLabel: string;
  whoText: string;
  whatLabel: string;
  whatText: string;
  builtLabel: string;
  builtText: string;
  dataTitle: string;
  dataIntro: string;
  curatedTitle: string;
  curatedBody: string;
  curatedNote: string;
  osmTitle: string;
  osmBodyBefore: string;
  allResourcesLink: string;
  osmBodyAfter: string;
  osmNote: string;
  dataDisclaimer: string;
  techTitle: string;
  teamTitle: string;
  viewGithub: string;
  teamMollyRole: string;
  teamMollyBio: string;
  teamAudreyRole: string;
  teamAudreyBio: string;
  teamAlexRole: string;
  teamAlexBio: string;
  techStack: string[];
};

const en: AboutStrings = {
  pageTitle: 'About & demo',
  eyebrow: 'Hackathon demo',
  tagline:
    'Health, Safety & Community Well-Being — helping people in Greater Sudbury find real local help in English or French.',
  tryApp: 'Try the live app →',
  videoTitle: 'Video demo',
  videoIframeTitle: 'Sudbury Connect demo video',
  watchYoutube: 'Watch on YouTube',
  youtubeCaptions: 'Captions on YouTube',
  projectTitle: 'The project',
  problemLabel: 'Problem',
  problemText:
    'Community resources in Sudbury are scattered across dozens of English-only sites and PDFs. People in crisis — especially seniors, students, and French speakers — often don\'t know where to start.',
  whoLabel: 'Who it\'s for',
  whoText:
    'Seniors, students, families, and anyone who needs food, housing, mental health, legal, or employment help in Greater Sudbury — in plain language, on a phone.',
  whatLabel: 'What it is',
  whatText:
    'A bilingual, accessible 5-step guide: pick a language, say what you need, answer two quick questions, and get 3–5 real local organizations with phone numbers, hours, and optional read-aloud.',
  builtLabel: 'How we built it',
  builtText:
    'The UI was designed in Lovable, matching and voice were wired in Cursor, and the app is deployed on Vercel. Matching runs locally for instant results; AI powers voice parsing and integration tests.',
  dataTitle: 'Where our resource data comes from',
  dataIntro:
    'Sudbury Connect combines a hand-curated local directory with live map data so people see both verified community services and nearby places that may help.',
  curatedTitle: 'Curated directory (core)',
  curatedBody:
    'Our team collected and normalized 312 Greater Sudbury organizations from trusted sources, then cleaned them into one JSON file with phone numbers, hours, addresses, categories, and French descriptions where available. Data was gathered with Apify scraping workflows and manual research.',
  curatedNote:
    'These curated entries power the main matching flow — they have the richest contact details and bilingual descriptions.',
  osmTitle: 'OpenStreetMap (live supplement)',
  osmBodyBefore: 'When you open the app or browse ',
  allResourcesLink: 'all resources',
  osmBodyAfter:
    ', we also query the Overpass API for community places mapped in OpenStreetMap across Greater Sudbury — clinics, community centres, libraries, NGOs, social facilities, and similar locations.',
  osmNote:
    'OSM results are mapped into our topic categories, deduplicated against the curated list, and cached for 24 hours. Entries tagged OpenStreetMap on the resources page come from this layer. Many lack a phone number; we show "Contact for phone number" when one isn\'t listed on the map.',
  dataDisclaimer:
    'Please note: This is a hackathon demo, not an official government directory. Hours and services change — always confirm details with the organization before visiting. OpenStreetMap data is © OpenStreetMap contributors under the ODbL.',
  techTitle: 'Tech stack',
  teamTitle: 'Team',
  viewGithub: 'View source on GitHub →',
  teamMollyRole: 'Lead developer',
  teamMollyBio:
    'Built the app architecture, resource matching logic, voice integration, deployment, and overall project direction.',
  teamAudreyRole: 'Data & research',
  teamAudreyBio: 'Community resource research, data collection, and resource categorization.',
  teamAlexRole: 'UI design',
  teamAlexBio: 'Front-end design and interface implementation.',
  techStack: [
    'React 19 + TypeScript + Vite',
    'Tailwind CSS v4',
    '312+ curated Greater Sudbury resources',
    'OpenStreetMap / Overpass API (live community places)',
    'Web Speech API (voice in / read aloud)',
    'NVIDIA Nemotron (AI matching tests)',
    'Valsea AI (voice fallback)',
    'Apify (data collection)',
    'Cursor + Lovable (build & design)',
    'GitHub + Vercel (deploy)',
  ],
};

const fr: AboutStrings = {
  pageTitle: 'À propos et démo',
  eyebrow: 'Démo hackathon',
  tagline:
    'Santé, sécurité et bien-être communautaire — aider les gens du Grand Sudbury à trouver de l\'aide locale réelle en anglais ou en français.',
  tryApp: 'Essayer l\'application →',
  videoTitle: 'Vidéo de démonstration',
  videoIframeTitle: 'Vidéo de démonstration Connexion Sudbury',
  watchYoutube: 'Regarder sur YouTube',
  youtubeCaptions: 'Sous-titres sur YouTube',
  projectTitle: 'Le projet',
  problemLabel: 'Problème',
  problemText:
    'Les ressources communautaires à Sudbury sont éparpillées sur des dizaines de sites et PDF souvent en anglais seulement. Les personnes en crise — surtout les aîné(e)s, les étudiant(e)s et les francophones — ne savent souvent pas par où commencer.',
  whoLabel: 'Pour qui',
  whoText:
    'Aîné(e)s, étudiant(e)s, familles et toute personne qui a besoin de nourriture, de logement, de santé mentale, d\'aide juridique ou d\'emploi dans le Grand Sudbury — en langage simple, sur un téléphone.',
  whatLabel: 'Ce que c\'est',
  whatText:
    'Un guide bilingue et accessible en 5 étapes : choisir une langue, dire ce dont vous avez besoin, répondre à deux questions rapides, et obtenir 3 à 5 organismes locaux avec numéros de téléphone, heures et lecture à voix haute.',
  builtLabel: 'Comment nous l\'avons construit',
  builtText:
    'L\'interface a été conçue dans Lovable, la correspondance et la voix ont été intégrées dans Cursor, et l\'application est déployée sur Vercel. La correspondance est locale pour des résultats instantanés; l\'IA alimente la voix et les tests.',
  dataTitle: 'D\'où viennent nos données',
  dataIntro:
    'Connexion Sudbury combine un répertoire local sélectionné à la main avec des données cartographiques en direct pour montrer des services vérifiés et des lieux à proximité.',
  curatedTitle: 'Répertoire sélectionné (principal)',
  curatedBody:
    'Notre équipe a collecté et normalisé 312 organismes du Grand Sudbury à partir de sources fiables, puis les a nettoyés dans un fichier JSON avec téléphones, heures, adresses, catégories et descriptions en français lorsque disponibles. Données via Apify et recherche manuelle.',
  curatedNote:
    'Ces entrées alimentent le flux principal — elles ont les coordonnées les plus complètes et des descriptions bilingues.',
  osmTitle: 'OpenStreetMap (supplément en direct)',
  osmBodyBefore: 'Quand vous ouvrez l\'application ou parcourez ',
  allResourcesLink: 'toutes les ressources',
  osmBodyAfter:
    ', nous interrogeons aussi l\'API Overpass pour les lieux cartographiés dans OpenStreetMap au Grand Sudbury — cliniques, centres communautaires, bibliothèques, ONG, etc.',
  osmNote:
    'Les résultats OSM sont catégorisés, dédupliqués et mis en cache 24 h. Les entrées OpenStreetMap sur la page ressources viennent de cette couche. Beaucoup n\'ont pas de téléphone; nous affichons « Contacter pour le numéro » si absent de la carte.',
  dataDisclaimer:
    'Note : ceci est une démo hackathon, pas un répertoire officiel. Les heures et services changent — confirmez toujours avec l\'organisme. Données OpenStreetMap © contributeurs OSM sous ODbL.',
  techTitle: 'Technologies',
  teamTitle: 'Équipe',
  viewGithub: 'Voir le code sur GitHub →',
  teamMollyRole: 'Développeuse principale',
  teamMollyBio:
    'Architecture, logique de correspondance, intégration vocale, déploiement et direction du projet.',
  teamAudreyRole: 'Données et recherche',
  teamAudreyBio: 'Recherche sur les ressources communautaires, collecte et catégorisation.',
  teamAlexRole: 'Design UI',
  teamAlexBio: 'Design et mise en œuvre de l\'interface.',
  techStack: [
    'React 19 + TypeScript + Vite',
    'Tailwind CSS v4',
    '312+ ressources sélectionnées du Grand Sudbury',
    'OpenStreetMap / API Overpass (lieux en direct)',
    'Web Speech API (voix / lecture)',
    'NVIDIA Nemotron (tests IA)',
    'Valsea AI (secours vocal)',
    'Apify (collecte de données)',
    'Cursor + Lovable (construction et design)',
    'GitHub + Vercel (déploiement)',
  ],
};

export function tAboutPage(language: Language): AboutStrings {
  return language === 'French' ? fr : en;
}
