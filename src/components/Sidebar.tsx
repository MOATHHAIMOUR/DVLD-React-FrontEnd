import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavData } from "../data";
import { INavbar } from "../interfaces";
import Box from "./ui/Box";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/ThemeSlice";
import { useAppSelector } from "../store";

const Sidebar = () => {
  const [activeMenus, setActiveMenus] = useState<Record<string, string | null>>(
    {}
  );
  const dispatch = useDispatch();

  const toggleSubMenu = (key: string, parentKey: string) => {
    setActiveMenus((prev) => ({
      ...prev,
      [parentKey]: prev[parentKey] === key ? null : key,
    }));
  };

  const theme = useAppSelector((state) => state.theme.selectedTheme);

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const renderLinks = (
    links: Array<INavbar>,
    parentKey: string = "root",
    depth: number = 0
  ) => {
    const leftPadding = depth * 16; // Adjust padding for nested menus

    return links.map((link, index) => {
      const key = `${parentKey}-${index}`;
      const isOpen = activeMenus[parentKey] === key;

      return (
        <li key={key} className="relative">
          {link.children ? (
            <Box
              className="flex items-center p-3 rounded-lg cursor-pointer group"
              style={{ paddingLeft: `${leftPadding}px` }}
              onClick={() => toggleSubMenu(key, parentKey)}
            >
              <span className="text-lg">
                <link.Icon size={20} />
              </span>
              <span className="ml-4 text-sm font-semibold">{link.name}</span>
              <span
                className={`ml-auto transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <MdKeyboardArrowDown size={18} />
              </span>
            </Box>
          ) : (
            <NavLink
              to={link.path || "#"}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg cursor-pointer group ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
              style={{ paddingLeft: `${leftPadding}px` }}
            >
              <span className="text-lg">
                <link.Icon size={20} />
              </span>
              <span className="ml-4 text-sm font-semibold">{link.name}</span>
            </NavLink>
          )}

          {link.children && (
            <ul
              className={`transition-all duration-500  ${
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
    <aside className="fixed top-0 left-0 z-40 w-80 h-screen bg-primary text-white shadow-lg">
      <div className="h-full overflow-y-scroll scrollbar-none px-4 py-6 flex flex-col justify-between">
        {/* Title and Navigation */}
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold tracking-wide">Dashboard</h1>
            <button
              onClick={toggleThemeHandler}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              {theme === "light" ? (
                <FiSun size={18} className="text-yellow-300" />
              ) : (
                <FiMoon size={18} className="text-gray-300" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">{renderLinks(NavData)}</ul>
        </div>
        {/* Sidebar Footer */}
        <div className="mt-2 flex-shrink-0">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} DVLD
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
