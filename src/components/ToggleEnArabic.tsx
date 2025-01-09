import { useState } from "react";
import Box from "./ui/Box";
import { useTranslation } from "react-i18next";
import { IoLanguageSharp } from "react-icons/io5";

const ToggleEnArabic = () => {
  const { i18n } = useTranslation();

  // Set initial language based on `i18n.language`
  const initialLang = i18n.language === "ar" ? "Ar" : "En";
  const [lang, setLang] = useState<"Ar" | "En">(initialLang);

  const toggleLanguage = () => {
    // Determine the new language
    const newLanguage = lang === "En" ? "Ar" : "En";

    // Update both `lang` state and `i18n.language`
    setLang(newLanguage);
    i18n.changeLanguage(newLanguage === "En" ? "en" : "ar");
  };

  return (
    <div
      onClick={toggleLanguage}
      className="cursor-pointer  flex items-center justify-center shadow-lg rounded-full "
    >
      <div className="relative">
        {/* Profile Circle */}
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg overflow-hidden">
          <IoLanguageSharp size={20} className="text-white" />
        </div>
        {/* Online/Offline Indicator */}
        <span
          className={`absolute bottom-[-4px] left-[-4px] w-6 h-6 flex justify-center items-center text-xs rounded-full shadow-lg bg-gray-100 border-[1px] border-black`}
        >
          {lang}
        </span>
      </div>
    </div>
  );
};

export default ToggleEnArabic;
