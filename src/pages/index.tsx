import { useTranslation } from "react-i18next";
import Box from "../components/ui/Box";
import { toArabicNumbers } from "../utils";
import ClockComponent from "../components/ui/ClockComponent";

const MainPage = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  return (
    <Box className="flex flex-col items-center mt-10 justify-start min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Header Section */}

      {/* Logo Section */}
      <Box className="mb-10">
        <img
          src="/src/assets/images/darkthemelogo.png"
          alt="Logo"
          className="h-[200px] bg-transparent mx-auto rounded-full shadow-md"
        />
      </Box>

      <h1 className="text-center text-2xl xl:text-4xl font-extrabold text-gray-800 mb-6 tracking-wide">
        {t("title")}
      </h1>

      {/* Stats Section */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {[
          { label: t("MainPage.people"), value: 6 },
          { label: t("MainPage.users"), value: 4 },
          { label: t("MainPage.drivers"), value: 3 },
          { label: t("MainPage.licenses"), value: 6 },
        ].map((stat, index) => (
          <Box
            key={index}
            className="p-6 bg-primary hover:bg-primary-hover cursor-pointer text-white rounded-lg text-center shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-5xl font-extrabold mt-4">
              {isArabic ? toArabicNumbers(stat.value) : stat.value}
            </p>
          </Box>
        ))}
      </Box>

      {/* Timer and Date Section */}
      <ClockComponent />

      {/* Footer Section */}
      <footer className="mt-10 text-gray-600">
        <p className="text-sm font-medium">
          Developed by{" "}
          <span className="text-primary-hover font-bold">Moath Haimour</span>
        </p>
      </footer>
    </Box>
  );
};

export default MainPage;
