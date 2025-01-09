import { useState } from "react";
import { INavbar } from "../interfaces";
import Box from "./ui/Box";
import { MdAccountCircle, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { NavData } from "../data";
import { CiLogout } from "react-icons/ci";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useTranslation } from "react-i18next";

const NavLinksSideBar = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Language directly

  const [activeMenus, setActiveMenus] = useState<Record<string, string | null>>(
    {}
  );
  const [logoutDialog, setLogoutDialog] = useState(false);

  const toggleSubMenu = (key: string, parentKey: string) => {
    setActiveMenus((prev) => ({
      ...prev,
      [parentKey]: prev[parentKey] === key ? null : key,
    }));
  };

  const renderLinks = (
    links: Array<INavbar>,
    parentKey: string = "root",
    depth: number = 0
  ) => {
    const calculateIconSize = (depth: number) => Math.max(24 - depth * 2, 16);
    const calculatePadding = (depth: number) =>
      depth === 0 ? 8 : 20 + depth * 10;
    const calculateTextSize = (depth: number) =>
      depth === 1 ? "text-[16px]" : depth === 2 ? "text-[15px]" : "text-[14px]";

    return links.map((link, index) => {
      const key = `${parentKey}-${index}`;
      const isOpen = activeMenus[parentKey] === key;

      return (
        <li key={key} className="relative">
          {link.children ? (
            <Box
              className={`flex items-center p-3 rounded-lg cursor-pointer group mx-5 hover:bg-primary-hover hover:text-primary-hover-foreground transition-colors`}
              onClick={() => toggleSubMenu(key, parentKey)}
              style={{
                paddingLeft:
                  currentLanguage === "en"
                    ? `${calculatePadding(depth)}px`
                    : "0px",
                paddingRight:
                  currentLanguage === "ar"
                    ? `${calculatePadding(depth)}px`
                    : "0px",
              }}
            >
              <div className="flex gap-4">
                <span className="flex-shrink-0">
                  <link.Icon
                    size={calculateIconSize(depth)}
                    className="text-primary-foreground"
                  />
                </span>
                <span className="font-semibold text-primary-foreground">
                  {t(link.nameKey)}
                </span>
              </div>

              <span className={`flex-grow-[1] text-primary-foreground`}>
                <MdKeyboardArrowDown
                  className={`ltr:ml-auto rtl:mr-auto  transition-transform duration-300    ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </span>
            </Box>
          ) : (
            <NavLink
              to={link.path || "#"}
              className={({ isActive }) =>
                `mb-2 mx-5 flex items-center p-3 rounded-lg cursor-pointer group transition-colors ${
                  isActive
                    ? "bg-selectedNavLink text-selectedNavLink-text"
                    : "hover:bg-primary-hover hover:text-primary-hover-foreground"
                }`
              }
              style={{
                paddingLeft:
                  currentLanguage === "en"
                    ? `${calculatePadding(depth)}px`
                    : "0px",
                paddingRight:
                  currentLanguage === "ar"
                    ? `${calculatePadding(depth)}px`
                    : "0px",
              }}
            >
              <div className="flex gap-4">
                <span className="flex-shrink-0">
                  <link.Icon
                    size={calculateIconSize(depth)}
                    className="text-primary-foreground"
                  />
                </span>
                <span
                  className={`font-semibold ${calculateTextSize(
                    depth
                  )} text-primary-foreground`}
                >
                  {t(link.nameKey)}
                </span>
              </div>
            </NavLink>
          )}

          {link.children && (
            <ul
              className={`transition-all duration-500 my-1 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                overflow: "hidden",
              }}
            >
              {renderLinks(link.children, key, depth + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <Box className="w-full h-full overflow-y-scroll scrollbar-none py-6 flex flex-col justify-between bg-primary">
      {/* Title and Navigation */}
      <Box>
        <Box className="flex gap-3 items-center justify-center mb-4">
          <img className="h-28" src="/src/assets/images/driverlogolight.png" />
        </Box>
        <div className="border-b-[1px] opacity-20 border-gray-300 mb-4"></div>
        <p className="mx-5 text-sm text-gray-300 py-4 font-semibold">
          {currentLanguage === "en" ? "OVERVIEW" : "نظرة عامة"}
        </p>
        <ul className="space-y-4">{renderLinks(NavData)}</ul>
      </Box>
      {/* Sidebar Footer */}
      <Box>
        <p className="mx-5 text-sm text-gray-300 py-4 font-semibold">
          {currentLanguage === "en" ? "ACCOUNT" : "الحساب"}
        </p>
        <NavLink
          to="/Account/settings"
          className={({ isActive }) =>
            `mb-2 mx-5 flex items-center p-3 rounded-lg cursor-pointer group transition-colors ${
              isActive
                ? "bg-selectedNavLink text-selectedNavLink-text"
                : "hover:bg-primary-hover hover:text-primary-hover-foreground"
            }`
          }
        >
          <span className="flex-shrink-0">
            <MdAccountCircle size={30} className="text-primary-foreground" />
          </span>
          <span className="ml-4 font-semibold text-primary-foreground">
            {currentLanguage === "en" ? "Account Settings" : "إعدادات الحساب"}
          </span>
        </NavLink>
        <Box
          onClick={() => setLogoutDialog(true)}
          className="mb-2 mx-5 flex items-center p-3 rounded-lg cursor-pointer hover:bg-primary-hover"
        >
          <span className="flex-shrink-0">
            <CiLogout size={30} className="text-primary-foreground" />
          </span>
          <span className="ml-4 font-semibold text-primary-foreground">
            {currentLanguage === "en" ? "Log out" : "تسجيل الخروج"}
          </span>
        </Box>
      </Box>
      <Modal
        title={currentLanguage === "en" ? "Logout" : "تسجيل الخروج"}
        isOpen={logoutDialog}
        onClose={() => setLogoutDialog(false)}
      >
        <div className="p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {currentLanguage === "en"
              ? "Are you sure you want to log out?"
              : "هل أنت متأكد أنك تريد تسجيل الخروج؟"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {currentLanguage === "en"
              ? "You will need to log in again to access your account."
              : "ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك."}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setLogoutDialog(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded px-4 py-2"
            >
              {currentLanguage === "en" ? "Cancel" : "إلغاء"}
            </Button>
            <Button
              onClick={() => console.log("Logged out")}
              className="bg-red-600 text-white hover:bg-red-700 rounded px-4 py-2"
            >
              {currentLanguage === "en" ? "Logout" : "تسجيل الخروج"}
            </Button>
          </div>
        </div>
      </Modal>
      <Box className="mt-4 flex-shrink-0">
        <p className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} DVLD
        </p>
      </Box>
    </Box>
  );
};

export default NavLinksSideBar;
