// External Libraries
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Global Data
import { countries, PersonFieldsData } from "../data";

// UI Components
import Box from "../../../components/ui/Box";
import Button from "../../../components/ui/Button";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import FileUploader from "../../../components/ui/FileUploader";
import FormComponent from "../../../components/ui/FormComponent";
import Input from "../../../components/ui/Input";
import SelectSearchMenu from "../../../components/ui/SelectSearchMenu";

// Feature-Specific Code
import { IFetchPerson, IPostPerson } from "../interfaces";
import { personSchema } from "../validations";

// Shared APIs
import { usePersonFormHandler } from "../hooks/usePersonFormHandler";
import { enumFormMode, EnumGender } from "../../../Enums";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { RefObject, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import DatePickerComponent, {
  DatePickerRef,
} from "../../../components/ui/DatePickerComponent";
import DatePicker from "react-flatpickr";

interface IProps {
  PersonData?: IFetchPerson;
  isDisabled?: boolean;
  mode: enumFormMode;
  ResetComponent: () => void;
}

const PersonForm = ({
  PersonData,
  ResetComponent,
  mode,
  isDisabled,
}: IProps) => {
  /* ────────────── STATE  ────────────── */
  const { t } = useTranslation();
  const {
    handlePersonFormSubmit,
    isAddSuccess,
    isUpdateSuccess,
    isAdding,
    isUpdating,
    addError,
    updateError,
  } = usePersonFormHandler();

  useEffect(() => {
    if (isAddSuccess || isUpdateSuccess) ResetComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddSuccess, isUpdateSuccess]);

  const datePickerRef = useRef<DatePickerRef>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IPostPerson>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      ...PersonData,
      ImagePath: PersonData?.imagePath ?? null,
      ImageFile: null,
    },
  });

  /* ────────────── RERENDER  ────────────── */
  const personFields = [
    ...PersonFieldsData.map((field, i) => {
      return (
        <Box key={i}>
          <label className="block text-sm font-medium text-gray-700">
            {t(field.displayName)}
          </label>
          <Input
            {...register(field.name)}
            type={field.type}
            name={field.name}
            className="text-black"
            placeholder={t(field.placeholder)}
            PrefixIcon={field.Icon}
          />
          {errors[field.name] && (
            <ErrorMsg message={errors[field.name]?.message ?? ""} />
          )}
        </Box>
      );
    }),
    <Box className="flex  flex-col   h-full" key={"dateOfBirth"}>
      <span>{t("People.tb_data.DateOfBirth")}</span>
      <DatePickerComponent
        placeholder={t("People.placeHolders.date")}
        ref={datePickerRef}
        className="w-full"
      />
      {errors["dateOfBirth"] && (
        <ErrorMsg message={errors["dateOfBirth"]?.message ?? ""} />
      )}
    </Box>,
    <Box key={"countryId"}>
      {
        <SelectSearchMenu
          title={t("People.filter_options.nationality")}
          control={control}
          name="countryId"
          placeHolder={t("People.placeHolders.nationality")}
          list={countries.map((country) => ({
            label: t(country.name),
            value: country.id,
          }))}
        />
      }
      {errors["countryId"] && (
        <ErrorMsg message={errors["countryId"]?.message ?? ""} />
      )}
    </Box>,
    <Box key={"gender"}>
      <SelectSearchMenu
        title={t("People.filter_options.gender")}
        name="gender"
        control={control}
        placeHolder={t("People.placeHolders.gender")}
        list={[
          { label: t("People.Gender.Male"), value: EnumGender.Male },
          { label: t("People.Gender.Female"), value: EnumGender.Female },
        ]}
      />
      {errors["gender"] && (
        <ErrorMsg message={errors["gender"]?.message ?? ""} />
      )}
    </Box>,
  ];

  /* ────────────── Handlers  ────────────── */
  const onSubmit: SubmitHandler<IPostPerson> = async (data) => {
    let person: IPostPerson;
    if (mode === enumFormMode.Add) {
      person = {
        ...data,
        ImageFile: data.ImageFile ?? null,
        ImagePath: null,
        personId: PersonData?.personId ?? 0,
      };
    } else {
      person = {
        ...data,
        ImageFile: data.ImageFile ?? null,
        ImagePath: data.ImagePath ?? null,
        personId: PersonData?.personId ?? 0,
      };
    }
    await handlePersonFormSubmit(mode, person);
  };

  return (
    <>
      <Input
        {...register("personId")}
        hidden
        value={PersonData?.personId ?? 0}
      />

      <ErrorHandler error={addError || updateError} />
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
            <Box>
              <h1 className="text-2xl py-3">{t("People.uploadImage")}</h1>
              <FileUploader
                isReadOnly={false}
                onRemoveImage={() => {
                  setValue("ImagePath", null);
                  setValue("ImageFile", null);
                }}
                value={PersonData?.imagePath ?? null}
                onChange={(file) => {
                  setValue("ImageFile", file);
                  setValue("ImagePath", null);
                  clearErrors("ImagePath");
                  clearErrors("ImageFile");
                }}
              />
              {errors && errors["ImagePath"] && (
                <ErrorMsg message={errors["ImagePath"].message!} />
              )}
            </Box>
            <Box className="ml-auto">
              <Button
                variant={"outline"}
                type="submit"
                isLoading={isAdding || isUpdating}
                className="px-4 py-2  bg-primary text-white rounded-md shadow hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {mode === enumFormMode.Add ? "Add Person " : "Edit Person"}
              </Button>
            </Box>
          </Box>
        </FormComponent>
      </Box>
    </>
  );
};

export default PersonForm;
