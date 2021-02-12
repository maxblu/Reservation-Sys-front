import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  es: {
    translation: {
      "Reservation List": "Lista de Reservaciones",
      "Sort by": "Ordenar por",
      "Create Reservation": "Crear Reservación",
      "Date Ascending": "Fecha Ascendente",
      "Date Descending": "Fecha Descendente",
      "Alphabetic Ascending": "Alfabeto Ascendete",
      "Alphabetic Descending": "Alfabeto Descendete",
      Ranking: "Valoración",
    },
  },
  en: {
    translation: {
      "Reservation List": "Reservation List",
      "Create Reservation": "Create Reservation",
      "Sort by": "Sort by",
      "Date Ascending": "Date Ascending",
      "Date Descending": "Date Descending",
      "Alphabetic Ascending": "Alphabetic Ascending",
      "Alphabetic Descending": "Alphabetic Descending",
      Ranking: "Ranking",
    },
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults

    react: {
      // bindI18n: "languageChanged",
      // bindI18nStore: '',
      // transEmptyNodeValue: '',
      // transSupportBasicHtmlNodes: true,
      // transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },
  });

export default i18n;
