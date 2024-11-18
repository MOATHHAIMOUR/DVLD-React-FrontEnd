import { useState } from "react";

interface IProps {
  numberOfDisplayPages: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  numberOfDisplayPages,
  onPageChange,
  totalPages,
}: IProps) => {
  /* ────────────── State  ────────────── */

  const [pagination, setPagination] = useState({
    offset: 0,
    list: Array.from({ length: numberOfDisplayPages }, (_, index) => index + 1),
  });
  const [selectedPage, setSelectedPage] = useState(1);

  /* ────────────── Render  ────────────── */
  const paginationLinksRender = pagination.list
    .slice(pagination.offset)
    .map((pageNumber, i) => (
      <button
        key={i}
        onClick={() => HandleChangePage(pageNumber)}
        className={`px-4 py-2 border text-sm font-medium 
      ${
        selectedPage === pageNumber
          ? "bg-[#374151] text-white scale-110"
          : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-gray-300"
      }`}
      >
        {pageNumber}
      </button>
    ));

  /* ────────────── Derived Values  ────────────── */
  const isEnd = pagination.list.length === totalPages;
  const isStart = pagination.offset === 0;

  /* ────────────── Handlers  ────────────── */

  function HandleChangePage(pageNumber: number) {
    setSelectedPage(pageNumber);
    onPageChange(pageNumber);
  }

  function HandleNextPaginationSlice() {
    setPagination((prev) => {
      const newOffset = prev.offset + 5;
      const newList =
        totalPages - newOffset < 5
          ? [
              ...prev.list,
              ...Array.from(
                { length: totalPages - newOffset },
                (_, index) => prev.list.length + index + 1
              ),
            ]
          : [
              ...prev.list,
              ...Array.from(
                { length: numberOfDisplayPages },
                (_, index) => prev.list.length + index + 1
              ),
            ];

      return {
        offset: newOffset,
        list: newList,
      };
    });
  }

  function HandlePrevPaginationSlice() {
    setPagination((prev) => {
      const newOffset = prev.offset - 5;
      const newList =
        totalPages % prev.offset === 0
          ? [...prev.list.slice(0, -prev.offset)]
          : [...prev.list.slice(0, -(prev.list.length % prev.offset))];

      return {
        offset: newOffset,
        list: newList,
      };
    });
  }

  return (
    <div className="flex justify-center items-center py-4">
      <nav
        className="inline-flex items-center space-x-1"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        <button
          disabled={isStart}
          onClick={HandlePrevPaginationSlice}
          className={`px-4 py-2 rounded-l-lg border text-sm font-medium 
          ${
            isStart
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#374151] text-white  hover:bg-slate-800 hover:text-white border-gray-300"
          }`}
        >
          Previous
        </button>

        {paginationLinksRender}

        <button
          disabled={isEnd}
          onClick={HandleNextPaginationSlice}
          className={`px-4 py-2 rounded-r-lg border text-sm  font-medium 
          ${
            isEnd
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#374151] text-white  hover:bg-slate-800  hover:text-white border-gray-300"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
