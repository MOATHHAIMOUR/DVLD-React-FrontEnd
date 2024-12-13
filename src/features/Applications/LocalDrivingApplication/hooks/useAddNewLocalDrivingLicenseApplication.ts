import { toast } from "react-toastify";
import { AddNewLocalDrivingLicenseDTO } from "../interfaces";
import { useAddNewLocalDrivingLicenseMutation } from "../Store/LocalDrivingLicenseApplicationApiSlice";

export const useAddNewLocalDrivingLicense = () => {
  const [addNewLocalDrivingLicense, { isLoading, error }] =
    useAddNewLocalDrivingLicenseMutation();

  const handleAddNewLocalDrivingLicense = async (
    formData: AddNewLocalDrivingLicenseDTO
  ) => {
    try {
      await addNewLocalDrivingLicense(formData).unwrap();
      toast.success("Driving license added successfully!", {
        position: "top-right",
      });
    } catch {
      /* empty */
    }
  };

  return { handleAddNewLocalDrivingLicense, error, isLoading };
};
