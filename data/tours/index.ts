import type { ListingTour } from './types';

const telAvivPenthouseTour: ListingTour = {
  slug: 'tel-aviv-penthouse',
  backListingPath: '/listing/tel-aviv-penthouse',
  initialRoomId: 'living-room',
  rooms: [
    {
      id: 'living-room',
      name: 'Living Room',
      panorama: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=2200&q=85',
      initialYaw: 40,
      hotspots: [
        { targetRoomId: 'kitchen', yaw: 130, pitch: -5, label: 'Kitchen' },
        { targetRoomId: 'balcony', yaw: -80, pitch: -8, label: 'Balcony' }
      ],
      minimapPosition: { x: 35, y: 60 }
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      panorama: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2200&q=85',
      initialYaw: -20,
      hotspots: [
        { targetRoomId: 'living-room', yaw: -140, pitch: -10, label: 'Living Room' },
        { targetRoomId: 'bedroom', yaw: 70, pitch: -6, label: 'Bedroom' }
      ],
      minimapPosition: { x: 62, y: 58 }
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      panorama: 'https://images.unsplash.com/photo-1616594039964-3f6d59f1f7d8?auto=format&fit=crop&w=2200&q=85',
      hotspots: [{ targetRoomId: 'kitchen', yaw: -40, pitch: -8, label: 'Kitchen' }],
      minimapPosition: { x: 72, y: 34 }
    },
    {
      id: 'balcony',
      name: 'Balcony',
      panorama: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=85',
      hotspots: [{ targetRoomId: 'living-room', yaw: 120, pitch: -5, label: 'Living Room' }],
      minimapPosition: { x: 16, y: 72 }
    }
  ]
};

const jaffaArtistLoftTour: ListingTour = { ...telAvivPenthouseTour, slug: 'jaffa-artist-loft', backListingPath: '/listing/jaffa-artist-loft' };

const tours: Record<string, ListingTour> = {
  'tel-aviv-penthouse': telAvivPenthouseTour,
  'jaffa-artist-loft': jaffaArtistLoftTour
};

export function getTourBySlug(slug: string) {
  return tours[slug];
}
