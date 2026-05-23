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
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
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

  function toggleFilter(key: FilterKey) {
    setActiveFilters((prev) => (prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key]));
  }

  return (
    <main lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className="h-[calc(100vh-1rem)] overflow-hidden p-2 md:p-3">
      <section className="glass relative mx-auto grid h-full w-full max-w-[1700px] grid-cols-1 overflow-hidden rounded-3xl border border-white/15 bg-slate-950/95 md:grid-cols-[1.05fr_1fr]">
        <div className="absolute inset-x-4 top-4 z-40 flex flex-wrap gap-2 md:inset-x-auto md:start-4">
          {[{ label: t('discover', 'filters.price'), active: true }, { label: t('discover', 'filters.rooms'), active: true }, { label: t('discover', 'filters.seaView'), active: activeFilters.includes('sea'), onClick: () => toggleFilter('sea') }, { label: t('discover', 'filters.luxury'), active: activeFilters.includes('luxury'), onClick: () => toggleFilter('luxury') }, { label: t('discover', 'filters.tour360'), active: activeFilters.includes('tour360'), onClick: () => toggleFilter('tour360') }].map((filter) => (
            <button key={filter.label} onClick={filter.onClick} className={`rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-xl transition ${filter.active ? 'border-cyan-300/50 bg-cyan-300/20 text-cyan-100' : 'border-white/20 bg-white/10 text-white/85 hover:bg-white/20'}`}>
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex min-h-0 flex-col border-b border-white/10 pt-20 md:border-b-0 md:border-e md:pt-24">
          <div className="px-4 pb-3 md:hidden">
            <div className="inline-flex rounded-full border border-white/20 bg-black/35 p-1 text-sm">
              <button onClick={() => setMobileTab('list')} className={`rounded-full px-4 py-2 ${mobileTab === 'list' ? 'bg-white/20 text-white' : 'text-white/75'}`}>{t('discover', 'tabs.list')}</button>
              <button onClick={() => setMobileTab('map')} className={`rounded-full px-4 py-2 ${mobileTab === 'map' ? 'bg-white/20 text-white' : 'text-white/75'}`}>{t('discover', 'tabs.map')}</button>
            </div>
          </div>
          <div className={`min-h-0 flex-1 overflow-auto px-4 pb-6 ${mobileTab === 'map' ? 'hidden md:block' : 'block'}`}>
            <div className="mb-4 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">{t('discover', 'eyebrow')}</p><h1 className="text-2xl font-semibold md:text-3xl">{t('discover', 'title')}</h1></div><p className="text-sm text-white/70">{filtered.length} {t('discover', 'results')}</p></div>
            <div className="grid gap-4">
              {filtered.map((item) => {
                const active = focusSlug === item.slug;
                return <article key={item.slug} onMouseEnter={() => setHoverSlug(item.slug)} onMouseLeave={() => setHoverSlug('')} onClick={() => setActiveSlug(item.slug)} className={`group cursor-pointer overflow-hidden rounded-2xl border transition ${active ? 'border-cyan-300/70 bg-cyan-300/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><div className="grid grid-cols-[120px_1fr] gap-3 p-3"><div className="relative h-24 overflow-hidden rounded-xl"><Image src={item.images[0]} alt={item.title} fill className="object-cover" /></div><div><p className="text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}</p><h3 className="line-clamp-1 font-semibold">{item.title}</h3><p className="text-sm text-white/70">{t('listings', `cities.${item.city}`)} · {item.neighborhood}</p><p className="mt-1 text-xs text-white/65">{item.rooms} {t('listings', 'listingPage.rooms')} • {item.area} {t('listings', 'listingPage.sqm')}</p></div></div></article>;
              })}
            </div>
          </div>
        </div>
        <div className={`relative min-h-0 ${mobileTab === 'list' ? 'hidden md:block' : 'block'}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(8,145,178,0.35),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(14,116,144,0.35),transparent_45%),linear-gradient(180deg,#020617,#0f172a)]" /><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:42px_42px]" />
          {filtered.map((item) => { const x = 20 + (item.coordinates.lng - 34.72) * 380; const y = 75 - (item.coordinates.lat - 31.95) * 130; const active = focusSlug === item.slug; return <button key={item.slug} style={{ left: `${x}%`, top: `${y}%` }} onMouseEnter={() => setHoverSlug(item.slug)} onMouseLeave={() => setHoverSlug('')} onClick={() => setActiveSlug(item.slug)} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs font-semibold shadow-lg transition ${active ? 'z-30 scale-105 border-cyan-200 bg-cyan-300 text-slate-900' : 'z-20 border-white/35 bg-black/50 text-white backdrop-blur-xl hover:bg-black/70'}`}>{new Intl.NumberFormat(locale, { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}</button>; })}
          {activeItem && <div className="absolute bottom-4 end-4 z-40 w-[90%] max-w-sm rounded-2xl border border-white/20 bg-slate-900/75 p-3 shadow-2xl backdrop-blur-2xl"><div className="relative h-32 overflow-hidden rounded-xl"><Image src={activeItem.images[0]} alt={activeItem.title} fill className="object-cover" /></div><p className="mt-3 text-xl font-bold text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: activeItem.currency, maximumFractionDigits: 0 }).format(activeItem.price)}</p><h3 className="font-semibold">{activeItem.title}</h3><p className="text-sm text-white/75">{t('listings', `cities.${activeItem.city}`)}</p><Link href={`/${locale}/listing/${activeItem.slug}`} className="mt-3 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900">{t('discover', 'preview.cta')}</Link></div>}
          <div className="absolute bottom-4 start-4 z-30 hidden rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur md:flex"><input type="range" min={2000000} max={20000000} step={500000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label={t('discover', 'filters.price')} /><input type="range" min={2} max={8} step={1} value={minRooms} onChange={(e) => setMinRooms(Number(e.target.value))} aria-label={t('discover', 'filters.rooms')} /></div>
        </div>
      </section>
    </main>
  );
}
