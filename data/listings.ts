export type Listing = {
  title: string;
  city: string;
  price: string;
  rooms: number;
  area: number;
  image: string;
  badges: ('NEW' | 'HOT' | 'VERIFIED')[];
};

export const featuredListings: Listing[] = [
  {
    title: 'Sea View Penthouse with Skyline Terrace',
    city: 'Tel Aviv',
    price: '₪12,400,000',
    rooms: 6,
    area: 280,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    badges: ['HOT', 'VERIFIED']
  },
  {
    title: 'Jerusalem Stone Villa near the Old City',
    city: 'Jerusalem',
    price: '₪9,800,000',
    rooms: 7,
    area: 340,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    badges: ['NEW', 'VERIFIED']
  },
  {
    title: 'Carmel Horizon Designer Apartment',
    city: 'Haifa',
    price: '₪4,350,000',
    rooms: 4,
    area: 170,
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1400&q=80',
    badges: ['HOT']
  }
];

export const cities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Netanya'];
