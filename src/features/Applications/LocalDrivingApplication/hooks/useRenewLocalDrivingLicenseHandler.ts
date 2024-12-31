import { toast } from "react-toastify";
import { useState } from "react";
import { useRenewLocalDrivingLicenseMutation } from "../Store/LocalDrivingLicenseApplicationApiSlice";

export const useRenewLocalDrivingLicenseHandler = () => {
  const [renewLocalDrivingLicense, { isLoading, error }] =
    useRenewLocalDrivingLicenseMutation();

  // Convert response to state
  const [response, setResponse] = useState<{
    applicationId: string;
    renewLicenseId: string;
  }>({
    applicationId: "",
    renewLicenseId: "",
  });

  const renewLicense = async (formData: {
    LicenseId: string;
    CreatedByUserId: number;
  }) => {
    try {
      const result = await renewLocalDrivingLicense(formData).unwrap();

      // Update the response state with the result
      setResponse({
        applicationId: result.applicationId,
        renewLicenseId: result.renewLicenseId,
      });

      toast.success("License renewed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch {
      // Optional: Re-throw the error if needed
    }
  };

  return { renewLicense, isLoading, error, response };
};
