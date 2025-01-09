import { useCallback, useMemo, useRef, useState } from "react";
import { FilterByPersonData, FindPersonData } from "../data";
import SelectMenu from "../../../components/ui/SelectMenu";
import Input from "../../../components/ui/Input";
import { isNumber } from "../../../utils/index";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import Button from "../../../components/ui/Button";
import Box from "../../../components/ui/Box";
import { IFilterByComboBox, IQuery } from "../../../interfaces";

interface IProps {
  onFindPerson: (query: IQuery) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const FindPerson = ({ onFindPerson, isDisabled, isLoading }: IProps) => {
  const [selectedFilterBy, setSelectedFilterBy] = useState<IFilterByComboBox>(
    FindPersonData[0]
  );
  const refQuery = useRef<HTMLInputElement>(null!);
  const [error, setError] = useState<string | null>(null);

  const handleOnChangeFilterBy = useCallback((FilterByName: string) => {
    const FilterBy = FilterByPersonData.find(
      (f) => f.value.name === FilterByName
    );

    if (FilterBy) {
      setSelectedFilterBy(FilterBy);
      setError(null);
      if (refQuery.current) {
        refQuery.current.value = "";
      }
    }
  }, []);

  const handleChangeQuery = (
    FilterType: IFilterByComboBox["type"],
    value: string
  ) => {
    switch (FilterType) {
      case "number":
        if (value !== "" && !isNumber(value)) {
          setError("Value should be a number");
          return;
        }
        setError(null);
        break;
      case "string":
        if (isNumber(value)) {
          setError("Value should be a text");
          return;
        }
        setError(null);
        break;
      default:
        break;
    }
  };

  const handleOnFindPerson = () => {
    if (!refQuery.current?.value.trim()) {
      setError("Please provide a value first.");
      return;
    }
    onFindPerson({
      Filter: {
        FilterBy: selectedFilterBy.value.name,
        FilterValue: refQuery.current?.value.trim(),
      },
    });
  };

  const renderFilterBys = useMemo(
    () =>
      FindPersonData.map((filterBy, index) => (
        <option key={index} value={filterBy.value.name}>
          {filterBy.value.displayName}
        </option>
      )),
    []
  );

  const renderFilterByQueryBox = () => {
    switch (selectedFilterBy?.type) {
      case "string":
      case "number":
        return (
          <Box className="flex flex-col gap-2 w-60">
            <Input
              ref={refQuery}
              onChange={(e) =>
                handleChangeQuery(selectedFilterBy.type, e.target.value)
              }
              placeholder={`Enter ${selectedFilterBy.value.displayName.toLowerCase()}`}
              className=" shadow-md border rounded-lg p-2 focus:ring-2 focus:ring-primary-hover outline-none transition"
            />
            {error && <ErrorMsg message={error} className="text-red-600" />}
          </Box>
        );
      case "category":
        switch (selectedFilterBy.value.name) {
          case "Gender":
            return (
              <SelectMenu
                onChange={(e) => handleOnChangeFilterBy(e.target.value)}
                className="rounded-lg border p-2 shadow-sm"
              >
                <>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </>
              </SelectMenu>
            );
          default:
            return (
              <p className="text-gray-500 text-nowrap">No option selected.</p>
            );
        }
      default:
        return (
          <p className="font-semibold text-gray-700 text-nowrap">
            No option selected.
          </p>
        );
    }
  };

  return (
    <Box
      disabled={isDisabled}
      className="flex flex-col md:flex-row items-center gap-4"
    >
      <Box className="flex flex-col md:flex-row gap-4 items-center w-full">
        <p className="text-xl font-semibold text-gray-800 text-nowrap">
          Find by:
        </p>
        <SelectMenu
          value={selectedFilterBy.value.name}
          onChange={(e) => handleOnChangeFilterBy(e.target.value)}
          className="text-[20px] rounded-lg border p-2 shadow-sm"
        >
          {renderFilterBys}
        </SelectMenu>
        <Box>{renderFilterByQueryBox()}</Box>
        <Button
          type="button"
          isLoading={isLoading}
          disabled={
            isDisabled || !!error || selectedFilterBy.value.name === "None"
          }
          onClick={handleOnFindPerson}
          className="bg-primary hover:bg-primaryHover text-white font-medium px-10 py-2 rounded-lg transition shadow-md hover:bg-primary-hover"
        >
          Find
        </Button>
      </Box>
    </Box>
  );
};

export default FindPerson;
