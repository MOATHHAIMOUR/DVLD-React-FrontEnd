import { useState } from "react";

interface IProps {
  numberOfDisplayPages: number;
  totalPages: number;
}

const Pagination = ({ numberOfDisplayPages, totalPages }: IProps) => {
  /* ────────────── State  ────────────── */
  const [paginationList, setPaginationList] = useState<Array<number>>(
    Array.from({ length: numberOfDisplayPages }, (_, index) => index + 1)
  );
  const [paginationSlice, setPaginationSlice] = useState(0);

  const paginationLinksRender = paginationList
    .slice(paginationSlice, paginationSlice + numberOfDisplayPages)
    .map((pageNumber, i) => (
      <li key={i}>
        <a className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {pageNumber}
        </a>
      </li>
    ));

  /* ────────────── Derived Values  ────────────── */
  const isEnd = paginationList.length === totalPages;
  const isStart = paginationSlice === 0;

  /* ────────────── Handlers  ────────────── */
  function HandleNextPaginationSlice() {
    setPaginationSlice((prev) => prev + 5);

    setPaginationList((prevList) =>
      totalPages - prevList.length < 5
        ? [
            ...prevList,
            ...Array.from(
              { length: totalPages - prevList.length },
              (_, index) => prevList.length + index + 1
            ),
          ]
        : [
            ...prevList,
            ...Array.from(
              { length: numberOfDisplayPages },
              (_, index) => prevList.length + index + 1
            ),
          ]
    );
  }

  function HandlePrevPaginationSlice() {
    setPaginationSlice((prev) => prev - 5);
    console.log(totalPages === paginationList.length);
    setPaginationList((prevList) =>
      totalPages === prevList.length
        ? [...prevList.slice(0, -(prevList.length % paginationSlice))]
        : [...prevList.slice(0, -paginationSlice)]
    );
  }

  return (
    <div className="flex flex-col flex-grow-[1] ">
      <nav className="mx-auto flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <button disabled={isStart} onClick={HandlePrevPaginationSlice}>
            <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </a>
          </button>
          {paginationLinksRender}
          <li>
            <button
              disabled={isEnd}
              onClick={HandleNextPaginationSlice}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
