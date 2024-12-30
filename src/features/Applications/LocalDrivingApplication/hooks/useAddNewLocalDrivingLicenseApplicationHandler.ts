import { toast } from "react-toastify";
import { AddNewLocalDrivingLicenseDTO } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAddNewLocalDrivingLicenseApplicationMutation } from "../Store/LocalDrivingLicenseApplicationApiSlice";

export const useAddNewLocalDrivingLicenseApplicationHandler = () => {
  const [addNewLocalDrivingLicense, { isLoading, error }] =
    useAddNewLocalDrivingLicenseApplicationMutation();

  const navigate = useNavigate();
  const handleAddNewLocalDrivingLicense = async (
    formData: AddNewLocalDrivingLicenseDTO
  ) => {
    try {
      await addNewLocalDrivingLicense(formData).unwrap();
      toast.success("Driving license added successfully!", {
        position: "top-right",
      });
      navigate("/local-driving-license/manage-local-driving-licenses");
    } catch {
      /* empty */
    }
  };

  return { handleAddNewLocalDrivingLicense, error, isLoading };
};
