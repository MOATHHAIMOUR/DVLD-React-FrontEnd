import React, { useState, useEffect, useRef, ReactNode } from "react";
import { IContextMenuItem } from "../../data";

interface IProps<T extends string> {
  SelectedRow: number | null;
  tableHeader: ReactNode;
  tableBody: ReactNode;
  contextMenuData: Array<IContextMenuItem<T>>;
  onItemClick: (operation: T) => void;
}

const TableWithContextMenu = <T extends string>({
  tableBody,
  tableHeader,
  SelectedRow: RowSelected,
  contextMenuData,
  onItemClick,
}: IProps<T>) => {
  /* ────────────── STATE  ────────────── */
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* ────────────── HANDLERS  ────────────── */
  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("1");
    const menuWidth = 250; // Approximate width of the context menu
    const menuHeight = 240; // Approximate height of the context menu
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let x = event.clientX;
    let y = event.clientY;
    // Adjust position if the menu would overflow on the right side
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth;
    }
    // Adjust position if the menu would overflow on the bottom
    if (y + menuHeight > viewportHeight) {
      console.log("here");
      y = viewportHeight - menuHeight;
    }
    setMenuPosition({ x: x, y: y });
    setShowMenu(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowMenu(false);
    }
  };

  function HandleClickMenuItem(operation: T) {
    onItemClick(operation);
    setShowMenu(false);
  }

  /* ────────────── Effect  ────────────── */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const tBodyRef = useRef<HTMLTableSectionElement>(null);

  /* ────────────── Render  ────────────── */
  const contextMenuItems =
    RowSelected &&
    contextMenuData.map((item, i) => (
      <li
        onClick={() => HandleClickMenuItem(item.operation)}
        key={i}
        className="flex cursor-pointer items-center w-full hover:bg-gray-100 px-4 py-3"
      >
        <item.Icon size={20} />
        <a className="block  px-4 text-gray-700">{item.operation}</a>
      </li>
    ));

  return (
    <>
      <table className="border-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{tableHeader}</tr>
        </thead>
        <tbody
          ref={tBodyRef}
          onContextMenu={handleRightClick}
          className="cursor-pointer"
        >
          {tableBody}
        </tbody>
      </table>

      {showMenu && (
        <div
          ref={menuRef}
          className="fixed bg-white border rounded-md z-50"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <ul>{contextMenuItems}</ul>
        </div>
      )}
    </>
  );
};

export default TableWithContextMenu;
