import type { RawResource } from './loadResources';

/** Greater Sudbury bounding box (south, west, north, east). */
const SUDURY_BBOX = '46.35,-81.35,46.75,-80.80';

const OVERPASS_QUERY = `[out:json][timeout:60];
(
  node["amenity"~"food_bank|social_facility|community_centre|library|clinic|childcare|social_centre"](${SUDURY_BBOX});
  way["amenity"~"food_bank|social_facility|community_centre|library|clinic|childcare|social_centre"](${SUDURY_BBOX});
  node["office"~"ngo|charity|association"](${SUDURY_BBOX});
  way["office"~"ngo|charity|association"](${SUDURY_BBOX});
  node["healthcare"~"clinic|counselling|centre|rehabilitation"](${SUDURY_BBOX});
  way["healthcare"~"clinic|counselling|centre|rehabilitation"](${SUDURY_BBOX});
  node["social_facility"](${SUDURY_BBOX});
  way["social_facility"](${SUDURY_BBOX});
);
out center tags;`;

const OSM_CACHE_KEY = 'sudbury-connect:osm-resources-v1';
const OSM_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type OsmElement = {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

type OverpassResponse = {
  elements?: OsmElement[];
};

function overpassEndpoint(): string {
  const configured = import.meta.env.VITE_OVERPASS_URL?.trim();
  if (configured) return configured;
  if (typeof window === 'undefined') {
    return 'https://overpass-api.de/api/interpreter';
  }
  return '/api/overpass';
}

function readOsmCache(): RawResource[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(OSM_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { fetchedAt: number; resources: RawResource[] };
    if (Date.now() - parsed.fetchedAt > OSM_CACHE_TTL_MS) return null;
    return parsed.resources;
  } catch {
    return null;
  }
}

function writeOsmCache(resources: RawResource[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(
      OSM_CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), resources }),
    );
  } catch {
    // Storage full or unavailable — skip cache.
  }
}

function elementCoords(element: OsmElement): { lat?: number; lon?: number } {
  if (element.lat != null && element.lon != null) {
    return { lat: element.lat, lon: element.lon };
  }
  if (element.center) return element.center;
  return {};
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw.trim();
}

function buildAddress(tags: Record<string, string>): string {
  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ');
  const city = tags['addr:city'] ?? tags['addr:place'] ?? 'Sudbury';
  const parts = [street, city, tags['addr:province']].filter(Boolean);
  return parts.join(', ');
}

function inferArea(tags: Record<string, string>, lat?: number, lon?: number): string {
  const suburb = tags['addr:suburb'] ?? tags['addr:neighbourhood'] ?? tags.is_in;
  if (suburb?.trim()) return suburb.trim();

  if (lat != null && lon != null) {
    if (lat >= 46.48 && lon >= -81.02 && lon <= -80.98) return 'Downtown Sudbury';
    if (lat >= 46.46 && lat < 46.52 && lon > -80.98) return 'New Sudbury';
    if (lat >= 46.52) return 'Valley East';
    if (lon <= -81.08) return 'South End';
  }

  const city = tags['addr:city']?.toLowerCase() ?? '';
  if (city.includes('garson')) return 'Garson';
  if (city.includes('capreol')) return 'Capreol';
  if (city.includes('hanmer')) return 'Hanmer';
  if (city.includes('chelmsford')) return 'Chelmsford';
  if (city.includes('azilda')) return 'Azilda';

  return 'Greater Sudbury';
}

