import type { ListingTour } from './types';

const telAvivPenthouseTour: ListingTour = {
  slug: 'tel-aviv-penthouse',
  backListingPath: '/listing/tel-aviv-penthouse',
  propertyLabel: 'Tel Aviv Penthouse · Premium 360 walkthrough',
  initialRoomId: 'living-room',
  rooms: [
    {
      id: 'living-room',
      name: 'Living Room',
      panorama: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=2200&q=85',
      initialYaw: 40,
      hotspots: [
        { targetRoomId: 'kitchen', yaw: 130, pitch: -5, label: 'Kitchen', actionLabel: 'Continue to kitchen' },
        { targetRoomId: 'balcony', yaw: -80, pitch: -8, label: 'Balcony', actionLabel: 'Explore sea-view balcony' }
      ],
      story: 'Light gathers across the main salon before the home opens toward dining, cooking, and the terrace beyond.',
      directionCue: 'Begin in the living room, then move through the kitchen axis or drift left toward the sea-facing balcony.',
      minimapPosition: { x: 35, y: 60 }
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      panorama: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2200&q=85',
      initialYaw: -20,
      hotspots: [
        { targetRoomId: 'living-room', yaw: -140, pitch: -10, label: 'Living Room', actionLabel: 'Return to living room' },
        { targetRoomId: 'bedroom', yaw: 70, pitch: -6, label: 'Bedroom', actionLabel: 'Continue to bedroom' }
      ],
      story: 'The kitchen feels connected rather than separate, carrying the social energy of the living space deeper into the home.',
      directionCue: 'You are at the central hinge of the walkthrough: living room behind you, private suite ahead.',
      minimapPosition: { x: 62, y: 58 }
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      panorama: 'https://images.unsplash.com/photo-1616594039964-3f6d59f1f7d8?auto=format&fit=crop&w=2200&q=85',
      hotspots: [{ targetRoomId: 'kitchen', yaw: -40, pitch: -8, label: 'Kitchen', actionLabel: 'Step back to kitchen' }],
      story: 'A quieter pause in the route, with softer tones that make the private wing feel calm and sheltered.',
      directionCue: 'This is the private end of the path; step back through the kitchen to reconnect with the shared spaces.',
      minimapPosition: { x: 72, y: 34 }
    },
    {
      id: 'balcony',
      name: 'Balcony',
      panorama: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=85',
      hotspots: [{ targetRoomId: 'living-room', yaw: 120, pitch: -5, label: 'Living Room', actionLabel: 'Return inside' }],
      story: 'The route releases outdoors here, turning the interior sequence into an open-air moment above the city.',
      directionCue: 'The balcony sits just off the living room, giving the tour a natural breath before returning inside.',
      minimapPosition: { x: 16, y: 72 }
    }
  ]
};

const jaffaArtistLoftTour: ListingTour = {
  ...telAvivPenthouseTour,
  slug: 'jaffa-artist-loft',
  backListingPath: '/listing/jaffa-artist-loft',
  propertyLabel: 'Jaffa Artist Loft · Premium 360 walkthrough'
};

const tours: Record<string, ListingTour> = {
  'tel-aviv-penthouse': telAvivPenthouseTour,
  'jaffa-artist-loft': jaffaArtistLoftTour
};

export function getTourBySlug(slug: string) {
  return tours[slug];
}
