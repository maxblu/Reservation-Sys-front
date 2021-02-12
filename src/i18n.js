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
      "Add Favorites": "Añadir a Favoritos",
      Edit: "Editar",
      "List Contacts": "Contactos",
      "Edit Contact": "Editar Contacto",
      Send: "Enviar",
      "Contact Name": "Nombre de Contacto",
      "Contact Type": "Typo de Contacto",
      Phone: "Teléfono",
      Birthday: "Fecha de Naciemiento",
      Date: "Fecha de Reserva",
      Title: "Título",
      "Contact List": "Lista de Contactos",
      "List Reservations": "Reservaciones",
      "Edit Current Contact": "Editar contacto selecionado",
      "Aditional Actions": "Aciones adicionales",
      "Change Languaje": "Cambiar idioma",
      "Go Back": "Ir Atrás",
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
      "Add Favorites": "Add Favorites",
      Edit: "Edit",
      "List Contacts": "List Contacts",
      "Edit Contact": "Edit Contact",
      Send: "Send",
      "Contact Name": "Contact Name",
      "Contact Type": "Contact Type",
      Phone: "Phone",
      Birthday: "Birthday",
      Date: "Date",
      Title: "Title",
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
