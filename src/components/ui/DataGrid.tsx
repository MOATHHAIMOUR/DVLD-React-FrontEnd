import React, { useState, useEffect, useRef } from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { IGenericContextMenuItem, IHeaderData } from "../../interfaces";
import Tippy from "@tippyjs/react";
import { useTranslation } from "react-i18next";

interface IProps<T extends string> {
  tableHeader: IHeaderData[];
  tableBody: object[];
  contextMenuData?: Array<IGenericContextMenuItem<T>>;
  onMenuItemClick?: (operation: T, obj: object) => void;
  OnContextMenuOpen?: (obj: object) => void;
  onSort?: (selectedHeadCell: string, sort: "ASC" | "DESC" | "NONE") => void;
}

const DataGrid = <T extends string>({
  tableBody,
  tableHeader,
  contextMenuData,
  onMenuItemClick,
  OnContextMenuOpen,
  onSort,
}: IProps<T>) => {
  /* ────────────── STATE  ────────────── */
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const tBodyRef = useRef<HTMLTableSectionElement | null>(null);

  const [SelectedRow, setSelectedRow] = useState<number | null>(null);

  const [SelectedData, setSelectedData] = useState<object>({});

  const [selectedHeaderCell, setSelectedHeaderCell] = useState<string | null>(
    null
  );
  const [sortType, setSortType] = useState<"NONE" | "ASC" | "DESC">();

  const [subMenuPosition, setSubMenuPosition] = useState<"Left" | "Right">(
    "Left"
  );

  /* ────────────── HANDLERS  ────────────── */
  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
    object: object
  ) => {
    event.preventDefault();
    const { x, y } = HandleContextMenuPosition(event);
    setMenuPosition({ x: x, y: y });
    if (OnContextMenuOpen) OnContextMenuOpen(object);
    setShowMenu(true);
    setSelectedRow(index);
    setSelectedData(object);
  };

  function HandleContextMenuPosition(event: React.MouseEvent<HTMLDivElement>) {
    const menuWidth = 200; // Approximate width of the context menu
    const menuHeight = 240; // Approximate height of the context menu
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX;
    let y = event.clientY;

    // Adjust position if the menu would overflow on the right side
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth;
      setSubMenuPosition("Right");
    } else {
      setSubMenuPosition("Left");
    }
    // Adjust position if the menu would overflow on the bottom
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight;
    }

    // Return the calculated x and y
    return { x, y };
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
    if (tBodyRef.current && !tBodyRef.current.contains(event.target as Node)) {
      setSelectedRow(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowMenu(false);
    }
  };

  function HandleClickMenuItem(operation: T) {
    if (onMenuItemClick) onMenuItemClick(operation, SelectedData);
    setShowMenu(false);
  }

  function HandleSelectedRow(index: number, object: object) {
    setSelectedRow((cur) => (cur === index ? null : index));
    setSelectedData(object);
  }

  function HandleOnSorting(headerCell: string) {
    const newSortType =
      selectedHeaderCell !== headerCell
        ? "ASC"
        : sortType === "NONE"
        ? "ASC"
        : sortType === "ASC"
        ? "DESC"
        : "NONE";

    // Update the states first
    setSelectedHeaderCell(headerCell);
    setSortType(newSortType);

    // Call onSort with the updated values
    if (onSort) onSort(headerCell, newSortType);
  }

  const renderSortIcon = () => {
    switch (sortType) {
      case "ASC":
        return <BsSortUp className="inline-block w-6 text-center" size={20} />;
      case "DESC":
        return (
          <BsSortDown className="inline-block w-6 text-center" size={20} />
        );
      case "NONE":
      default:
        return null; // No icon for "NONE" or default case
    }
  };

  /* ────────────── Effect  ────────────── */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ────────────── Render  ────────────── */
  const contextMenuItems =
    showMenu &&
    contextMenuData?.map((item, i) => {
      return (
        <li
          onClick={() => {
            if (item.isDisabled || (item?.children?.length ?? 0) !== 0) return;

            HandleClickMenuItem(item.operation);
          }}
          key={i}
          className={`relative group flex items-center w-full ${
            item.isDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-100"
          }
          ${(item?.children?.length ?? 0) > 0 ? "cursor-default" : ""}
          `}
        >
          <Tippy
            content={
              item.isDisabled ? (
                <span className="text-red-600 text-sm p-1 rounded-md">
                  {item.disableMessage}
                </span>
              ) : null
            } // Tooltip with red error text
            placement="right" // Position tooltip to the right
            delay={[300, 100]} // Increased delay for appearance (500ms) and disappearance (300ms)
            theme="custom-error" // Custom theme
            arrow={true} // Include arrow pointing to the target
            offset={[0, 8]} // Adjust tooltip position
          >
            <span className="w-full h-full flex px-4 py-3">
              <item.Icon
                className="text-[#1A1F24]  dark:text-white"
                size={20}
              />
              <a className="block px-4 text-gray-700">{t(item.name)}</a>
            </span>
          </Tippy>

          {!item.isDisabled && item.isSubMenu && (
            <ul
              className={`absolute top-0 ${
                subMenuPosition === "Left" ? "left-full" : "right-full"
              } hidden group-hover:block bg-white shadow-lg rounded-lg w-48`}
            >
              {item.children?.map((subItem) => {
                return (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!subItem.isDisabled)
                        HandleClickMenuItem(subItem.operation);
                    }}
                    key={subItem.operation}
                    disabled={subItem.isDisabled}
                    className={`${
                      subItem.isDisabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-gray-100"
                    } relative group flex items-center w-full px-4 py-3`}
                  >
                    <span className=" flex ">
                      <subItem.Icon
                        className="text-[#1A1F24]  dark:text-white"
                        size={20}
                      />
                      <a className="block px-4 text-gray-700">
                        {subItem.operation}
                      </a>
                    </span>
                  </button>
                );
              })}
            </ul>
          )}
        </li>
      );
    });

  const tableRowsRender = tableBody?.map((obj, i) => (
    <tr
      onClick={() => HandleSelectedRow(i, obj)}
      onContextMenu={(e) => handleRightClick(e, i, obj)}
      key={Object.entries(obj)[0][1]} // Use a unique key from the object
      className={`border-b border-gray-200 py-4 ${
        i === SelectedRow ? "bg-[#1A1F24] text-white" : ""
      }`}
    >
      {Object.entries(obj).map(([, value], index) => (
        <th
          key={index} // Use index if the keys are dynamic
          className="px-3 py-2 border border-gray-300 text-center"
        >
          {value}
        </th>
      ))}
    </tr>
  ));

  const renderTBHeader = tableHeader.map((head, i) => (
    <th
      onClick={() => HandleOnSorting(head.name)}
      key={i}
      className="px-4 cursor-pointer  text-center w-auto whitespace-nowrap py-3"
    >
      <div className="flex gap-2 items-center justify-center">
        <span>{t(head.displayName)}</span>
        {selectedHeaderCell === head.name && renderSortIcon()}
      </div>
    </th>
  ));

  return (
    <div className="overflow-x-auto w-[100%]  scrollbar-thin scrollbar-thumb-[#1A1F24] text-white">
      <table className="w-[100%] text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-primary text-text">
          <tr>{renderTBHeader}</tr>
        </thead>
        <tbody
          ref={tBodyRef}
          className="cursor-pointer text-[#1A1F24] text-nowrap "
        >
          {tableRowsRender}
        </tbody>
      </table>

      {showMenu && (
        <div
          ref={menuRef}
          className="fixed bg-white z-50 shadow-2xl rounded-sm"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <ul>{contextMenuItems}</ul>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
