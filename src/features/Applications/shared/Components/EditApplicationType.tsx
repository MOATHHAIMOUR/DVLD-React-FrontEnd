import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../../components/ui/Input";
import { applicationTypesFields } from "../data";
import FormComponent from "../../../../components/ui/FormComponent";
import ErrorMsg from "../../../../components/ui/ErrorMsg";
import { SubmitHandler, useForm } from "react-hook-form";
import { IApplicationType } from "../interfaces";
import { ApplicationTypeSchema } from "../validations";
import { useEditApplicationTypeHandler } from "../hooks/useEditApplicationType";
import Button from "../../../../components/ui/Button";
import Box from "../../../../components/ui/Box";

interface IProps {
  handleCloseModal: () => void;
  ApplicationTypeData: IApplicationType;
}

const EditApplicationType = ({
  ApplicationTypeData,
  handleCloseModal,
}: IProps) => {
  // Initialize form with react-hook-form and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApplicationType>({
    resolver: zodResolver(ApplicationTypeSchema),
    defaultValues: ApplicationTypeData,
  });

  console.log(
    "errors:",
    Object.entries(errors)
      .map(([field, error]) => `${field}: ${error?.message}`)
      .join(", ")
  );
  const { handleEditApplicationType, isLoading } =
    useEditApplicationTypeHandler();
  /* ────────────── Handler  ────────────── */
  const onSubmit: SubmitHandler<IApplicationType> = async (data) => {
    await handleEditApplicationType({
      applicationTypeID: ApplicationTypeData.applicationTypeID,
      applicationFees: data.applicationFees,
      applicationTypeTitle: data.applicationTypeTitle,
    }); // Call edit handler with form data
  };

  /* ────────────── Render Form Fields ────────────── */
  const renderApplicationFields = applicationTypesFields.map((field) => (
    <Box key={field.name} className="mb-6">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {field.displayName || field.placeholder}
      </label>
      <Input
        id={field.name}
        {...register(field.name, {
          valueAsNumber: field.type === "number", // This ensures that only the number fields are treated as numbers
        })}
        placeholder={field.placeholder}
        type={field.type}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {errors?.[field.name]?.message && (
        <ErrorMsg message={errors[field.name]?.message ?? ""} />
      )}
    </Box>
  ));

  /* ────────────── Render Form ────────────── */
  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] mx-auto p-6 bg-white text-left shadow-md rounded-lg"
    >
      <Box className="space-y-4">{renderApplicationFields}</Box>

      <Box className="mt-6 flex items-center justify-end space-x-4">
        <Button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </Button>
      </Box>
    </FormComponent>
  );
};

export default EditApplicationType;
