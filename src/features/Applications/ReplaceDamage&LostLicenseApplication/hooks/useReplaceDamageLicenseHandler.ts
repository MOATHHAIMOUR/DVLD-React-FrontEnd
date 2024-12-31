import { toast } from "react-toastify";
import { useState } from "react";
import {
  ReplaceLicenseDamageResponse,
  ReplaceLicenseRequest,
} from "../interface";
import { useReplaceDamageLicenseMutation } from "../store";

export const useReplaceDamageLicenseHandler = () => {
  const [replaceDamageLicense, { isLoading, error }] =
    useReplaceDamageLicenseMutation();

  // State to store the response
  const [response, setResponse] = useState<ReplaceLicenseDamageResponse>({
    applicationId: false,
    ReplacementDamageForLicenseId: "",
  });

  const handleReplaceDamageLicense = async (
    formData: ReplaceLicenseRequest
  ) => {
    try {
      const result = await replaceDamageLicense(formData).unwrap();

      // Update the response state
      setResponse({
        applicationId: result.applicationId,
        ReplacementDamageForLicenseId: result.ReplacementDamageForLicenseId,
      });

      toast.success("Damaged license replaced successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      //
    }
  };

  return { handleReplaceDamageLicense, isLoading, error, response };
};
