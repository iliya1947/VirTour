export type TourHotspot = {
  targetRoomId: string;
  yaw: number;
  pitch: number;
  label: string;
};

export type TourRoom = {
  id: string;
  name: string;
  panorama: string;
  initialYaw?: number;
  initialPitch?: number;
  hotspots: TourHotspot[];
  minimapPosition: { x: number; y: number };
};

export type ListingTour = {
  slug: string;
  backListingPath: string;
  rooms: TourRoom[];
  initialRoomId: string;
};
