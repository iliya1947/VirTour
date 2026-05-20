import Image from 'next/image';
import { featuredListings, cities } from '@/data/listings';
import { Locale, homeCopy } from '@/lib/i18n';
import { StickyHeader } from '@/components/layout/StickyHeader';

type Props = { locale: Locale };

const marketplaceStats = [
  { label: 'Properties Live', value: '2,480+' },
  { label: 'Verified Listings', value: '1,920' },
  { label: '360 Virtual Tours', value: '870' }
];

const discoveryCollections = ['Luxury Apartments', 'Sea View Properties', 'Tel Aviv Premium'];
const trendingProperties = ['Rothschild Sky Residence', 'Herzliya Marina Duplex', 'Netanya Cliffside Home'];

export function HomePage({ locale }: Props) {
  const copy = homeCopy[locale];

  return (
    <main className="pb-20">
      <section className="relative min-h-screen overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=80" alt="Luxury property" fill priority className="object-cover scale-[1.03]" />
        <div className="absolute inset-0 bg-premium-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.22),transparent_48%)]" />
        <div className="absolute -left-12 top-40 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl animate-float-soft" />
        <div className="absolute right-0 top-64 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl animate-float-slow" />

        <div className="relative">
          <StickyHeader locale={locale} />
          <div className="mx-auto flex min-h-[85vh] w-[94%] max-w-7xl items-center">
            <div className="grid w-full gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-3xl space-y-7">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/90">Premium Israeli Real Estate</p>
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{copy.heroTitle}</h1>
                <p className="max-w-2xl text-base text-white/80 md:text-xl">{copy.heroSubtitle}</p>
                <div className="glass flex flex-col gap-3 rounded-2xl p-3 md:flex-row md:items-center md:p-4">
                  <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder={copy.searchPlaceholder} />
                  <button className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400">{copy.primaryCta}</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full bg-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/25">{copy.primaryCta}</button>
                  <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium transition hover:bg-white/10">{copy.secondaryCta}</button>
                </div>
              </div>

              <div className="space-y-4 lg:pb-8">
                {marketplaceStats.map((stat, idx) => (
                  <article key={stat.label} className={`glass rounded-2xl p-4 shadow-glow animate-fade-up ${idx % 2 ? 'lg:ml-8' : ''}`} style={{ animationDelay: `${idx * 140}ms` }}>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-cyan-200">{stat.value}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-[94%] max-w-7xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold md:text-4xl">Featured Listings</h2>
          <p className="text-sm text-white/65">Curated this week for active buyers</p>
        </div>
        <div className="grid gap-5 md:grid-cols-6 auto-rows-[215px]">
          {featuredListings.map((listing, idx) => {
            const large = idx === 0;
            return (
              <article
                key={listing.title}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-ink/70 shadow-glow transition duration-500 hover:-translate-y-1 ${large ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2'} ${idx === 2 ? 'md:mt-8' : ''}`}
              >
                <div className={`relative ${large ? 'h-full min-h-[430px]' : 'h-[215px] md:h-full'}`}>
                  <Image src={listing.image} alt={listing.title} fill className="object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <button className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs backdrop-blur transition hover:bg-black/65">♡ Save</button>
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {listing.badges.map((badge) => <span key={badge} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">{badge}</span>)}
                    <span className="rounded-full bg-emerald-400/85 px-2.5 py-1 text-xs font-semibold text-slate-900">Listed today</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <h3 className="text-xl font-semibold md:text-2xl">{listing.title}</h3>
                    <p className="text-sm text-white/80">{listing.city} · 3D Tour Available</p>
                    <div className="text-xs text-cyan-100/90">Verified Agent · Maya Cohen</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 p-5">
                  <p className="text-xl font-semibold text-cyan-300">{listing.price}</p>
                  <p className="text-sm text-white/70">{listing.rooms} rooms · {listing.area} m²</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-950/45 via-blue-950/35 to-indigo-950/20 p-8">
          <h2 className="text-3xl font-semibold md:text-4xl">Trending Properties</h2>
          <div className="mt-6 space-y-4">
            {trendingProperties.map((item, idx) => (
              <div key={item} className="flex items-center justify-between border-b border-white/10 pb-3 text-white/90">
                <p>{item}</p>
                <span className="text-xs text-cyan-200">#{idx + 1}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="glass rounded-3xl p-8">
          <h3 className="text-2xl font-semibold">Featured Collections</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {discoveryCollections.map((collection) => (
              <span key={collection} className="rounded-full border border-white/25 px-4 py-2 text-sm transition hover:bg-white/10">{collection}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Popular Cities</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[...cities, 'Herzliya'].map((city, idx) => (
            <article key={city} className={`glass group relative overflow-hidden rounded-2xl ${idx % 2 ? 'h-52' : 'h-60'} transition hover:-translate-y-1`}>
              <Image src={`https://images.unsplash.com/photo-${1510000000000 + idx * 10000000000}?auto=format&fit=crop&w=1100&q=80`} alt={city} fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <p className="text-2xl font-semibold">{city}</p>
                <span className="text-xs text-cyan-100">{42 + idx * 6} active</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
