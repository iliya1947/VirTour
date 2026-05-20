import Image from 'next/image';
import { featuredListings, cities } from '@/data/listings';
import { Locale, homeCopy } from '@/lib/i18n';
import { StickyHeader } from '@/components/layout/StickyHeader';

type Props = { locale: Locale };

export function HomePage({ locale }: Props) {
  const copy = homeCopy[locale];
  const categoryIcons = ['✨', '👨‍👩‍👧‍👦', '🌊', '🏙️', '🏗️', '📈'];
  const discoveryGroups = {
    trending: featuredListings,
    recent: [...featuredListings].reverse(),
    tour360: featuredListings.filter((_, idx) => idx !== 2)
  };

  return (
    <main className="pb-20">
      <section className="relative min-h-[88vh]">
        <Image src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=80" alt="Luxury property" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-premium-gradient" />
        <div className="relative">
          <StickyHeader locale={locale} />
          <div className="mx-auto flex min-h-[80vh] w-[94%] max-w-7xl items-center">
            <div className="max-w-4xl space-y-5 py-10 md:py-14">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/90">Premium Israeli Real Estate</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{copy.heroTitle}</h1>
              <p className="max-w-2xl text-base text-white/80 md:text-xl">{copy.heroSubtitle}</p>
              <div className="glass rounded-2xl p-3 md:p-4">
                <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
                  <input className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm placeholder:text-white/60 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder={copy.searchPlaceholder} />
                  <input className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm placeholder:text-white/60 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder={locale === 'he' ? 'תקציב' : locale === 'ru' ? 'Бюджет' : 'Budget'} />
                  <input className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm placeholder:text-white/60 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder={locale === 'he' ? 'חדרים' : locale === 'ru' ? 'Комнаты' : 'Rooms'} />
                  <button className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400">{copy.primaryCta}</button>
                </div>
                <p className="mt-3 text-xs text-white/70">{copy.searchHint}</p>
              </div>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                {copy.quickFilters.map((filter, idx) => (
                  <button key={filter} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${idx === 0 ? 'border-cyan-300/80 bg-cyan-300/20 text-cyan-100' : 'border-white/30 bg-white/10 hover:bg-white/20'}`}>
                    {filter}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/25">{copy.primaryCta}</button>
                <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium transition hover:bg-white/10">{copy.secondaryCta}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-[94%] max-w-7xl">
        <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-2">
          {copy.categories.map((category, idx) => (
            <button key={category} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${idx === 0 ? 'border-cyan-300/80 bg-cyan-300/20 text-cyan-100' : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'}`}>
              <span>{categoryIcons[idx] ?? '🏠'}</span>
              <span>{category}</span>
            </button>
          ))}
        </div>
      </section>

      {copy.discoverSections.map((section) => (
        <section key={section.key} className="mx-auto mt-14 w-[94%] max-w-7xl space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{section.title}</h2>
              <p className="mt-1 text-sm text-white/70">{section.subtitle}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {discoveryGroups[section.key as keyof typeof discoveryGroups].map((listing) => (
              <article key={`${section.key}-${listing.title}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-ink/80 shadow-glow transition hover:-translate-y-0.5">
                <div className="relative h-60">
                  <Image src={listing.image} alt={listing.title} fill className="object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <button className="absolute right-3 top-3 rounded-full border border-white/40 bg-black/30 px-2.5 py-1.5 text-sm">♡</button>
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {listing.badges.map((badge) => <span key={badge} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">{badge}</span>)}
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="text-lg font-semibold leading-snug">{listing.title}</h3>
                  <p className="text-sm text-white/75">{listing.city}</p>
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>{listing.rooms} rooms</span>
                    <span>{listing.area} m²</span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[11px] font-semibold text-emerald-200">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-cyan-300">{listing.price}</p>
                    <button className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto mt-20 w-[94%] max-w-7xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Browse by City</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city, idx) => (
            <article key={city} className="glass group relative h-56 overflow-hidden rounded-2xl">
              <Image src={`https://images.unsplash.com/photo-${1510000000000 + idx * 10000000000}?auto=format&fit=crop&w=1100&q=80`} alt={city} fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <p className="absolute bottom-4 left-4 text-2xl font-semibold">{city}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-fuchsia-950/30 p-8 md:p-14">
        <h2 className="text-3xl font-semibold md:text-4xl">Explore properties in 360°</h2>
        <p className="mt-4 max-w-2xl text-white/75">Step through every room, understand every detail, and shortlist properties with confidence before in-person visits.</p>
        <button className="mt-7 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">Start a demo tour</button>
      </section>

      <section className="mx-auto mt-16 w-[94%] max-w-7xl">
        <div className="grid gap-5 md:grid-cols-3">
          {copy.trustSignals.map((item) => (
            <article key={item} className="glass rounded-2xl p-7">
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="mt-3 text-sm text-white/70">Designed to build trust and confidence for buyers, investors, and families relocating to Israel.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
