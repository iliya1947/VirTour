export type TourHotspot = {
  targetRoomId: string;
  yaw: number;
  pitch: number;
  label: string;
  actionLabel?: string;
};

export type TourRoom = {
  id: string;
  name: string;
  panorama: string;
  initialYaw?: number;
  initialPitch?: number;
  hotspots: TourHotspot[];
  story: string;
  directionCue: string;
  minimapPosition: { x: number; y: number };
};

export type ListingTour = {
  slug: string;
  backListingPath: string;
  propertyLabel: string;
  rooms: TourRoom[];
  initialRoomId: string;
};
