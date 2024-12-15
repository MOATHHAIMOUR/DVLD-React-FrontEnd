import { useCallback, useMemo, useRef, useState } from "react";
import { IFilterByComboBox, IQuery } from "../../../../interfaces";
import {
  filterByLocalDrivingLicenseData,
  FindLocalDrivingLicenseData,
  LocalDrivingLicenseTypesData,
} from "../data";
import Input from "../../../../components/ui/Input";
import ErrorMsg from "../../../../components/ui/ErrorMsg";
import SelectMenu from "../../../../components/ui/SelectMenu";
import Box from "../../../../components/ui/Box";
import Button from "../../../../components/ui/Button";
import { isNumber } from "../../../../utils";

interface IProps {
  onFindLocalDrivingLicense: (query: IQuery) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}
const FindLicense = ({
  onFindLocalDrivingLicense,
  isDisabled,
  isLoading,
}: IProps) => {
  /* ────────────── state  ────────────── */

  const [selectedFilterBy, setSelectedFilterBy] = useState<IFilterByComboBox>(
    FindLocalDrivingLicenseData[0]
  );

  const selectLicenseClassType = useRef<HTMLSelectElement>(null);

  const refQuery = useRef<HTMLInputElement>(null!);

  const [error, setError] = useState<string | null>(null);

  /* ────────────── Handlers  ────────────── */

  const handleOnChangeFilterBy = useCallback((FilterByName: string) => {
    const FilterBy = filterByLocalDrivingLicenseData.find(
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
      default:
        break;
    }
  }

  function HandleOnFindPerson() {
    if (refQuery.current?.value === "") {
      setError("please provide Value First");
      return;
    }
    onFindLocalDrivingLicense({
      Filter: {
        FilterBy: selectedFilterBy.value.name,
        FilterValue: refQuery.current?.value,
      },
    });
  }

  /* ────────────── Render  ────────────── */
  const renderFilterBys = useMemo(
    () =>
      FindLocalDrivingLicenseData.map((filterBy, index) => (
        <option key={index} value={filterBy.value.name}>
          {filterBy.value.displayName}
        </option>
      )),
    []
  );

  const renderLicenseClassesTypes = useMemo(
    () =>
      LocalDrivingLicenseTypesData.map((license, index) => (
        <option key={index} value={license.value}>
          {license.name}
        </option>
      )),
    []
  );

  const renderFilterByQueryBox = () => {
    switch (selectedFilterBy?.type) {
      case "string":
      case "number":
        return (
          <div className="relative flex flex-col items-center gap-2">
            <Input
              ref={refQuery}
              onChange={(e) =>
                handleChangeQuery(selectedFilterBy.type, e.target.value)
              }
              placeholder={`${selectedFilterBy.value.displayName.toLocaleLowerCase()}`}
              className="shadow-2xl border-2"
            />
            {error && (
              <ErrorMsg
                className="absolute left-0 bottom-[-22px]"
                message={error}
              />
            )}
          </div>
        );

      default:
        return <p>No Option is Selected</p>;
    }
  };

  return (
    <Box disabled={isDisabled} className="grid gap-4 items-center">
      <Box className="grid  w-full sm:grid-cols-1 gap-5 md:grid-cols-[auto,1fr]">
        <Box className=" grid gap-4 sm:grid-cols-1 lg:grid-cols-[auto,1fr,1fr,1fr]">
          <p className="text-[18px] font-semibold">Find by:</p>

          {/* Filter By Select Menu */}
          <SelectMenu
            value={selectedFilterBy.value.name}
            onChange={(e) => handleOnChangeFilterBy(e.target.value)}
            className="w-full"
          >
            {renderFilterBys}
          </SelectMenu>

          {/* Query Input */}
          <Box>{renderFilterByQueryBox()}</Box>

          {/* License Class Select Menu */}
          <SelectMenu ref={selectLicenseClassType} className="w-full">
            {renderLicenseClassesTypes}
          </SelectMenu>
        </Box>

        <Button
          isLoading={isLoading}
          error={error !== null || selectedFilterBy.value.name === "None"}
          onClick={HandleOnFindPerson}
          className="w-28 p-1 bg-primary hover:bg-primaryHover text-white rounded-md"
        >
          Find
        </Button>
      </Box>

      {/* Submit Button */}
    </Box>
  );
};

export default FindLicense;
