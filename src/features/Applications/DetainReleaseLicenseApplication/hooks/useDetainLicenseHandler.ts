import { IAddDetainLicense } from "../interfaces";
import { toast } from "react-toastify";
import { useDetainLicenseMutation } from "../Store/DetainLicenseApiSlice";

export const useDetainLicenseHandler = () => {
  const [detainLicense, { isLoading }] = useDetainLicenseMutation();

  const handleDetainLicense = async (formData: IAddDetainLicense) => {
    try {
      await detainLicense(formData).unwrap();
      toast.success("License detained successfully!");
    } catch (error) {
      toast.error("Failed to detain the license. Please try again.");
      console.error("Detain License Error:", error);
    }
  };

  return { handleDetainLicense, isLoading };
};