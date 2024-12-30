interface IProps {
  numberOfCols: number;
  numberOfRows: number;
}

const DataGridSkeleton = ({ numberOfCols, numberOfRows }: IProps) => {
  const renderRows = () => {
    return Array.from({ length: numberOfRows }).map((_, rowIndex) => (
      <tr key={rowIndex} className="animate-pulse">
        {Array.from({ length: numberOfCols }).map((_, colIndex) => (
          <td key={colIndex} className="px-6 py-4">
            <div className={`h-4 bg-gray-300 rounded  `}></div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {Array.from({ length: numberOfCols }).map((_, colIndex) => (
              <th
                key={colIndex}
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
              ></th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default DataGridSkeleton;
