import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DiscoverExperience } from '@/components/discovery/DiscoverExperience';
import { getI18n, locales, type Locale } from '@/lib/i18n';

type Props = { params: { lang: string } };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) return {};
  const { t } = getI18n(locale);
  return { title: t('discover', 'metaTitle'), description: t('discover', 'metaDescription') };
}

export default function DiscoverPage({ params }: Props) {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) notFound();
  return <DiscoverExperience locale={locale} />;
}
