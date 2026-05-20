export const locales = ['he', 'en', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const isRtl = (locale: Locale) => locale === 'he';

export const homeCopy: Record<Locale, {
  nav: string[];
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  searchPlaceholder: string;
  whatsappLabel: string;
}> = {
  he: {
    nav: ['נכסים מובילים', 'ערים מובילות', 'סיורי 360°', 'למה VirTour'],
    heroTitle: 'גלו את הבית הבא שלכם בישראל, כאילו כבר נכנסתם פנימה',
    heroSubtitle: 'VirTour מחברת בין קונים, משקיעים וסוכנים עם חוויית נדל"ן יוקרתית וסיורי 360° אימרסיביים.',
    primaryCta: 'צפו בנכסים עכשיו',
    secondaryCta: 'סיור 360° לדוגמה',
    searchPlaceholder: 'חפשו לפי עיר, שכונה או פרויקט...',
    whatsappLabel: 'שיחה ב-WhatsApp'
  },
  en: {
    nav: ['Featured', 'Cities', '360° Tours', 'Why VirTour'],
    heroTitle: 'Discover your next home in Israel before you even arrive',
    heroSubtitle: 'VirTour blends premium real estate discovery with immersive 360° virtual tours for buyers and investors.',
    primaryCta: 'Browse Listings',
    secondaryCta: 'Watch 360° Demo',
    searchPlaceholder: 'Search by city, neighborhood, or project...',
    whatsappLabel: 'Chat on WhatsApp'
  },
  ru: {
    nav: ['Избранное', 'Города', '360° туры', 'Почему VirTour'],
    heroTitle: 'Откройте новый дом в Израиле ещё до первого визита',
    heroSubtitle: 'VirTour объединяет премиальный поиск недвижимости и иммерсивные 360° туры для покупателей и инвесторов.',
    primaryCta: 'Смотреть объекты',
    secondaryCta: 'Демо 360° тура',
    searchPlaceholder: 'Поиск по городу, району или проекту...',
    whatsappLabel: 'Написать в WhatsApp'
  }
};
