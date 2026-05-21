import Image from 'next/image';
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
              <div className="glass flex flex-col gap-3 rounded-2xl p-3 md:flex-row md:items-center md:p-4">
                <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder={t('homepage', 'hero.searchPlaceholder')} />
                <button className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400">{t('homepage', 'hero.searchButton')}</button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/25">{t('homepage', 'hero.primaryCta')}</button>
                <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium transition hover:bg-white/10">{t('homepage', 'hero.secondaryCta')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-[94%] max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.featuredListingsTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {(['RECENTLY_ADDED', 'TRENDING', 'RECOMMENDED'] as DiscoveryTag[]).map((tag) => (
              <button
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
              >
                {t('listings', `discovery.${tag}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (
            <article
              key={listing.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink/70 shadow-[0_14px_34px_rgba(2,10,36,0.45)] transition duration-500 hover:-translate-y-1.5 hover:border-cyan-300/50 hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)]"
            >
              <div className="relative h-80 sm:h-96">
                <Image src={listing.image} alt={t('listings', `featured.${listing.id}.title`)} fill className="object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                  <div className="flex max-w-[80%] flex-wrap gap-2">
                    {listing.badges.map((badge) => (
                      <span key={badge} className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                        {t('listings', `badges.${badge}`)}
                      </span>
                    ))}
                  </div>
                  <button
                    aria-label={t('listings', 'meta.save')}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/35 text-lg text-white/95 backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
                  >
                    ♡
                  </button>
                </div>

                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold text-cyan-300 sm:text-3xl">{listing.price}</p>
                    <h3 className="mt-1 text-xl font-semibold leading-tight">{t('listings', `featured.${listing.id}.title`)}</h3>
                    <p className="mt-1 text-sm text-white/80">{t('listings', `cities.${listing.cityId}`)} · {listing.neighborhood}</p>
                    <p className="mt-2 text-sm text-white/85">{t('common', 'featureRoomsArea', { rooms: listing.rooms, area: listing.area })}</p>
                  </div>
                  <div className="space-y-2 text-end text-xs">
                    <p className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">{t('listings', 'meta.photos', { count: listing.imageCount })}</p>
                    <p className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-cyan-100 backdrop-blur-md">{t('listings', 'meta.tour')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 p-4 sm:p-5">
                {listing.discoveryTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                    {t('listings', `discovery.${tag}`)}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.browseByCityTitle')}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cityIds.map((cityId, idx) => (
            <article key={cityId} className="glass group relative h-56 overflow-hidden rounded-2xl">
              <Image src={`https://images.unsplash.com/photo-${1510000000000 + idx * 10000000000}?auto=format&fit=crop&w=1100&q=80`} alt={t('listings', `cities.${cityId}`)} fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <p className="absolute bottom-4 left-4 text-2xl font-semibold">{t('listings', `cities.${cityId}`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-fuchsia-950/30 p-8 md:p-14">
        <h2 className="text-3xl font-semibold md:text-4xl">{t('homepage', 'sections.tourTitle')}</h2>
        <p className="mt-4 max-w-2xl text-white/75">{t('homepage', 'sections.tourDescription')}</p>
        <button className="mt-7 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">{t('homepage', 'sections.tourButton')}</button>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl">
        <div className="grid gap-5 md:grid-cols-3">
          {['verifiedAgents', 'secureCommunication', 'immersiveViewing'].map((item) => (
            <article key={item} className="glass rounded-2xl p-7">
              <h3 className="text-xl font-semibold">{t('homepage', `features.${item}`)}</h3>
              <p className="mt-3 text-sm text-white/70">{t('common', 'featureDescription')}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
