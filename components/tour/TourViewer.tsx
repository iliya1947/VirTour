'use client';

import { useEffect, useMemo, useState } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import Link from 'next/link';
import type { ListingTour } from '@/data/tours/types';

type TourViewerProps = {
  tour: ListingTour;
  locale: string;
  isRtl: boolean;
  labels: { backToListing: string; rooms: string; fullscreen: string; minimap: string; loading: string };
};

const hotspotPositions = [
  { top: '42%', left: '28%' },
  { top: '52%', left: '70%' },
  { top: '34%', left: '52%' }
];

export function TourViewer({ tour, locale, isRtl, labels }: TourViewerProps) {
  const [activeRoomId, setActiveRoomId] = useState(tour.initialRoomId);
  const [loading, setLoading] = useState(true);
  const room = useMemo(() => tour.rooms.find((item) => item.id === activeRoomId) ?? tour.rooms[0], [activeRoomId, tour.rooms]);

  useEffect(() => {
    setLoading(true);
  }, [room.id]);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="relative h-[100dvh] w-full overflow-hidden bg-slate-950 text-white">
      <div className={`absolute inset-0 z-10 bg-slate-950 transition-opacity duration-700 ${loading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}><div className="flex h-full items-center justify-center text-sm text-cyan-100/90">{labels.loading}</div></div>
      <ReactPhotoSphereViewer key={room.id} src={room.panorama} width="100%" height="100%" defaultYaw={room.initialYaw ?? 0} defaultPitch={room.initialPitch ?? 0} navbar={false} touchmoveTwoFingers loadingTxt={labels.loading} onReady={() => setLoading(false)} />
      {room.hotspots.map((spot, idx) => (
        <button key={`${room.id}-${spot.targetRoomId}`} onClick={() => setActiveRoomId(spot.targetRoomId)} className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 bg-slate-900/70 px-3 py-2 text-xs backdrop-blur-xl transition hover:scale-105" style={hotspotPositions[idx % hotspotPositions.length]}>
          {spot.label}
        </button>
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-4 sm:p-6"><div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl"><Link href={`/${locale}${tour.backListingPath}`} className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/20">← {labels.backToListing}</Link><button onClick={() => document.documentElement.requestFullscreen()} className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/20">{labels.fullscreen}</button></div></div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6"><div className="grid gap-3 md:grid-cols-[1fr_240px]"><div className="pointer-events-auto rounded-2xl border border-white/20 bg-black/40 p-3 backdrop-blur-xl"><p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/65">{labels.rooms}</p><div className="flex gap-2 overflow-x-auto pb-1">{tour.rooms.map((item) => <button key={item.id} onClick={() => setActiveRoomId(item.id)} className={`rounded-xl px-3 py-2 text-sm transition ${item.id === room.id ? 'bg-cyan-300 text-slate-950' : 'bg-white/10 hover:bg-white/20'}`}>{item.name}</button>)}</div></div><div className="pointer-events-auto rounded-2xl border border-white/20 bg-black/35 p-3 backdrop-blur-xl"><p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/65">{labels.minimap}</p><div className="relative h-24 rounded-xl border border-white/20 bg-gradient-to-br from-slate-800 to-slate-900">{tour.rooms.map((item) => <span key={item.id} className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${item.id === room.id ? 'bg-cyan-300 ring-2 ring-cyan-100/80' : 'bg-white/50'}`} style={{ left: `${item.minimapPosition.x}%`, top: `${item.minimapPosition.y}%` }} />)}</div></div></div></div>
    </div>
  );
}
