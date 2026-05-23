import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getListingBySlug, getRelatedListings, listings, localizeListing, type Locale } from '@/data/listings';
import { getI18n, isRtl, locales } from '@/lib/i18n';

type Props = { params: { lang: string; slug: string } };

export function generateStaticParams() {
  return locales.flatMap((lang) => listings.map((listing) => ({ lang, slug: listing.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.lang as Locale;
  const listing = getListingBySlug(params.slug);
  if (!listing || !locales.includes(locale)) return {};
  const localized = localizeListing(listing, locale);
  return {
    title: `${localized.title} | VirTour`,
    description: localized.description,
    openGraph: {
      title: localized.title,
      description: localized.description,
      images: [localized.images[0]]
    }
  };
}

export default function ListingPage({ params }: Props) {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) notFound();
  const listing = getListingBySlug(params.slug);
  if (!listing) notFound();
  const { t } = getI18n(locale);
  const item = localizeListing(listing, locale);
  const related = getRelatedListings(item.slug).map((r) => localizeListing(r, locale));

  return (
    <main lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className="mx-auto w-[94%] max-w-7xl space-y-10 py-8">
      <section className="grid gap-3 md:grid-cols-4">
        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-2 md:h-[28rem]"><Image src={item.images[0]} alt={item.title} fill className="object-cover" /></div>
        {item.images.slice(1).map((src) => <div key={src} className="relative h-56 overflow-hidden rounded-3xl"><Image src={src} alt={item.title} fill className="object-cover" /></div>)}
      </section>
      <section className="space-y-4">
        <p className="text-3xl font-bold text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.price)}</p>
        <h1 className="text-4xl font-semibold">{item.title}</h1>
        <p className="text-white/80">{t('listings', `cities.${item.city}`)} · {item.neighborhood}</p>
        <div className="flex flex-wrap gap-2 text-sm text-white/80"><span>{item.rooms} {t('listings', 'listingPage.rooms')}</span><span>•</span><span>{item.bathrooms} {t('listings', 'listingPage.bathrooms')}</span><span>•</span><span>{item.area} {t('listings', 'listingPage.sqm')}</span></div>
        <div className="flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs">{tag}</span>)}</div>
        <p className="text-white/75">{item.description}</p>
      </section>
      <section className="glass rounded-3xl p-6"><h2 className="text-2xl font-semibold">{t('listings', 'listingPage.features')}</h2><div className="mt-4 flex flex-wrap gap-2">{item.features.map((f)=><span key={f} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2">{f}</span>)}</div></section>
      <section className="glass rounded-3xl p-6"><h2 className="text-2xl font-semibold">{t('listings', 'listingPage.agent')}</h2><div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center"><Image src={item.agent.photo} alt={item.agent.name} width={72} height={72} className="rounded-full" /><div className="flex-1"><p className="text-xl font-semibold">{item.agent.name} {item.agent.verified ? '✓' : ''}</p><p className="text-white/70">{item.agent.agencyName}</p></div><a href={`https://wa.me/${item.agent.whatsapp.replace('+', '')}`} className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-900">{t('listings', 'listingPage.whatsapp')}</a><a href={`tel:${item.agent.phone}`} className="rounded-full border border-white/20 px-4 py-2">{t('listings', 'listingPage.call')}</a></div></section>
      <section className="rounded-3xl border border-cyan-300/30 bg-cyan-500/10 p-8"><h2 className="text-2xl font-semibold">{t('listings', 'listingPage.tourTitle')}</h2><p className="mt-2 text-white/75">{t('listings', 'listingPage.tourDescription')}</p><button className="mt-5 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-900">{t('listings', 'listingPage.tourCta')}</button></section>
      <section><h2 className="text-2xl font-semibold">{t('listings', 'listingPage.related')}</h2><div className="mt-4 flex gap-4 overflow-x-auto pb-2">{related.map((rel)=><Link key={rel.slug} href={`/${locale}/listing/${rel.slug}`} className="min-w-[260px] rounded-2xl border border-white/10 bg-white/5 p-3"><div className="relative h-36 overflow-hidden rounded-xl"><Image src={rel.images[0]} alt={rel.title} fill className="object-cover" /></div><p className="mt-3 font-semibold">{rel.title}</p></Link>)}</div></section>
    </main>
  );
}
