import type { Listing } from './types';

export const herzliyaSeaView: Listing = {
  slug: 'herzliya-sea-view',
  title: 'Herzliya Marina Sea View Residence',
  description: 'Waterfront residence with marina-facing glazing, hotel-level amenities, and turnkey premium finishes.',
  city: 'herzliya',
  neighborhood: 'Marina',
  country: 'Israel',
  price: 11450000,
  currency: 'ILS',
  rooms: 5,
  bathrooms: 3,
  area: 248,
  images: [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2200&q=85',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=85',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2200&q=85'
  ],
  tags: ['Sea View', 'Marina', 'Turnkey'],
  features: ['Sea View', 'Gym', 'Concierge', 'Parking', 'Elevator'],
  tourAvailable: true,
  featured: true,
  listedAt: '2026-05-18',
  agent: {
    name: 'Daniel Cohen',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    phone: '+972-52-311-7420',
    whatsapp: '+972523117420',
    agencyName: 'Coastline Signature Estates',
    verified: true
  },
  coordinates: { lat: 32.1612, lng: 34.7922 },
  badges: ['VERIFIED_AGENT', 'TOUR_360', 'LISTED_TODAY'],
  discoveryTags: ['RECENTLY_ADDED', 'TRENDING'],
  translations: {
    he: {
      title: 'דירת יוקרה עם נוף לים במרינה הרצליה',
      description: 'דירה על קו המים עם חלונות פנורמיים למרינה, מתקני פרימיום ועיצוב מוכן לכניסה.',
      neighborhood: 'מרינה',
      tags: ['נוף לים', 'מרינה', 'מוכן לכניסה'],
      features: ['נוף לים', 'חדר כושר', 'קונסיירז׳', 'חניה', 'מעלית']
    },
    ru: {
      title: 'Резиденция с видом на море в марине Герцлии',
      description: 'Апартаменты на первой линии с панорамным остеклением, сервисами уровня отеля и премиальной отделкой.',
      neighborhood: 'Марина',
      tags: ['Вид на море', 'Марина', 'Готово к въезду'],
      features: ['Вид на море', 'Фитнес-зал', 'Консьерж', 'Парковка', 'Лифт']
    }
  }
};
