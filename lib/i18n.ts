export const locales = ['he', 'en', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const isRtl = (locale: Locale) => locale === 'he';

export const homeCopy: Record<Locale, {
  nav: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroStat: string;
  primaryCta: string;
  secondaryCta: string;
  searchPlaceholder: string;
  whatsappLabel: string;
  buy: string;
  rent: string;
  luxury: string;
  city: string;
  propertyType: string;
  priceRange: string;
  featuredTitle: string;
  citiesTitle: string;
  immersiveTitle: string;
  immersiveBody: string;
  immersiveCta: string;
  trustTitle: string;
  trustItems: string[];
  trustBody: string;
  footerTitle: string;
  footerSubtitle: string;
  footerSecondary: string;
}> = {
  he: {
    nav: ['נכסים מובילים', 'ערים מובילות', 'סיורי 360°', 'למה VirTour'],
    heroTitle: 'גלו את הבית הבא שלכם בישראל, כאילו כבר נכנסתם פנימה',
    heroSubtitle: 'VirTour מחברת בין קונים, משקיעים וסוכנים עם חוויית נדל"ן יוקרתית וסיורי 360° אימרסיביים.',
    heroStat: 'מעל 2,400 נכסים מאומתים ברחבי ישראל',
    primaryCta: 'צפו בנכסים עכשיו',
    secondaryCta: 'סיור 360° לדוגמה',
    searchPlaceholder: 'חפשו לפי עיר, שכונה או פרויקט...',
    whatsappLabel: 'שיחה ב-WhatsApp',
    buy: 'קנייה',
    rent: 'השכרה',
    luxury: 'יוקרה',
    city: 'עיר',
    propertyType: 'סוג נכס',
    priceRange: 'טווח מחיר',
    featuredTitle: 'נכסים נבחרים',
    citiesTitle: 'גלו לפי עיר',
    immersiveTitle: 'חוויית צפייה עתידנית ב-360°',
    immersiveBody: 'היכנסו לכל חדר, הבינו את התחושה של הנכס וקבלו החלטות בטוחות לפני הביקור הפיזי.',
    immersiveCta: 'Explore in 360°',
    trustTitle: 'אמון, ביטחון ושקיפות בכל צעד',
    trustItems: ['סוכנים מאומתים', 'תקשורת מאובטחת', 'צפייה אימרסיבית', 'תמיכה רב-לשונית'],
    trustBody: 'נבנה במיוחד עבור משפחות, משקיעים ורילוקיישן יוקרתי לישראל.',
    footerTitle: 'מוכנים למצוא את הכתובת הבאה שלכם בישראל?',
    footerSubtitle: 'קבלו ליווי אישי, סיורי 360° ונכסים יוקרתיים בזמן אמת.',
    footerSecondary: 'קבלו ייעוץ אישי'
  },
  en: {
    nav: ['Featured', 'Cities', '360° Tours', 'Why VirTour'],
    heroTitle: 'Discover your next home in Israel before you even arrive',
    heroSubtitle: 'VirTour blends premium real estate discovery with immersive 360° virtual tours for buyers and investors.',
    heroStat: '2,400+ verified properties across Israel',
    primaryCta: 'Browse Listings',
    secondaryCta: 'Watch 360° Demo',
    searchPlaceholder: 'Search by city, neighborhood, or project...',
    whatsappLabel: 'Chat on WhatsApp',
    buy: 'Buy',
    rent: 'Rent',
    luxury: 'Luxury',
    city: 'City',
    propertyType: 'Property Type',
    priceRange: 'Price Range',
    featuredTitle: 'Featured Properties',
    citiesTitle: 'Browse by City',
    immersiveTitle: 'A Futuristic 360° Viewing Experience',
    immersiveBody: 'Walk through every room, understand details, and shortlist with confidence before in-person visits.',
    immersiveCta: 'Explore in 360°',
    trustTitle: 'Trust, security, and clarity in every step',
    trustItems: ['Verified agents', 'Secure communication', 'Immersive viewing', 'Multilingual support'],
    trustBody: 'Built for families, global investors, and premium relocation journeys to Israel.',
    footerTitle: 'Ready to find your next address in Israel?',
    footerSubtitle: 'Get concierge guidance, immersive tours, and premium listings in real time.',
    footerSecondary: 'Get Personal Consultation'
  },
  ru: {
    nav: ['Избранное', 'Города', '360° туры', 'Почему VirTour'],
    heroTitle: 'Откройте новый дом в Израиле ещё до первого визита',
    heroSubtitle: 'VirTour объединяет премиальный поиск недвижимости и иммерсивные 360° туры для покупателей и инвесторов.',
    heroStat: 'Более 2 400 проверенных объектов по всему Израилю',
    primaryCta: 'Смотреть объекты',
    secondaryCta: 'Демо 360° тура',
    searchPlaceholder: 'Поиск по городу, району или проекту...',
    whatsappLabel: 'Написать в WhatsApp',
    buy: 'Купить',
    rent: 'Аренда',
    luxury: 'Премиум',
    city: 'Город',
    propertyType: 'Тип недвижимости',
    priceRange: 'Диапазон цен',
    featuredTitle: 'Избранные объекты',
    citiesTitle: 'Выбрать по городу',
    immersiveTitle: 'Футуристичный опыт 360° просмотров',
    immersiveBody: 'Изучайте каждую комнату, ощущайте пространство и принимайте решения до личного визита.',
    immersiveCta: 'Explore in 360°',
    trustTitle: 'Доверие, безопасность и прозрачность на каждом этапе',
    trustItems: ['Проверенные агенты', 'Безопасная связь', 'Иммерсивный просмотр', 'Мультиязычная поддержка'],
    trustBody: 'Создано для семей, инвесторов и премиального релокейта в Израиль.',
    footerTitle: 'Готовы найти новый адрес в Израиле?',
    footerSubtitle: 'Персональное сопровождение, 360° туры и премиальные объекты в реальном времени.',
    footerSecondary: 'Получить персональную консультацию'
  }
};
