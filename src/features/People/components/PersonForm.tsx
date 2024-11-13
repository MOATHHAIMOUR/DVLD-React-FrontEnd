import { SubmitHandler, useForm } from "react-hook-form";
import Box from "../../../components/ui/Box";
import Button from "../../../components/ui/Button";
import FileUploader from "../../../components/ui/FileUploader";
import FormComponent from "../../../components/ui/FormComponent";
import Input from "../../../components/ui/Input";
import SelectSearchMenu from "../../../components/ui/SelectSearchMenu";
import { PersonFieldsData } from "../../../data";
import { IPostPerson } from "../interfaces";
import { useFetchCountriesQuery } from "../../../store/SharedApiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import personValidationSchema from "../validations";
import ErrorMsg from "../../../components/ui/ErrorMsg";

const PersonForm = () => {
  const { data: countries } = useFetchCountriesQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPostPerson>({
    resolver: yupResolver(personValidationSchema),
    defaultValues: { countryId: undefined },
  });

  /* ────────────── Render  ────────────── */
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
    // Inside the personFields array
    <Box key={"countryId"}>
      {countries?.data && (
        <SelectSearchMenu
          control={control}
          name="countryId"
          title="countryId"
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
        title="gender"
        list={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
      />
      {errors["gender"] && (
        <ErrorMsg message={errors["gender"]?.message ?? ""} />
      )}
    </Box>,
  ];

  // Form submission handler
  const onSubmit: SubmitHandler<IPostPerson> = (data) => {
    console.log(data); // Replace with your submission logic
  };

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[1fr,auto] gap-10  h-[90%]"
    >
      <Box className="grid grid-cols-3 gap-8 h-[70%]">{personFields}</Box>
      <Box className="w-[300px] flex flex-col justify-between">
        <Box>
          <h1 className="text-2xl py-3">Upload Your Image</h1>

          <FileUploader />
        </Box>
        <Box className="text-right">
          <Button
            type="submit"
            className="px-4 py-2  bg-[#1F2937] text-white rounded-md shadow hover:bg-[#2d3949] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Person
          </Button>
        </Box>
      </Box>
    </FormComponent>
  );
};

export default PersonForm;
