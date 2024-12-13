import { useRef, useState } from "react";
import SelectMenu from "../../../components/ui/SelectMenu";
import Input from "../../../components/ui/Input";
import { isNumber } from "../../../utils/index";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import { IFilter, IFilterByComboBox } from "../../../interfaces";
import { FilterByTestAppointment } from "../data";

interface IProps {
  onChangeFilter: (filter: IFilter) => void;
}
const FilterTestAppointment = ({ onChangeFilter }: IProps) => {
  /* ────────────── state  ────────────── */
  const [selectedFilterBy, setSelectedFilterBy] = useState<IFilterByComboBox>(
    FilterByTestAppointment[0]
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

    if (filterValue) {
      onChangeFilter({
        FilterBy: selectedFilterBy.value.name,
        FilterValue: filterValue,
      });
    }
  }

  function handleOnChangeFilterBy(FilterByName: string) {
    const FilterBy = FilterByTestAppointment.find(
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
          if (refTextQuery.current) {
            refTextQuery.current.value = refTextQuery.current.value.slice(
              0,
              -1
            );
          }
          return;
        }
        setError(null);
        FireQuery();
        break;
      case "string":
        if (isNumber(value)) {
          setError("Value Should be a text");
          if (refTextQuery.current) {
            refTextQuery.current.value = refTextQuery.current.value.slice(
              0,
              -1
            );
          }
          return;
        }
        setError(null);
        FireQuery();
        break;
      default:
        break;
    }
  }

  function HandleChangeIsActive() {
    console.log("here ");
    const value = refSelectQuery.current?.value;

    if (refSelectQuery.current?.value && value !== "None") FireQuery();
  }

  /* ────────────── Render  ────────────── */

  const renderFilterBys = FilterByTestAppointment.map((filterBy, index) => (
    <option key={index} value={filterBy.value.name}>
      {filterBy.value.displayName}
    </option>
  ));

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
      case "category":
        switch (selectedFilterBy.value.name) {
          case "IsActive":
            return (
              <SelectMenu onChange={HandleChangeIsActive} ref={refSelectQuery}>
                <>
                  <option value={"None"}>None</option>
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </>
              </SelectMenu>
            );
          default:
            return <p>No Option is Selected</p>;
        }
      default:
        return <p>No Option is Selected</p>;
    }
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <p className="text-[18px] font-semibold">Filter by:</p>
      <div className="w-64">
        <SelectMenu onChange={(e) => handleOnChangeFilterBy(e.target.value)}>
          {renderFilterBys}
        </SelectMenu>
      </div>
      <div>{renderFilterByQueryBox()}</div>
    </div>
  );
};

export default FilterTestAppointment;
