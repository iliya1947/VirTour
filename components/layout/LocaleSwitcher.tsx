'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, locales } from '@/lib/i18n';

type Props = { locale: Locale };

function getLocalizedPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split('/');

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join('/') || `/${nextLocale}`;
  }

  return `/${nextLocale}${pathname === '/' ? '' : pathname}`;
}

export function LocaleSwitcher({ locale }: Props) {
  const pathname = usePathname() || '/';

  return (
    <div className="glass flex rounded-full p-1 text-xs" aria-label="Language switcher">
      {locales.map((lang) => (
        <Link
          key={lang}
          href={getLocalizedPath(pathname, lang)}
          className={`rounded-full px-3 py-1 uppercase ${locale === lang ? 'bg-white/25 text-white' : 'text-white/70'}`}
        >
          {lang}
        </Link>
      ))}
    </div>
  );
}
