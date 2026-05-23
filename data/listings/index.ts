import { herzliyaSeaView } from './herzliya-sea-view';
import { telAvivPenthouse } from './tel-aviv-penthouse';
import type { DiscoveryCollection, Listing, Locale } from './types';

export * from './types';

const jaffaLoft: Listing = {
  slug: 'jaffa-artist-loft', title: 'Jaffa Artist Loft by the Port', description: 'Sunset-facing loft in historic Jaffa with exposed concrete, gallery walls, and a short stroll to the old port cafes.', city: 'telAviv', neighborhood: 'Old Jaffa', country: 'Israel', price: 6250000, currency: 'ILS', rooms: 4, bathrooms: 2, area: 164,
  images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=2200&q=85','https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2200&q=85','https://images.unsplash.com/photo-1616594039964-3f6d59f1f7d8?auto=format&fit=crop&w=2200&q=85'],
  tags: ['Urban Living', 'Loft', 'Walkable'], features: ['Rooftop Deck', 'Renovated', 'Near Light Rail', 'Storage'], tourAvailable: true, featured: true, listedAt: '2026-05-20',
  agent: { name: 'Lior Azulay', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', phone: '+972-52-938-1102', whatsapp: '+972529381102', agencyName: 'Harborline Homes', verified: true },
  coordinates: { lat: 32.054, lng: 34.752 }, badges: ['VERIFIED_AGENT', 'TOUR_360'], discoveryTags: ['RECENTLY_ADDED', 'TRENDING'], viewsToday: 16, totalViews: 133, savedCount: 22, responseTime: 'within 25 minutes', translations: {}
};

const raananaFamily: Listing = {
  slug: 'raanana-garden-family-home', title: 'Raanana Garden Family Home', description: 'Quiet tree-lined residence near top schools, with a shaded garden and open-plan kitchen built for family hosting.', city: 'raanana', neighborhood: 'Lev HaPark', country: 'Israel', price: 7450000, currency: 'ILS', rooms: 6, bathrooms: 3, area: 276,
  images: ['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=85','https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=2200&q=85','https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=2200&q=85'],
  tags: ['Family Home', 'Garden', 'Suburban'], features: ['Private Garden', 'Mamad', '2 Parking Spots', 'Storage Room'], tourAvailable: true, featured: true, listedAt: '2026-05-15',
  agent: { name: 'Maya Ben-David', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', phone: '+972-54-702-1145', whatsapp: '+972547021145', agencyName: 'North Sharon Estates', verified: true },
  coordinates: { lat: 32.184, lng: 34.87 }, badges: ['VERIFIED_AGENT', 'PREMIUM'], discoveryTags: ['RECOMMENDED'], viewsToday: 9, totalViews: 87, savedCount: 18, responseTime: 'within 40 minutes', translations: {}
};

export const listings: Listing[] = [telAvivPenthouse, herzliyaSeaView, jaffaLoft, raananaFamily];

export const featuredListings = listings.filter((listing) => listing.featured);
export const cityIds = [...new Set(listings.map((listing) => listing.city))];

export const discoveryCollections: DiscoveryCollection[] = [
  { id: 'SEA_VIEW', coverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85', listingSlugs: ['tel-aviv-penthouse', 'herzliya-sea-view'] },
  { id: 'LUXURY', coverImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85', listingSlugs: ['tel-aviv-penthouse', 'jaffa-artist-loft'] },
  { id: 'INVESTMENT', coverImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=85', listingSlugs: ['jaffa-artist-loft', 'herzliya-sea-view'] },
  { id: 'FAMILY', coverImage: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1800&q=85', listingSlugs: ['raanana-garden-family-home'] },
  { id: 'URBAN', coverImage: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1800&q=85', listingSlugs: ['jaffa-artist-loft', 'tel-aviv-penthouse'] },
  { id: 'TEL_AVIV_PREMIUM', coverImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85', listingSlugs: ['tel-aviv-penthouse', 'jaffa-artist-loft'] }
];

export function getListingBySlug(slug: string) {
  return listings.find((listing) => listing.slug === slug);
}

export function localizeListing(listing: Listing, locale: Locale) {
  const translation = listing.translations[locale];
  if (!translation) return listing;
  return { ...listing, title: translation.title, description: translation.description, neighborhood: translation.neighborhood, tags: translation.tags, features: translation.features };
}

export function getRelatedListings(slug: string, limit = 4) {
  const current = getListingBySlug(slug);
  if (!current) return [];
  return listings
    .filter((listing) => listing.slug !== slug)
    .map((listing) => {
      let score = 0;
      if (listing.city === current.city) score += 4;
      if (Math.abs(listing.price - current.price) < 3000000) score += 2;
      score += listing.tags.filter((tag) => current.tags.includes(tag)).length;
      return { listing, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.listing);
}
