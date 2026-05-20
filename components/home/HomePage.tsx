import Image from 'next/image';
import { featuredListings } from '@/data/listings';
import { Locale, homeCopy } from '@/lib/i18n';
import { StickyHeader } from '@/components/layout/StickyHeader';

const cityShowcase = [
  {
    city: 'Tel Aviv',
    image: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1400&q=80',
    properties: '860+ properties'
  },
  {
    city: 'Jerusalem',
    image: 'https://images.unsplash.com/photo-1563177978-4f247a42f2d5?auto=format&fit=crop&w=1400&q=80',
    properties: '520+ properties'
  },
  {
    city: 'Haifa',
    image: 'https://images.unsplash.com/photo-1677506077244-3ff487438f8a?auto=format&fit=crop&w=1400&q=80',
    properties: '410+ properties'
  },
  {
    city: 'Netanya',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    properties: '280+ properties'
  }
];

type Props = { locale: Locale };

export function HomePage({ locale }: Props) {
  const copy = homeCopy[locale];

  return (
    <main className="overflow-hidden pb-24">
      <section className="relative min-h-screen">
        <Image src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2200&q=80" alt="Luxury property" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-[#05070D]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_45%)]" />
        <div className="relative">
          <StickyHeader locale={locale} />
          <div className="mx-auto flex min-h-[92vh] w-[94%] max-w-7xl items-center">
            <div className="max-w-4xl animate-[fadeIn_900ms_ease-out] space-y-8 py-14">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/90">Premium Israeli Real Estate</p>
              <h1 className="text-4xl font-semibold leading-[1.05] md:text-7xl">{copy.heroTitle}</h1>
              <p className="max-w-2xl text-base text-white/80 md:text-xl">{copy.heroSubtitle}</p>
              <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur-md">{copy.heroStat}</p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">{copy.primaryCta}</button>
                <button className="rounded-full border border-white/45 px-7 py-3 text-sm font-medium transition hover:bg-white/10">{copy.secondaryCta}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-24 w-[94%] max-w-6xl">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-[0_25px_80px_rgba(4,8,18,0.7)] backdrop-blur-2xl md:p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {[copy.buy, copy.rent, copy.luxury].map((tab, idx) => (
              <button key={tab} className={`rounded-full px-5 py-2 text-sm ${idx === 0 ? 'bg-white text-slate-900' : 'bg-white/10 text-white/85 hover:bg-white/20'}`}>{tab}</button>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <input className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-sm placeholder:text-white/55" placeholder={`${copy.city}: ${copy.searchPlaceholder}`} />
            <input className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-sm placeholder:text-white/55" placeholder={copy.propertyType} />
            <input className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-sm placeholder:text-white/55" placeholder={copy.priceRange} />
            <button className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">{copy.primaryCta}</button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 w-[94%] max-w-7xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-5xl">{copy.featuredTitle}</h2>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (
            <article key={listing.title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink/70 shadow-glow transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_80px_rgba(8,16,35,0.85)]">
              <div className="relative h-80">
                <Image src={listing.image} alt={listing.title} fill className="object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex flex-wrap justify-between gap-2">
                  <span className="rounded-full border border-cyan-100/40 bg-cyan-300/20 px-3 py-1 text-xs font-semibold text-cyan-50">VERIFIED</span>
                  <div className="flex gap-2">
                    {listing.badges.map((badge) => <span key={badge} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">{badge}</span>)}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <h3 className="text-2xl font-semibold">{listing.title}</h3>
                  <p className="text-sm text-white/80">{listing.city}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-6">
                <p className="text-2xl font-semibold text-cyan-300">{listing.price}</p>
                <p className="text-sm text-white/75">{listing.rooms} rooms · {listing.area} m²</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 w-[94%] max-w-7xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-5xl">{copy.citiesTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cityShowcase.map((item) => (
            <article key={item.city} className="group relative h-72 overflow-hidden rounded-3xl border border-white/10">
              <Image src={item.image} alt={item.city} fill className="object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition group-hover:from-black/70" />
              <div className="absolute bottom-5 left-5 space-y-1">
                <p className="text-3xl font-semibold">{item.city}</p>
                <p className="text-sm text-white/80">{item.properties}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 w-[94%] max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-r from-black via-slate-900 to-black p-6 md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold md:text-5xl">{copy.immersiveTitle}</h2>
            <p className="mt-4 max-w-xl text-white/75">{copy.immersiveBody}</p>
            <button className="mt-7 rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">{copy.immersiveCta}</button>
          </div>
          <div className="relative h-72 overflow-hidden rounded-3xl border border-white/15 md:h-80">
            <Image src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1500&q=80" alt="360 virtual tour" fill className="object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-[94%] max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold md:text-5xl">{copy.trustTitle}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.trustItems.map((item) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-4 h-9 w-9 rounded-full bg-cyan-300/25" />
              <h3 className="text-lg font-semibold">{item}</h3>
              <p className="mt-3 text-sm text-white/70">{copy.trustBody}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 w-[94%] max-w-7xl rounded-3xl border border-cyan-200/15 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-indigo-950/30 p-8 text-center md:p-14">
        <h2 className="text-3xl font-semibold md:text-5xl">{copy.footerTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">{copy.footerSubtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/972500000000" className="rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">{copy.whatsappLabel}</a>
          <button className="rounded-full border border-white/30 px-7 py-3 text-sm font-medium transition hover:bg-white/10">{copy.footerSecondary}</button>
        </div>
      </section>
    </main>
  );
}
