'use client';

import { useEffect, useMemo, useState } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import Link from 'next/link';
import type { ListingTour, TourHotspot } from '@/data/tours/types';

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
    guidedEyebrow: string;
    guidedTitle: string;
    guidedDescription: string;
    startImmersiveWalkthrough: string;
    lookAround: string;
    tapHotspots: string;
    floorplan: string;
    youAreHere: string;
    spatialPath: string;
    entering: string;
  };
};

const hotspotPositions = [
  { top: '43%', left: '29%' },
  { top: '54%', left: '70%' },
  { top: '35%', left: '53%' }
];

const transitionDelayMs = 420;
const transitionSettleMs = 520;

export function TourViewer({ tour, locale, isRtl, labels }: TourViewerProps) {
  const [activeRoomId, setActiveRoomId] = useState(tour.initialRoomId);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [transitionTargetName, setTransitionTargetName] = useState<string | null>(null);

  const room = useMemo(() => tour.rooms.find((item) => item.id === activeRoomId) ?? tour.rooms[0], [activeRoomId, tour.rooms]);
  const activeRoomIndex = useMemo(() => Math.max(tour.rooms.findIndex((item) => item.id === room.id), 0), [room.id, tour.rooms]);
  const nextRoom = tour.rooms[(activeRoomIndex + 1) % tour.rooms.length];
  const primaryHotspot = room.hotspots[0];
  const primaryTarget = primaryHotspot ? tour.rooms.find((item) => item.id === primaryHotspot.targetRoomId) : nextRoom;

  useEffect(() => {
    setLoading(true);
    setIsTransitioning(true);
  }, [room.id]);

  const transitionToRoom = (targetRoomId: string, targetName?: string) => {
    if (targetRoomId === room.id || isTransitioning) return;
    setShowGuide(false);
    setTransitionTargetName(targetName ?? tour.rooms.find((item) => item.id === targetRoomId)?.name ?? null);
    setIsTransitioning(true);
    window.setTimeout(() => setActiveRoomId(targetRoomId), transitionDelayMs);
  };

  const startWalkthrough = () => {
    setShowGuide(false);
    const target = primaryTarget ?? nextRoom;
    if (target && target.id !== room.id) {
      transitionToRoom(target.id, target.name);
    }
  };

  const guideLabel = activeRoomIndex === 0 ? labels.startImmersiveWalkthrough : `${labels.continueTo} ${primaryTarget?.name ?? nextRoom.name}`;
  const transitionLabel = transitionTargetName ? `${labels.entering} ${transitionTargetName}` : labels.loading;
  const visitedRooms = new Set(tour.rooms.slice(0, activeRoomIndex + 1).map((item) => item.id));

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="relative h-[100dvh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 z-[11] bg-[radial-gradient(circle_at_50%_45%,transparent_18%,rgba(2,6,23,0.28)_58%,rgba(2,6,23,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[12] bg-[linear-gradient(115deg,rgba(8,47,73,0.48),transparent_34%,rgba(15,23,42,0.72)_100%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[13] h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[13] h-64 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[14] opacity-[0.12] [background-image:radial-gradient(circle_at_20%_20%,white_0_1px,transparent_1px)] [background-size:34px_34px]" />

      <div
        className={`absolute inset-0 z-20 overflow-hidden bg-slate-950/95 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          loading || isTransitioning ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(103,232,249,0.2),transparent_34%),linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-100/45 to-transparent shadow-[0_0_80px_rgba(165,243,252,0.45)]" />
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="relative h-14 w-14">
            <span className="absolute inset-0 animate-ping rounded-full border border-cyan-100/40" />
            <span className="absolute inset-2 animate-spin rounded-full border-2 border-white/20 border-t-cyan-200" />
            <span className="absolute inset-[1.35rem] rounded-full bg-cyan-200 shadow-[0_0_28px_rgba(103,232,249,0.8)]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/90">{transitionLabel}</p>
        </div>
      </div>

      <div
        className={`h-full w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isTransitioning ? 'scale-[1.035] blur-[1px] brightness-75 saturate-75' : 'scale-100 blur-0 brightness-100 saturate-100'
        }`}
      >
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
            window.setTimeout(() => {
              setIsTransitioning(false);
              setTransitionTargetName(null);
            }, transitionSettleMs);
          }}
        />
      </div>

      {room.hotspots.map((spot, idx) => (
        <HotspotButton
          key={`${room.id}-${spot.targetRoomId}`}
          hotspot={spot}
          position={hotspotPositions[idx % hotspotPositions.length]}
          isPrimary={idx === 0}
          disabled={isTransitioning}
          onSelect={() => transitionToRoom(spot.targetRoomId, tour.rooms.find((item) => item.id === spot.targetRoomId)?.name)}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 p-3 sm:p-6">
        <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-slate-950/35 p-2.5 shadow-2xl shadow-black/25 backdrop-blur-2xl sm:p-3">
          <Link href={`/${locale}${tour.backListingPath}`} className="rounded-xl bg-white/10 px-3 py-2 text-xs font-medium transition hover:bg-white/20 sm:text-sm">
            {isRtl ? '' : '← '}{labels.backToListing}{isRtl ? ' ←' : ''}
          </Link>
          <div className="hidden min-w-0 flex-1 px-3 text-center sm:block">
            <p className="truncate text-xs uppercase tracking-[0.24em] text-cyan-100/75">{tour.propertyLabel}</p>
            <p className="truncate text-sm text-white/80">{room.story}</p>
          </div>
          <button onClick={() => document.documentElement.requestFullscreen()} className="rounded-xl bg-white/10 px-3 py-2 text-xs font-medium transition hover:bg-white/20 sm:text-sm">
            {labels.fullscreen}
          </button>
        </div>
      </div>

      {showGuide && !loading && !isTransitioning && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-5">
          <div className="pointer-events-auto max-w-md rounded-[2rem] border border-white/20 bg-slate-950/55 p-5 text-center shadow-[0_24px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/80">{labels.guidedEyebrow}</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">{labels.guidedTitle}</h1>
            <p className="mt-3 text-sm leading-6 text-white/72">{labels.guidedDescription}</p>
            <div className="mt-5 grid gap-2 text-xs text-white/65 sm:grid-cols-2">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">{labels.lookAround}</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">{labels.tapHotspots}</span>
            </div>
            <button
              onClick={startWalkthrough}
              className="mt-6 w-full rounded-2xl bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_45px_rgba(103,232,249,0.42)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              {guideLabel}
            </button>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-3 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
          <div className="pointer-events-auto rounded-[1.6rem] border border-white/15 bg-slate-950/45 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{labels.rooms}</p>
                <p className="text-sm font-medium text-white/90 sm:text-base">{room.name}</p>
              </div>
              <span className="rounded-full border border-cyan-100/30 bg-cyan-200/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan-100/90">
                {labels.roomProgress} {activeRoomIndex + 1}/{tour.rooms.length}
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tour.rooms.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => transitionToRoom(item.id, item.name)}
                  className={`group min-w-[9rem] rounded-2xl border px-3 py-2.5 text-start transition-all duration-300 ${
                    item.id === room.id
                      ? 'border-cyan-100/60 bg-cyan-200 text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.38)]'
                      : visitedRooms.has(item.id)
                        ? 'border-cyan-100/20 bg-cyan-100/10 text-white/90 hover:bg-white/18'
                        : 'border-white/10 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/18'
                  }`}
                >
                  <span className={`block text-[10px] uppercase tracking-[0.16em] ${item.id === room.id ? 'text-slate-700' : 'text-white/45'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{item.name}</span>
                  <span className={`mt-1 block h-0.5 rounded-full transition ${idx <= activeRoomIndex ? 'bg-cyan-200/80' : 'bg-white/15'} ${item.id === room.id ? 'bg-slate-950/40' : ''}`} />
                </button>
              ))}
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-5 text-cyan-50/85">
                <span className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/45">{labels.spatialPath}</span>
                {room.directionCue}
              </div>
              {primaryTarget && (
                <button
                  onClick={() => transitionToRoom(primaryTarget.id, primaryTarget.name)}
                  className="rounded-2xl border border-cyan-100/30 bg-cyan-100/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:-translate-y-0.5 hover:bg-cyan-100 hover:text-slate-950"
                >
                  {activeRoomIndex === 0 ? labels.startTour : `${labels.continueTo} ${primaryTarget.name}`}
                </button>
              )}
            </div>
          </div>

          <div className="pointer-events-auto hidden rounded-[1.6rem] border border-white/15 bg-slate-950/40 p-3 shadow-2xl shadow-black/25 backdrop-blur-2xl sm:block">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{labels.floorplan}</p>
              <span className="text-[10px] text-cyan-100/75">{labels.youAreHere}</span>
            </div>
            <div className="relative h-32 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(15,23,42,0.9),rgba(8,47,73,0.55),rgba(0,0,0,0.9))] p-3">
              <div className="absolute inset-3 rounded-[1rem] border border-white/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.22),transparent_42%)]" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polyline
                  points={tour.rooms.map((item) => `${item.minimapPosition.x},${item.minimapPosition.y}`).join(' ')}
                  fill="none"
                  stroke="rgba(165,243,252,0.26)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
              </svg>
              {tour.rooms.map((item, idx) => (
                <span
                  key={item.id}
                  className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                    item.id === room.id ? 'bg-cyan-200 ring-8 ring-cyan-100/20 shadow-[0_0_35px_rgba(103,232,249,0.8)]' : visitedRooms.has(item.id) ? 'bg-cyan-100/70' : 'bg-white/35'
                  }`}
                  style={{ left: `${item.minimapPosition.x}%`, top: `${item.minimapPosition.y}%` }}
                  title={item.name}
                >
                  <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[9px] text-white/60">{idx + 1}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HotspotButton({
  hotspot,
  position,
  isPrimary,
  disabled,
  onSelect
}: {
  hotspot: TourHotspot;
  position: { top: string; left: string };
  isPrimary: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className="group absolute z-30 -translate-x-1/2 -translate-y-1/2 disabled:cursor-wait disabled:opacity-70"
      style={position}
      aria-label={hotspot.actionLabel ?? hotspot.label}
    >
      <span className="absolute -inset-6 -z-20 rounded-full bg-cyan-300/10 opacity-80 blur-2xl transition duration-500 group-hover:scale-125 group-hover:bg-cyan-200/25" />
      <span className="absolute -inset-3 -z-10 animate-ping rounded-full border border-cyan-200/25" />
      <span className={`absolute -inset-1 -z-10 rounded-full bg-cyan-300/20 blur-md transition group-hover:bg-cyan-100/40 ${isPrimary ? 'opacity-100' : 'opacity-70'}`} />
      <span className="flex items-center gap-2 rounded-full border border-cyan-100/70 bg-slate-950/55 px-3.5 py-2 text-xs font-semibold text-cyan-50 shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-white group-hover:bg-slate-950/80 group-hover:shadow-[0_0_48px_rgba(34,211,238,0.45)] group-active:scale-95 sm:text-sm">
        <span className="relative h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.9)]">
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan-200/60" />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span>{hotspot.actionLabel ?? hotspot.label}</span>
          <span className="text-[10px] font-normal text-cyan-100/65">{hotspot.label}</span>
        </span>
      </span>
    </button>
  );
}
