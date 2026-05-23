'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getI18n, isRtl, Locale, locales } from '@/lib/i18n';

type Props = { locale: Locale };

export function AppHeader({ locale }: Props) {
  const { t } = getI18n(locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t('homepage', 'nav.featured'), href: `/${locale}#featured` },
    { label: t('homepage', 'nav.cities'), href: `/${locale}#cities` },
    { label: t('homepage', 'nav.tours'), href: `/${locale}#tours` },
    { label: t('homepage', 'nav.why'), href: `/${locale}#why` },
    { label: 'Discover', href: `/${locale}/discover` }
  ];

  return (
    <header className="sticky top-3 z-50 mx-auto w-[94%] max-w-7xl">
      <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-glow md:px-6">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-wide">
          {t('common', 'brandName')}
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-white/80 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="glass flex rounded-full p-1 text-xs" aria-label={t('common', 'localeLabel')}>
            {locales.map((lang) => (
              <Link
                key={lang}
                href={`/${lang}`}
                className={`rounded-full px-3 py-1 uppercase ${locale === lang ? 'bg-white/25 text-white' : 'text-white/70'}`}
              >
                {lang}
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/972500000000"
            className="rounded-full bg-emerald-500/90 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400"
          >
            {t('common', 'whatsappLabel')}
          </a>
        </div>

        <button
          className="glass rounded-lg p-2 md:hidden"
          aria-label={t('common', 'menuButtonLabel')}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-white" />
        </button>
      </div>

      {mobileOpen && (
        <div className="glass mt-2 rounded-2xl border border-white/15 p-4 md:hidden" dir={isRtl(locale) ? 'rtl' : 'ltr'}>
          <nav className="grid gap-2 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="glass flex rounded-full p-1 text-xs" aria-label={t('common', 'localeLabel')}>
              {locales.map((lang) => (
                <Link key={lang} href={`/${lang}`} className={`rounded-full px-3 py-1 uppercase ${locale === lang ? 'bg-white/25 text-white' : 'text-white/70'}`}>
                  {lang}
                </Link>
              ))}
            </div>
            <a href="https://wa.me/972500000000" className="rounded-full bg-emerald-500/90 px-4 py-2 text-xs font-semibold text-white">
              {t('common', 'whatsappLabel')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
