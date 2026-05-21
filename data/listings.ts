export type ListingBadge = 'VERIFIED_AGENT' | 'TOUR_360' | 'LISTED_TODAY' | 'PREMIUM';
export type DiscoveryTag = 'RECENTLY_ADDED' | 'TRENDING' | 'RECOMMENDED';

export type CityId = 'telAviv' | 'jerusalem' | 'haifa' | 'netanya' | 'herzliya' | 'raanana';

export type FeaturedListingId =
  | 'telAvivSkylinePenthouse'
  | 'herzliyaMarinaResidence'
  | 'jerusalemFamilyResidence'
  | 'haifaCarmelViewLoft'
  | 'netanyaBeachfrontSuite'
  | 'raananaGardenDuplex';

export type Listing = {
  id: FeaturedListingId;
  cityId: CityId;
  neighborhood: string;
  price: string;
  rooms: number;
  area: number;
  image: string;
  imageCount: number;
  badges: ListingBadge[];
  discoveryTags: DiscoveryTag[];
};

export const featuredListings: Listing[] = [
  {
    id: 'telAvivSkylinePenthouse',
    cityId: 'telAviv',
    neighborhood: 'Park Tzameret',
    price: '₪18,900,000',
    rooms: 6,
    area: 312,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    imageCount: 31,
    badges: ['VERIFIED_AGENT', 'TOUR_360', 'PREMIUM'],
    discoveryTags: ['TRENDING', 'RECOMMENDED']
  },
  {
    id: 'herzliyaMarinaResidence',
    cityId: 'herzliya',
    neighborhood: 'Marina',
    price: '₪11,450,000',
    rooms: 5,
    area: 248,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    imageCount: 27,
    badges: ['VERIFIED_AGENT', 'TOUR_360', 'LISTED_TODAY'],
    discoveryTags: ['RECENTLY_ADDED', 'TRENDING']
  },
  {
    id: 'jerusalemFamilyResidence',
    cityId: 'jerusalem',
    neighborhood: 'German Colony',
    price: '₪8,750,000',
    rooms: 6,
    area: 286,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    imageCount: 22,
    badges: ['VERIFIED_AGENT', 'PREMIUM'],
    discoveryTags: ['RECOMMENDED']
  },
  {
    id: 'haifaCarmelViewLoft',
    cityId: 'haifa',
    neighborhood: 'Carmel Center',
    price: '₪4,980,000',
    rooms: 4,
    area: 181,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85',
    imageCount: 19,
    badges: ['TOUR_360', 'LISTED_TODAY'],
    discoveryTags: ['RECENTLY_ADDED']
  },
  {
    id: 'netanyaBeachfrontSuite',
    cityId: 'netanya',
    neighborhood: 'Ir Yamim',
    price: '₪6,420,000',
    rooms: 5,
    area: 214,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85',
    imageCount: 24,
    badges: ['VERIFIED_AGENT', 'TOUR_360'],
    discoveryTags: ['TRENDING']
  },
  {
    id: 'raananaGardenDuplex',
    cityId: 'raanana',
    neighborhood: 'Neve Zemer',
    price: '₪5,760,000',
    rooms: 5,
    area: 226,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    imageCount: 18,
    badges: ['VERIFIED_AGENT', 'PREMIUM'],
    discoveryTags: ['RECOMMENDED', 'RECENTLY_ADDED']
  }
];

export const cityIds: CityId[] = ['telAviv', 'jerusalem', 'haifa', 'netanya', 'herzliya', 'raanana'];
