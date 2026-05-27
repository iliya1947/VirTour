import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getListingBySlug, getRelatedListings, listings, localizeListing, type Locale } from '@/data/listings';
import { getI18n, isRtl, locales } from '@/lib/i18n';

type Props = { params: { lang: string; slug: string } };
export function generateStaticParams() { return locales.flatMap((lang) => listings.map((listing) => ({ lang, slug: listing.slug }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const locale = params.lang as Locale; const listing = getListingBySlug(params.slug); if (!listing || !locales.includes(locale)) return {}; const localized = localizeListing(listing, locale); return { title: `${localized.title} | VirTour`, description: localized.description, openGraph: { title: localized.title, description: localized.description, images: [localized.images[0]] } }; }

export default function ListingPage({ params }: Props) {
  const locale = params.lang as Locale; if (!locales.includes(locale)) notFound(); const listing = getListingBySlug(params.slug); if (!listing) notFound(); const { t } = getI18n(locale); const item = localizeListing(listing, locale); const related = getRelatedListings(item.slug).map((r) => localizeListing(r, locale));
  const listedDays = Math.max(1, Math.ceil((Date.now() - +new Date(item.listedAt)) / 86400000));

  return (
    <main lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className="mx-auto w-[94%] max-w-7xl space-y-8 py-6">
      <section className="grid gap-3 md:grid-cols-4">
        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-2 md:h-[30rem]"><Image src={item.images[0]} alt={item.title} fill className="object-cover" /><button className="absolute end-4 top-4 rounded-full bg-black/45 px-4 py-2 text-sm backdrop-blur">♡ {t('listings', 'meta.save')}</button></div>
        {item.images.slice(1).map((src) => <div key={src} className="relative h-56 overflow-hidden rounded-3xl"><Image src={src} alt={item.title} fill className="object-cover" /></div>)}
      </section>

      <section className="group relative isolate overflow-hidden rounded-3xl border border-cyan-300/30 bg-black/40 shadow-[0_20px_80px_rgba(8,145,178,0.28)] backdrop-blur-xl">
        <div className="absolute inset-0">
          <Image src={item.images[0]} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-950/70 to-cyan-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.24),transparent_60%)]" />
        </div>
        <div className="relative z-10 flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">{t('listings', 'meta.tour')}</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{t('listings', 'listingPage.tourTitle')}</h2>
            <p className="max-w-xl text-base text-white/85 sm:text-lg">{t('listings', 'listingPage.tourDescription')}</p>
          </div>
          <Link
            href={`/${locale}/tour/${item.slug}`}
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-200/50 bg-cyan-300/90 px-8 text-base font-semibold text-slate-950 shadow-[0_10px_35px_rgba(34,211,238,0.5)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_16px_45px_rgba(34,211,238,0.55)]"
          >
            {t('listings', 'listingPage.tourCta')}
          </Link>
        </div>
      </section>
      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-3xl font-bold text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}</p><h1 className="text-4xl font-semibold">{item.title}</h1><p className="text-white/80">{t('listings', `cities.${item.city}`)} · {item.neighborhood}</p></div><div className="flex gap-2">{item.badges.map((badge) => <span key={badge} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs">{t('listings', `badges.${badge}`)}</span>)}</div></div>
        <div className="flex flex-wrap gap-2 text-sm text-white/80"><span>{item.rooms} {t('listings', 'listingPage.rooms')}</span><span>•</span><span>{item.bathrooms} {t('listings', 'listingPage.bathrooms')}</span><span>•</span><span>{item.area} {t('listings', 'listingPage.sqm')}</span></div>
        <div className="grid gap-3 rounded-2xl bg-black/30 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4"><p>{t('listings', 'activity.listedAgo', { days: listedDays })}</p><p>{t('listings', 'activity.viewedToday', { count: item.viewsToday })}</p><p>{t('listings', 'activity.savedBy', { count: item.savedCount })}</p><p>{t('listings', 'activity.agentResponds', { speed: item.responseTime })}</p></div>
        <p className="text-white/80">{item.description}</p>
      </section>
      <section className="glass rounded-3xl p-6"><h2 className="text-2xl font-semibold">{t('listings', 'listingPage.features')}</h2><div className="mt-4 flex flex-wrap gap-2">{item.features.map((f)=><span key={f} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2">{f}</span>)}</div></section>
      <section className="glass rounded-3xl p-6"><h2 className="text-2xl font-semibold">{t('listings', 'listingPage.related')}</h2><div className="mt-4 flex gap-4 overflow-x-auto pb-2">{related.map((rel)=><Link key={rel.slug} href={`/${locale}/listing/${rel.slug}`} className="group min-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-white/5"><div className="relative h-44"><Image src={rel.images[0]} alt={rel.title} fill className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-3"><p className="font-semibold">{rel.title}</p><p className="text-sm text-white/70">{t('listings', `cities.${rel.city}`)} · {rel.neighborhood}</p></div></Link>)}</div></section>
    </main>
  );
}
