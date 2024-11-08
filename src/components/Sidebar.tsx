import { NavLink } from "react-router-dom";
import { NavData } from "../data/navbar";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRef, useState } from "react";

const Sidebar = () => {
  /* ────────────── state  ────────────── */
  const [isSubMenuOpen, setIsSupMenOpen] = useState<number | null>(null);
  const submenuRef = useRef<HTMLUListElement | null>(null);

  /* ────────────── Handlers  ────────────── */
  function HandleMenuOpen(index: number) {
    setIsSupMenOpen((prev) => (prev === index ? null : index));
  }

  /* ────────────── Render  ────────────── */
  const renderLinks = NavData.map((link, index) => {
    return (
      <li key={index}>
        <div className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <span>
            <link.Icon size={35} />
          </span>
          <span className="ms-3">{link.name}</span>
          <span
            className={`ml-auto cursor-pointer duration-300  ${
              isSubMenuOpen === index ? "rotate-180 duration-300" : ""
            }`}
            onClick={() => HandleMenuOpen(index)}
          >
            <MdKeyboardArrowDown size={25} />
          </span>
        </div>
        <ul
          ref={submenuRef}
          className={`transition-all duration-300 ease-out overflow-hidden ${
            isSubMenuOpen === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            height:
              submenuRef.current && isSubMenuOpen === index
                ? `${submenuRef.current?.scrollHeight}px`
                : "0px",
          }}
        >
          {link.children !== undefined &&
            link.children.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  to={link.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span>
                    <link.Icon />
                  </span>
                  <span className="ms-3">{link.name}</span>
                </NavLink>
              );
            })}
        </ul>
      </li>
    );
  });

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">{renderLinks}</ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
