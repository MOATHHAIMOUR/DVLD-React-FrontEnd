import { useState } from "react";
import { INavbar } from "../interfaces";
import Box from "./ui/Box";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { NavData } from "../data";

const NavLinksSideBar = () => {
  const [activeMenus, setActiveMenus] = useState<Record<string, string | null>>(
    {}
  );

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
            // primary: {
            //   DEFAULT: "rgb(var(--primary-color))", // Base background color
            //   hover: "rgb(var(--primary-hover-color))", // Background color for hover
            //   foreground: "rgb(var(--primary-foreground))", // Text color
            //   "hover-foreground": "rgb(var(--primary-hover-foreground))", // Text color for hover
            // },

            // selectedNavLink: {
            //   DEFAULT: "rgb(var(--selected-nav-link-bg))", // Background color
            //   text: "rgb(var(--selected-nav-link-text))", // Text color
            // },
            <NavLink
              to={link.path || "#"}
              className={({ isActive }) =>
                `hover:bg-primary-hover hover:text-primary-hover-foreground  flex items-center p-3 rounded-lg cursor-pointer group   ${
                  isActive ? "bg-selectedNavLink text-selectedNavLink-text" : ""
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
    <Box className="w-full h-full overflow-y-scroll scrollbar-none px-4 py-6 flex flex-col justify-between">
      {/* Title and Navigation */}
      <Box>
        {/* Navigation Links */}
        <ul className="space-y-4">{renderLinks(NavData)}</ul>
      </Box>
      {/* Sidebar Footer */}
      <Box className="mt-2 flex-shrink-0">
        <p className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} DVLD
        </p>
      </Box>
    </Box>
  );
};

export default NavLinksSideBar;
