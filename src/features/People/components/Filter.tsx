import { useState } from "react";
import { FilterByData, IFilterBy, IFilterByPeople } from "../../../data";
import SelectMenu from "../../../components/ui/SelectMenu";
import Input from "../../../components/ui/Input";

const Filter = () => {
  /* ────────────── state  ────────────── */
  const [selectedFilterBy, setSelectedFilterBy] = useState<
    IFilterBy<IFilterByPeople>
  >(FilterByData[0]);

  const [query, setQuery] = useState("");

  /* ────────────── Handlers  ────────────── */

  function handleOnChangeFilterBy(FilterByName: string) {
    const FilterBy = FilterByData.find((f) => f.value.name === FilterByName);
    setSelectedFilterBy(FilterBy!);
    setQuery("");
  }

  function handleChangeQuery(
    FilterBy: IFilterBy<IFilterByPeople>["type"],
    value: string
  ) {
    switch (FilterBy) {
      // accept the value only if it's a number otherwise less
      case "number":
        if (!isNaN(Number(value))) {
          setQuery(value);
        }
        break;
      case "string":
        if (isNaN(Number(value)) || value === "") {
          setQuery(value);
        }
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
          <Input
            value={query}
            onChange={(e) =>
              handleChangeQuery(selectedFilterBy.type, e.target.value)
            }
            className="shadow-2xl border-2"
          />
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
