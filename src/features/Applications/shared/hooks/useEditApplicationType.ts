import { toast } from "react-toastify";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import { IApplicationType } from "../interfaces";
import { useUpdateApplicationTypeMutation } from "../store/ApplicationApiSlice";

export const useEditApplicationTypeHandler = () => {
  const [updateApplicationType, { isLoading }] =
    useUpdateApplicationTypeMutation();

  const handleEditApplicationType = async (
    applicationType: IApplicationType
  ) => {
    let response: IGenericApiResponse<string> = null!;

    try {
      // Call the update mutation
      response = await updateApplicationType(applicationType).unwrap();

      // Show success notification
      toast.success(response.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      // Handle errors
      const errorMessage = response?.errors || "An error occurred";
      console.error(error);

      toast.error(errorMessage, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return { handleEditApplicationType, isLoading };
};
