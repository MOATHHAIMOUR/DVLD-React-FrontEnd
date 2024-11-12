import { useRef, useState } from "react";
import { FilterByData, IFilterBy, IFilterByPeople } from "../../../data";
import SelectMenu from "../../../components/ui/SelectMenu";
import Input from "../../../components/ui/Input";
import { AppDispatch, useAppDispatch } from "../../../store";
import {
  AddSimpleFilter,
  RemoveAdvanceFilter,
} from "../../../store/QuerySlice";
import { isNumber } from "../../../utils/index";
import ErrorMsg from "../../../components/ui/ErrorMsg";

const Filter = () => {
  /* ────────────── state  ────────────── */
  const [selectedFilterBy, setSelectedFilterBy] = useState<
    IFilterBy<IFilterByPeople>
  >(FilterByData[0]);

  const refQuery = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  /* ────────────── Handlers  ────────────── */

  function QueryBuilder() {
    if (refQuery?.current?.value === "") {
      dispatch(RemoveAdvanceFilter(selectedFilterBy.value.name));
    } else {
      dispatch(
        AddSimpleFilter({
          FilterBy: selectedFilterBy.value.name,
          FilterValue: refQuery?.current?.value ?? "",
        })
      );
    }
  }

  function handleOnChangeFilterBy(FilterByName: string) {
    const FilterBy = FilterByData.find((f) => f.value.name === FilterByName);
    setSelectedFilterBy(FilterBy!);
    setError(null);
    if (refQuery.current) {
      refQuery.current.value = ""; // This should work if refQuery.current is assigned
    }
  }

  function handleChangeQuery(
    FilterType: IFilterBy<IFilterByPeople>["type"],
    value: string
  ) {
    switch (FilterType) {
      // accept the value only if it's a number otherwise less
      case "number":
        if (value !== "" && !isNumber(value)) {
          setError("Value Should be a number");
          if (refQuery.current) {
            refQuery.current.value = refQuery.current.value.slice(0, -1);
          }
          return;
        }
        setError(null);
        QueryBuilder();
        break;
      case "string":
        if (isNumber(value)) {
          setError("Value Should be a text");
          if (refQuery.current) {
            refQuery.current.value = refQuery.current.value.slice(0, -1);
          }
          return;
        }
        setError(null);
        QueryBuilder();
        break;
      default:
        break;
    }
  }

  /* ────────────── Render  ────────────── */

  const renderFilterBys = FilterByData.map((filterBy, index) => (
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
              ref={refQuery}
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
          case "Gender":
            return (
              <SelectMenu onchange={handleOnChangeFilterBy}>
                <>
                  <option value={"Male"}>{"Male"}</option>
                  <option value={"Female"}>{"Female"}</option>
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
    <div className="flex gap-2 items-center">
      <p className="text-[18px] font-semibold">Filter by:</p>
      <div className="w-44">
        <SelectMenu onchange={handleOnChangeFilterBy}>
          {renderFilterBys}
        </SelectMenu>
      </div>
      <div>{renderFilterByQueryBox()}</div>
    </div>
  );
};

export default Filter;
