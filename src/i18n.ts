import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

// Function to set direction dynamically
const setDirection = (lng: string) => {
  const htmlElement = document.documentElement;
  if (lng === "ar") {
    htmlElement.setAttribute("dir", "rtl");
    htmlElement.setAttribute("lang", "ar");
  } else {
    htmlElement.setAttribute("dir", "ltr");
    htmlElement.setAttribute("lang", "en");
  }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Initialize i18next with React
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
  });

// Set initial direction based on the default language
setDirection(i18n.language);

// Update direction on language change
i18n.on("languageChanged", (lng) => {
  setDirection(lng);
});

export default i18n;
