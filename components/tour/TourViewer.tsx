'use client';

import { useEffect, useMemo, useState } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import Link from 'next/link';
import type { ListingTour } from '@/data/tours/types';

type TourViewerProps = {
  tour: ListingTour;
  locale: string;
  isRtl: boolean;
  labels: {
    backToListing: string;
    rooms: string;
    fullscreen: string;
    minimap: string;
    loading: string;
    startTour: string;
    continueTo: string;
    roomProgress: string;
  };
};

const hotspotPositions = [
  { top: '42%', left: '28%' },
  { top: '52%', left: '70%' },
  { top: '34%', left: '52%' }
];

export function TourViewer({ tour, locale, isRtl, labels }: TourViewerProps) {
  const [activeRoomId, setActiveRoomId] = useState(tour.initialRoomId);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const room = useMemo(() => tour.rooms.find((item) => item.id === activeRoomId) ?? tour.rooms[0], [activeRoomId, tour.rooms]);
  const activeRoomIndex = useMemo(() => Math.max(tour.rooms.findIndex((item) => item.id === room.id), 0), [room.id, tour.rooms]);

  useEffect(() => {
    setLoading(true);
    setIsTransitioning(true);
  }, [room.id]);

  const transitionToRoom = (targetRoomId: string) => {
    if (targetRoomId === room.id || isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => setActiveRoomId(targetRoomId), 220);
  };

  const guideLabel = activeRoomIndex === 0 ? labels.startTour : `${labels.continueTo} ${room.name}`;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="relative h-[100dvh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 z-[11] bg-[radial-gradient(circle_at_center,_transparent_25%,_rgba(2,6,23,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-b from-black/45 via-transparent to-black/65" />

      <div
        className={`absolute inset-0 z-20 bg-slate-950/95 transition-all duration-700 ${
          loading || isTransitioning ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-cyan-200" />
          <p className="text-sm tracking-[0.15em] text-cyan-100/90">{labels.loading}</p>
        </div>
      </div>

      <div className={`h-full w-full transition duration-700 ${isTransitioning ? 'scale-[1.018] blur-[0.7px]' : 'scale-100 blur-0'}`}>
        <ReactPhotoSphereViewer
          key={room.id}
          src={room.panorama}
          width="100%"
          height="100%"
          defaultYaw={room.initialYaw ?? 0}
          defaultPitch={room.initialPitch ?? 0}
          navbar={false}
          touchmoveTwoFingers
          loadingTxt={labels.loading}
          onReady={() => {
            setLoading(false);
            window.setTimeout(() => setIsTransitioning(false), 280);
          }}
        />
      </div>

      {room.hotspots.map((spot, idx) => (
        <button
          key={`${room.id}-${spot.targetRoomId}`}
          onClick={() => transitionToRoom(spot.targetRoomId)}
          className="group absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={hotspotPositions[idx % hotspotPositions.length]}
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-300/35 blur-sm" />
          <span className="absolute inset-0 -z-10 rounded-full bg-cyan-300/20 blur-md transition group-hover:bg-cyan-200/35" />
          <span className="flex items-center gap-2 rounded-full border border-cyan-100/80 bg-slate-900/55 px-3 py-2 text-xs font-medium text-cyan-50 backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:bg-slate-900/80 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            {spot.label}
          </span>
        </button>
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 p-4 sm:p-6">
        <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-2xl">
          <Link href={`/${locale}${tour.backListingPath}`} className="rounded-xl bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20">
            ← {labels.backToListing}
          </Link>
          <button onClick={() => document.documentElement.requestFullscreen()} className="rounded-xl bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20">
            {labels.fullscreen}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6">
        <div className="grid gap-3 md:grid-cols-[1fr_240px]">
          <div className="pointer-events-auto rounded-2xl border border-white/20 bg-black/40 p-3 backdrop-blur-2xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/65">{labels.rooms}</p>
              <span className="rounded-full border border-cyan-100/30 bg-cyan-200/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan-100/90">
                {labels.roomProgress} {activeRoomIndex + 1}/{tour.rooms.length}
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {tour.rooms.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => transitionToRoom(item.id)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    item.id === room.id
                      ? 'bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.45)]'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  <span className="mr-2 text-[10px] uppercase tracking-[0.14em] text-white/65">{idx + 1}</span>
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-2 text-xs text-cyan-100/90">
              {guideLabel}
            </div>
          </div>

          <div className="pointer-events-auto rounded-2xl border border-white/20 bg-black/35 p-3 backdrop-blur-2xl">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/65">{labels.minimap}</p>
            <div className="relative h-24 rounded-xl border border-white/20 bg-gradient-to-br from-slate-800 via-slate-900 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.18),transparent_45%)]" />
              {tour.rooms.map((item, idx) => (
                <span
                  key={item.id}
                  className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                    item.id === room.id ? 'bg-cyan-300 ring-4 ring-cyan-100/35' : 'bg-white/40'
                  }`}
                  style={{ left: `${item.minimapPosition.x}%`, top: `${item.minimapPosition.y}%` }}
                >
                  {idx < activeRoomIndex && <span className="absolute -inset-1 rounded-full border border-cyan-200/30" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
