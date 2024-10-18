import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../public/locales/en.json'
import zh from '../../public/locales/zh.json'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  "en": {
    translation: en
  },
  "zh": {
    translation: zh
  }
}

const currentLocale = localStorage.getItem('lan') || 'zh'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: currentLocale,
    lng: currentLocale,
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n