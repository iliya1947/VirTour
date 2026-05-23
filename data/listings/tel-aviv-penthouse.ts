import type { Listing } from './types';

export const telAvivPenthouse: Listing = {
  slug: 'tel-aviv-penthouse',
  title: 'Tel Aviv Skyline Penthouse',
  description:
    'A cinematic penthouse with private rooftop pool, seamless smart-home controls, and panoramic Mediterranean skyline views.',
  city: 'telAviv',
  neighborhood: 'Park Tzameret',
  country: 'Israel',
  price: 18900000,
  currency: 'ILS',
  rooms: 6,
  bathrooms: 4,
  area: 312,
  images: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85'
  ],
  tags: ['Penthouse', 'Sea View', 'Luxury'],
  features: ['Sea View', 'Balcony', 'Smart Home', 'Parking', 'Elevator'],
  tourAvailable: true,
  featured: true,
  listedAt: '2026-05-12',
  agent: {
    name: 'Noa Levi',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    phone: '+972-54-555-2180',
    whatsapp: '+972545552180',
    agencyName: 'Skyline Prime Realty',
    verified: true
  },
  coordinates: { lat: 32.0837, lng: 34.7872 },
  badges: ['VERIFIED_AGENT', 'TOUR_360', 'PREMIUM'],
  discoveryTags: ['TRENDING', 'RECOMMENDED'],
  translations: {
    he: {
      title: 'פנטהאוז קו הרקיע של תל אביב',
      description: 'פנטהאוז יוקרתי עם בריכת גג פרטית, בית חכם מלא ונוף פנורמי מרהיב לקו החוף.',
      neighborhood: 'פארק צמרת',
      tags: ['פנטהאוז', 'נוף לים', 'יוקרה'],
      features: ['נוף לים', 'מרפסת', 'בית חכם', 'חניה', 'מעלית']
    },
    ru: {
      title: 'Пентхаус с панорамой Тель-Авива',
      description: 'Премиальный пентхаус с приватным бассейном на крыше, smart-системой и панорамным видом на море.',
      neighborhood: 'Парк Цамерет',
      tags: ['Пентхаус', 'Вид на море', 'Люкс'],
      features: ['Вид на море', 'Балкон', 'Умный дом', 'Парковка', 'Лифт']
    }
  }
};
