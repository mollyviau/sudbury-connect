const query = `[out:json][timeout:60];
(
  node["amenity"~"food_bank|social_facility|community_centre|library|clinic|childcare|social_centre|public_building"](46.35,-81.35,46.75,-80.75);
  way["amenity"~"food_bank|social_facility|community_centre|library|clinic|childcare|social_centre|public_building"](46.35,-81.35,46.75,-80.75);
  node["office"~"ngo|charity|association|government"](46.35,-81.35,46.75,-80.75);
  way["office"~"ngo|charity|association|government"](46.35,-81.35,46.75,-80.75);
  node["healthcare"~"clinic|counselling|centre|rehabilitation"](46.35,-81.35,46.75,-80.75);
  way["healthcare"~"clinic|counselling|centre|rehabilitation"](46.35,-81.35,46.75,-80.75);
  node["social_facility"](46.35,-81.35,46.75,-80.75);
  way["social_facility"](46.35,-81.35,46.75,-80.75);
);
out center tags;`;

const res = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'SudburyConnect/1.0 (hackathon; contact: sudburyconnect.ca)',
  },
  body: new URLSearchParams({ data: query }),
});
const data = await res.json();
console.log('count:', data.elements?.length);
const withName = data.elements?.filter((e) => e.tags?.name) ?? [];
console.log('with name:', withName.length);

const categories = {};
for (const e of withName) {
  const key = `${e.tags.amenity ?? ''}|${e.tags.office ?? ''}|${e.tags.healthcare ?? ''}|${e.tags.social_facility ?? ''}`;
  categories[key] = (categories[key] ?? 0) + 1;
}
console.log('tag combos:', Object.entries(categories).sort((a,b)=>b[1]-a[1]).slice(0,15));
