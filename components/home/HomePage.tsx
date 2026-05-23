import Image from 'next/image';
import Link from 'next/link';
import { cityIds, featuredListings, type DiscoveryTag } from '@/data/listings';
import { getI18n, Locale } from '@/lib/i18n';
import { StickyHeader } from '@/components/layout/StickyHeader';

type Props = { locale: Locale };

export function HomePage({ locale }: Props) {
  const { t } = getI18n(locale);

  return (
    <main className="pb-20">
      <section className="relative min-h-screen">
        <Image src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=80" alt={t('common', 'brandName')} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-premium-gradient" />
        <div className="relative">
          <StickyHeader locale={locale} />
          <div className="mx-auto flex min-h-[85vh] w-[94%] max-w-7xl items-center">
            <div className="max-w-3xl space-y-7 py-14">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/90">{t('homepage', 'hero.eyebrow')}</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{t('homepage', 'hero.title')}</h1>
              <p className="max-w-2xl text-base text-white/80 md:text-xl">{t('homepage', 'hero.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-[94%] max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.featuredListingsTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {(['RECENTLY_ADDED', 'TRENDING', 'RECOMMENDED'] as DiscoveryTag[]).map((tag) => (
              <button key={tag} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/90">{t('listings', `discovery.${tag}`)}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (
            <article key={listing.slug} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink/70">
              <div className="relative h-80 sm:h-96">
                <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-2xl font-bold text-cyan-300 sm:text-3xl">{new Intl.NumberFormat(locale, { style: 'currency', currency: listing.currency, maximumFractionDigits: 0 }).format(listing.price)}</p>
                  <h3 className="mt-1 text-xl font-semibold">{listing.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{t('listings', `cities.${listing.city}`)} · {listing.neighborhood}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <Link href={`/${locale}/listing/${listing.slug}`} className="inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900">{t('listings', 'meta.viewListing')}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.browseByCityTitle')}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cityIds.map((cityId) => (
            <article key={cityId} className="glass rounded-2xl p-7">
              <p className="text-2xl font-semibold">{t('listings', `cities.${cityId}`)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
