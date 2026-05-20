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
  searchHint: string;
  categories: string[];
  quickFilters: string[];
  discoverSections: { key: string; title: string; subtitle: string }[];
  trustSignals: string[];
}> = {
  he: {
    nav: ['נכסים מובילים', 'ערים מובילות', 'סיורי 360°', 'למה VirTour'],
    heroTitle: 'גלו את הבית הבא שלכם בישראל, כאילו כבר נכנסתם פנימה',
    heroSubtitle: 'VirTour מחברת בין קונים, משקיעים וסוכנים עם חוויית נדל"ן יוקרתית וסיורי 360° אימרסיביים.',
    primaryCta: 'צפו בנכסים עכשיו',
    secondaryCta: 'סיור 360° לדוגמה',
    searchPlaceholder: 'חפשו לפי עיר, שכונה או פרויקט...',
    whatsappLabel: 'שיחה ב-WhatsApp',
    searchHint: 'חיפוש מהיר: עיר, תקציב, חדרים או מילות מפתח.',
    categories: ['יוקרה', 'משפחות', 'נוף לים', 'פנטהאוז', 'פרויקטים חדשים', 'השקעה'],
    quickFilters: ['עד ₪2M', 'תל אביב', 'מתאים לחיות מחמד', '3 חדרים', 'נוף לים'],
    discoverSections: [
      { key: 'trending', title: 'חם עכשיו', subtitle: 'נכסים עם הכי הרבה צפיות השבוע' },
      { key: 'recent', title: 'נוספו לאחרונה', subtitle: 'פרסומים חדשים מהימים האחרונים' },
      { key: 'tour360', title: 'כולל סיור 360°', subtitle: 'ביקור וירטואלי מלא לפני תיאום פגישה' }
    ],
    trustSignals: ['נכסים מאומתים', 'סוכנים אמינים', 'יצירת קשר מאובטחת', 'תמיכה רב-לשונית']
  },
  en: {
    nav: ['Featured', 'Cities', '360° Tours', 'Why VirTour'],
    heroTitle: 'Discover your next home in Israel before you even arrive',
    heroSubtitle: 'VirTour blends premium real estate discovery with immersive 360° virtual tours for buyers and investors.',
    primaryCta: 'Browse Listings',
    secondaryCta: 'Watch 360° Demo',
    searchPlaceholder: 'Search by city, neighborhood, or project...',
    whatsappLabel: 'Chat on WhatsApp',
    searchHint: 'Quick search: city, budget, rooms, or keyword.',
    categories: ['Luxury', 'Family', 'Sea View', 'Penthouse', 'New Projects', 'Investment'],
    quickFilters: ['Under ₪2M', 'Tel Aviv', 'Pet Friendly', '3 Rooms', 'Sea View'],
    discoverSections: [
      { key: 'trending', title: 'Trending now', subtitle: 'Most viewed listings this week' },
      { key: 'recent', title: 'Recently added', subtitle: 'Fresh listings added in the past days' },
      { key: 'tour360', title: '360 Tour Available', subtitle: 'Explore remotely before booking a visit' }
    ],
    trustSignals: ['Verified listings', 'Trusted agents', 'Secure contact', 'Multilingual support']
  },
  ru: {
    nav: ['Избранное', 'Города', '360° туры', 'Почему VirTour'],
    heroTitle: 'Откройте новый дом в Израиле ещё до первого визита',
    heroSubtitle: 'VirTour объединяет премиальный поиск недвижимости и иммерсивные 360° туры для покупателей и инвесторов.',
    primaryCta: 'Смотреть объекты',
    secondaryCta: 'Демо 360° тура',
    searchPlaceholder: 'Поиск по городу, району или проекту...',
    whatsappLabel: 'Написать в WhatsApp',
    searchHint: 'Быстрый поиск: город, бюджет, комнаты или ключевое слово.',
    categories: ['Люкс', 'Семейные', 'Вид на море', 'Пентхаус', 'Новые проекты', 'Инвестиции'],
    quickFilters: ['До ₪2M', 'Тель-Авив', 'Можно с питомцами', '3 комнаты', 'Вид на море'],
    discoverSections: [
      { key: 'trending', title: 'Сейчас в тренде', subtitle: 'Самые просматриваемые объекты за неделю' },
      { key: 'recent', title: 'Недавно добавленные', subtitle: 'Новые предложения за последние дни' },
      { key: 'tour360', title: 'Доступен 360° тур', subtitle: 'Осмотрите объект онлайн до личного визита' }
    ],
    trustSignals: ['Проверенные объекты', 'Надёжные агенты', 'Безопасный контакт', 'Мультиязычная поддержка']
  }
};
