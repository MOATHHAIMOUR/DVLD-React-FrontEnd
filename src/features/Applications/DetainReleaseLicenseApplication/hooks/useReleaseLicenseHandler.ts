import { IReleaseLicense } from "../interfaces";
import { toast } from "react-toastify";
import { useReleaseLicenseMutation } from "../Store/DetainLicenseApiSlice";

export const useReleaseLicenseHandler = () => {
  const [releaseLicense, { isLoading }] = useReleaseLicenseMutation();

  const handleReleaseLicense = async (formData: IReleaseLicense) => {
    try {
      await releaseLicense(formData).unwrap();
      toast.success("License released successfully!");
    } catch (error) {
      console.error("Release License Error:", error);
    }
  };

  return { handleReleaseLicense, isLoading };
};
