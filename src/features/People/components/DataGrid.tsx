import { ReactNode, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const totalPages = 8;
const numberOfDisplayPages = 5;
const DataGrid = () => {
  /* ────────────── State  ────────────── */

  const [paginationList, setPaginationList] = useState<Array<number>>(
    Array.from({ length: numberOfDisplayPages }, (_, index) => index + 1)
  );
  const [paginationSlice, setPaginationSlice] = useState(0);

  const isEnd = paginationList.length === totalPages;
  const isStart = paginationSlice === 0;

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

  /* ────────────── Render  ────────────── */
  const paginationLinksRender = paginationList
    .slice(paginationSlice, paginationSlice + numberOfDisplayPages)
    .map((pageNumber, i) => (
      <li key={i}>
        <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {pageNumber}
        </a>
      </li>
    ));

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
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

export default DataGrid;
