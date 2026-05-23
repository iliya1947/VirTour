import Image from 'next/image';
import Link from 'next/link';
import { cityIds, discoveryCollections, featuredListings, listings, type DiscoveryTag } from '@/data/listings';
import { getI18n, Locale } from '@/lib/i18n';
import { StickyHeader } from '@/components/layout/StickyHeader';

type Props = { locale: Locale };

export function HomePage({ locale }: Props) {
  const { t } = getI18n(locale);
  const trending = listings.filter((l) => l.discoveryTags.includes('TRENDING')).slice(0, 4);
  const recent = [...listings].sort((a, b) => +new Date(b.listedAt) - +new Date(a.listedAt)).slice(0, 4);

  return (
    <main className="pb-16">
      <section className="relative min-h-[82vh]">
        <Image src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=80" alt={t('common', 'brandName')} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-premium-gradient" />
        <div className="relative"><StickyHeader locale={locale} /><div className="mx-auto flex min-h-[72vh] w-[94%] max-w-7xl items-end pb-14"><div className="max-w-3xl space-y-5"><p className="text-sm uppercase tracking-[0.24em] text-cyan-200/90">{t('homepage', 'hero.eyebrow')}</p><h1 className="text-4xl font-semibold leading-tight md:text-6xl">{t('homepage', 'hero.title')}</h1><p className="max-w-2xl text-base text-white/80 md:text-xl">{t('homepage', 'hero.subtitle')}</p></div></div></div>
      </section>

      <section className="mx-auto mt-10 w-[94%] max-w-7xl space-y-4">
        <h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.collectionsTitle')}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {discoveryCollections.map((collection) => (
            <article key={collection.id} className="group relative min-h-[220px] min-w-[280px] overflow-hidden rounded-3xl border border-white/10 sm:min-w-[350px]">
              <Image src={collection.coverImage} alt={t('homepage', `collections.${collection.id}`)} fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20 p-5 flex flex-col justify-end">
                <p className="text-2xl font-semibold">{t('homepage', `collections.${collection.id}`)}</p>
                <p className="text-sm text-white/75">{collection.listingSlugs.length} {t('homepage', 'sections.curatedHomes')}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-[94%] max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.featuredListingsTitle')}</h2><div className="flex flex-wrap gap-2">{(['RECENTLY_ADDED', 'TRENDING', 'RECOMMENDED'] as DiscoveryTag[]).map((tag) => <button key={tag} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/90">{t('listings', `discovery.${tag}`)}</button>)}</div></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (<article key={listing.slug} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink/70"><div className="relative h-72 sm:h-80"><Image src={listing.images[0]} alt={listing.title} fill className="object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" /><button className="absolute end-4 top-4 rounded-full bg-black/45 px-3 py-2 text-xs backdrop-blur">♡ {t('listings', 'meta.save')}</button><div className="absolute inset-x-4 bottom-4"><p className="text-2xl font-bold text-cyan-300">{new Intl.NumberFormat(locale, { style: 'currency', currency: listing.currency, maximumFractionDigits: 0 }).format(listing.price)}</p><h3 className="mt-1 text-xl font-semibold">{listing.title}</h3><p className="mt-1 text-sm text-white/80">{t('listings', `cities.${listing.city}`)} · {listing.neighborhood}</p></div></div><div className="p-4 text-sm text-white/75">{t('listings', 'activity.listedAgo', { days: Math.max(1, Math.ceil((Date.now() - +new Date(listing.listedAt)) / 86400000)) })} · {t('listings', 'activity.viewedToday', { count: listing.viewsToday })}<div className="mt-4"><Link href={`/${locale}/listing/${listing.slug}`} className="inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900">{t('listings', 'meta.viewListing')}</Link></div></div></article>))}
        </div>
      </section>

      <section className="mx-auto mt-10 grid w-[94%] max-w-7xl gap-6 lg:grid-cols-2"><div><h3 className="mb-4 text-2xl font-semibold">{t('homepage', 'sections.trendingNow')}</h3><div className="space-y-3">{trending.map((item) => <Link key={item.slug} href={`/${locale}/listing/${item.slug}`} className="glass block rounded-2xl p-4"><p className="font-semibold">{item.title}</p><p className="text-sm text-white/70">{item.description}</p></Link>)}</div></div><div><h3 className="mb-4 text-2xl font-semibold">{t('homepage', 'sections.recentlyAdded')}</h3><div className="space-y-3">{recent.map((item) => <Link key={item.slug} href={`/${locale}/listing/${item.slug}`} className="glass block rounded-2xl p-4"><p className="font-semibold">{item.title}</p><p className="text-sm text-white/70">{t('listings', 'activity.listedAgo', { days: Math.max(1, Math.ceil((Date.now() - +new Date(item.listedAt)) / 86400000)) })}</p></Link>)}</div></div></section>

      <section className="mx-auto mt-12 w-[94%] max-w-7xl space-y-6"><h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.browseByCityTitle')}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cityIds.map((cityId) => <article key={cityId} className="glass rounded-2xl p-5"><p className="text-xl font-semibold">{t('listings', `cities.${cityId}`)}</p><p className="text-sm text-white/65">{listings.filter((l) => l.city === cityId).length} {t('homepage', 'sections.activeListings')}</p></article>)}</div></section>
    </main>
  );
}
