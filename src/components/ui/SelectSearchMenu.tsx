import React from "react";
import Select, { StylesConfig } from "react-select";
import { Control, Controller } from "react-hook-form";

// Define the option type
interface OptionType {
  value: number | string;
  label: string;
}

// Define the props type
interface IProps {
  list: Array<OptionType>;
  isLoading?: boolean;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  placeHolder: string;
}

// Define the custom styles for react-select
const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    padding: "0.1rem",
    borderColor: "#e2e8f0",
    borderWidth: "1px",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 5px 4px rgba(0, 0, 0, 0.1)",
    "&:hover": { borderColor: "#cbd5e0" },
    "&:focus-within": {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 1px #4f46e5",
    },
    minHeight: "2.5rem",
  }),
};

const SelectSearchMenu: React.FC<IProps> = ({
  title,
  list,
  isLoading,
  placeHolder,
  control,
  name,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{title}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={list}
            placeholder={placeHolder}
            className="text-gray-600"
            styles={customStyles}
            isClearable
            isLoading={isLoading}
            value={
              field.value !== undefined
                ? list.find((option) => option.value === field.value)
                : null
            }
            onChange={(option) => {
              console.log(option);
              field.onChange(option ? option.value : null);
            }}
          />
        )}
      />
    </div>
  );
};

export default SelectSearchMenu;
