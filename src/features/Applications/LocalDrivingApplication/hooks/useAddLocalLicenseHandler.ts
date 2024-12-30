import { toast } from "react-toastify";
import { IAddLocalLicense } from "../interfaces";
import { useAddNewLocalLicenseMutation } from "../Store/LocalDrivingLicenseApplicationApiSlice";

export const useAddLocalLicenseHandler = () => {
  const [addNewLocalLicense, { isLoading, error }] =
    useAddNewLocalLicenseMutation();

  const addLicense = async (formData: IAddLocalLicense) => {
    try {
      await addNewLocalLicense(formData).unwrap();
      toast.success("License added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      //
    }
  };

  return { addLicense, isLoading, error };
};
