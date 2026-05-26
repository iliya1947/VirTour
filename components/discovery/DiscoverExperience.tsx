'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { listings, localizeListing } from '@/data/listings';
import { getI18n, isRtl, type Locale } from '@/lib/i18n';

type Props = { locale: Locale };
type FilterKey = 'sea' | 'luxury' | 'tour360';

export function DiscoverExperience({ locale }: Props) {
  const { t } = getI18n(locale);
  const [activeSlug, setActiveSlug] = useState(listings[0]?.slug ?? '');
  const [hoverSlug, setHoverSlug] = useState('');
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('map');
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>([]);
  const [maxPrice, setMaxPrice] = useState(12000000);
  const [minRooms, setMinRooms] = useState(3);

  const localized = useMemo(() => listings.map((item) => localizeListing(item, locale)), [locale]);
  const filtered = localized.filter((item) => {
    if (item.price > maxPrice || item.rooms < minRooms) return false;
    if (activeFilters.includes('sea') && !item.tags.some((tag) => /sea|coast/i.test(tag))) return false;
    if (activeFilters.includes('luxury') && !item.tags.some((tag) => /luxury|premium/i.test(tag))) return false;
    if (activeFilters.includes('tour360') && !item.tourAvailable) return false;
    return true;
  });

  const focusSlug = hoverSlug || activeSlug;
  const activeItem = filtered.find((item) => item.slug === focusSlug) || filtered[0];
  const focusIndex = Math.max(0, filtered.findIndex((item) => item.slug === (activeItem?.slug ?? '')));

  function toggleFilter(key: FilterKey) {
    setActiveFilters((prev) => (prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key]));
  }

  return (
    <main lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className="h-[calc(100vh-1rem)] overflow-hidden bg-slate-950 p-2 md:p-4">
      <section className="relative mx-auto grid h-full w-full max-w-[1780px] grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_24px_80px_rgba(2,6,23,.45)] md:grid-cols-[minmax(440px,42vw)_1fr]">
        <div className="sticky top-0 z-50 col-span-full border-b border-white/10 bg-slate-950/90 px-3 py-3 backdrop-blur-xl md:px-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {[{ label: `${t('discover', 'filters.price')} · ≤ ${new Intl.NumberFormat(locale).format(maxPrice)}`, active: true }, { label: `${t('discover', 'filters.rooms')} · ${minRooms}+`, active: true }, { label: t('discover', 'filters.seaView'), active: activeFilters.includes('sea'), onClick: () => toggleFilter('sea') }, { label: t('discover', 'filters.tour360'), active: activeFilters.includes('tour360'), onClick: () => toggleFilter('tour360') }, { label: t('discover', 'filters.luxury'), active: activeFilters.includes('luxury'), onClick: () => toggleFilter('luxury') }].map((filter) => (
              <button key={filter.label} onClick={filter.onClick} className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition md:text-sm ${filter.active ? 'border-cyan-300/60 bg-cyan-300/20 text-cyan-100 shadow-[0_0_0_1px_rgba(103,232,249,.2)]' : 'border-white/20 bg-white/5 text-white/85 hover:border-white/35 hover:bg-white/10'}`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col border-b border-white/10 md:border-b-0 md:border-e">
          <div className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 px-3 py-3 backdrop-blur-xl md:hidden">
            <div className="grid grid-cols-2 rounded-full border border-white/20 bg-black/30 p-1 text-sm">
              <button onClick={() => setMobileTab('list')} className={`rounded-full px-4 py-2 ${mobileTab === 'list' ? 'bg-white/20 text-white' : 'text-white/75'}`}>{t('discover', 'tabs.list')}</button>
              <button onClick={() => setMobileTab('map')} className={`rounded-full px-4 py-2 ${mobileTab === 'map' ? 'bg-white/20 text-white' : 'text-white/75'}`}>{t('discover', 'tabs.map')}</button>
            </div>
          </div>

          <div className={`min-h-0 flex-1 overflow-auto px-3 pb-5 pt-4 md:px-6 md:pt-6 ${mobileTab === 'map' ? 'hidden md:block' : 'block'}`}>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">{t('discover', 'eyebrow')}</p>
                <h1 className="text-2xl font-semibold md:text-3xl">{t('discover', 'title')}</h1>
              </div>
              <p className="text-sm text-white/70">{filtered.length} {t('discover', 'results')}</p>
            </div>
            <div className="grid gap-3">
              {filtered.map((item, idx) => {
                const active = focusSlug === item.slug;
                const activityKey = idx % 3 === 0 ? 'popular' : idx % 3 === 1 ? 'viewed' : 'recent';
                return (
                  <article
                    key={item.slug}
                    onMouseEnter={() => setHoverSlug(item.slug)}
                    onMouseLeave={() => setHoverSlug('')}
                    onClick={() => setActiveSlug(item.slug)}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${active ? 'border-cyan-300/80 bg-cyan-300/12 shadow-[0_10px_36px_rgba(34,211,238,.2)] -translate-y-0.5' : 'border-white/10 bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]'}`}
                  >
                    <div className={`absolute inset-y-0 start-0 w-1 rounded-full bg-gradient-to-b from-cyan-200 to-sky-400 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`} />
                    <div className="grid grid-cols-[126px_1fr] gap-3 p-3">
                      <div className="relative h-24 overflow-hidden rounded-xl">
                        <Image src={item.images[0]} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}</p>
                        <h3 className="line-clamp-1 font-semibold">{item.title}</h3>
                        <p className="text-sm text-white/70">{t('listings', `cities.${item.city}`)} · {item.neighborhood}</p>
                        <p className="mt-1 text-xs text-white/65">{item.rooms} {t('listings', 'listingPage.rooms')} • {item.bathrooms} {t('listings', 'listingPage.bathrooms')} • {item.area} {t('listings', 'listingPage.sqm')}</p>
                        <p className="mt-2 inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/85">{t('discover', `activity.${activityKey}`)}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`relative min-h-0 overflow-hidden ${mobileTab === 'list' ? 'hidden md:block' : 'block'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(circle_at_88%_78%,rgba(14,116,144,0.34),transparent_48%),linear-gradient(180deg,#020617,#0a1125_45%,#111827)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transform: `translate(${Math.min(6, Math.max(-6, (focusIndex % 3) * 2 - 2))}%, ${Math.min(4, Math.max(-4, ((focusIndex + 1) % 4) * 1.5 - 2))}%) scale(1.04)`
            }}
          >
          {filtered.map((item) => {
            const x = 20 + (item.coordinates.lng - 34.72) * 380;
            const y = 75 - (item.coordinates.lat - 31.95) * 130;
            const active = focusSlug === item.slug;
            return (
              <button
                key={item.slug}
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setHoverSlug(item.slug)}
                onMouseLeave={() => setHoverSlug('')}
                onClick={() => setActiveSlug(item.slug)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xl transition-all duration-300 ease-out ${active ? 'z-30 scale-110 border-cyan-100 bg-cyan-300 text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,.35),0_12px_34px_rgba(34,211,238,.55)]' : 'z-20 border-white/35 bg-black/55 text-white backdrop-blur-xl hover:scale-110 hover:bg-black/75 hover:shadow-[0_8px_28px_rgba(8,47,73,.5)]'}`}
              >
                <span className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`} />
                <span className={`absolute inset-0 -z-10 rounded-full bg-cyan-300/30 blur-md transition-all duration-300 ${active ? 'scale-[1.35] opacity-80' : 'scale-90 opacity-0'}`} />
                {new Intl.NumberFormat(locale, { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}
              </button>
            );
          })}

          {activeItem && (
            <div className="absolute bottom-4 end-4 z-40 w-[92%] max-w-sm rounded-2xl border border-white/20 bg-slate-900/85 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-out">
              <div className="relative h-36 overflow-hidden rounded-xl">
                <Image src={activeItem.images[0]} alt={activeItem.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-2 start-2 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white">{t('discover', 'activity.popular')}</div>
              </div>
              <p className="mt-3 text-xl font-bold text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: activeItem.currency, maximumFractionDigits: 0 }).format(activeItem.price)}</p>
              <h3 className="font-semibold">{activeItem.title}</h3>
              <p className="text-sm text-white/75">{t('listings', `cities.${activeItem.city}`)} · {activeItem.neighborhood}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-white/80">
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">{t('discover', 'activity.viewed')}</span>
                <span className="rounded-full border border-cyan-200/25 bg-cyan-200/10 px-2 py-1">{t('discover', 'activity.recent')}</span>
              </div>
              <Link href={`/${locale}/listing/${activeItem.slug}`} className="mt-3 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900">{t('discover', 'preview.cta')}</Link>
            </div>
          )}

          <div className="absolute bottom-4 start-4 z-30 space-y-2 rounded-2xl border border-white/20 bg-slate-900/70 p-3 backdrop-blur-xl">
            <label className="block text-[11px] text-white/70">{t('discover', 'filters.price')}</label>
            <input type="range" min={2000000} max={20000000} step={500000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label={t('discover', 'filters.price')} className="w-44 accent-cyan-300 md:w-56" />
            <label className="block text-[11px] text-white/70">{t('discover', 'filters.rooms')}</label>
            <input type="range" min={2} max={8} step={1} value={minRooms} onChange={(e) => setMinRooms(Number(e.target.value))} aria-label={t('discover', 'filters.rooms')} className="w-44 accent-cyan-300 md:w-56" />
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
