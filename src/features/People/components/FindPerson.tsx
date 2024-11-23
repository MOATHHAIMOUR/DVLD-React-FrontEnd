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
  /* ────────────── state  ────────────── */

  const [selectedFilterBy, setSelectedFilterBy] = useState<IFilterByComboBox>(
    FindPersonData[0]
  );

  const refQuery = useRef<HTMLInputElement>(null!);

  const [error, setError] = useState<string | null>(null);

  /* ────────────── Handlers  ────────────── */

  const handleOnChangeFilterBy = useCallback((FilterByName: string) => {
    const FilterBy = FilterByPersonData.find(
      (f) => f.value.name === FilterByName
    );

    if (FilterBy) {
      setSelectedFilterBy(FilterBy);
      setError(null);
      if (refQuery.current) {
        refQuery.current.value = ""; // Reset the input value if the ref is valid
      }
    }
  }, []);

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
        setError(null);
        break;
      case "string":
        if (isNumber(value)) {
          setError("Value Should be a text");
          return;
        }
        setError(null);

        break;
      default:
        break;
    }
  }

  function HandleOnFindPerson() {
    if (refQuery.current?.value === "") {
      setError("please provide Value First");
      return;
    }
    onFindPerson({
      Filter: {
        FilterBy: selectedFilterBy.value.name,
        FilterValue: refQuery.current?.value,
      },
    });
  }

  /* ────────────── Render  ────────────── */
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
          <div className="flex items-center gap-2">
            <Input
              ref={refQuery}
              onChange={(e) =>
                handleChangeQuery(selectedFilterBy.type, e.target.value)
              }
              placeholder={`${selectedFilterBy.value.displayName.toLocaleLowerCase()}`}
              className="shadow-2xl border-2"
            />
            {error && <ErrorMsg message={error} />}
          </div>
        );
      case "category":
        switch (selectedFilterBy.value.name) {
          case "Gender":
            return (
              <SelectMenu
                onChange={(e) => handleOnChangeFilterBy(e.target.value)}
              >
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
    <Box disabled={isDisabled} className="flex gap-4 items-center">
      <Box className="flex  justify-between w-full">
        <Box className="flex gap-5">
          <p className="text-[18px] font-semibold">Find by:</p>
          <Box className="w-44">
            <SelectMenu
              value={selectedFilterBy.value.name}
              onChange={(e) => handleOnChangeFilterBy(e.target.value)}
            >
              {renderFilterBys}
            </SelectMenu>
          </Box>
          <Box>{renderFilterByQueryBox()}</Box>
          <Button
            isLoading={isLoading}
            error={error !== null || selectedFilterBy.value.name === "None"}
            onClick={HandleOnFindPerson}
            className={` w-28 p-1 bg-[#374151] hover:bg-[#3d434d] text-white rounded-md`}
          >
            Find
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FindPerson;
