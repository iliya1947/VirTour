import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage } from '@/components/home/HomePage';
import { isRtl, locales, type Locale } from '@/lib/i18n';

type Props = { params: { lang: string } };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.lang as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const localizedTitle: Record<Locale, string> = {
    he: 'VirTour | נדל"ן פרימיום בישראל עם סיורי 360°',
    en: 'VirTour | Premium Israeli Real Estate with 360° Tours',
    ru: 'VirTour | Премиальная недвижимость Израиля с 360° турами'
  };

  const localizedDescription: Record<Locale, string> = {
    he: 'גלו נכסים יוקרתיים בישראל עם סיורי 360°, סוכנים מאומתים וחוויית חיפוש אימרסיבית.',
    en: 'Discover luxury properties in Israel with immersive 360° tours, verified agents, and premium discovery.',
    ru: 'Откройте премиальные объекты в Израиле с иммерсивными 360° турами и проверенными агентами.'
  };

  return {
    title: localizedTitle[locale],
    description: localizedDescription[locale]
  };
}

export default function LangHome({ params }: Props) {
  const locale = params.lang as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
      <HomePage locale={locale} />
    </div>
  );
}
