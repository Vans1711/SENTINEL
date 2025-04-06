import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translations using http (default public/locales/en/translation.json)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // List of supported languages
    supportedLngs: [
      'en',    // English
      'hi',    // Hindi
      'bn',    // Bengali
      'te',    // Telugu
      'mr',    // Marathi
      'ta',    // Tamil
      'gu',    // Gujarati
      'kn',    // Kannada
      'ml',    // Malayalam
      'pa',    // Punjabi
      'or',    // Odia
      'as',    // Assamese
      'ur',    // Urdu
      'sa',    // Sanskrit
      'ks',    // Kashmiri
      'sd',    // Sindhi
      'ne',    // Nepali
      'si',    // Sinhala
      'ko',    // Konkani
      'doi',   // Dogri
      'mni',   // Manipuri
      'sat',   // Santali
      'bho',   // Bhojpuri
      'mag',   // Magahi
      'mai',   // Maithili
    ],
    
    // Detect language from browser
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n; 