import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enLang from './locales/en';
import viLang from './locales/vi';
import AuthServices from './services/authServices';

const getDefaultLocales = () => {
  let defaultLc = 'vi';
  if (AuthServices.getUserLanguage() && AuthServices.getUserLanguage() !== '') {
    defaultLc = AuthServices.getUserLanguage();
  }
  return defaultLc;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'label',
    lng: getDefaultLocales(),
    fallbackLng: getDefaultLocales(),
    resources: {
      en: enLang,
      vi: viLang,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    detection: {
      order: ['path', 'navigator'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
