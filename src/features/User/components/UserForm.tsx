import { Step, Stepper } from "react-form-stepper";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import LookupPersonToDisplayInfo from "../../People/components/LookupPersonToDisplayInfo";
import Box from "../../../components/ui/Box";
import { useNavigate } from "react-router-dom";
import { userFields } from "../data";
import SelectMenu from "../../../components/ui/SelectMenu";
import Input from "../../../components/ui/Input";
import { IApiUser, IFormUser } from "../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import FormComponent from "../../../components/ui/FormComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../validation";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import { useUserFormHandler } from "../hooks/userUserFormHandler";
import { useAppSelector } from "../../../store";
import { toast } from "react-toastify";
import { enumFormMode } from "../../../Enums";
import ErrorHandler from "../../../components/ui/ErrorHandler";

interface IProps {
  mode: enumFormMode;
  isDisabled?: boolean;
  userData?: IApiUser;
}

const UserForm = ({ mode, isDisabled, userData }: IProps) => {
  /* ────────────── STATE  ────────────── */
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      password: userData?.password,
      confirmPassword: userData?.password,
      isActive: userData?.isActive,
      username: userData?.username,
    },
  });

  const {
    handleUserFormSubmit,
    addUserError,
    isAddingUser,
    isUpdatingUser,
    updateUserError,
  } = useUserFormHandler();

  const personSlice = useAppSelector((state) => state.peopleSlice);

  /* ────────────── HANDLERS  ────────────── */

  function HandleAddPerson() {
    navigate("/people/add-person");
  }

  const handleNext = () => {
    if (personSlice.IsUser) {
      toast.error("current person is already a user", {
        hideProgressBar: true,
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit: SubmitHandler<IFormUser> = async (data) => {
    const user: IApiUser = {
      userId: userData?.userId ?? 0,
      username: data.username,
      password: data.password,
      personId: personSlice.PersonId!,
      isActive: data.isActive,
    };
    await handleUserFormSubmit(mode, user);
  };

  /* ────────────── Render  ────────────── */
  const renderUserFields = userFields.map((field, i) => {
    if (field.type === "text" || field.type === "password") {
      return (
        <div key={i}>
          <label
            className="font-semibold"
            htmlFor={field?.name || `input-${i}`}
          >
            {field?.displayName || "Unnamed Field"}
          </label>
          <Input
            id={field?.name || `input-${i}`}
            type={field?.type || "text"}
            {...register(field?.name)}
          />
          {errors?.[field?.name]?.message && (
            <ErrorMsg message={errors[field?.name]?.message ?? ""} />
          )}
        </div>
      );
    }

    if (field.type === "category") {
      return (
        <div key={i}>
          <label className="font-semibold" htmlFor={field.name}>
            {field.displayName}
          </label>
          <SelectMenu id={field.name} {...register(field.name)}>
            {field.menuData?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            ))}
          </SelectMenu>
          {errors?.[field?.name]?.message && (
            <ErrorMsg message={errors[field?.name]?.message ?? ""} />
          )}
        </div>
      );
    }

    return null; // Handle unexpected field types gracefully
  });

  console.log("peopleAlice: " + personSlice.IsUser);
  return (
    <Box disabled={isDisabled} className="flex flex-col ">
      <ErrorHandler error={addUserError || updateUserError} />
      {mode === enumFormMode.Add && (
        <Stepper
          activeStep={currentStep}
          styleConfig={{
            activeBgColor: "#1d2a3a", // Active step background color
            completedBgColor: "#818b97", // Completed step background color
            inactiveBgColor: "#818b97", // Inactive step background color
            activeTextColor: "#ffffff", // Text color for active steps
            completedTextColor: "#ffffff", // Text color for completed steps
            inactiveTextColor: "#ffffff", // Text color for inactive steps
            size: "4em", // Size of the step circle
            circleFontSize: "1em", // Font size inside the step circle
            labelFontSize: "1em", // Font size for the label text
            borderRadius: "50%", // Border radius for the step circle
            fontWeight: "bold", // Font weight for step labels
            labelMarginTop: "0.5em", // Add spacing between step and label
          }}
          connectorStyleConfig={{
            activeColor: "#1d2a3a", // Active connector color
            completedColor: "#1d2a3a", // Completed connector color
            disabledColor: "#e5e7eb", // Disabled connector color
            size: 4, // Thickness of the connector line
            style: "solid", // Style of the connector line
          }}
        >
          <Step label="Select Person" />
          <Step label="User Info" />
        </Stepper>
      )}

      <FormComponent onSubmit={handleSubmit(onSubmit)}>
        {personSlice.IsUser && (
          <ErrorMsg message="This person is already a user please chose another one" />
        )}
        {currentStep === 0 && mode === enumFormMode.Add && (
          <Button
            className="bg-[#1F2937] rounded-md p-2 text-white  ml-auto"
            onClick={HandleAddPerson}
          >
            Add New Person
          </Button>
        )}

        {mode === enumFormMode.Add && (
          <Box
            className={`w-[95%] mx-auto ${currentStep !== 0 ? "hidden" : ""}`}
          >
            <LookupPersonToDisplayInfo />
          </Box>
        )}

        {currentStep === 1 && (
          <Box className="w-1/2 flex flex-col gap-5">{renderUserFields}</Box>
        )}

        <Box className="flex justify-end gap-4 mt-5">
          {mode === enumFormMode.Add && (
            <Button
              type="button"
              className="bg-[#1F2937] rounded-md p-2 text-white w-32"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
          )}

          {currentStep === 0 && mode === enumFormMode.Add && (
            <Button
              disabled={personSlice.IsUser ?? false}
              type="button"
              className="bg-[#1F2937] rounded-md p-2 text-white w-32"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {(currentStep === 1 || mode === enumFormMode.Edit) && (
            <Button
              isLoading={isAddingUser || isUpdatingUser}
              type="submit"
              className="bg-[#1F2937] rounded-md p-2 text-white w-32"
            >
              Submit
            </Button>
          )}
        </Box>
      </FormComponent>
    </Box>
  );
};

export default UserForm;