function humanizeTag(value: string): string {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildDescription(tags: Record<string, string>): string {
  if (tags.description?.trim()) return tags.description.trim();

  const parts: string[] = [];
  const amenity = tags.amenity ?? tags.healthcare ?? tags.office;
  if (amenity) parts.push(`${humanizeTag(amenity)} in Greater Sudbury.`);
  if (tags.social_facility) parts.push(`Type: ${humanizeTag(tags.social_facility)}.`);
  if (tags['social_facility:for']) parts.push(`Serves ${humanizeTag(tags['social_facility:for'])}.`);
  if (tags.operator) parts.push(`Operated by ${tags.operator}.`);

  return parts.join(' ').trim() || 'Community organization listed on OpenStreetMap in Greater Sudbury.';
}

export function mapOsmTagsToCategory(tags: Record<string, string>): string | null {
  const text = [
    tags.name,
    tags.description,
    tags.amenity,
    tags.office,
    tags.healthcare,
    tags.social_facility,
    tags['social_facility:for'],
    tags.for,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (
    tags.amenity === 'food_bank' ||
    tags.social_facility === 'food_bank' ||
    /food bank|food pantry|meal program|soup kitchen/.test(text)
  ) {
    return 'Food Bank & Meal Program';
  }

  if (
    tags.social_facility === 'shelter' ||
    tags.amenity === 'shelter' ||
    /shelter|homeless|housing|outreach/.test(text)
  ) {
    return 'Housing & Shelter';
  }

  if (
    tags.healthcare === 'counselling' ||
    /mental health|counsell|addiction|crisis|psychiatric|therapy/.test(text)
  ) {
    return 'Mental Health & Addictions';
  }

  if (/employment|training|job search|works|career/.test(text)) {
    return 'Employment & Training';
  }

  if (/legal aid|legal clinic|lawyer|attorney|tribunal/.test(text)) {
    return 'Legal Aid';
  }

  if (
    tags.social_facility === 'nursing_home' ||
    tags['social_facility:for'] === 'senior' ||
    /senior|elderly|retirement|nursing home/.test(text)
  ) {
    return 'Senior Services';
  }

  if (
    tags.amenity === 'childcare' ||
    tags['social_facility:for'] === 'child' ||
    tags['social_facility:for'] === 'orphan' ||
    /child|family|youth|parent|daycare/.test(text)
  ) {
    return 'Family & Children';
  }

  if (tags.amenity === 'community_centre' || tags.amenity === 'social_centre') {
    return 'Family & Children';
  }

  if (tags.amenity === 'library') {
    return 'Family & Children';
  }

  if (tags.office === 'ngo' || tags.office === 'charity' || tags.office === 'association') {
    return 'Family & Children';
  }

  if (tags.amenity === 'clinic' || tags.healthcare === 'clinic') {
    return 'Family & Children';
  }

  if (tags.social_facility === 'group_home') {
    return 'Housing & Shelter';
  }

  return null;
}

function inferWhoItServes(tags: Record<string, string>, description: string): string {
  const forTag = (tags['social_facility:for'] ?? tags.for ?? '').toLowerCase();
  const text = `${forTag} ${description}`.toLowerCase();

  if (/student|university|college/.test(text)) return 'Students';
  if (/senior|elderly|retirement|nursing/.test(text)) return 'Seniors';
  if (/child|famil|youth|parent|daycare/.test(text)) return 'Families';
  if (/homeless|anyone|public/.test(text)) return 'Anyone';
  return 'Anyone';
}

function inferLanguages(tags: Record<string, string>, name: string): string[] {
  const langs: string[] = [];
  if (tags['language:en'] != null || tags['name:en']) langs.push('English');
  if (tags['language:fr'] != null || tags['name:fr']) langs.push('French');
  if (langs.length > 0) return langs;
  if (/français|francais|fr\b/i.test(name)) return ['French', 'English'];
  return ['English'];
}

function osmResourceId(type: OsmElement['type'], id: number): number {
  const offsets: Record<OsmElement['type'], number> = { node: 1, way: 2, relation: 3 };
  return -(offsets[type] * 1_000_000_000 + id);
}

export function osmElementToRawResource(element: OsmElement): RawResource | null {
  const tags = element.tags;
  if (!tags?.name?.trim()) return null;

  const category = mapOsmTagsToCategory(tags);
  if (!category) return null;

  const { lat, lon } = elementCoords(element);
  const address = buildAddress(tags);
  const description = buildDescription(tags);
  if (!description.trim() && !address.trim() && !tags.website && !tags['contact:website']) {
    return null;
  }

  const phoneRaw = tags.phone ?? tags['contact:phone'] ?? tags['contact:mobile'] ?? '';

  return {
    id: osmResourceId(element.type, element.id),
    name: tags.name.trim(),
    category,
    whoItServes: inferWhoItServes(tags, description),
    languages: inferLanguages(tags, tags.name),
    phone: phoneRaw ? formatPhone(phoneRaw) : 'Contact for phone number',
    hours: tags.opening_hours?.trim() || 'Contact for hours',
    area: inferArea(tags, lat, lon),
    address: address || undefined,
    description,
    website: tags.website ?? tags['contact:website'] ?? undefined,
  };
}

export function normalizeResourceName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isLikelyDuplicate(nameA: string, nameB: string): boolean {
  const a = normalizeResourceName(nameA);
  const b = normalizeResourceName(nameB);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.length >= 8 && b.length >= 8 && (a.includes(b) || b.includes(a))) return true;
  return false;
}

async function fetchOverpassElements(): Promise<OsmElement[]> {
  const response = await fetch(overpassEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'SudburyConnect/1.0 (community directory; sudburyconnect.ca)',
    },
    body: new URLSearchParams({ data: OVERPASS_QUERY }),
  });

  if (!response.ok) {
    throw new Error(`Overpass API error (${response.status})`);
  }

  const data = (await response.json()) as OverpassResponse;
  return data.elements ?? [];
}

/** Fetch community places from OpenStreetMap via Overpass. Returns empty array on failure. */
export async function fetchOverpassResources(): Promise<RawResource[]> {
  const cached = readOsmCache();
  if (cached) return cached;

  try {
    const elements = await fetchOverpassElements();
    const resources = elements
      .map(osmElementToRawResource)
      .filter((r): r is RawResource => r != null);

    writeOsmCache(resources);
    return resources;
  } catch (error) {
    console.warn('[Sudbury Connect] OpenStreetMap fetch failed:', error);
    return [];
  }
}
