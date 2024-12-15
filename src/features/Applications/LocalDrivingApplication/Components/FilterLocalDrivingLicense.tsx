import { useRef, useState } from "react";
import { IFilter, IFilterByComboBox } from "../../../../interfaces";
import SelectMenu from "../../../../components/ui/SelectMenu";
import ErrorMsg from "../../../../components/ui/ErrorMsg";
import Input from "../../../../components/ui/Input";
import { filterByLocalDrivingLicenseData } from "../data";
import { isNumber } from "../../../../utils";

interface IProps {
  onChangeFilter: (filter: IFilter) => void;
}
const FilterLocalDrivingLicense = ({ onChangeFilter }: IProps) => {
  /* ────────────── state  ────────────── */
  const [selectedFilterBy, setSelectedFilterBy] = useState<IFilterByComboBox>(
    filterByLocalDrivingLicenseData[0]
  );

  const refTextQuery = useRef<HTMLInputElement | null>(null);

  const refSelectQuery = useRef<HTMLSelectElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  /* ────────────── Handlers  ────────────── */

  function FireQuery() {
    if (!selectedFilterBy) {
      return; // Exit early if no filter is selected
    }
    const textQuery = refTextQuery.current?.value;
    const selectQuery = refSelectQuery.current?.value;
    // Prioritize `textQuery` if both are available
    const filterValue = textQuery || selectQuery;

    onChangeFilter({
      FilterBy: selectedFilterBy.value.name,
      FilterValue: filterValue ?? "",
    });
  }

  function handleOnChangeFilterBy(FilterByName: string) {
    const FilterBy = filterByLocalDrivingLicenseData.find(
      (f) => f.value.name === FilterByName
    );

    setSelectedFilterBy(FilterBy!);
    setError(null);
    if (refTextQuery.current) {
      refTextQuery.current.value = ""; // This should work if refQuery.current is assigned
    }
  }

  function handleChangeQuery(
    FilterType: IFilterByComboBox["type"],
    value: string
  ) {
    switch (FilterType) {
      // accept the value only if it's a number otherwise less
      case "number":
        if (value !== "" && !isNumber(value)) {
          setError("Value Should be a number");
          return;
        }
        if (value === "") {
          FireQuery();
          return;
        }
        setError(null);
        FireQuery();
        break;
      case "string":
        if (value !== "" && isNumber(value)) {
          setError("Value Should be a text");
          return;
        }
        if (value === "") {
          FireQuery();
          return;
        }
        setError(null);
        FireQuery();
        break;
      default:
        break;
    }
  }

  /* ────────────── Render  ────────────── */

  const renderFilterBys = filterByLocalDrivingLicenseData.map(
    (filterBy, index) => (
      <option key={index} value={filterBy.value.name}>
        {filterBy.value.displayName}
      </option>
    )
  );

  const renderFilterByQueryBox = () => {
    switch (selectedFilterBy.type) {
      case "string":
      case "number":
        return (
          <div className="flex items-center gap-2">
            <Input
              ref={refTextQuery}
              onChange={(e) =>
                handleChangeQuery(selectedFilterBy.type, e.target.value)
              }
              className="shadow-2xl border-2"
            />
            {error && <ErrorMsg message={error} />}
          </div>
        );

      default:
        return <p className="ml-2 font-semibold">No Option is Selected</p>;
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <p className="text-[18px] font-semibold">Filter by:</p>
      <div className="max-w-72">
        <SelectMenu onChange={(e) => handleOnChangeFilterBy(e.target.value)}>
          {renderFilterBys}
        </SelectMenu>
      </div>
      <div>{renderFilterByQueryBox()}</div>
    </div>
  );
};

export default FilterLocalDrivingLicense;
