export type ListingBadge = 'NEW' | 'HOT' | 'VERIFIED';
export type CityId = 'telAviv' | 'jerusalem' | 'haifa' | 'netanya';
export type FeaturedListingId = 'seaViewPenthouse' | 'jerusalemStoneVilla' | 'carmelHorizonApartment';

export type Listing = {
  id: FeaturedListingId;
  cityId: CityId;
  price: string;
  rooms: number;
  area: number;
  image: string;
  badges: ListingBadge[];
};

export const featuredListings: Listing[] = [
  {
    id: 'seaViewPenthouse',
    cityId: 'telAviv',
    price: '₪12,400,000',
    rooms: 6,
    area: 280,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    badges: ['HOT', 'VERIFIED']
  },
  {
    id: 'jerusalemStoneVilla',
    cityId: 'jerusalem',
    price: '₪9,800,000',
    rooms: 7,
    area: 340,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    badges: ['NEW', 'VERIFIED']
  },
  {
    id: 'carmelHorizonApartment',
    cityId: 'haifa',
    price: '₪4,350,000',
    rooms: 4,
    area: 170,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1400&q=80',
    badges: ['HOT']
  }
];

export const cityIds: CityId[] = ['telAviv', 'jerusalem', 'haifa', 'netanya'];
