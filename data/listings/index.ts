import { herzliyaSeaView } from './herzliya-sea-view';
import { telAvivPenthouse } from './tel-aviv-penthouse';
import type { Listing, Locale } from './types';

export * from './types';

export const listings: Listing[] = [telAvivPenthouse, herzliyaSeaView];

export const featuredListings = listings.filter((listing) => listing.featured);
export const cityIds = [...new Set(listings.map((listing) => listing.city))];

export function getListingBySlug(slug: string) {
  return listings.find((listing) => listing.slug === slug);
}

export function localizeListing(listing: Listing, locale: Locale) {
  const translation = listing.translations[locale];
  if (!translation) return listing;
  return {
    ...listing,
    title: translation.title,
    description: translation.description,
    neighborhood: translation.neighborhood,
    tags: translation.tags,
    features: translation.features
  };
}

export function getRelatedListings(slug: string, limit = 4) {
  return listings.filter((listing) => listing.slug !== slug).slice(0, limit);
}
