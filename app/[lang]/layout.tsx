import { notFound } from 'next/navigation';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { isRtl, locales, type Locale } from '@/lib/i18n';

export default function LanguageLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  const locale = params.lang as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className="min-h-screen bg-ink text-white">
      <AppHeader locale={locale} />
      <div className="pt-4">{children}</div>
      <AppFooter locale={locale} />
    </div>
  );
}
