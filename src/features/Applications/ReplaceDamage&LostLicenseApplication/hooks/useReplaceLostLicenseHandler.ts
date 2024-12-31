import { toast } from "react-toastify";
import { useState } from "react";
import {
  ReplaceLicenseLostResponse,
  ReplaceLicenseRequest,
} from "../interface";
import { useReplaceLostLicenseMutation } from "../store";

export const useReplaceLostLicenseHandler = () => {
  const [replaceLostLicense, { isLoading, error }] =
    useReplaceLostLicenseMutation();

  // State to store the response
  const [response, setResponse] = useState<ReplaceLicenseLostResponse>({
    applicationId: false,
    ReplacementForLostLicenseId: "",
  });

  const handleReplaceLostLicense = async (formData: ReplaceLicenseRequest) => {
    try {
      const result = await replaceLostLicense(formData).unwrap();

      // Update the response state
      setResponse({
        applicationId: result.applicationId,
        ReplacementForLostLicenseId: result.ReplacementForLostLicenseId,
      });

      toast.success("Lost license replaced successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      //
    }
  };

  return { handleReplaceLostLicense, isLoading, error, response };
};
