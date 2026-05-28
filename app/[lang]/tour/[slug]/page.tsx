import { notFound } from 'next/navigation';
import { TourViewer } from '@/components/tour/TourViewer';
import { getTourBySlug } from '@/data/tours';
import { type Locale } from '@/data/listings';
import { getI18n, isRtl, locales } from '@/lib/i18n';

type Props = { params: { lang: string; slug: string } };

export default function TourPage({ params }: Props) {
  const locale = params.lang as Locale;
  if (!locales.includes(locale)) notFound();
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();

  const { t } = getI18n(locale);

  return (
    <main className="bg-slate-950">
      <TourViewer
        tour={tour}
        locale={locale}
        isRtl={isRtl(locale)}
        labels={{
          backToListing: t('listings', 'tourViewer.backToListing'),
          rooms: t('listings', 'tourViewer.rooms'),
          fullscreen: t('listings', 'tourViewer.fullscreen'),
          minimap: t('listings', 'tourViewer.minimap'),
          loading: t('listings', 'tourViewer.loading'),
          startTour: t('listings', 'tourViewer.startTour'),
          continueTo: t('listings', 'tourViewer.continueTo'),
          roomProgress: t('listings', 'tourViewer.roomProgress'),
          guidedEyebrow: t('listings', 'tourViewer.guidedEyebrow'),
          guidedTitle: t('listings', 'tourViewer.guidedTitle'),
          guidedDescription: t('listings', 'tourViewer.guidedDescription'),
          startImmersiveWalkthrough: t('listings', 'tourViewer.startImmersiveWalkthrough'),
          lookAround: t('listings', 'tourViewer.lookAround'),
          tapHotspots: t('listings', 'tourViewer.tapHotspots'),
          floorplan: t('listings', 'tourViewer.floorplan'),
          youAreHere: t('listings', 'tourViewer.youAreHere'),
          spatialPath: t('listings', 'tourViewer.spatialPath'),
          entering: t('listings', 'tourViewer.entering'),
          directionAhead: t('listings', 'tourViewer.directionAhead'),
          directionLeft: t('listings', 'tourViewer.directionLeft'),
          directionRight: t('listings', 'tourViewer.directionRight'),
          directionAheadLeft: t('listings', 'tourViewer.directionAheadLeft'),
          directionAheadRight: t('listings', 'tourViewer.directionAheadRight')
        }}
      />
    </main>
  );
}
