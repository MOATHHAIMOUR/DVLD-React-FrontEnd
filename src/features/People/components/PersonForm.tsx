// External Libraries
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Global Data
import { PersonFieldsData } from "../data";

// UI Components
import Box from "../../../components/ui/Box";
import Button from "../../../components/ui/Button";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import FileUploader from "../../../components/ui/FileUploader";
import FormComponent from "../../../components/ui/FormComponent";
import Input from "../../../components/ui/Input";
import SelectSearchMenu from "../../../components/ui/SelectSearchMenu";

// Feature-Specific Code
import { IPerson } from "../interfaces";
import { personSchema } from "../validations";

// Shared APIs
import { useFetchCountriesQuery } from "../../../store/SharedApiSlice";
import { usePersonFormHandler } from "../hooks/usePersonFormHandler";
import { enumFormMode } from "../../../interfaces";

interface IProps {
  PersonData?: IPerson;
  isDisabled?: boolean;
  mode: enumFormMode;
}

const PersonForm = ({ PersonData, mode, isDisabled }: IProps) => {
  /* ────────────── STATE  ────────────── */
  const { data: countries } = useFetchCountriesQuery();

  const { handlePersonFormSubmit } = usePersonFormHandler();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPerson>({
    resolver: zodResolver(personSchema),
    defaultValues: PersonData !== undefined ? PersonData : {},
  });

  /* ────────────── RERENDER  ────────────── */
  const personFields = [
    ...PersonFieldsData.map((field, i) => (
      <Box key={i}>
        <label className="block text-sm font-medium text-gray-700">
          {field.displayName}
        </label>
        <Input
          {...register(field.name)}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          PrefixIcon={field.Icon}
        />
        {errors[field.name] && (
          <ErrorMsg message={errors[field.name]?.message ?? ""} />
        )}
      </Box>
    )),
    <Box key={"countryId"}>
      {countries?.data && (
        <SelectSearchMenu
          control={control}
          name="countryId"
          title="Nationality"
          list={countries.data.map((country) => ({
            label: country.name,
            value: country.countryId,
          }))}
        />
      )}
      {errors["countryId"] && (
        <ErrorMsg message={errors["countryId"]?.message ?? ""} />
      )}
    </Box>,
    <Box key={"gender"}>
      <SelectSearchMenu
        name="gender"
        control={control}
        title="Gender"
        list={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      {errors["gender"] && (
        <ErrorMsg message={errors["gender"]?.message ?? ""} />
      )}
    </Box>,
  ];

  /* ────────────── Handlers  ────────────── */
  const onSubmit: SubmitHandler<IPerson> = async (data) => {
    const person = {
      ...data,
      personId: PersonData?.personId ?? 0,
    };
    console.log("PersonData: " + person);
    console.log("handlePersonFormSubmit: " + data.personId);

    await handlePersonFormSubmit(mode, person);
  };

  return (
    <Box
      disabled={isDisabled}
      className="grid grid-cols-[1fr,auto] gap-10  h-[100%]"
    >
      <FormComponent
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr,auto] gap-10  h-[100%]"
      >
        <Box className="grid grid-cols-3 gap-8 h-[70%]">{personFields}</Box>
        <Box className="w-[300px]    flex flex-col justify-between">
          <Box className="">
            <h1 className="text-2xl py-3">Upload Your Image</h1>
            <FileUploader />
          </Box>
          <Box className="ml-auto">
            <Button
              type="submit"
              className="px-4 py-2  bg-[#1F2937] text-white rounded-md shadow hover:bg-[#2d3949] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mode === enumFormMode.Add ? "Add Person " : "Edit Person"}
            </Button>
          </Box>
        </Box>
      </FormComponent>
    </Box>
  );
};

export default PersonForm;
