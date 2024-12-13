import { toast } from "react-toastify";
import { IAddNewInternationalLicense } from "../interfaces";
import { useAddNewInternationalLicenseMutation } from "../store";

export const useAddNewInternationalLicenseHandler = () => {
  const [addNewInternationalLicense, { isLoading, data }] =
    useAddNewInternationalLicenseMutation();

  const handleAddNewInternationalLicense = async (
    formData: IAddNewInternationalLicense
  ) => {
    try {
      const response = await addNewInternationalLicense(formData).unwrap();
      console.log("here: " + response.data.applicationId);
      toast.success("Driving license added successfully!", {
        position: "top-right",
      });
      return response; // Return the response to the caller
    } catch {
      toast.error("An error occur", {});
    }
  };

  return { handleAddNewInternationalLicense, isLoading, data };
};
