import React, { useState, useEffect, useRef } from "react";
import { IContextMenuItem, IHeaderData } from "../../data";
import { BsSortDown, BsSortUp } from "react-icons/bs";

interface IProps<T extends string> {
  tableHeader: IHeaderData[];
  tableBody: object[];
  contextMenuData: Array<IContextMenuItem<T>>;
  onMenuItemClick: (operation: T, obj: object) => void;
  onSort: (selectedHeadCell: string, sort: "ASC" | "DESC" | "NONE") => void;
}

const DataGrid = <T extends string>({
  tableBody,
  tableHeader,
  contextMenuData,
  onMenuItemClick,
  onSort,
}: IProps<T>) => {
  /* ────────────── STATE  ────────────── */
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const tBodyRef = useRef<HTMLTableSectionElement | null>(null);

  const [SelectedRow, setSelectedRow] = useState<number | null>(null);

  const [SelectedData, setSelectedData] = useState<object>({});

  const [selectedHeaderCell, setSelectedHeaderCell] = useState<string | null>(
    null
  );
  const [sortType, setSortType] = useState<"NONE" | "ASC" | "DESC">();

  /* ────────────── HANDLERS  ────────────── */
  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
    object: object
  ) => {
    event.preventDefault();
    const { x, y } = HandleContextMenuPosition(event);
    setMenuPosition({ x: x, y: y });
    setShowMenu(true);
    setSelectedRow(index);
    setSelectedData(object);
  };

  function HandleContextMenuPosition(event: React.MouseEvent<HTMLDivElement>) {
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
    onMenuItemClick(operation, SelectedData);
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
    onSort(headerCell, newSortType);
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
  const contextMenuItems = contextMenuData.map((item, i) => {
    return (
      <li
        onClick={() => HandleClickMenuItem(item.operation)}
        key={i}
        className="flex cursor-pointer items-center w-full hover:bg-gray-100 px-4 py-3"
      >
        <item.Icon size={20} />
        <a className="block  px-4 text-gray-700">{item.operation}</a>
      </li>
    );
  });

  const tableRowsRender = tableBody?.map((obj, i) => (
    <tr
      onClick={() => HandleSelectedRow(i, obj)}
      onContextMenu={(e) => handleRightClick(e, i, obj)}
      key={Object.entries(obj)[0][1]} // Use a unique key from the object
      className={`border-b border-gray-200 ${
        i === SelectedRow ? "bg-slate-800 text-white" : ""
      }`}
    >
      {Object.entries(obj).map(([, value], index) => (
        <th
          key={index} // Use index if the keys are dynamic
          className="px-3 py-1 border border-gray-300 text-center"
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
        <span>{head.displayName}</span>
        {selectedHeaderCell === head.name && renderSortIcon()}
      </div>
    </th>
  ));

  return (
    <div className="overflow-x-auto">
      <table className=" border-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{renderTBHeader}</tr>
        </thead>
        <tbody ref={tBodyRef} className="cursor-pointer">
          {tableRowsRender}
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
    </div>
  );
};

export default DataGrid;
