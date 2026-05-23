import Link from 'next/link';
import { getI18n, Locale } from '@/lib/i18n';

type Props = { locale: Locale };

export function AppFooter({ locale }: Props) {
  const { t } = getI18n(locale);

  return (
    <footer className="mx-auto mt-12 w-[94%] max-w-7xl pb-8 pt-6 text-sm text-white/70">
      <div className="glass flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 p-5 md:flex-row md:items-center">
        <div>
          <p className="text-base font-semibold text-white">{t('common', 'brandName')}</p>
          <p>{t('common', 'featureDescription')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`}>Home</Link>
          <Link href={`/${locale}/discover`}>Discover</Link>
          <a href="https://wa.me/972500000000">{t('common', 'whatsappLabel')}</a>
        </div>
      </div>
    </footer>
  );
}
