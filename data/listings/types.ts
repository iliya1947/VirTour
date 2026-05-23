export type Locale = 'he' | 'en' | 'ru';

export type ListingBadge = 'VERIFIED_AGENT' | 'TOUR_360' | 'LISTED_TODAY' | 'PREMIUM';
export type DiscoveryTag = 'RECENTLY_ADDED' | 'TRENDING' | 'RECOMMENDED';

export type CollectionId =
  | 'SEA_VIEW'
  | 'LUXURY'
  | 'INVESTMENT'
  | 'FAMILY'
  | 'URBAN'
  | 'TEL_AVIV_PREMIUM';

export type ListingTranslation = {
  locale: Locale;
  title: string;
  description: string;
  neighborhood: string;
  tags: string[];
  features: string[];
};

export type Agent = {
  name: string;
  photo: string;
  phone: string;
  whatsapp: string;
  agencyName: string;
  verified: boolean;
};

export type Listing = {
  slug: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  country: string;
  price: number;
  currency: 'ILS' | 'USD' | 'EUR';
  rooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  tags: string[];
  features: string[];
  tourAvailable: boolean;
  featured: boolean;
  listedAt: string;
  agent: Agent;
  coordinates: { lat: number; lng: number };
  badges: ListingBadge[];
  discoveryTags: DiscoveryTag[];
  viewsToday: number;
  totalViews: number;
  savedCount: number;
  responseTime: string;
  translations: Partial<Record<Locale, Omit<ListingTranslation, 'locale'>>>;
};

export type DiscoveryCollection = {
  id: CollectionId;
  coverImage: string;
  listingSlugs: string[];
};
