import Link from 'next/link';
import { Locale, homeCopy, locales } from '@/lib/i18n';

type Props = { locale: Locale };

export function StickyHeader({ locale }: Props) {
  const copy = homeCopy[locale];

  return (
    <header className="glass sticky top-3 z-50 mx-auto flex w-[94%] max-w-7xl items-center justify-between rounded-2xl px-4 py-3 shadow-glow transition-all duration-300 md:px-6">
      <Link href={`/${locale}`} className="text-lg font-semibold tracking-wide">VirTour</Link>
      <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
        {copy.nav.map((item) => (
          <a key={item} href="#" className="transition hover:text-white">{item}</a>
        ))}
      </nav>
      <div className="hidden items-center gap-3 md:flex">
        <div className="glass flex rounded-full p-1 text-xs">
          {locales.map((lang) => (
            <Link key={lang} href={`/${lang}`} className={`rounded-full px-3 py-1 uppercase ${locale === lang ? 'bg-white/25 text-white' : 'text-white/70'}`}>{lang}</Link>
          ))}
        </div>
        <a href="https://wa.me/972500000000" className="rounded-full bg-emerald-500/90 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400">{copy.whatsappLabel}</a>
      </div>
      <button className="glass rounded-lg p-2 md:hidden" aria-label="Open menu">
        <span className="block h-0.5 w-5 bg-white" />
        <span className="mt-1 block h-0.5 w-5 bg-white" />
        <span className="mt-1 block h-0.5 w-5 bg-white" />
      </button>
    </header>
  );
}
