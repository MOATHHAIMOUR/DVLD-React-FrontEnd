import { toast } from "react-toastify";
import { IPostPerson } from "../interfaces";
import {
  useAddPersonMutation,
  useUpdatePersonMutation,
} from "../store/PeopleApiSlice";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import { enumFormMode } from "../../../Enums";

// Utility function to convert IPerson to FormData
const convertPersonToFormData = (person: IPostPerson): FormData => {
  const formData = new FormData();

  Object.entries(person).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "ImageFile" && value instanceof File) {
        formData.append(key, value); // Append the file
      } else if (key === "dateOfBirth") {
        // Format DateOfBirth to YYYY-MM-DD
        const formattedDate = new Date(value).toISOString().split("T")[0];
        formData.append(key, formattedDate);
      } else {
        console.log(key + " " + value.toString());
        formData.append(key, value.toString()); // Convert other fields to string
      }
    }
  });

  return formData;
};

export const usePersonFormHandler = () => {
  const [
    addPerson,
    { isLoading: isAdding, error: addError, isSuccess: isAddSuccess },
  ] = useAddPersonMutation();
  const [
    updatePerson,
    { isLoading: isUpdating, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdatePersonMutation();

  const handlePersonFormSubmit = async (
    mode: enumFormMode,
    person: IPostPerson
  ) => {
    let response: IGenericApiResponse<string> = null!;
    const formData = convertPersonToFormData(person);

    if (mode === enumFormMode.Add) {
      // Add Person
      response = await addPerson(formData).unwrap(); // Pass FormData instead of IPerson
      toast.success(response.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      // Update Person
      console.log("formData: " + formData.get("personId"));
      response = await updatePerson(formData).unwrap(); // Pass FormData instead of IPerson
      toast.success(response.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return {
    handlePersonFormSubmit,
    isAddSuccess,
    isAdding,
    addError,
    isUpdateSuccess,
    isUpdating,
    updateError,
  };
};
