import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    // Default namespace
    defaultNS: "translation";

    // Strong typing for translations
    resources: {
      translation: typeof import("./locales/en/translation.json");
    };

    // Fallback to any string
    allowObjectInHTMLChildren: true;
  }
}
