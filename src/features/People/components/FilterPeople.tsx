/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useRef, useState } from "react";
import { FilterByPersonData } from "../data";
import SelectMenu from "../../../components/ui/SelectMenu";
import Input from "../../../components/ui/Input";
import { isNumber } from "../../../utils/index";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import { IFilter, IFilterByComboBox } from "../../../interfaces";
import { useTranslation } from "react-i18next";

interface IProps {
  onChangeFilter: (filter: IFilter) => void;
}
const FilterPeople = ({ onChangeFilter }: IProps) => {
  const { t } = useTranslation();
  const [selectedFilterBy, setSelectedFilterBy] = useState<IFilterByComboBox>(
    FilterByPersonData[0]
  );
  const refQuery = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function QueryBuilder() {
    if (selectedFilterBy) {
      onChangeFilter({
        FilterBy: selectedFilterBy.value.name,
        FilterValue: refQuery.current?.value ?? "",
      });
    }
  }

  function handleOnChangeFilterBy(FilterByName: string) {
    const FilterBy = FilterByPersonData.find(
      (f) => f.value.name === FilterByName
    );
    setSelectedFilterBy(FilterBy!);
    setError(null);
    if (refQuery.current) {
      refQuery.current.value = "";
    }
  }

  function handleChangeQuery(
    FilterType: IFilterByComboBox["type"],
    value: string
  ) {
    switch (FilterType) {
      case "number":
        if (value !== "" && !isNumber(value)) {
          setError(t("settings.shouldNumber"));
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
          setError(t("settings.shouldText"));
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

  const renderFilterBys = FilterByPersonData.map((filterBy, index) => (
    <option key={index} value={filterBy.value.name}>
      {t(filterBy.value.displayName as any)}
    </option>
  ));

  const renderFilterByQueryBox = () => {
    switch (selectedFilterBy.type) {
      case "string":
      case "number":
        return (
          <div className="relative flex flex-col gap-2">
            <Input
              ref={refQuery}
              onChange={(e) =>
                handleChangeQuery(selectedFilterBy.type, e.target.value)
              }
              className="w-full border border-gray-300 p-1 rounded-md focus:ring focus:ring-primary-hover"
            />
            {error && (
              <ErrorMsg
                message={error}
                className="absolute  bottom-[-22px] text-red-600 text-sm flex items-center gap-1"
              />
            )}
          </div>
        );
      case "category":
        switch (selectedFilterBy.value.name) {
          case "Gender":
            return (
              <SelectMenu
                onChange={(e) => handleOnChangeFilterBy(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </SelectMenu>
            );
          default:
            return (
              <p className="font-semibold text-gray-600">
                {t("settings.no_options")}
              </p>
            );
        }
      default:
        return (
          <p className="font-semibold text-gray-600">
            {t("settings.no_options")}
          </p>
        );
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center  p-4 rounded-lg ">
      <p className="text-lg font-semibold text-gray-700">
        {t("People.filter_by")}
      </p>
      <div className="w-44">
        <SelectMenu
          onChange={(e) => handleOnChangeFilterBy(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md "
        >
          {renderFilterBys}
        </SelectMenu>
      </div>
      <div className="flex-1">{renderFilterByQueryBox()}</div>
    </div>
  );
};

export default memo(FilterPeople);
